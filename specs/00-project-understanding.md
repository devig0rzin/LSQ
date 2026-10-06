# LSQ XH — Project Understanding

## Goal

Estabelecer uma beta comercial navegável que reposicione a LSQ XH como empresa industrial séria, organize o portfólio como catálogo técnico e conduza o visitante para uma conversa comercial.

## User problem

O site atual combina linguagem de e-commerce, catálogo denso e conteúdo inconsistente. Isso dificulta localizar produtos e enfraquece a confiança de compradores, engenharia, manutenção, suprimentos e distribuidores.

## Business purpose

A beta deve tornar visível a qualidade potencial do projeto final antes de construir infraestrutura de produção. O fluxo prioritário é: compreender a LSQ, confiar na empresa, descobrir uma família ou produto e falar com um especialista.

## Inputs / evidence

- `RULES.md`, `AGENTS.md` e documentação em `docs/`.
- Conversas preservadas em `evidence/client-chat/`, usadas apenas como evidência interna.
- Site atual e referências oficiais listadas em `evidence/references/LINKS.md`.
- Logo e LSquinho em `assets/brand/raw/`, ambos tratados como referências brutas.
- O site atual confirma o problema de ruído comercial: carrinho, frete, preço zerado e catálogo pouco hierarquizado.

## Requirements

- Next.js App Router, React, TypeScript estrito e Tailwind CSS.
- Uma única aplicação frontend em `apps/web`.
- Conteúdo local tipado e separado da apresentação.
- Componentes semânticos, acessíveis, responsivos e com foco visível.
- Server Components por padrão e JavaScript no cliente somente quando necessário.
- Identidade industrial própria: vermelho LSQ, grafite, aço e branco técnico.
- Conteúdo factual somente quando confirmado; material do site atual permanece marcado como `current-site` ou pendente de revisão.
- Desenvolvimento controlado pelos gates do projeto.

## Non-goals

- Backend, banco, autenticação, CRM, painel, checkout, carrinho, frete ou pagamento.
- Three.js, WebGL, scroll-cinema ou motion avançado.
- Home final, catálogo completo, produto final, empresa/fábrica ou formulário final no Gate A.
- Publicar screenshots de conversa, contatos pessoais ou fatos não confirmados.

## Information architecture

As rotas previstas são `/`, `/produtos`, `/produtos/[slug]`, `/empresa`, `/fabrica` e `/contato`. No Gate A, apenas o shell mínimo e `/design-preview` serão materializados. Links para rotas futuras devem ser apresentados como conceitos no preview, sem fingir páginas concluídas.

## Components

- Shell: skip link, header responsivo, navegação conceitual e footer.
- Primitives: container, section, button/link, field e surface.
- Preview: paleta, tipografia, espaçamento, controles, produto conceitual e composições de hero.
- Conteúdo: navegação global tipada e um conceito de produto explicitamente marcado como conteúdo em validação.

## States

- Hover, active e `focus-visible` para links e botões.
- Default, hover, focus, disabled e invalid para campos.
- Conteúdo técnico opcional não produz blocos vazios.
- Navegação mobile funcional sem exigir dependência de UI externa.

## Responsive behavior

- Gutters fluidos e container limitado em desktop amplo.
- Grid de 12 colunas em desktop, 6 em tablet e 4 em mobile.
- Navegação compacta em telas pequenas, com touch targets mínimos de 44 px.
- Tipografia e espaçamento usam `clamp()` onde isso preserva ritmo sem saltos bruscos.

## Accessibility requirements

- Landmarks semânticos, skip link, hierarquia de headings e labels reais.
- Contraste AA como alvo, foco visível e navegação por teclado.
- Imagens com dimensões e texto alternativo apropriado.
- Sem bloqueio de zoom e sem dependência exclusiva de cor.
- `prefers-reduced-motion` respeitado desde a fundação.

## Motion behavior

Gate A define somente tokens e feedbacks CSS curtos para hover/focus. Não haverá animação de entrada, scroll ou movimento decorativo antes da aprovação estática.

## Data requirements

- `SourceStatus = confirmed | current-site | matrix-derived | pending-review`.
- Campos opcionais permanecem opcionais e a UI os omite quando ausentes.
- Nenhum número técnico, claim, contato ou certificação será criado para preencher layout.

## Technical approach

Aplicação Next.js em `apps/web`, npm como gerenciador único, Tailwind v4 com tokens CSS centralizados e assets derivados copiados para `public/brand` sem alterar os brutos. A fundação evita estado global, biblioteca de animação e kit de componentes antes de existir necessidade concreta.

## Acceptance criteria

- A aplicação inicia e compila com comandos documentados.
- `/design-preview` demonstra a direção visual e os componentes do Gate A em desktop e mobile.
- O shell não contém carrinho, preço, frete ou claims não confirmados.
- A interface comunica precisão industrial sem estética genérica de template.
- Lint, typecheck, testes aplicáveis e build têm resultado registrado.

## Validation checklist

- [ ] Estrutura e runtime verificados.
- [ ] Conteúdo factual auditado.
- [ ] Preview revisado em mobile e desktop.
- [ ] Navegação por teclado e foco revisados.
- [ ] Console e rotas do gate verificados.
- [ ] Lint, typecheck, testes e build executados.

## Open questions

- Contatos comerciais oficiais para CTAs futuros.
- Arquivos vetoriais do logo e originais do mascote.
- Lista aprovada de categorias e produtos demonstrativos.
- URL/tecnologia do 360 atual.
- Claims, certificações e dados institucionais permitidos.
- Destino do lead e papel futuro de cadastro/autenticação.

