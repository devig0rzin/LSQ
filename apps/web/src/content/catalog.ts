import { productRecords } from "./products.data";

export type CategorySlug =
  | "hidraulicos"
  | "pneumaticos"
  | "refrigeracao"
  | "valvulas"
  | "aceleradores"
  | "fechaduras"
  | "encaixes"
  | "acessorios";

/** Registro bruto, gerado a partir do site atual da LSQ (ver products.data.ts). */
export interface ProductRecord {
  slug: string;
  /** Série/código quando o nome do site atual começa por um código. */
  code: string | null;
  name: string;
  /** Nome exatamente como aparece no site atual, para revisão de nomenclatura. */
  sourceName: string;
  /** Inferida pelo nome do produto; revisar com o cliente. */
  category: string;
  images: readonly string[];
  iso: string | null;
  sourceUrl: string;
}

export interface Product extends ProductRecord {
  category: CategorySlug;
  /** Rótulo curto para cards: código quando existe, senão a família. */
  label: string;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Imagem de ambientação (pasta /public/media). Sem imagem, o card usa a foto de um produto da família. */
  media?: string;
}

export const categories: readonly Category[] = [
  { slug: "hidraulicos", label: "Engates rápidos hidráulicos", media: "/media/categoria-hidraulicos.webp" },
  { slug: "pneumaticos", label: "Engates rápidos pneumáticos", media: "/media/categoria-componentes.webp" },
  { slug: "valvulas", label: "Válvulas de alta pressão", media: "/media/categoria-valvulas.webp" },
  { slug: "acessorios", label: "Acessórios", media: "/media/macro-produto.webp" },
  { slug: "refrigeracao", label: "Engates de refrigeração" },
  { slug: "encaixes", label: "Encaixes de tubo pneumáticos" },
  { slug: "aceleradores", label: "Aceleradores hidráulicos" },
  { slug: "fechaduras", label: "Fechaduras hidráulicas" },
];

const categorySlugs = new Set<string>(categories.map((category) => category.slug));

function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.has(value);
}

export const products: readonly Product[] = productRecords.map((record) => {
  const category = isCategorySlug(record.category) ? record.category : "acessorios";
  return {
    ...record,
    category,
    label: record.code ?? getCategoryLabel(category),
  };
});

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryLabel(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function countByCategory(slug: CategorySlug) {
  return products.filter((product) => product.category === slug).length;
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}

/** Séries de destaque na Home. Slugs inexistentes são ignorados. */
const featuredSlugs = [
  "lsq-s1-engate-rapido-hidraulico-tipo-fechado-iso-7241-a",
  "lsq-ff-engate-rapido-hidraulico-iso-16028",
  "kze-b-engate-rapido-hidraulico-tipo-fechado",
  "khb-valvula-de-esfera-de-2-vias",
];

export const featuredProducts: readonly Product[] = (() => {
  const picked = featuredSlugs.map(getProduct).filter((product): product is Product => Boolean(product));
  const filler = products.filter((product) => !picked.includes(product) && product.code);
  return [...picked, ...filler].slice(0, 4);
})();
