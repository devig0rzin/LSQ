export interface Product {
  slug: string;
  code: string;
  name: string;
  category: "hidraulicos" | "pneumaticos" | "refrigeracao" | "valvulas";
  image: string;
  summary: string;
  specs: readonly { label: string; value: string }[];
}

export const categories = [
  { slug: "hidraulicos", label: "Engates hidráulicos", description: "Séries para conexão rápida em sistemas hidráulicos." },
  { slug: "pneumaticos", label: "Engates pneumáticos", description: "Família disponível para consulta comercial." },
  { slug: "refrigeracao", label: "Engates de refrigeração", description: "Família disponível para consulta comercial." },
  { slug: "valvulas", label: "Válvulas de alta pressão", description: "Família disponível para consulta comercial." },
] as const;

export const products: readonly Product[] = [
  { slug: "lsq-s1-engate-rapido-hidraulico-tipo-fechado-iso-7241-a", code: "LSQ-S1", name: "Engate rápido hidráulico tipo fechado", category: "hidraulicos", image: "/products/lsq-ff.webp", summary: "Série LSQ-S1 com referência ISO 7241-A no catálogo atual.", specs: [{ label: "Série", value: "LSQ-S1" }, { label: "Referência", value: "ISO 7241-A" }] },
  { slug: "lsq-s2-engate-rapido-hidraulico-tipo-fechado-iso-7241-b", code: "LSQ-S2", name: "Engate rápido hidráulico tipo fechado", category: "hidraulicos", image: "/products/kze-b.webp", summary: "Série LSQ-S2 com referência ISO 7241-B no catálogo atual.", specs: [{ label: "Série", value: "LSQ-S2" }, { label: "Referência", value: "ISO 7241-B" }] },
  { slug: "lsq-s4-engate-rapido-hidraulico-tipo-valvula-de-esfera-iso-5675", code: "LSQ-S4", name: "Engate rápido hidráulico tipo válvula de esfera", category: "hidraulicos", image: "/products/lsq-pd.webp", summary: "Série LSQ-S4 com referência ISO 5675 no catálogo atual.", specs: [{ label: "Série", value: "LSQ-S4" }, { label: "Referência", value: "ISO 5675" }] },
  { slug: "lsq-ff-engate-rapido-hidraulico-face-plana-iso-16028", code: "LSQ-FF", name: "Engate rápido hidráulico face plana", category: "hidraulicos", image: "/products/lsq-ff.webp", summary: "Série LSQ-FF com referência ISO 16028 no catálogo atual.", specs: [{ label: "Série", value: "LSQ-FF" }, { label: "Referência", value: "ISO 16028" }] },
  { slug: "kze-b-engate-rapido-hidraulico", code: "KZE-B", name: "Engate rápido hidráulico", category: "hidraulicos", image: "/products/kze-b.webp", summary: "Série KZE-B apresentada no catálogo atual da LSQ.", specs: [{ label: "Série", value: "KZE-B" }] },
  { slug: "kze-ba-engate-rapido-hidraulico", code: "KZE-BA", name: "Engate rápido hidráulico", category: "hidraulicos", image: "/products/kze-ba.webp", summary: "Série KZE-BA apresentada no catálogo atual da LSQ.", specs: [{ label: "Série", value: "KZE-BA" }] },
] as const;

export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
