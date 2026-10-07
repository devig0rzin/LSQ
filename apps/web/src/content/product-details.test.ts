import { describe, expect, it } from "vitest";
import { products } from "./catalog";
import { getProductDetails, hasHeaderRow, splitIntro } from "./product-details";

describe("conteúdo técnico dos produtos", () => {
  it("todo produto do catálogo tem descrição importada", () => {
    for (const product of products) expect(getProductDetails(product.slug).blocks.length, product.slug).toBeGreaterThan(0);
  });

  it("LSQ-TG traz texto, especificações e tabelas de medidas como no site atual", () => {
    const details = getProductDetails("lsq-tg-engate-rapido-hidraulico-tipo-fechado-iso-7241-a");
    expect(details.breadcrumb).toEqual(["Engates Rápidos Hidráulicos", "Engates ISO 7241-A"]);
    const { intro, rest } = splitIntro(details.blocks);
    expect(intro[0]).toContain("LSQ-TG");
    const tables = rest.filter((block) => block.type === "table");
    expect(tables).toHaveLength(5);
    expect(tables[0].type === "table" && hasHeaderRow(tables[0])).toBe(false); // tabela de especificações (rótulo + valores)
    expect(tables[1].type === "table" && hasHeaderRow(tables[1])).toBe(true); // PARTNO…
  });

  it("produto com subfamília no site atual expõe a subfamília no catálogo", () => {
    const tg = products.find((product) => product.code === "LSQ-TG");
    expect(tg?.subfamily).toBe("Engates ISO 7241-A");
  });
});
