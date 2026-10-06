# LSQ XH — Design Foundation

## Goal

Definir e demonstrar uma linguagem visual específica para a LSQ XH antes da Home, com tokens, shell e primitives suficientes para orientar os gates seguintes.

## User problem

O visitante precisa reconhecer rapidamente uma empresa industrial confiável e encontrar caminhos claros para produtos e contato. A fundação não pode herdar a aparência de marketplace do site atual nem recorrer a clichês de site “tech”.

## Business purpose

Criar uma base visual apresentável ao cliente, capaz de sustentar catálogo técnico e conversão comercial sem retrabalho estrutural.

## Inputs / evidence

- Direção “industrial premium, técnica, objetiva e humana” dos documentos de design.
- Marca vermelha LSQ e referências visuais de metal usinado/conexões.
- Preferência do cliente pela clareza corporativa da Dynamics e pela densidade técnica de Faster/Metro Hydraulic.
- Assets brutos de logo e LSquinho; o logo será usado com respiro e o mascote não será protagonista neste gate.

## Requirements

- Paleta funcional de 6 cores-base, com papéis semânticos derivados.
- Escala tipográfica completa, legível em português e adequada a nomes técnicos longos.
- Grid, container, espaçamento, raios, bordas, foco e motion tokens.
- Buttons, links, inputs, header, footer e product-card concept.
- `/design-preview` polido e claramente identificado como revisão interna do Gate A.
- Três composições rápidas de hero documentadas; uma escolhida para orientar o Gate B, sem implementar a Home.

## Visual direction

### Chosen direction — Catálogo de engenharia

Uma composição editorial assimétrica inspirada em desenho técnico: linhas estruturais, blocos de informação alinhados ao grid, produto tratado em escala e vermelho usado como marca de decisão. O elemento memorável é uma “régua técnica” vertical/vermelha que ancora seções importantes; o restante permanece branco, grafite e disciplinado.

### Alternatives considered

1. **Corporativo institucional:** seguro e luminoso, porém próximo demais de templates B2B genéricos.
2. **Dark industrial:** forte para produto metálico, porém pesado para leitura extensa e arriscado para a credibilidade humana desejada.
3. **Catálogo de engenharia (escolhido):** equilibra autoridade, clareza técnica e singularidade LSQ sem simular luxo ou tecnologia abstrata.

### Uniqueness review

A primeira ideia usava muitos labels em caixa alta, cards de cantos iguais e setas em todos os links — padrões genéricos identificados pela skill de design. A versão final substitui isso por sentence case, superfícies majoritariamente quadradas, hierarquia por linhas funcionais e CTAs com verbos específicos. O vermelho não vira glow nem gradiente; funciona como sinalização industrial.

## Palette

- `signal-red` `#E31B23`: assinatura LSQ e ação primária.
- `signal-red-strong` `#B5121B`: hover/active e texto de erro quando aplicável.
- `graphite` `#17191C`: texto principal e superfícies de alta autoridade.
- `steel` `#5F6872`: metadados e texto secundário.
- `line` `#D7DCE0`: bordas e divisores técnicos.
- `technical-white` `#F7F8F8`: fundo geral, contrastado por branco puro em superfícies.

Estados positivos/alerta serão adicionados apenas quando um fluxo real os exigir; o Gate A não inventa uma paleta decorativa.

## Typography

- Família: **IBM Plex Sans Variable**, hospedada localmente pelo pacote Fontsource.
- Display/H1: largura visual firme, peso 600, tracking levemente negativo, sem tamanho monumental.
- H2/H3: peso 600, hierarquia por tamanho e espaço, não por labels decorativos.
- Body/navigation/buttons: peso 400–600 e largura de leitura limitada a 72 caracteres.
- Technical metadata: mesma família, `font-variant-numeric: tabular-nums`; sem monospace ornamental.

## Layout

- Container máximo: `80rem` (1280 px).
- Gutter: `clamp(1rem, 3vw, 2.5rem)`.
- Grid: 4 / 6 / 12 colunas conforme viewport.
- Alinhamento: predominantemente à esquerda; centralização somente para estados que realmente pedem foco isolado.
- Espaçamento-base: 4 px com escala `4, 8, 12, 16, 24, 32, 48, 64, 96`.

## Hero composition studies

### A — Produto dominante

```text
┌────────────────────────────────────────────────────────────┐
│ NAV                                                        │
├───────────────┬───────────────────────────┬────────────────┤
│ marca/linha   │ mensagem + dois CTAs      │ produto grande │
│ técnica       │ prova curta e factual     │ em fundo aço   │
└───────────────┴───────────────────────────┴────────────────┘
```

Vantagem: comunica imediatamente a categoria industrial. Risco: depende de fotografia oficial de alta qualidade ainda ausente.

