import { productSubfamilies } from "./product-subfamilies.data";
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
  /** Subfamília do site atual (ex.: "Engates ISO 7241-A"); null quando não há. */
  subfamily: string | null;
}

export interface Category {
  slug: CategorySlug;
  label: string;
  /** Produto cuja foto real (01.webp) representa a família nos cards. */
  cover: string;
  /** Opcional: composição pronta em /public/families (fotos reais recortadas), quando a foto do produto é pequena demais no quadro. */
  coverImage?: string;
}

/** Mesma ordem e nomes das categorias do site atual da LSQ (lsq-coupling.com.br). */
export const categories: readonly Category[] = [
  { slug: "hidraulicos", label: "Engates rápidos hidráulicos", cover: "lsq-s1-engate-rapido-hidraulico-tipo-fechado-iso-7241-a" },
  { slug: "pneumaticos", label: "Engates rápidos pneumáticos", cover: "lsq-300-engate-rapido-pneumatico" },
  { slug: "refrigeracao", label: "Engates de refrigeração", cover: "kz1-2-3-engate-de-refrigeracao-tipo-bracadeira" },
  { slug: "valvulas", label: "Válvulas de alta pressão", cover: "khb-valvula-de-esfera-de-2-vias" },
  { slug: "aceleradores", label: "Aceleradores hidráulicos", cover: "la-acelerador-com-valvula-de-retencao", coverImage: "/families/aceleradores.webp" },
  { slug: "fechaduras", label: "Fechaduras hidráulicas", cover: "vbpse-fechadura-hidraulica-unilateral", coverImage: "/families/fechaduras.webp" },
  { slug: "encaixes", label: "Encaixes de tubo pneumáticos", cover: "jky-encaixe-de-tubo-tipo-virola-de-corte", coverImage: "/families/encaixes.webp" },
  { slug: "acessorios", label: "Plugues, tampas e protetores", cover: "tampa-metalica-contra-poeira-e-plugue-para-engates-rapidos-da-serie-kze-b" },
];

const categorySlugs = new Set<string>(categories.map((category) => category.slug));

function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.has(value);
}

const categoryOrder = new Map<string, number>(categories.map((category, index) => [category.slug, index]));

/** Produtos agrupados na ordem das famílias (é a ordenação "Família" do catálogo). */
export const products: readonly Product[] = productRecords
  .map((record) => {
    const category: CategorySlug = isCategorySlug(record.category) ? record.category : "acessorios";
    return {
      ...record,
      category,
      label: record.code ?? getCategoryLabel(category),
      subfamily: productSubfamilies[record.slug] ?? null,
    };
  })
  .sort((a, b) => (categoryOrder.get(a.category) ?? 99) - (categoryOrder.get(b.category) ?? 99));

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryLabel(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Foto real que representa a família; cai para o primeiro produto da família. */
export function categoryCover(category: Category) {
  if (category.coverImage) return category.coverImage;
  const product = getProduct(category.cover) ?? products.find((item) => item.category === category.slug);
  return product?.images[0] ?? "";
}

/** Subfamílias de uma família, na ordem em que aparecem no catálogo, com contagem. */
export function subfamiliesOf(slug: CategorySlug) {
  const counts = new Map<string, number>();
  for (const product of products) {
    if (product.category === slug && product.subfamily) counts.set(product.subfamily, (counts.get(product.subfamily) ?? 0) + 1);
  }
  return [...counts].map(([label, count]) => ({ label, count }));
}

export function countByCategory(slug: CategorySlug) {
  return products.filter((product) => product.category === slug).length;
}

/** Produtos da mesma família; os da mesma subfamília vêm primeiro. */
export function relatedProducts(product: Product, limit = 4) {
  const sameFamily = products.filter((item) => item.category === product.category && item.slug !== product.slug);
  const sameSub = sameFamily.filter((item) => product.subfamily && item.subfamily === product.subfamily);
  return [...sameSub, ...sameFamily.filter((item) => !sameSub.includes(item))].slice(0, limit);
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
