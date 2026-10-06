"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { categories, products } from "@/content/catalog";
import { filterProducts } from "@/lib/catalog";

export function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const visibleProducts = useMemo(() => filterProducts(products, { category, query }), [category, query]);
  const filters = <><fieldset className="mt-6 border-t border-white/10 pt-5"><legend className="text-xs font-bold tracking-[.12em] text-white/60">CATEGORIAS</legend><div className="mt-3 grid">{[{ label: "Todas as famílias", slug: "all" }, ...categories].map((item) => <label className="flex cursor-pointer items-center gap-3 py-2 text-sm text-white/75 hover:text-white" key={item.slug}><input checked={category === item.slug} name="category" onChange={() => setCategory(item.slug)} type="radio" />{item.label}</label>)}</div></fieldset><p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/45">Filtros técnicos adicionais serão exibidos quando houver dados confirmados para cada série.</p></>;
  return <div className="mt-10 grid gap-6 lg:grid-cols-[15.5rem_1fr]">
    <div className="lg:hidden"><label className="block text-xs font-bold tracking-[.12em] text-white/60" htmlFor="catalog-search">BUSCAR NO CATÁLOGO</label><div className="mt-3 flex gap-3"><input className="min-w-0 flex-1 border border-white/15 bg-white px-3 py-3 text-sm text-graphite outline-none placeholder:text-steel focus:border-signal-red" id="catalog-search" onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou código" type="search" value={query} /><details className="industrial-surface group relative"><summary className="flex min-h-11 cursor-pointer list-none items-center px-4 text-sm font-bold">Filtros</summary><div className="absolute top-[calc(100%+.5rem)] right-0 z-20 w-[min(21rem,calc(100vw-2rem))] border border-white/15 bg-[#15181b] p-5">{filters}</div></details></div></div>
    <aside className="industrial-surface hidden h-fit p-5 lg:block"><label className="block text-xs font-bold tracking-[.12em] text-white/60" htmlFor="catalog-search-desktop">BUSCAR NO CATÁLOGO</label><input className="mt-3 w-full border border-white/15 bg-white px-3 py-3 text-sm text-graphite outline-none placeholder:text-steel focus:border-signal-red" id="catalog-search-desktop" onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou código" type="search" value={query} />{filters}</aside>
    <section aria-live="polite"><div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"><p className="text-sm text-white/65">{visibleProducts.length} {visibleProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}</p><p className="text-xs font-bold tracking-[.1em] text-white/40">CATÁLOGO LSQ</p></div>{visibleProducts.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <div className="border border-dashed border-white/25 bg-[#15181b] p-10 text-center"><Image alt="" className="mx-auto h-auto w-20" height={120} src="/brand/lsquinho-mascot-reference.png" width={120} /><h2 className="mt-4 text-xl font-semibold">Nenhum produto nesta busca.</h2><p className="mt-2 text-sm text-white/60">Tente outro código ou fale com um especialista.</p><button className="mt-5 border-b border-white pb-1 text-sm font-semibold hover:text-red-300" onClick={() => { setQuery(""); setCategory("all"); }} type="button">Limpar filtros</button></div>}</section>
  </div>;
}
