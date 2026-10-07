import { describe, expect, it } from "vitest";
import { categories, categoryCover, countByCategory, getProduct, products } from "./catalog";
import { productRecords } from "./products.data";

describe("catálogo — categorias revisadas", () => {
  it("mantém os 127 produtos, todos numa categoria conhecida", () => {
    expect(products).toHaveLength(127);
    const known = new Set(categories.map((category) => category.slug));
    for (const record of productRecords) expect(known.has(record.category as never), record.slug).toBe(true);
  });

  it("toda família tem produtos e uma foto de capa real", () => {
    for (const category of categories) {
      expect(countByCategory(category.slug), category.slug).toBeGreaterThan(0);
      expect(getProduct(category.cover), category.cover).toBeDefined();
      expect(categoryCover(category)).not.toBe("");
    }
  });

  it("segue a categoria do site atual nos casos que estavam errados", () => {
    expect(getProduct("vbpde-echadura-hidraulica-dupla-face")?.category).toBe("fechaduras");
    expect(getProduct("lsq-q2-engate-rapido-para-molde")?.category).toBe("pneumaticos");
    expect(getProduct("serie-da-valvula-de-enchimento-rapido")?.category).toBe("refrigeracao");
    expect(getProduct("knl-junta-de-tubo-tipo-mae-com-trava-de-porca-recartilhada")?.category).toBe("encaixes");
    expect(countByCategory("pneumaticos")).toBe(33);
    expect(countByCategory("valvulas")).toBe(2);
  });
});
