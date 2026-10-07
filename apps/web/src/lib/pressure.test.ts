import { describe, expect, it } from "vitest";
import { convertPressure, formatPressure, parseDecimal } from "./pressure";

describe("conversor de pressão", () => {
  it("converte entre as unidades do site atual", () => {
    expect(convertPressure(1, "mpa", "bar")).toBeCloseTo(10, 10);
    expect(convertPressure(1, "bar", "psi")).toBeCloseTo(14.5038, 4);
    expect(convertPressure(3000, "psi", "mpa")).toBeCloseTo(20.684, 3);
    expect(convertPressure(1, "atm", "kpa")).toBeCloseTo(101.325, 10);
    expect(convertPressure(1, "kgfcm2", "bar")).toBeCloseTo(0.980665, 10);
    expect(convertPressure(250, "bar", "bar")).toBe(250);
  });

  it("lê número com vírgula ou ponto", () => {
    expect(parseDecimal("1,5")).toBe(1.5);
    expect(parseDecimal("1.234,5")).toBe(1234.5);
    expect(parseDecimal("1234.5")).toBe(1234.5);
    expect(parseDecimal("abc")).toBeNaN();
    expect(parseDecimal("")).toBeNaN();
  });

  it("formata no padrão brasileiro", () => {
    expect(formatPressure(20.684271)).toBe("20,6843");
    expect(formatPressure(14503.77)).toBe("14.503,77");
  });
});
