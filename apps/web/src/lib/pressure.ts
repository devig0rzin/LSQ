/**
 * Conversor de unidades de pressão — as mesmas unidades do "Conversor de medida"
 * do site atual da LSQ. Fatores em kPa (valores de definição/padrão):
 *   1 MPa = 1000 kPa · 1 bar = 100 kPa · 1 atm = 101,325 kPa
 *   1 kgf/cm² = 98,0665 kPa · 1 psi = 6,894757293 kPa
 */
export const pressureUnits = [
  { id: "kpa", symbol: "kPa", name: "Quilopascal", kpa: 1 },
  { id: "mpa", symbol: "MPa", name: "Megapascal", kpa: 1000 },
  { id: "kgfcm2", symbol: "kgf/cm²", name: "Quilograma-força por centímetro quadrado", kpa: 98.0665 },
  { id: "psi", symbol: "psi", name: "Libra-força por polegada quadrada", kpa: 6.894757293168 },
  { id: "bar", symbol: "bar", name: "Bar", kpa: 100 },
  { id: "atm", symbol: "atm", name: "Atmosfera padrão", kpa: 101.325 },
] as const;

export type PressureUnitId = (typeof pressureUnits)[number]["id"];

export function getPressureUnit(id: PressureUnitId) {
  return pressureUnits.find((unit) => unit.id === id) ?? pressureUnits[0];
}

export function convertPressure(value: number, from: PressureUnitId, to: PressureUnitId) {
  return (value * getPressureUnit(from).kpa) / getPressureUnit(to).kpa;
}

/** Aceita vírgula ou ponto como separador decimal ("1.234,5" e "1234.5"). */
export function parseDecimal(input: string) {
  const clean = input.trim().replace(/\s/g, "");
  if (!clean) return Number.NaN;
  const normalized = clean.includes(",") ? clean.replace(/\./g, "").replace(",", ".") : clean;
  return /^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(normalized) ? Number(normalized) : Number.NaN;
}

/** Até 6 algarismos significativos, no formato brasileiro. */
export function formatPressure(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6;
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits, maximumSignificantDigits: abs < 1 ? 6 : undefined }).format(value);
}
