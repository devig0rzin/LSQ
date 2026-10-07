"""Gera o conteúdo técnico das páginas de produto a partir do pacote baixado por tools/baixar-site-lsq.ps1.

Uso: python3 -I tools/build-product-details.py <pasta lsq-site-dump> <apps/web>

Saídas:
  apps/web/src/content/product-details.data.ts   (subfamília + blocos da descrição de cada produto)
  apps/web/public/products/<slug>/desenho-NN.webp (imagens técnicas que vieram no pacote)
  tools/imagens-externas.txt                      (imagens da descrição que não foram encontradas em nenhum pacote)

O texto é preservado como está no site atual da LSQ (inclusive erros de tradução), para revisão humana.
"""
import html
import json
import os
import re
import sys
import unicodedata

from bs4 import BeautifulSoup, Comment, NavigableString, Tag
from PIL import Image

DUMP, WEB = sys.argv[1], sys.argv[2]
PRODUCTS = os.path.join(DUMP, "produtos")
OUT_TS = os.path.join(WEB, "src", "content", "product-details.data.ts")
OUT_SUB = os.path.join(WEB, "src", "content", "product-subfamilies.data.ts")
PUB = os.path.join(WEB, "public", "products")
EXTERNAL_LIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "imagens-externas.txt")
SKIP_HOSTS = ("assets.pinterest.com",)


def clean(text: str) -> str:
    text = html.unescape(text).replace("\xa0", " ")
    text = unicodedata.normalize("NFC", text)
    return re.sub(r"[ \t\r\f\v]+", " ", text).strip()


def lines_of(node: Tag) -> list[str]:
    """Texto de um bloco respeitando <br> como quebra de linha."""
    parts, buf = [], []
    for el in node.descendants:
        if isinstance(el, Tag) and el.name == "br":
            parts.append("".join(buf)); buf = []
        elif isinstance(el, NavigableString) and not isinstance(el, Comment) and el.parent.name not in ("script", "style"):
            buf.append(str(el))
    parts.append("".join(buf))
    return [c for c in (clean(p) for p in parts) if c]


def norm_src(src: str) -> str:
    src = src.strip()
    if src.startswith("//"):
        src = "https:" + src
    return src


def local_files(slug: str) -> dict[str, str]:
    """Mapeia nome do arquivo remoto -> arquivo baixado (o script prefixa NN_)."""
    folder = os.path.join(PRODUCTS, slug)
    out = {}
    for name in os.listdir(folder):
        if name == "pagina.html":
            continue
        out[re.sub(r"^(\d{2}|ext)_", "", name)] = os.path.join(folder, name)
    return out


def table_rows(table: Tag) -> list[list[dict]]:
    rows = []
    for tr in table.find_all("tr"):
        cells = []
        for td in tr.find_all(["td", "th"], recursive=False):
            text = " ".join(lines_of(td))
            span = int(td.get("colspan", 1) or 1)
            cell = {"text": text}
            if span > 1:
                cell["span"] = span
            cells.append(cell)
        if any(c["text"] for c in cells):
            rows.append(cells)
    return rows


def walk(node: Tag, blocks: list, ctx: dict):
    for child in node.children:
        if isinstance(child, Comment):
            continue
        if isinstance(child, NavigableString):
            text = clean(str(child))
            if text:
                blocks.append({"type": "p", "lines": [text]})
            continue
        if not isinstance(child, Tag) or child.name in ("script", "style", "h5", "svg"):
            continue
        if child.name == "table":
            rows = table_rows(child)
            if rows:
                blocks.append({"type": "table", "rows": rows})
            continue
        if child.name == "img":
            add_image(child, blocks, ctx)
            continue
        if child.name in ("ul", "ol"):
            items = [" ".join(lines_of(li)) for li in child.find_all("li")]
            items = [i for i in items if i]
            if items:
                blocks.append({"type": "list", "items": items})
            continue
        if child.find(["table", "ul", "ol"]) or child.name == "div":
            walk(child, blocks, ctx)
            continue
        # parágrafo (p, span, h*): imagens dentro viram blocos próprios, na ordem
        for img in child.find_all("img"):
            add_image(img, blocks, ctx)
            img.decompose()
        lines = lines_of(child)
        if lines:
            blocks.append({"type": "p", "lines": lines})


