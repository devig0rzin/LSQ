# Decision Log

| ID | Data | Decisão | Status | Motivo |
|---|---|---|---|---|
| D-001 | 2026-10-06 | Beta orientada a catálogo e conversão, não e-commerce | VALIDADO | Alinha com a operação comercial descrita pelo cliente |
| D-002 | 2026-10-06 | Backend dedicado fica fora da beta | VALIDADO | Reduz complexidade sem limitar a demonstração |
| D-003 | 2026-10-06 | Login real não entra na beta | VALIDADO | O caso de uso ainda não está definido |
| D-004 | 2026-10-06 | Preservar e valorizar a experiência 360/fábrica | VALIDADO | Elemento explicitamente valorizado pelo cliente |
| D-005 | 2026-10-06 | LSquinho é elemento secundário de marca | PROPOSTO | Evita infantilizar uma marca industrial |

| ID | Data | Decisão | Motivo | Impacto | Status | Rollback |
|---|---|---|---|---|---|---|
| D-006 | 2026-10-06 | Uma única aplicação Next.js em `apps/web` com npm workspaces | Atende a estrutura alvo sem orquestração sem caso de uso | Scripts centralizados e app isolada para evolução futura | VALIDADO | Executar scripts diretamente em `apps/web` se necessário |
| D-007 | 2026-10-06 | IBM Plex Sans e direção de catálogo de engenharia | Une clareza editorial, linguagem técnica e identidade LSQ | Tokens, tipografia e grids seguem esta direção | VALIDADO | Trocar tokens/fonte com nova direção aprovada |
| D-008 | 2026-10-06 | Não instalar shadcn ou bibliotecas de motion | Primitives necessários são simples | Menos bundle e dependências | VALIDADO | Adicionar apenas quando houver caso concreto |
| D-009 | 2026-10-06 | Usar Vitest e Testing Library | Há comportamentos relevantes e testáveis | Testes sem código de teste no bundle | VALIDADO | Substituir apenas por estratégia formal futura |
| D-011 | 2026-10-06 | Registrar advisory transitório do `eslint-config-next` sem downgrade | Audit de produção limpo e sugestão do npm é regressiva | Reavaliar com atualização compatível do toolchain | PENDENTE EXTERNO | Atualizar Next/ESLint quando upstream corrigir |
| D-012 | 2026-10-06 | Rotas públicas completas autorizadas | Instrução humana mais recente supera pausa interna do Gate A | Home, catálogo, produto, empresa, fábrica e contato entram na beta | VALIDADO | Restringir escopo se solicitado |
| D-013 | 2026-10-06 | Dataset local com séries verificadas no site LSQ | Evita scraping em runtime e separa dados da interface | Catálogo estático e tipado | VALIDADO | Trocar por fonte aprovada futura |
| D-014 | 2026-10-06 | Experiência 360 aberta em nova aba segura | Evita embed automático de terceiro | Link externo com `rel=noreferrer` | VALIDADO | Incorporar somente após validação de segurança/UX |
| D-015 | 2026-10-06 | Formulário prepara WhatsApp pré-preenchido | Conversão demonstrável sem persistência de dados pessoais | Dados permanecem no navegador até a ação explícita | VALIDADO | Conectar a serviço aprovado em fase futura |
| D-016 | 2026-10-06 | `LSQ_TARGET_UI_REFERENCE.png` é o visual north star | Referência humana torna explícitos acabamento e composição desejados | UI pública converge para superfícies escuras, produto protagonista, grids técnicos e CTAs vermelhos | VALIDADO | Nova instrução humana pode substituir a direção |
| D-017 | 2026-10-06 | Catálogo completo (127 produtos, 8 famílias) gerado do site atual da LSQ, com até 4 fotos 1024px por produto | Instrução humana: chegar ao mockup com dados reais; fotos 480px antigas eram a 1ª foto da galeria (tampa) e estavam trocadas | `products.data.ts` gerado por `tools/build-catalog.py`; nomes preservados (`sourceName`), família inferida pelo nome e marcada para revisão | VALIDADO (nomenclatura PENDENTE de revisão do cliente) | Restaurar `content/catalog.ts` anterior via git |
| D-018 | 2026-10-06 | Imagens de ambientação (hero, famílias, fábrica, qualidade, estoque) enviadas pelo responsável são usadas com legenda "Imagem ilustrativa" | São imagens geradas, não fotos da LSQ; o cliente quer reduzir sensação de "irreal" | Flag `illustrative` em `content/site.ts`; trocar arquivo em `/public/media` e mudar para `false` quando houver foto real | VALIDADO | Remover a imagem e voltar ao painel neutro |
| D-019 | 2026-10-06 | Header com CTA WhatsApp; formulário de contato envia via WhatsApp com tipo de cliente CNPJ/CPF, sem campo de documento | Conversão por WhatsApp é central; documento pessoal não precisa trafegar | Nenhum dado persistido | VALIDADO | — |
| D-020 | 2026-10-06 | Hero com montagem da peça amarrada ao scroll (sequência de 121 quadros em canvas) | Instrução humana explícita (autoriza o item "scroll-cinema" do RULES §4); sequência de imagens evita engasgos de seek de vídeo no iOS | ~2,2 MB no desktop e ~1,3 MB no celular, carregados progressivamente após o `load`; movimento reduzido mostra a peça montada sem prender a rolagem; sem JS mostra o 1º quadro | VALIDADO | Voltar o hero estático (commit anterior) |
