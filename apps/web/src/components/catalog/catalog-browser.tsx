"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Search, WhatsApp } from "@/components/ui/icons";
import { categories, products } from "@/content/catalog";
import { whatsappLink } from "@/content/site";
import { filterProducts, sortProducts, type SortKey } from "@/lib/catalog";

const PAGE_SIZE = 24;
const validCategory = (value: string | null) => (value && categories.some((c) => c.slug === value) ? value : "all");

export function CatalogBrowser() {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [category, setCategory] = useState(() => validCategory(params.get("categoria")));
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const byQuery = filterProducts(products, { category: "all", query: deferredQuery });
    const map = new Map<string, number>([["all", byQuery.length]]);
    for (const product of byQuery) map.set(product.category, (map.get(product.category) ?? 0) + 1);
    return map;
  }, [deferredQuery]);

  const results = useMemo(
    () => sortProducts(filterProducts(products, { category, query: deferredQuery }), sort),
    [category, deferredQuery, sort],
  );

  // Mantém a URL compartilhável (?categoria=&q=) sem recarregar a página.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", category);
    if (deferredQuery.trim()) url.searchParams.set("q", deferredQuery.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [category, deferredQuery]);

  function choose(slug: string) {
    setCategory(slug);
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
          <Search className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-lg text-white/45" />
          <input
            className="h-12 w-full rounded-sm border border-white/15 bg-panel pr-3 pl-11 text-sm text-white outline-none placeholder:text-white/40 focus:border-signal-red"
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
            className={`shrink-0 rounded-full border px-3.5 py-2 text-[.8125rem] font-medium transition-colors ${category === item.slug ? "border-signal-red bg-signal-red text-white" : "border-white/15 text-white/75"}`}
            key={item.slug}
            onClick={() => choose(item.slug)}
            type="button"
          >
            {item.label} <span className="opacity-60">({counts.get(item.slug) ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]" id="resultados">
        <aside className="ink-panel hidden h-fit rounded-md lg:sticky lg:top-24 lg:block">
          <h2 className="border-b border-white/10 px-5 py-4 text-sm font-semibold">Categorias</h2>
          <ul className="p-2">
            {options.map((item) => (
              <li key={item.slug}>
                <button
                  aria-pressed={category === item.slug}
                  className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-[.8125rem] transition-colors ${category === item.slug ? "bg-signal-red/12 font-semibold text-white shadow-[inset_2px_0_0_var(--signal-red)]" : "text-white/65 hover:bg-white/5 hover:text-white"}`}
                  onClick={() => choose(item.slug)}
                  type="button"
                >
                  {item.label}
                  <span className="text-xs tabular-nums text-white/40">{counts.get(item.slug) ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 p-5">
            <p className="text-xs leading-5 text-white/50">Não encontrou a série? Envie o código ou uma foto da peça.</p>
            <a className="mt-3 inline-flex items-center gap-2 text-[.8125rem] font-semibold text-white hover:text-signal-red" href={whatsappLink("Olá, não encontrei uma série no catálogo da LSQ.")} rel="noreferrer" target="_blank">
              <WhatsApp className="text-[#3ccf6b]" /> Perguntar no WhatsApp
            </a>
          </div>
        </aside>

        <section aria-live="polite">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
            <p className="text-sm text-white/65">
              <strong className="font-semibold text-white">{results.length}</strong> {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
            <label className="flex items-center gap-2 text-xs text-white/55">
              Ordenar por
              <select
                className="h-9 rounded-sm border border-white/15 bg-panel px-2 text-[.8125rem] text-white outline-none focus:border-signal-red"
                onChange={(event) => setSort(event.target.value as SortKey)}
                value={sort}
              >
                <option value="relevancia">Família</option>
                <option value="codigo">Código (A–Z)</option>
                <option value="nome">Nome (A–Z)</option>
              </select>
            </label>
          </div>

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
            <div className="mt-6 rounded-md border border-dashed border-white/20 bg-panel p-10 text-center">
              <Image alt="" className="mx-auto h-auto w-20" height={120} src="/brand/lsquinho-mascot-reference.png" width={120} />
              <h2 className="mt-4 text-xl font-semibold">Nenhum produto nesta busca.</h2>
              <p className="mt-2 text-sm text-white/60">Tente outro código ou envie a referência para o time comercial.</p>
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
