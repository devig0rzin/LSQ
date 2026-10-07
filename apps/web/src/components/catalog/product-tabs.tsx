"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/** Abas acessíveis (setas do teclado alternam entre as abas). */
export function ProductTabs({ tabs }: { tabs: readonly TabItem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div>
      <div aria-label="Informações do produto" className="no-scrollbar flex gap-6 overflow-x-auto border-b border-[#dfe3e6]" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-controls={`${baseId}-panel-${index}`}
            aria-selected={active === index}
            className={`-mb-px shrink-0 border-b-2 py-4 text-sm font-semibold transition-colors ${active === index ? "border-signal-red text-signal-red" : "border-transparent text-steel hover:text-graphite"}`}
            id={`${baseId}-tab-${index}`}
            key={tab.id}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
            role="tab"
            tabIndex={active === index ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${baseId}-tab-${index}`}
          className="pt-8"
          hidden={active !== index}
          id={`${baseId}-panel-${index}`}
          key={tab.id}
          role="tabpanel"
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
