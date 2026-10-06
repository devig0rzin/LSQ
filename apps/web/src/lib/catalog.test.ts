import { describe, expect, it } from "vitest";

import { filterProducts } from "@/lib/catalog";

const products = [
  { category: "hidraulicos", name: "LSQ-S1", slug: "lsq-s1" },
  { category: "pneumaticos", name: "Engate pneumático", slug: "pneumatico" },
];

describe("filterProducts", () => {
  it("combina busca normalizada e filtro de categoria", () => {
    expect(filterProducts(products, { category: "hidraulicos", query: "s1" })).toEqual([
      products[0],
    ]);
  });

  it("retorna estado vazio quando nenhum produto corresponde", () => {
    expect(filterProducts(products, { category: "all", query: "inexistente" })).toEqual([]);
  });
});
