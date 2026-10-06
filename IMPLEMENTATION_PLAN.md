# Gate A — Bootstrap + Design Foundation Implementation Plan

> **Execução:** plano autorizado pelo Master Prompt para execução nativa nesta sessão. O trabalho termina no checkpoint do Gate A.

**Goal:** Criar a aplicação Next.js e uma fundação visual LSQ revisável em `/design-preview`, sem implementar a Home final.

**Architecture:** Uma única app em `apps/web`, com App Router, Server Components por padrão, conteúdo local tipado e tokens CSS centralizados. O shell e os primitives são pequenos, composáveis e independentes de backend ou kit de UI.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, npm, IBM Plex Sans local e Vitest/Testing Library para contratos de renderização relevantes.

**Spec:** `specs/00-project-understanding.md` e `specs/01-design-foundation.md`.

## Global Constraints

- Permanecer estritamente no Gate A.
- Não inventar fatos, especificações, contatos ou claims.
- Não implementar backend, auth, e-commerce, Three.js ou motion avançado.
- Preservar `assets/brand/raw` e `evidence`.
- Atender mobile, acessibilidade e `prefers-reduced-motion` na mesma implementação.
- Usar npm como único gerenciador após o bootstrap.

## Review Focus

- Viewport de 320 px: nenhuma navegação, amostra ou nome técnico causa overflow horizontal.
- Teclado: skip link, menu, links, inputs e botões têm ordem e foco visíveis.
- Dados incompletos: metadados opcionais ausentes não deixam rótulos ou espaços quebrados.
- Conteúdo: nenhuma informação de demonstração parece fato confirmado.
- Assets: logo mantém proporção e originais permanecem intactos.

---

### Task 1: Bootstrap técnico e contratos de qualidade

**Files:**
- Create: `package.json`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/eslint.config.mjs`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/src/test/setup.ts`
- Modify: `README.md`

**Interfaces:**
- Produces: scripts raiz `dev`, `lint`, `typecheck`, `test`, `build` delegados ao workspace `@lsq/web`.

- [x] Criar manifests/configurações com TypeScript strict, aliases `@/*` e Tailwind v4.
- [x] Instalar dependências com npm e gerar um único `package-lock.json` na raiz.
- [x] Confirmar que os scripts resolvem a aplicação.

### Task 2: Tokens, layout e assets derivados

**Files:**
- Create: `apps/web/src/app/globals.css`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/types/content.ts`
- Create: `apps/web/src/content/navigation.ts`
- Create: `apps/web/public/brand/lsq-logo-reference.png`
- Create: `apps/web/public/brand/lsquinho-mascot-reference.png`

**Interfaces:**
- Produces: `SourceStatus`, `NavigationItem`, `primaryNavigation` e tokens CSS documentados pela spec.

- [x] Copiar os assets aprovados sem alterar os arquivos brutos.
- [x] Implementar metadata, fonte local, skip link e estilos globais.
- [x] Verificar hashes dos derivados contra os originais.

### Task 3: Primitives e shell por TDD

**Files:**
- Test: `apps/web/src/components/catalog/product-card-concept.test.tsx`
- Create: `apps/web/src/components/catalog/product-card-concept.tsx`
- Create: `apps/web/src/components/ui/button-link.tsx`
- Create: `apps/web/src/components/ui/field.tsx`
- Create: `apps/web/src/components/layout/container.tsx`
- Create: `apps/web/src/components/layout/section.tsx`
- Create: `apps/web/src/components/layout/site-header.tsx`
- Create: `apps/web/src/components/layout/site-footer.tsx`

**Interfaces:**
- Produces: `ProductCardConcept({ product: ProductCardConceptData })`, que omite `code` e `technicalNote` quando ausentes.
- Consumes: tokens globais e `primaryNavigation`.

- [x] Escrever teste que falha porque `ProductCardConcept` ainda não existe e exige omissão de metadados ausentes.
- [x] Rodar o teste e confirmar a falha esperada.
- [x] Implementar o mínimo para o teste passar.
- [x] Rodar teste focal e suíte completa.
- [x] Implementar primitives apresentacionais, shell e uma interação cliente mínima para fechar o menu mobile após navegação.

### Task 4: Preview, auditoria e checkpoint

**Files:**
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/app/design-preview/page.tsx`
- Create: `apps/web/src/components/design-preview/token-swatch.tsx`
- Create: `apps/web/src/components/design-preview/type-specimen.tsx`
- Create: `apps/web/src/components/design-preview/hero-studies.tsx`
- Modify: `docs/00-governance/DECISION_LOG.md`
- Modify: `docs/00-governance/PROJECT_STATE.md`

**Interfaces:**
- Produces: `/` como landing mínima do bootstrap e `/design-preview` como revisão completa do Gate A.

- [x] Montar o preview sem transformar `/` em Home final.
- [x] Rodar lint, typecheck, testes e build; corrigir causas sem suprimir regras.
- [x] Executar revisão responsiva, teclado, console e rotas críticas em navegador.
- [x] Auditar UI pelas Web Interface Guidelines e corrigir achados do Gate A.
- [x] Registrar decisões/estado e parar antes do Gate B.

## Self-review

- Cobertura da spec: os quatro tasks cobrem runtime, tokens, shell, primitives, preview, testes e governança.
- Dependências: somente fonte local e ferramentas de teste além do stack exigido; shadcn e motion foram rejeitados por YAGNI.
- Tipos/interfaces: `SourceStatus`, `NavigationItem` e `ProductCardConceptData` têm um único dono e consumidores explícitos.
- Proporção: o plano define decisões e checks, sem transcrever implementação.

