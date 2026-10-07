export interface FilterableProduct {
  category: string;
  name: string;
  slug: string;
  code?: string | null;
}

export type SortKey = "relevancia" | "codigo" | "nome";

function normalize(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function filterProducts<T extends FilterableProduct>(
  products: readonly T[],
  filters: { category: string; query: string },
): T[] {
  const terms = normalize(filters.query.trim()).split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const categoryMatches = filters.category === "all" || product.category === filters.category;
    const haystack = normalize(`${product.code ?? ""} ${product.name} ${product.slug}`);
    const queryMatches = terms.every((term) => haystack.includes(term));
    return categoryMatches && queryMatches;
  });
}

export function sortProducts<T extends FilterableProduct>(products: readonly T[], sort: SortKey): T[] {
  if (sort === "relevancia") return [...products];
  const collator = new Intl.Collator("pt-BR", { numeric: true });
  if (sort === "nome") return [...products].sort((a, b) => collator.compare(a.name, b.name));
  // Produtos sem código vão para o fim, ordenados pelo nome.
  return [...products].sort((a, b) => {
    if (a.code && b.code) return collator.compare(a.code, b.code);
    if (a.code || b.code) return a.code ? -1 : 1;
    return collator.compare(a.name, b.name);
  });
}
