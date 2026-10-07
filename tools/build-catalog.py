"""Gera public/products/<slug>/NN.webp, public/media/*.webp e src/content/products.data.ts
a partir do pacote fotos-lsq (site atual da LSQ + imagens de direção de arte enviadas pelo responsável).
Uso: python3 -I build_catalog.py <pasta fotos-lsq> <apps/web>
"""
import csv, json, os, re, shutil, sys, unicodedata
from PIL import Image

SRC, WEB = sys.argv[1], sys.argv[2]
PUB_PRODUCTS = os.path.join(WEB, "public", "products")
PUB_MEDIA = os.path.join(WEB, "public", "media")
OUT_TS = os.path.join(WEB, "src", "content", "products.data.ts")
MAX_PHOTOS = 4

NOT_CODES = {
    "engate", "gás", "gas", "junta", "tampa", "protetor", "encaixe", "válvula", "valvula",
    "acelerador", "fechadura", "conector", "plugue", "mangueira", "adaptador", "acoplamento",
}
KEEP_UPPER = {"ISO", "SS", "SS304", "SS316", "NPT", "BSP", "PT", "BSPP", "JIC", "ORFS"}


def code_of(name: str):
    tok = name.split()[0]
    if tok.lower().strip(",.") in NOT_CODES or len(tok) > 14:
        return None
    if not re.search(r"[A-Z]", tok):
        return None
    parts = name.split()
    if len(parts) > 1 and re.fullmatch(r"\d{1,2}", parts[1]):
        return f"{tok.upper()} {parts[1]}"
    return tok.upper()


def tidy(text: str) -> str:
    """Caixa de frase, preservando códigos (tokens com dígitos/maiúsculas técnicas)."""
    out = []
    words = text.split()
    for i, w in enumerate(words):
        core = w.strip("(),.")
        prev = words[i - 1].lower() if i else ""
        if prev in ("série", "serie") and core.lower() not in ("da", "de", "do", "e", "integrada") and (re.search(r"[\d\-]", core) or len(core) <= 4):
            out.append(w.upper())
        elif re.search(r"\d", core) or core.upper() in KEEP_UPPER or re.fullmatch(r"[A-Z]{2,}(-[A-Z0-9]+)+", core):
            out.append(w.upper() if core.upper() in KEEP_UPPER or re.search(r"\d", core) else w)
        else:
            out.append(w.lower())
    s = " ".join(out)
    return s[:1].upper() + s[1:]


def category_of(name: str) -> str:
    n = unicodedata.normalize("NFKD", name.lower()).encode("ascii", "ignore").decode()
    if "refrigera" in n or n.startswith("gas "):
        return "refrigeracao"
    if "acelerador" in n:
        return "aceleradores"
    if "fechadura" in n:
        return "fechaduras"
    if "encaixe de tubo" in n:
        return "encaixes"
    if any(k in n for k in ("tampa", "protetor", "junta", "manometro")):
        return "acessorios"
    if "engate" in n or "acoplamento" in n:
        if "hidraul" in n:
            return "hidraulicos"
        if "pneumat" in n:
            return "pneumaticos"
        return "hidraulicos"
    if "valvula" in n:
        return "valvulas"
    return "acessorios"


def save_webp(src, dst, max_w=None, q=82):
    im = Image.open(src).convert("RGB")
    if max_w and im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=q, method=6)
    return im.size


rows = list(csv.DictReader(open(os.path.join(SRC, "produtos.csv"), encoding="utf-8-sig")))
os.makedirs(PUB_PRODUCTS, exist_ok=True)
products = []
for r in rows:
    slug = r["slug"].strip()
    folder = os.path.join(SRC, slug)
    if not os.path.isdir(folder):
        continue
    files = sorted(f for f in os.listdir(folder) if f.lower().endswith((".webp", ".jpg", ".jpeg", ".png")))[:MAX_PHOTOS]
    if not files:
        continue
    dst = os.path.join(PUB_PRODUCTS, slug)
    os.makedirs(dst, exist_ok=True)
    images, size = [], None
    for i, f in enumerate(files, 1):
        out = os.path.join(dst, f"{i:02d}.webp")
        wh = save_webp(os.path.join(folder, f), out, max_w=1024)
        size = size or wh
        images.append(f"/products/{slug}/{i:02d}.webp")
    raw = " ".join(r["nome"].split())
    code = code_of(raw)
    rest = raw[len(code):].strip(" -–") if code and raw.upper().startswith(code) else raw
    iso = re.search(r"ISO\s?\d{4,5}(-[A-Z])?", raw.upper())
    products.append({
        "slug": slug,
        "code": code,
        "name": tidy(rest) if rest else raw,
        "sourceName": raw,
        "category": category_of(raw),
        "images": images,
        "iso": iso.group(0).replace("ISO", "ISO ").replace("  ", " ") if iso else None,
        "sourceUrl": r["url"].strip(),
    })

# imagens de direção de arte (raiz do pacote)
os.makedirs(PUB_MEDIA, exist_ok=True)
art = {
    "2.": "hero", "3.": "categoria-hidraulicos", "4.": "categoria-valvulas", "5.": "categoria-componentes",
    "8.": "macro-produto", "9.": "fabrica-exterior", "10.": "fabrica-interior", "11.": "controle-qualidade",
    "12.": "estoque", "14.": "contato",
}
media = {}
for f in os.listdir(SRC):
    p = os.path.join(SRC, f)
    if not os.path.isfile(p) or f.endswith(".csv"):
        continue
    key = next((v for k, v in art.items() if f.startswith(k + " ") or f.startswith(k)), None)
    if key and key not in media:
        media[key] = save_webp(p, os.path.join(PUB_MEDIA, key + ".webp"), max_w=1600, q=80)

order = ["hidraulicos", "pneumaticos", "refrigeracao", "valvulas", "aceleradores", "fechaduras", "encaixes", "acessorios"]
products.sort(key=lambda p: (order.index(p["category"]), (p["code"] or "~"), p["name"]))

with open(OUT_TS, "w", encoding="utf-8") as fh:
    fh.write("// Gerado a partir do site atual da LSQ (lsq-coupling.com.br) em 2026-10-06.\n")
    fh.write("// Nomes preservados do site atual; `category` foi inferida pelo nome e deve ser revisada.\n")
    fh.write("import type { ProductRecord } from \"./catalog\";\n\n")
    fh.write("export const productRecords: readonly ProductRecord[] = ")
    fh.write(json.dumps(products, ensure_ascii=False, indent=2))
    fh.write(";\n")

from collections import Counter
print("produtos:", len(products), Counter(p["category"] for p in products))
print("sem código:", [p["sourceName"] for p in products if not p["code"]])
print("media:", media)
for p in products[::9]:
    print(f'{p["code"]!s:12} | {p["name"]:60} | {p["category"]} | {p["iso"]}')
