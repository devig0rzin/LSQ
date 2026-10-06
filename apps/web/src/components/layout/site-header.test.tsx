import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "./site-header";

const navigation = [
  { label: "Componentes", href: "#componentes" },
] as const;

describe("SiteHeader", () => {
  it("closes the mobile disclosure after a navigation choice", async () => {
    const user = userEvent.setup();

    render(<SiteHeader navigation={navigation} />);

    const disclosure = screen.getByText("Menu").closest("details");
    expect(disclosure).not.toBeNull();

    await user.click(screen.getByText("Menu"));
    expect(disclosure).toHaveAttribute("open");

    const mobileNavigation = screen.getByRole("navigation", {
      name: "Principal no celular",
      hidden: true,
    });
    await user.click(
      mobileNavigation.querySelector('a[href="#componentes"]') as HTMLAnchorElement,
    );
    expect(disclosure).not.toHaveAttribute("open");
  });
});
