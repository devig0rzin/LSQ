# Revisão de categorias do catálogo — 2026-10-07

Fonte: as listagens de categoria do site atual (lsq-coupling.com.br), consultadas em 07/10/2026.
Os dados ficam em `apps/web/src/content/products.data.ts` (campo `category`).

## Resultado

| Família no site novo | Produtos | Observação |
|---|---|---|
| Engates rápidos hidráulicos | 54 | inclui LSQ-CV (válvula de retenção) e LSQ-HDB, que o site atual lista dentro de hidráulicos |
| Engates rápidos pneumáticos | 33 | igual ao site atual (33) |
| Engates de refrigeração | 7 | o site atual também lista KZD e KZD 2 aqui (ver pendências) |
| Válvulas de alta pressão | 2 | KHB e KHB3K, como no site atual |
| Aceleradores hidráulicos | 2 | igual |
| Fechaduras hidráulicas | 2 | igual |
| Encaixes de tubo pneumáticos | 10 | os 8 do site atual + JSM e junta de manômetro (sem categoria no site atual) |
| Plugues, tampas e protetores | 17 | ver pendências |

## Produtos que mudaram de família

- **Para Engates pneumáticos:** LSQ-Q1, LSQ-Q2, LSQ-Q3, LSQ-K (engates para molde), LSQ-A, LSQ-AA, LSQ-AB, LSQ-DG, LAO, LAM e LSQ-CC20 — estavam em hidráulicos.
- **Para Refrigeração:** LSQ-PCVB1/2/3 (estava em hidráulicos), LSQ-NZK1/2/3 (estava em acessórios), Série da válvula de enchimento rápido (estava em válvulas).
- **Para Encaixes de tubo:** juntas KH, JWR, JZH, KNL e JTS (estavam em acessórios); JSM e junta de manômetro (sugestão — sem categoria no site atual).
- **Para Fechaduras:** VBPDE (estava em acessórios).
- **Para Hidráulicos:** LSQ-CV e LSQ-HDB (estavam em válvulas).
- **Para Plugues, tampas e protetores:** plugue metálico da série LSQ-S1 (estava em hidráulicos).

## Pendências para o cliente validar

1. **KZD e KZD 2** aparecem em hidráulicos *e* em refrigeração no site atual. No site novo cada produto tem uma família; mantivemos em hidráulicos.
2. **LSQ-CC20** se chama "engate rápido hidráulico", mas o site atual lista em pneumáticos. Seguimos o site atual.
3. **Tampas, plugues e protetores**: no site atual ficam dentro de hidráulicos e a categoria "Acessórios" está vazia. No site novo ficaram juntos numa família própria para não misturar 17 tampas com os engates. Se preferir, voltam para hidráulicos.
4. **JSM** e **junta de manômetro** não têm categoria no site atual; foram para encaixes de tubo pelo tipo de peça.
5. Nomes com erro de digitação no site atual foram mantidos como estão (ex.: "VBPDE echadura", "SIGLEHANDED", "SEMIAUTIMÁTICO"). Corrigir só com aprovação.
6. **Tabelas de medidas** vieram com erros de tradução automática do site atual, mantidos como estão: a coluna "eu" (provavelmente "L", 56 ocorrências) e roscas como "Sol3/4" (provavelmente "G3/4", 48 ocorrências), em 59 produtos. Com o aval do cliente, a correção é automática em `tools/build-product-details.py`.

## Conferência pela trilha de navegação (2026-10-07)

As páginas de produto baixadas do site atual confirmam a família de 118 produtos. As diferenças restantes são só as já listadas:
tampas/plugues/protetores (no site atual ficam em hidráulicos › "Plugues para Engates Rápidos") e 9 produtos sem categoria na origem.
A subfamília de cada produto (ex.: "Engates ISO 7241-A") vem dessa trilha e aparece no catálogo e na página do produto.
