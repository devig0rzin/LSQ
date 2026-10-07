import { productDetailsData } from "./product-details.data";

/** Blocos da descrição técnica, na mesma ordem da página do produto no site atual da LSQ. */
export type DetailBlock =
  | { type: "p"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: { text: string; span?: number }[][] }
  /** Desenho técnico copiado para /public/products/<slug>/desenho-NN.webp. */
  | { type: "img"; src: string; w: number; h: number };

export interface ProductDetails {
  /** Trilha do site atual: [categoria, subfamília]. Vazia quando o produto não tem categoria lá. */
  breadcrumb: string[];
  sku: string | null;
  blocks: DetailBlock[];
}

const EMPTY: ProductDetails = { breadcrumb: [], sku: null, blocks: [] };

export function getProductDetails(slug: string): ProductDetails {
  return productDetailsData[slug] ?? EMPTY;
}

/** Subfamília do site atual (ex.: "Engates ISO 7241-A"), quando existe. */
export function getSubfamily(slug: string) {
  return getProductDetails(slug).breadcrumb[1] ?? null;
}

/**
 * Separa a abertura (primeiro parágrafo) do restante da descrição técnica.
 * A abertura vira o texto de apresentação no topo da página do produto.
 */
export function splitIntro(blocks: readonly DetailBlock[]) {
  const first = blocks[0];
  if (first?.type === "p" && first.lines.join(" ").length > 40) {
    return { intro: first.lines, rest: blocks.slice(1) };
  }
  return { intro: [] as string[], rest: [...blocks] };
}

/** Primeira linha de tabela vira cabeçalho quando parece rótulo de coluna (PARTNO, ISO, Modelo…). */
export function hasHeaderRow(rows: DetailBlock & { type: "table" }) {
  const first = rows.rows[0] ?? [];
  if (rows.rows.length < 2 || first.length < 2) return false;
  if (first.some((cell) => /part\s*no|^iso$|modelo|c[óo]digo|^tipo$|^item$|^size$/i.test(cell.text))) return true;
  const numeric = (text: string) => /^[\d\s.,/"'~-]+$/.test(text) && /\d/.test(text);
  return first.every((cell) => !numeric(cell.text)) && rows.rows.slice(1).some((row) => row.slice(1).some((cell) => numeric(cell.text)));
}
