# Codex Execution Protocol v0

## Antes de implementar
- Ler todo o Project Pack.
- Resumir entendimento em no máximo 15 linhas.
- Listar suposições separadamente.
- Não inventar dados da LSQ.
- Não alterar nomenclatura técnica sem marcar a origem/necessidade de validação.
- Não iniciar código até receber aprovação do design/spec da fase.

## Durante implementação
- Trabalhar por módulos pequenos.
- Não criar features fora do escopo.
- Componentes devem ser reutilizáveis, tipados e acessíveis.
- Mobile não é etapa posterior; deve ser considerado na mesma implementação.
- Evitar dependências sem necessidade concreta.
- Animações devem respeitar prefers-reduced-motion.
- Imagens e vídeos devem ser otimizados.

## Conteúdo
- Separar conteúdo de UI.
- Manter dados de produto estruturados.
- Registrar campos sem informação em vez de inventá-los.
- Marcar conteúdo como: confirmado, derivado da matriz, ou pendente de validação.

## Qualidade
Antes de declarar qualquer etapa pronta:
- lint;
- typecheck;
- testes aplicáveis;
- build;
- teste de páginas principais;
- verificação visual mobile/desktop;
- console sem erros críticos;
- checklist do requisito da fase.
