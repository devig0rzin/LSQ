# Technical Architecture v0

## Direção candidata
Monorepo preparado para crescer, sem obrigar o beta a carregar complexidade desnecessária.

### Frontend
- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui como base de primitives, com identidade visual própria
- Componentização por domínio
- SEO/metadata estruturados
- Image optimization e performance como requisito

### Conteúdo do beta
- Dados tipados em arquivos locais/JSON/TS para acelerar aprovação visual.
- Conteúdo estruturado desde o início para futura migração a CMS/DB sem reescrever a UI.

### Backend de produção — candidato
- NestJS se o escopo exigir API separada, CRM, integrações e autenticação mais robusta.
- Alternativa: Next.js server actions/API para escopo menor.
- Decisão deve ocorrer após definição de integrações e operação comercial.

### Dados de produção — candidato
- Postgres/Supabase ou Postgres gerenciado.
- Entidades prováveis: products, categories, applications, product_specs, assets, downloads, leads, lead_events, contacts.

### Auth
Só implementar autenticação real se houver caso de uso aprovado. Cadastro de lead não exige necessariamente uma conta persistente.

### Motion / 3D
Usar animação como acabamento e hierarquia, não como espetáculo gratuito. GSAP/Three.js somente onde cria entendimento ou valor real. O VR 360 existente pode ser incorporado sem reinventar a experiência.