def add_image(img: Tag, blocks: list, ctx: dict):
    src = norm_src(img.get("src") or img.get("data-src") or "")
    if not src or src.startswith("data:") or any(h in src for h in SKIP_HOSTS):
        return
    name = os.path.basename(src.split("?")[0])
    local = ctx["files"].get(name)
    if local:
        ctx["n"] += 1
        out_name = f"desenho-{ctx['n']:02d}.webp"
        dest_dir = os.path.join(PUB, ctx["slug"])
        os.makedirs(dest_dir, exist_ok=True)
        im = Image.open(local)
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        if im.width > 1400:
            im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
        im.save(os.path.join(dest_dir, out_name), quality=88, method=6)
        blocks.append({"type": "img", "src": f"/products/{ctx['slug']}/{out_name}", "w": im.width, "h": im.height})
    else:
        # não veio no pacote (nem em baixar-imagens-externas.ps1): fica fora da página e vai para a lista
        ctx["external"].append((ctx["slug"], src))


def breadcrumb(soup: BeautifulSoup) -> list[str]:
    crumbs = [clean(a.get_text()) for a in soup.select("[class*=breadcrumb] a")]
    return [c for c in crumbs if c and c.lower() not in ("início", "inicio", "produtos")]


def main():
    details, external = {}, []
    for slug in sorted(os.listdir(PRODUCTS)):
        page = os.path.join(PRODUCTS, slug, "pagina.html")
        if not os.path.exists(page):
            continue
        soup = BeautifulSoup(open(page, encoding="utf-8").read(), "html.parser")
        desc = soup.select_one('[data-store^="product-description"]')
        crumbs = breadcrumb(soup)
        blocks: list = []
        if desc:
            ctx = {"slug": slug, "files": local_files(slug), "n": 0, "external": external}
            walk(desc, blocks, ctx)
        # remove "Descrição" solto e linhas vazias
        blocks = [b for b in blocks if not (b["type"] == "p" and b["lines"] == ["Descrição"])]
        sku_el = soup.select_one(".js-product-sku, [data-store*=sku]")
        details[slug] = {
            # trilha do site atual: [categoria, subfamília?, ...]; o último item costuma ser o próprio produto
            "breadcrumb": crumbs,
            "sku": clean(sku_el.get_text()) if sku_el else None,
            "blocks": blocks,
        }
    header = (
        "// Gerado por tools/build-product-details.py a partir das páginas do site atual da LSQ (lsq-coupling.com.br), 2026-10-07.\n"
        "// Texto preservado como está na origem; revisar com o cliente antes de corrigir termos técnicos.\n"
        'import type { ProductDetails } from "./product-details";\n\n'
        "export const productDetailsData: Record<string, ProductDetails> = "
    )
    with open(OUT_TS, "w", encoding="utf-8") as fh:
        fh.write(header + json.dumps(details, ensure_ascii=False, indent=1) + ";\n")
    # mapa pequeno slug -> subfamília, usado no catálogo (vai para o navegador; a descrição completa não)
    subs = {slug: d["breadcrumb"][1] for slug, d in details.items() if len(d["breadcrumb"]) > 1}
    with open(OUT_SUB, "w", encoding="utf-8") as fh:
        fh.write("// Gerado por tools/build-product-details.py — subfamília de cada produto no site atual da LSQ.\n"
                 "export const productSubfamilies: Record<string, string> = " + json.dumps(subs, ensure_ascii=False, indent=1) + ";\n")
    with open(EXTERNAL_LIST, "w", encoding="utf-8") as fh:
        fh.write("\n".join(f"{s}|{u}" for s, u in external) + "\n")
    blocks_total = sum(len(d["blocks"]) for d in details.values())
    print(f"{len(details)} produtos, {blocks_total} blocos, {len(external)} imagens não encontradas")


main()
