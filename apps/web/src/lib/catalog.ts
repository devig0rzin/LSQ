export interface FilterableProduct {
  category: string;
  name: string;
  slug: string;
}

export function filterProducts<T extends FilterableProduct>(
  products: readonly T[],
  filters: { category: string; query: string },
): T[] {
  const query = filters.query.trim().toLocaleLowerCase("pt-BR");

  return products.filter((product) => {
    const categoryMatches = filters.category === "all" || product.category === filters.category;
    const queryMatches = !query || `${product.name} ${product.slug}`.toLocaleLowerCase("pt-BR").includes(query);
    return categoryMatches && queryMatches;
  });
}
