import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, ArrowUpRight, Tour360, WhatsApp } from "@/components/ui/icons";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { matrix, productionPhotos } from "@/content/company";
import { factoryTourUrl, media, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Produção", description: "Fábrica, laboratórios e testes da matriz Songqiao na China, com tour 360°." };

export default function ProductionPage() {
  return (
    <PublicShell>
      <div className="site-page">
        <Container className="pt-8 pb-12 md:pt-10 md:pb-16">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span className="text-graphite">Produção</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">Matriz na China</p>
              <h1 className="mt-3 text-4xl leading-[1.05] font-semibold tracking-[-.045em] md:text-6xl">Produção</h1>
              <p className="mt-4 max-w-md leading-7 text-steel">
                Fábrica, laboratório e salas de teste da Songqiao, onde são feitos os engates do catálogo LSQ. Percorra o ambiente no tour 360°.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="signal-button" href={factoryTourUrl} rel="noreferrer" target="_blank">
                  <Tour360 className="text-lg" /> Abrir tour 360° <ArrowUpRight />
                </a>
                <Link className="outline-button" href="/certificados">Ver certificados</Link>
              </div>
            </div>
            <a
              aria-label="Abrir tour 360° da fábrica em nova aba"
              className="group relative block aspect-[996/648] overflow-hidden rounded-lg border border-line"
              href={factoryTourUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Image alt={media.factoryExterior.alt} className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" fill fetchPriority="high" loading="eager" sizes="(min-width: 1024px) 45rem, 100vw" src={media.factoryExterior.src} />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-sm bg-white/92 px-3 py-2 text-sm font-semibold text-ink shadow">
                <Tour360 className="text-lg text-signal-red" /> Tour 360°
              </span>
            </a>
          </div>
        </Container>

        <section className="border-y border-line bg-surface">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {matrix.facts.map((fact, index) => (
              <div className={`py-6 ${index % 2 ? "border-l border-line pl-4 sm:pl-6" : "pr-4"} ${index === 2 ? "lg:border-l lg:pl-6" : ""} ${index > 1 ? "border-t border-line lg:border-t-0" : ""}`} key={fact.label}>
                <p className="text-3xl font-semibold tracking-[-.03em] text-ink">{fact.value}</p>
                <p className="mt-1 text-sm text-steel">{fact.label}</p>
              </div>
            ))}
          </Container>
        </section>

        <section>
          <Container className="py-14 md:py-20">
            <h2 className="section-title text-2xl md:text-3xl">Por dentro da fábrica</h2>
            <p className="mt-3 max-w-2xl leading-7 text-steel">Usinagem CNC, tratamento térmico, análise de materiais e bancadas de teste de produto.</p>
            <div className="mt-8">
              <PhotoGallery aspect="225/184" columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" photos={productionPhotos} zoomWidth={460} />
            </div>
          </Container>
        </section>

        <section className="border-t border-line bg-surface">
          <Container className="flex flex-wrap items-end justify-between gap-6 pt-10">
            <div className="flex items-end gap-5">
              <Mascot className="shrink-0" variant="peek" width={92} />
              <div className="pb-10">
                <h2 className="text-2xl font-semibold tracking-[-.03em]">Quer ver uma série específica?</h2>
                <p className="mt-2 text-steel">Peça fotos ou vídeo da peça direto ao time comercial.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pb-10">
              <a className="signal-button" href={whatsappLink("Olá, vi a página de produção e quero informações sobre uma série.")} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base" /> Falar no WhatsApp
              </a>
              <Link className="outline-button" href="/produtos">
                Ver catálogo <ArrowRight className="icon-shift" />
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </PublicShell>
  );
}
