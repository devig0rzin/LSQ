# Technical Architecture — Beta

## Stack
- Next.js (App Router)
- TypeScript strict
- Tailwind CSS
- shadcn/ui apenas como primitives quando útil
- conteúdo local tipado
- imagens via `next/image` quando aplicável

## Estrutura alvo
A beta é **frontend-first**. Uma única app web é suficiente.

Não criar NestJS, banco ou autenticação neste gate.

## Dados
Seed local em TypeScript/JSON com schema claro. O mesmo modelo deve poder ser migrado futuramente para API/CMS/DB sem reescrever a camada de apresentação.

## Formulário
Na beta, validar client-side e demonstrar o fluxo. Não fingir persistência real. Se houver envio real simples, documentar explicitamente o serviço utilizado e variáveis de ambiente.

## SEO/performance
- metadata por página;
- estrutura semântica;
- sitemap/robots se fizer sentido para deploy público;
- otimização de imagens;
- evitar bundle de animação até necessário;
- lazy-load do 360/embeds pesados.

## Motion
CSS primeiro. GSAP apenas em interação/scroll onde o ganho visual justificar o custo. Sem Three.js por padrão.
