"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Mascot } from "@/components/brand/mascot";
import { ProductCard } from "@/components/catalog/product-card";
import { Search, WhatsApp } from "@/components/ui/icons";
import { categories, products, subfamiliesOf, type CategorySlug } from "@/content/catalog";
import { whatsappLink } from "@/content/site";
import { filterProducts, sortProducts, type SortKey } from "@/lib/catalog";

const PAGE_SIZE = 24;
const validCategory = (value: string | null) => (value && categories.some((c) => c.slug === value) ? value : "all");

export function CatalogBrowser() {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [category, setCategory] = useState(() => validCategory(params.get("categoria")));
  const [subfamily, setSubfamily] = useState(() => params.get("familia") ?? "");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const byQuery = filterProducts(products, { category: "all", query: deferredQuery });
    const map = new Map<string, number>([["all", byQuery.length]]);
    for (const product of byQuery) map.set(product.category, (map.get(product.category) ?? 0) + 1);
    return map;
  }, [deferredQuery]);

  const subfamilies = useMemo(() => (category === "all" ? [] : subfamiliesOf(category as CategorySlug)), [category]);
  const activeSubfamily = subfamilies.some((item) => item.label === subfamily) ? subfamily : "";

  const results = useMemo(() => {
    const byCategory = filterProducts(products, { category, query: deferredQuery });
    const bySubfamily = activeSubfamily ? byCategory.filter((product) => product.subfamily === activeSubfamily) : byCategory;
    return sortProducts(bySubfamily, sort);
  }, [category, deferredQuery, sort, activeSubfamily]);

  // Mantém a URL compartilhável (?categoria=&q=) sem recarregar a página.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", category);
    if (deferredQuery.trim()) url.searchParams.set("q", deferredQuery.trim());
    else url.searchParams.delete("q");
    if (activeSubfamily) url.searchParams.set("familia", activeSubfamily);
    else url.searchParams.delete("familia");
    window.history.replaceState(null, "", url);
  }, [category, deferredQuery, activeSubfamily]);

  function choose(slug: string) {
    setCategory(slug);
    setSubfamily("");
    setVisible(PAGE_SIZE);
  }

  const options = [{ slug: "all", label: "Todos os produtos" }, ...categories];

  return (
    <>
      <form
        className="mt-8 flex max-w-3xl gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        role="search"
      >
        <label className="sr-only" htmlFor="catalog-search">Buscar no catálogo</label>
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-lg text-steel" />
          <input
            className="h-12 w-full rounded-sm border border-line-strong bg-surface pr-3 pl-11 text-sm text-ink outline-none placeholder:text-steel/80 focus:border-signal-red"
            id="catalog-search"
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Buscar por código ou nome (ex.: LSQ-S1, face plana, válvula)"
            type="search"
            value={query}
          />
        </div>
        <button className="signal-button h-12 px-6" type="submit">Buscar</button>
      </form>

      {/* Categorias no celular: chips roláveis */}
      <div className="no-scrollbar -mx-[var(--page-gutter)] mt-6 flex gap-2 overflow-x-auto px-[var(--page-gutter)] lg:hidden">
        {options.map((item) => (
          <button
            aria-pressed={category === item.slug}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-[.8125rem] font-medium transition-colors ${category === item.slug ? "border-signal-red bg-signal-red text-white" : "border-line-strong bg-surface text-graphite"}`}
            key={item.slug}
            onClick={() => choose(item.slug)}
            type="button"
          >
            {item.label} <span className="opacity-60">({counts.get(item.slug) ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]" id="resultados">
        <aside className="hidden h-fit overflow-hidden rounded-md border border-line bg-surface lg:sticky lg:top-32 lg:block">
          <h2 className="border-b border-line px-5 py-4 text-sm font-semibold text-ink">Categorias</h2>
          <ul className="p-2">
            {options.map((item) => (
              <li key={item.slug}>
                <button
                  aria-pressed={category === item.slug}
                  className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-[.8125rem] transition-colors ${category === item.slug ? "bg-signal-red-soft font-semibold text-ink shadow-[inset_3px_0_0_var(--signal-red)]" : "text-graphite hover:bg-page hover:text-ink"}`}
                  onClick={() => choose(item.slug)}
                  type="button"
                >
                  {item.label}
                  <span className="text-xs tabular-nums text-steel">{counts.get(item.slug) ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-3 border-t border-line bg-page px-5 pt-5">
            <div className="pb-5">
              <p className="text-xs leading-5 text-steel">Não encontrou a série? Envie o código ou uma foto da peça.</p>
              <a className="mt-3 inline-flex items-center gap-2 text-[.8125rem] font-semibold text-ink hover:text-signal-red-strong" href={whatsappLink("Olá, não encontrei uma série no catálogo da LSQ.")} rel="noreferrer" target="_blank">
                <WhatsApp className="text-[#1faa53]" /> Perguntar no WhatsApp
              </a>
            </div>
            <Mascot className="shrink-0" variant="peek" width={64} />
          </div>
        </aside>

        <section aria-live="polite">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <p className="text-sm text-steel">
              <strong className="font-semibold text-ink">{results.length}</strong> {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
            <label className="flex items-center gap-2 text-xs text-steel">
              Ordenar por
              <select
                className="h-9 rounded-sm border border-line-strong bg-surface px-2 text-[.8125rem] text-ink outline-none focus:border-signal-red"
                onChange={(event) => setSort(event.target.value as SortKey)}
                value={sort}
              >
                <option value="relevancia">Família</option>
                <option value="codigo">Código (A–Z)</option>
                <option value="nome">Nome (A–Z)</option>
              </select>
            </label>
          </div>

          {subfamilies.length > 1 ? (
            <div aria-label="Subfamílias" className="mt-4 flex flex-wrap gap-2" role="group">
              {[{ label: "", count: 0 }, ...subfamilies].map((item) => (
                <button
                  aria-pressed={activeSubfamily === item.label}
                  className={`rounded-sm border px-3 py-1.5 text-[.8125rem] transition-colors ${activeSubfamily === item.label ? "border-ink bg-ink text-white" : "border-line-strong bg-surface text-graphite hover:border-ink"}`}
                  key={item.label || "todas"}
                  onClick={() => {
                    setSubfamily(item.label);
                    setVisible(PAGE_SIZE);
                  }}
                  type="button"
                >
                  {item.label || "Todas"} {item.label ? <span className="opacity-60">({item.count})</span> : null}
                </button>
              ))}
            </div>
          ) : null}

          {results.length ? (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
                {results.slice(0, visible).map((product, index) => (
                  <ProductCard eager={index < 3} key={product.slug} product={product} />
                ))}
              </div>
              {visible < results.length ? (
                <div className="mt-8 text-center">
                  <button className="outline-button" onClick={() => setVisible((value) => value + PAGE_SIZE)} type="button">
                    Mostrar mais {Math.min(PAGE_SIZE, results.length - visible)} de {results.length - visible} restantes
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-6 rounded-md border border-dashed border-line-strong bg-surface p-10 text-center">
              <Mascot className="mx-auto" width={88} />
              <h2 className="mt-4 text-xl font-semibold">Nenhum produto nesta busca.</h2>
              <p className="mt-2 text-sm text-steel">Tente outro código ou envie a referência para o time comercial.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button className="outline-button" onClick={() => { setQuery(""); choose("all"); }} type="button">Limpar busca</button>
                <a className="signal-button" href={whatsappLink(`Olá, procuro a série "${query}" no catálogo da LSQ.`)} rel="noreferrer" target="_blank">
                  <WhatsApp /> Perguntar no WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
