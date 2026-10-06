import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCardConcept } from "./product-card-concept";

describe("ProductCardConcept", () => {
  it("omits optional technical metadata instead of rendering empty labels", () => {
    render(
      <ProductCardConcept
        product={{
          family: "Engates hidráulicos",
          name: "Série para validação comercial",
          statusLabel: "Conteúdo em validação",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Série para validação comercial" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Código")).not.toBeInTheDocument();
    expect(screen.queryByText("Informação técnica")).not.toBeInTheDocument();
  });
});
