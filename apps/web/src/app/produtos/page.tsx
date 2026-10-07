import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { products } from "@/content/catalog";

export const metadata: Metadata = { title: "Produtos", description: "Catálogo técnico LSQ XH: engates rápidos, válvulas e acessórios para fluidos." };

export default function ProductsPage() {
  return (
    <PublicShell>
      <div className="site-page min-h-screen">
        <Container className="pt-10 pb-20 md:pt-14">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span className="text-graphite">Produtos</span>
          </nav>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-.04em] md:text-5xl">Catálogo de produtos</h1>
          <p className="mt-3 max-w-2xl leading-7 text-steel">
            {products.length} séries organizadas por família. Busque pelo código ou navegue pelas categorias.
          </p>
          <Suspense fallback={<div className="mt-8 h-12 max-w-3xl rounded-sm bg-surface" />}>
            <CatalogBrowser />
          </Suspense>
        </Container>
      </div>
    </PublicShell>
  );
}
