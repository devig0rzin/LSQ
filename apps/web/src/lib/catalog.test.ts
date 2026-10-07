import { describe, expect, it } from "vitest";

import { filterProducts, sortProducts } from "@/lib/catalog";

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

  it("ignora acentos e aceita vários termos em qualquer ordem", () => {
    expect(filterProducts(products, { category: "all", query: "pneumatico engate" })).toEqual([products[1]]);
  });
});

describe("sortProducts", () => {
  const items = [
    { category: "a", name: "Tampa", slug: "tampa", code: null },
    { category: "a", name: "Engate", slug: "s10", code: "LSQ-S10" },
    { category: "a", name: "Engate", slug: "s2", code: "LSQ-S2" },
  ];

  it("ordena códigos de forma numérica e deixa itens sem código no fim", () => {
    expect(sortProducts(items, "codigo").map((item) => item.slug)).toEqual(["s2", "s10", "tampa"]);
  });

  it("mantém a ordem original em relevância", () => {
    expect(sortProducts(items, "relevancia")).toEqual(items);
  });
});
