# Target Repository Structure

Após `tasks/00_BOOTSTRAP.md`, a raiz deve tender a:

```text
.
├─ .agents/
│  └─ skills/
├─ apps/
│  └─ web/
│     ├─ src/
│     │  ├─ app/
│     │  ├─ components/
│     │  │  ├─ ui/
│     │  │  ├─ layout/
│     │  │  ├─ marketing/
│     │  │  ├─ catalog/
│     │  │  └─ forms/
│     │  ├─ content/
│     │  ├─ lib/
│     │  ├─ styles/
│     │  └─ types/
│     └─ public/
│        ├─ brand/
│        ├─ products/
│        └─ media/
├─ assets/                # material bruto; nunca usado diretamente se não otimizado
├─ evidence/              # conversas/referências; não publicar
├─ docs/
├─ tasks/
├─ AGENTS.md
└─ README.md
```

## Regra
Não criar pacote compartilhado, API separada ou monorepo complexo sem necessidade concreta. `apps/web` existe para permitir crescimento futuro sem obrigar complexidade hoje.
