# Project State

## Estado atual — beta comercial pronta para revisão do cliente

- Rotas públicas: `/`, `/produtos`, `/produtos/[slug]`, `/empresa`, `/fabrica` e `/contato`.
- `/design-preview` permanece uma rota interna e não aparece na navegação pública.
- Catálogo local tipado possui busca, filtro por família, estado vazio e páginas estáticas por série.
- O contato usa telefone clicável e WhatsApp oficial pré-preenchido; nenhum lead é persistido.
- A experiência 360 segue preservada como link externo seguro.
- A UI pública foi refinada conforme o visual target aprovado: superfícies escuras, produto protagonista, grids técnicos, painéis claros para informação e CTA vermelho usado com precisão.

## Conteúdo confirmado em uso

- séries LSQ e referências ISO presentes no catálogo público atual;
- famílias de produto presentes no site atual da LSQ;
- WhatsApp/telefone `+55 11 99828-7440`;
- URL pública de fábrica 360 documentada em `docs/ASSET_PROVENANCE.md`.

## Limites reais

- sem backend, CRM, auth, pagamentos, estoque, preços ou analytics;
- sem especificações além dos dados confirmados no dataset;
- a imagem binária da referência visual ainda deve ser colocada em `docs/03-design/references/LSQ_TARGET_UI_REFERENCE.png`; a regra e o caminho canônico já foram registrados.

## Verificações atuais

- lint, typecheck, Vitest e build de produção aprovados;
- rotas desktop revisadas sem overflow horizontal;
- Home, catálogo e produto revisados em larguras mobile solicitadas sem overflow;
- estado vazio do catálogo e console revisados em Chrome, sem warnings/errors.

Status atual: **LSQ CLIENT-DEMO READY**
