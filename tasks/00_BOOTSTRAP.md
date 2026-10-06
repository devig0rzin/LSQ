> **Obrigatório:** antes de executar esta tarefa, leia `RULES.md`, `AGENTS.md` e a documentação referenciada. Não avance para o próximo gate sem aprovação humana explícita.

# Task 00 — Bootstrap

## Objetivo
Criar a fundação técnica da beta sem construir páginas finais.

## Fazer
- ler `AGENTS.md` e docs obrigatórios;
- produzir `IMPLEMENTATION_PLAN.md` curto;
- criar workspace npm/turbo apenas se isso simplificar `apps/web`; não criar backend;
- criar `apps/web` com Next.js + TypeScript + Tailwind + src dir;
- configurar lint/typecheck/build;
- instalar shadcn apenas se necessário para primitives;
- copiar assets aprovados de `assets/brand/raw` para local de uso otimizado mantendo os brutos intactos;
- criar estrutura de componentes/conteúdo/tipos;
- criar seed mínimo de conteúdo demonstrável sem fatos inventados;
- criar shell básico e rota de health visual/landing vazia suficiente para provar bootstrap;
- documentar comandos de execução no README.

## Não fazer
- backend;
- banco;
- auth;
- páginas completas;
- animação avançada.

## Saída
- dev server funcionando;
- build verde;
- estrutura limpa;
- plano do Gate A pronto.
