# Como trocar as fotos do site

## Fotos de produto
Ficam em `apps/web/public/products/<slug-do-produto>/01.webp … 04.webp`.
A `01` é a foto principal (cards e topo da página do produto).
Para trocar, substitua o arquivo mantendo o nome. Formato recomendado: WebP ou JPG, 1024×820 px (proporção 5:4), fundo claro uniforme.

Para regenerar tudo a partir de um novo pacote `fotos-lsq` (script `baixar-fotos-lsq.ps1`):

    python3 tools/build-catalog.py <pasta fotos-lsq> apps/web

## Fotos das famílias (Home)
Desde 07/10/2026 os cards de família usam fotos reais de produto: a `01.webp` do produto indicado em
`categories[].cover` (`apps/web/src/content/catalog.ts`). Quando a peça fica pequena demais no quadro,
`coverImage` aponta para uma composição em `apps/web/public/families/` (recortes das fotos reais, 1000×800, fundo branco).

As imagens geradas `categoria-*.webp`, `macro-produto.webp` e `contato.webp` em `/public/media` não são mais usadas no site;
ficaram no repositório apenas como histórico.

## Logo e LSquinho
- Logo: `brand.logo` em `apps/web/src/content/site.ts`. **Ainda é o logo da matriz** — trocar pelo arquivo oficial da LSQ Brasil
  (de preferência SVG) e ajustar `width`/`height` para a proporção do arquivo.
- LSquinho: `apps/web/public/brand/lsquinho.webp` (corpo inteiro) e `lsquinho-peek.webp` (cabeça e ombros), recortados do
  arquivo bruto com fundo transparente.

## Imagens de ambientação (fábrica e empresa)
Ficam em `apps/web/public/media/`. Todas estão marcadas como **ilustrativas** em
`apps/web/src/content/site.ts` (`illustrative: true`), e o site mostra a legenda "Imagem ilustrativa".

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| fabrica-exterior.webp | Home (faixa da fábrica), Empresa, Fábrica | 2400×1350 |
| fabrica-interior.webp, controle-qualidade.webp, estoque.webp | Empresa e Fábrica | 2000×1250 |

**Antes de publicar para o cliente final:** troque as imagens de fábrica, qualidade e estoque por fotos reais
(ou prints do tour 360°) e mude `illustrative` para `false` no `site.ts`.

## Imagem do hero (Home)
Desde 07/10/2026 o hero mostra uma imagem fixa do engate montado, recortada com fundo transparente:
`apps/web/public/media/engate-hero.webp` (831×413). Para trocar, gere um PNG/WebP com fundo transparente na mesma
orientação (peça na horizontal) e substitua o arquivo, ajustando `width`/`height` em `components/home/hero-product.tsx`.
As legendas técnicas (Plugue, Sextavado, Luva serrilhada, Rosca de conexão) ficam em `CALLOUTS`, com a posição em % da imagem;
se a nova imagem tiver outro enquadramento, ajuste esses números.

A animação antiga (121 quadros do vídeo, montagem no scroll) foi guardada em `assets/hero-sequence-antiga/`, fora do site.