### B — Índice de catálogo

```text
┌────────────────────────────────────────────────────────────┐
│ NAV                                                        │
├──────────────────────────────────┬─────────────────────────┤
│ mensagem concreta                │ famílias / índice       │
│ CTA catálogo + especialista      │ com linhas e metadados  │
└──────────────────────────────────┴─────────────────────────┘
```

Vantagem: catálogo vira protagonista sem depender de fotografia. Risco: pode parecer excessivamente informacional na primeira dobra.

### C — Brasil ↔ fábrica

```text
┌────────────────────────────────────────────────────────────┐
│ NAV                                                        │
├─────────────────────┬──────────────────────────────────────┤
│ mensagem + CTA      │ composição fábrica / conexão global │
│ catálogo abaixo     │ acesso contextual ao 360            │
└─────────────────────┴──────────────────────────────────────┘
```

Vantagem: diferencia a história da empresa. Risco: requer ativos e fatos institucionais ainda não confirmados.

**Recomendação para Gate B:** iniciar por B e evoluir para A quando houver fotografia oficial. Ela demonstra a função comercial prioritária sem criar prova visual falsa.

## Components

- `SiteHeader`: logo, navegação principal e CTA de especialista conceitual.
- `SiteFooter`: arquitetura futura e aviso discreto de beta no preview.
- `Container` e `Section`: ritmo e largura compartilhados.
- `ButtonLink`: variantes primary, secondary e quiet, sem proliferação booleana.
- `Field`: label, hint e estados visuais demonstrativos.
- `ProductCardConcept`: imagem/placeholder, família, nome, código opcional, status de validação e link.
- `TokenSwatch`, `TypeSpecimen` e `SpacingSpecimen`: exclusivas do preview.

## States

- Header desktop e navegação mobile por disclosure nativo.
- Buttons: default, hover, active, focus-visible e disabled.
- Fields: default, focus, disabled e invalid demonstrativo.
- Product concept: com e sem metadados opcionais; ausência não deixa espaço vazio.

## Responsive behavior

- Desktop: grid assimétrico de 12 colunas e navegação horizontal.
- Tablet: 6 colunas e redução de densidade.
- Mobile: 4 colunas, menu disclosure, elementos empilhados e tabelas/specimens com overflow controlado.
- Nomes técnicos longos quebram sem invadir CTAs ou metadados.

## Accessibility requirements

- Skip link, landmarks, headings lógicos e navegações nomeadas.
- `summary` com alvo mínimo de 44 px e estado identificável.
- Contraste AA verificado para combinações principais.
- Inputs com labels, nomes e atributos coerentes; exemplos não substituem labels.
- Foco de 3 px em vermelho escuro com offset claro.
- Imagens com dimensões fixas e alt contextual.

## Motion behavior

- Somente transições de `color`, `background-color`, `border-color`, `opacity` e `transform` entre 120–200 ms.
- Nenhum `transition: all`.
- `prefers-reduced-motion: reduce` remove transições não essenciais.

## Data requirements

O preview usa um único conceito de produto oriundo do site atual, rotulado como “conteúdo em validação”. Nenhuma especificação, aplicação, preço, estoque ou certificação aparece como fato confirmado.

## Technical approach

- Tokens em CSS custom properties consumidos por Tailwind v4.
- React Server Components por padrão; disclosure mobile nativo evita JavaScript de navegação neste gate.
- Tipografia local via `@fontsource-variable/ibm-plex-sans` para evitar dependência de rede em runtime/build.
- Sem shadcn: os primitives necessários são simples e não justificam instalar um kit neste gate.

## Acceptance criteria

- `/design-preview` mostra paleta, tipo, grid, controles, shell e card conceitual.
- A rota é utilizável entre 320 px e desktop amplo sem scroll horizontal acidental.
- Estados de teclado são visíveis e labels estão presentes.
- O preview parece uma fundação LSQ, não uma Home disfarçada nem um template genérico.
- Logo mantém proporção; LSquinho permanece preservado e fora do protagonismo.

## Validation checklist

- [ ] Revisar 320, 390, 768, 1024 e 1440 px.
- [ ] Percorrer controles e links por teclado.
- [ ] Confirmar ausência de erros no console.
- [ ] Validar comportamento com metadados opcionais ausentes.
- [ ] Rodar lint, typecheck, testes aplicáveis e build.
- [ ] Auditar arquivos de UI pelas Web Interface Guidelines.

## Open questions

- Aprovação do uso de IBM Plex Sans como família principal.
- Aprovação da direção “catálogo de engenharia” e da composição B para o Gate B.
- Substituição futura do logo raster por arquivo vetorial oficial.

