# LSQ XH — Proposal Beta / Codex Starter v1

Este repositório começa **antes do código**. Ele existe para dar ao Codex uma fonte de verdade, regras de execução, escopo e checkpoints claros para construir uma beta comercial de alto nível sem transformar o protótipo em um sistema de produção prematuramente.

## Objetivo desta beta

Criar uma experiência navegável e convincente para acompanhar a proposta comercial da LSQ XH. A beta deve comunicar uma empresa industrial séria, organizada e tecnicamente competente; funcionar como catálogo; e conduzir o visitante para WhatsApp, telefone ou solicitação de contato/cotação.

## O que esta beta não é

- não é e-commerce completo;
- não é CRM completo;
- não precisa de backend dedicado;
- não precisa de autenticação real;
- não deve migrar todo o catálogo antes do fechamento;
- não deve inventar especificações, certificações, números, clientes ou claims da LSQ.

## Ordem de leitura para o Codex

1. `AGENTS.md`
2. `docs/00-governance/PROJECT_CHARTER.md`
3. `docs/01-discovery/CLIENT_SOURCE_OF_TRUTH.md`
4. `docs/02-product/BETA_SCOPE.md`
5. `docs/03-design/DESIGN_BRIEF.md`
6. `docs/04-technical/ARCHITECTURE.md`
7. `docs/05-quality/DEFINITION_OF_DONE.md`
8. `tasks/00_BOOTSTRAP.md`
9. `codex/START_HERE_PROMPT.md`

## Fases

- Gate A — bootstrap + fundação visual
- Gate B — Home
- Gate C — catálogo + produto
- Gate D — empresa + fábrica/360 + contato
- Gate E — refinamento + QA + demo

Nenhum gate posterior deve ser iniciado se o anterior estiver quebrado.

## Ordem obrigatória para qualquer agente

1. Leia `RULES.md`.
2. Leia `AGENTS.md`.
3. Leia `docs/00-governance/PROJECT_STATE.md`.
4. Leia a task/gate atual e os documentos referenciados por ela.
5. Leia `.agents/SKILL_POLICY.md`.
6. Só então planeje e altere código.

O pacote completo de skills fornecido pelo responsável está preservado em `.agents/library/source-skills/`. Isso é uma biblioteca de origem; não significa autorização automática para usar skills fora de `.agents/skills/`.

## Desenvolvimento local

Pré-requisitos:

- Node.js 24 ou superior;
- npm 11 (gerenciador fixado para esta beta).

Na raiz do repositório:

```powershell
npm install
npm run dev
```

Rotas disponíveis no Gate A:

- `http://localhost:3000/` — prova mínima do bootstrap;
- `http://localhost:3000/design-preview` — fundação visual para revisão.

Verificações:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

A aplicação fica em `apps/web`. Não há backend, banco, autenticação ou integração externa nesta fase.

