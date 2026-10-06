import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
export const metadata: Metadata = { title: "Produtos", description: "Catálogo técnico LSQ XH." };
export default function ProductsPage() { return <PublicShell><div className="industrial-page min-h-screen"><Container className="py-14 md:py-20"><p className="eyebrow-red text-xs font-bold tracking-[.16em]">CATÁLOGO DE PRODUTOS</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-.05em] md:text-6xl">Componentes organizados para consulta técnica.</h1><p className="mt-5 max-w-2xl leading-7 text-white/65">Busque por código ou navegue pelas famílias. Informações técnicas adicionais são tratadas diretamente com a equipe LSQ.</p><CatalogBrowser /></Container></div></PublicShell>; }
