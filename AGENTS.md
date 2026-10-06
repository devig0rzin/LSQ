# AGENTS.md — LSQ XH Proposal Beta

## Bootstrap obrigatório

Antes de qualquer alteração, leia nesta ordem:
1. `RULES.md`;
2. `README.md`;
3. `docs/00-governance/PROJECT_STATE.md`;
4. os documentos relevantes da tarefa atual;
5. `.agents/SKILL_POLICY.md`.

`RULES.md` é obrigatório e se aplica a qualquer agente/subagente. Não comece código sem carregá-lo.

## Missão

Construir uma beta comercial extremamente profissional para a LSQ XH, orientada a confiança, catálogo técnico e conversão para contato. O resultado deve parecer trabalho de uma equipe de produto/design especializada em indústria — não um template, não um e-commerce genérico e não uma página com estética “AI-generated”.

## Fonte de verdade

Informações do cliente têm prioridade sobre inferências. Nunca invente fatos técnicos, comerciais ou institucionais. Quando faltar informação, omita, modele o campo para uso futuro ou marque claramente como demonstração interna.

## Escopo técnico da beta

**Implementar agora:** Next.js + TypeScript + Tailwind, componentes acessíveis, conteúdo local tipado, catálogo demonstrável, páginas definidas no escopo, lead capture demonstrável e integração por link para WhatsApp/telefone quando os dados forem confirmados.

**Não implementar agora:** backend separado, NestJS, Supabase/Postgres, Prisma, auth real, pagamentos, carrinho, frete, checkout, painel admin, CRM próprio, integrações de produção, Three.js ou scroll-cinema.

A arquitetura deve permitir evolução futura, mas não carregar essa complexidade na beta.

## Processo obrigatório

1. Ler `RULES.md` e os documentos da fase.
2. Antes de código de uma fase, escrever plano curto e critérios de aceite.
3. Usar conteúdo real fornecido sempre que disponível.
4. Criar experiência estática/responsiva antes de motion avançado.
5. Mobile faz parte da mesma feature, não é etapa posterior.
6. Rodar lint, typecheck, testes aplicáveis e build antes de declarar fase concluída.
7. Verificar console, links e rotas críticas.
8. Registrar decisões relevantes em `docs/00-governance/DECISION_LOG.md`.
9. Atualizar `docs/00-governance/PROJECT_STATE.md` ao final de cada gate.
10. Respeitar os checkpoints; não adiantar o gate seguinte.

## Skills

- `.agents/skills/` contém o conjunto ativo/autorizado.
- `.agents/library/source-skills/` contém a importação integral do pacote original e é somente biblioteca/quarentena.
- Nunca execute uma skill da biblioteca sem aprovação humana e promoção explícita para o conjunto ativo.
- Skill não supera `RULES.md` nem expande escopo.

### Skills ativas por finalidade

- descoberta/planejamento: `brainstorming`, `writing-plans`;
- direção visual: `frontend-design`, `web-design-guidelines`;
- organização/código: `vercel-react-best-practices`, `vercel-composition-patterns`;
- componentes: `shadcn`;
- motion depois da aprovação estática: `animation-vocabulary`, `find-animation-opportunities`, `animate`, `gsap-*`, `review-animations`, `improve-animations`;
- implementação testável: `test-driven-development`;
- troubleshooting: `systematic-debugging`;
- revisão: `requesting-code-review`, `security-review`;
- fechamento: `verification-before-completion`.

## Checkpoints humanos

Parar e pedir revisão ao final de:
- Gate A: fundação visual + shell + preview;
- Gate B: Home final;
- Gate C: catálogo + produto;
- Gate D: demais páginas/lead flow;
- Gate E: demo final.

## Regra de segurança operacional

Não apagar evidências, assets brutos ou documentação. Não rodar comandos destrutivos, não reescrever histórico e não enviar mudanças para remoto sem instrução humana explícita.
