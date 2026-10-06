# Skill Policy — LSQ Beta

## Estrutura

### `.agents/skills/`
Skills curadas e autorizadas para uso no escopo atual.

### `.agents/library/source-skills/`
Importação **integral e imutável** do `Skills.zip` fornecido pelo responsável. Serve como biblioteca de origem e auditoria. A presença de uma skill aqui **não significa autorização de uso**.

## Política obrigatória

- `RULES.md` tem precedência sobre qualquer skill.
- Skill não substitui a fonte de verdade do projeto.
- Não instalar dependência só porque uma skill a menciona.
- Não executar scripts de uma skill arquivada sem aprovação humana.
- Skills de backend, auth, banco, Three.js, scroll-cinema e scaffolding fullstack estão bloqueadas para esta beta.
- Skills de motion só entram depois da fundação estática aprovada.
- Skills de segurança/revisão entram antes do fechamento de gate.
- `skill-scanner` deve ser usado antes de promover nova skill da biblioteca para o conjunto ativo.
- Se uma skill contradizer a arquitetura atual, ignore a parte conflitante e registre a decisão; não “adapte o projeto” para satisfazer a skill.

## Ativas agora

- brainstorming
- writing-plans
- frontend-design
- web-design-guidelines
- shadcn
- vercel-react-best-practices
- vercel-composition-patterns
- animation-vocabulary
- find-animation-opportunities
- animate
- gsap-core
- gsap-performance
- gsap-scrolltrigger
- gsap-timeline
- review-animations
- improve-animations
- test-driven-development
- systematic-debugging
- requesting-code-review
- security-review
- verification-before-completion
- skill-scanner

## Disponíveis na biblioteca, mas bloqueadas nesta fase

Inclui, sem se limitar a:
- better-auth-best-practices;
- two-factor-authentication-best-practices;
- prisma-client-api;
- supabase-postgres-best-practices;
- threejs-*;
- scroll-cinema;
- skills numeradas de scaffolding fullstack/NestJS.

## Condicionais

`apple-design`, `emil-design-eng`, `organization-best-practices`, `karpathy-guidelines`, `webapp-testing`, `gsap-plugins` e `gsap-utils` podem ser avaliadas e promovidas quando trouxerem ganho claro sem mudar escopo. Promoção requer registro em `DECISION_LOG.md`.
