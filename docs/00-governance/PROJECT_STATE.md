# Project State

## Estado atual — beta comercial pronta para revisão do cliente

- Rotas públicas: `/`, `/produtos`, `/produtos/[slug]`, `/empresa`, `/fabrica` e `/contato`.
- `/design-preview` permanece uma rota interna e não aparece na navegação pública.
- Catálogo local tipado possui busca, filtro por família, estado vazio e páginas estáticas por série.
- O contato usa telefone clicável e WhatsApp oficial pré-preenchido; nenhum lead é persistido.
- A experiência 360 segue preservada como link externo seguro.
- A UI pública foi refinada conforme o visual target aprovado: superfícies escuras, produto protagonista, grids técnicos, painéis claros para informação e CTA vermelho usado com precisão.

## Atualização 2026-10-06 — redesign rumo ao mockup

- Home, catálogo, produto, empresa, fábrica e contato reconstruídos no visual do mockup (superfícies escuras, fotografia em tela cheia, CTA vermelho/WhatsApp).
- Catálogo com os 127 produtos do site atual em 8 famílias, busca sem acento, filtros com contagem, ordenação e "mostrar mais".
- Página de produto com galeria (até 4 fotos), abas acessíveis e produtos da mesma família.
- Imagens de ambientação marcadas como ilustrativas; ver `docs/FOTOS.md`.
- Hero da Home: a peça se monta conforme a rolagem (121 quadros do vídeo do hero, canvas, carga progressiva, enquadramento próprio para celular).
- Pendências: revisão de nomenclatura e família dos 127 produtos pelo cliente; fotos reais da fábrica; e-mail comercial (não exibido por falta de confirmação).

## Atualização 2026-10-07 — ajustes pedidos pelo cliente

- Tema claro alinhado à matriz: fundo branco-gelo azulado, superfícies brancas, grafite e vermelho LSQ; nenhum fundo preto (D-021).
- Hero: texto à esquerda e a animação da montagem num palco emoldurado à direita (em cima no celular).
- Categorias revisadas contra o site atual da LSQ; 23 produtos mudaram de família (D-022, `docs/CATEGORIAS.md`).
- Famílias da Home com fotos reais de produto; imagens geradas restantes só em fábrica/empresa, com legenda "Imagem ilustrativa" (D-023).
- LSquinho aparece aos poucos em 7 pontos do site (D-024).
- Menu igual ao site atual: Produção (fotos reais + tour 360°), Certificados (16, títulos traduzidos), Calculadora de pressão (D-026, D-027).
- Página de produto com a descrição técnica real dos 127 produtos e a subfamília do site atual; catálogo filtra por subfamília (D-025).
- Contato com endereço, 2º telefone, e-mail, horário, razão social e CNPJ.
- Pendente do cliente: fotos de produção em resolução maior, logo oficial LSQ Brasil (`content/site.ts` → `brand.logo`), fotos/vídeo do engate real para refazer a animação do hero, validação das 5 pendências de categoria.

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
