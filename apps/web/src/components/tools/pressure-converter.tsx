"use client";

import { useId, useMemo, useState } from "react";
import { convertPressure, formatPressure, getPressureUnit, parseDecimal, pressureUnits, type PressureUnitId } from "@/lib/pressure";

const field = "h-12 w-full rounded-sm border border-line-strong bg-surface px-3 text-base text-ink outline-none transition-colors focus:border-signal-red";

export function PressureConverter() {
  const id = useId();
  const [raw, setRaw] = useState("1000");
  const [from, setFrom] = useState<PressureUnitId>("psi");
  const [to, setTo] = useState<PressureUnitId>("bar");

  const value = parseDecimal(raw);
  const valid = Number.isFinite(value);
  const results = useMemo(
    () => pressureUnits.map((unit) => ({ ...unit, value: valid ? convertPressure(value, from, unit.id) : Number.NaN })),
    [value, valid, from],
  );
  const main = results.find((unit) => unit.id === to);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form className="surface-card p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
        <h2 className="text-lg font-semibold">Converter pressão</h2>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-1.5 text-xs font-semibold text-graphite" htmlFor={`${id}-valor`}>
            Valor
            <input
              aria-invalid={!valid && raw.trim() !== "" ? true : undefined}
              className={field}
              id={`${id}-valor`}
              inputMode="decimal"
              onChange={(event) => setRaw(event.target.value)}
              value={raw}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <label className="grid gap-1.5 text-xs font-semibold text-graphite">
              De
              <select className={field} onChange={(event) => setFrom(event.target.value as PressureUnitId)} value={from}>
                {pressureUnits.map((unit) => <option key={unit.id} value={unit.id}>{unit.symbol}</option>)}
              </select>
            </label>
            <button
              aria-label="Inverter unidades"
              className="outline-button h-12 min-h-12 px-3"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              type="button"
            >
              ⇄
            </button>
            <label className="grid gap-1.5 text-xs font-semibold text-graphite">
              Para
              <select className={field} onChange={(event) => setTo(event.target.value as PressureUnitId)} value={to}>
                {pressureUnits.map((unit) => <option key={unit.id} value={unit.id}>{unit.symbol}</option>)}
              </select>
            </label>
          </div>
        </div>

        <output aria-live="polite" className="mt-7 block rounded-md border border-line bg-page p-5" htmlFor={`${id}-valor`}>
          <span className="block text-xs font-semibold tracking-[.08em] text-steel uppercase">Resultado</span>
          {valid ? (
            <span className="mt-1 block text-3xl font-semibold tracking-[-.03em] text-ink tabular-nums">
              {formatPressure(main?.value ?? Number.NaN)} <span className="text-signal-red-strong">{getPressureUnit(to).symbol}</span>
            </span>
          ) : (
            <span className="mt-1 block text-sm text-signal-red-strong">Digite um número (ex.: 3000 ou 2,5).</span>
          )}
        </output>
      </form>

      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-sm font-semibold">Equivalências</h2>
          <p className="text-xs text-steel">{valid ? `${formatPressure(value)} ${getPressureUnit(from).symbol} =` : "—"}</p>
        </div>
        <table className="w-full text-sm">
          <thead className="sr-only">
            <tr><th>Unidade</th><th>Símbolo</th><th>Valor</th></tr>
          </thead>
          <tbody>
            {results.map((unit) => (
              <tr className={`border-b border-line last:border-b-0 ${unit.id === to ? "bg-signal-red-soft" : ""}`} key={unit.id}>
                <td className="px-6 py-3.5 text-steel">{unit.name}</td>
                <td className="py-3.5 font-semibold text-ink">{unit.symbol}</td>
                <td className="px-6 py-3.5 text-right font-semibold text-ink tabular-nums">{formatPressure(unit.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
