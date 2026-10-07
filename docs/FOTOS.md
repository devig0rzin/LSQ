# Como trocar as fotos do site

## Fotos de produto
Ficam em `apps/web/public/products/<slug-do-produto>/01.webp … 04.webp`.
A `01` é a foto principal (cards e topo da página do produto).
Para trocar, substitua o arquivo mantendo o nome. Formato recomendado: WebP ou JPG, 1024×820 px (proporção 5:4), fundo claro uniforme.

Para regenerar tudo a partir de um novo pacote `fotos-lsq` (script `baixar-fotos-lsq.ps1`):

    python3 tools/build-catalog.py <pasta fotos-lsq> apps/web

## Imagens de ambientação (hero, famílias, fábrica)
Ficam em `apps/web/public/media/`. Todas estão marcadas como **ilustrativas** em
`apps/web/src/content/site.ts` (`illustrative: true`), e o site mostra a legenda "Imagem ilustrativa".

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| hero.webp | Topo da Home | 2400×1350, produto à direita, fundo escuro |
| categoria-hidraulicos.webp, categoria-componentes.webp, categoria-valvulas.webp, macro-produto.webp | Cards de família (Home) e aba "Visão geral" do produto | 1200×1000 |
| fabrica-exterior.webp | Home (faixa da fábrica), Empresa, Fábrica | 2400×1350 |
| fabrica-interior.webp, controle-qualidade.webp, estoque.webp | Empresa e Fábrica | 2000×1250 |
| contato.webp | Faixa "Precisa localizar uma série?" e página de contato | 2000×1100, escuro |

**Antes de publicar para o cliente final:** troque as imagens de fábrica, qualidade e estoque por fotos reais
(ou prints do tour 360°) e mude `illustrative` para `false` no `site.ts`.
