import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Catalog, Check, Headset, Layers, Tour360 } from "@/components/ui/icons";
import { categories, products } from "@/content/catalog";
import { matrix, productionPhotos } from "@/content/company";
import { contact, fullAddress, media } from "@/content/site";

export const metadata: Metadata = { title: "Empresa", description: "LSQ XH Conector de Fluido: engates rápidos da matriz Songqiao, fabricante chinês desde 1983, com atendimento em São Paulo." };

const pillars = [
  { icon: Catalog, title: "Catálogo técnico", text: `${products.length} séries organizadas em ${categories.length} famílias.` },
  { icon: Tour360, title: "Fábrica na China", text: "Ambiente de produção aberto em tour 360°." },
  { icon: Headset, title: "Atendimento em São Paulo", text: `${contact.address.street}, ${contact.address.district}.` },
  { icon: Layers, title: "CNPJ e CPF", text: "Atendimento para empresas e pessoas físicas." },
];

const mosaic = [productionPhotos[3], productionPhotos[5], productionPhotos[6], productionPhotos[8]];

export default function CompanyPage() {
  return (
    <PublicShell>
      <div className="site-page">
        <section className="border-b border-line">
          <Container className="pt-8 pb-12 md:pt-10 md:pb-16">
            <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
              <Link className="hover:text-ink" href="/">Início</Link>
              <span aria-hidden="true">›</span>
              <span className="text-graphite">Empresa</span>
            </nav>
            <div className="mt-6 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end">
              <div>
                <p className="eyebrow">LSQ XH Conector de Fluido</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-.045em] md:text-6xl">Nossa empresa</h1>
                <p className="mt-4 max-w-md leading-7 text-steel">
                  No Brasil, a LSQ XH atende o mercado com os engates rápidos da Songqiao, fabricante chinês desde 1983.
                </p>
              </div>
              <div className="relative aspect-[996/560] overflow-hidden rounded-lg border border-line">
                <Image alt={media.factoryExterior.alt} className="object-cover" fetchPriority="high" fill loading="eager" sizes="(min-width: 768px) 55vw, 100vw" src={media.factoryExterior.src} />
              </div>
            </div>
          </Container>
        </section>

        {/* Matriz */}
        <section className="bg-surface">
          <Container className="grid gap-10 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20">
            <div>
              <h2 className="section-title text-3xl md:text-4xl">A matriz: Songqiao</h2>
              <div className="mt-6 grid max-w-2xl gap-4 leading-8 text-steel">
                {matrix.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
              </div>
              <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                {matrix.credentials.map((item) => (
                  <li className="inline-flex items-center gap-2 text-sm font-medium text-ink" key={item}>
                    <Check className="shrink-0 text-signal-red" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="signal-button" href="/producao">
                  Ver a produção <ArrowRight className="icon-shift" />
                </Link>
                <Link className="outline-button" href="/certificados">Certificados</Link>
              </div>
            </div>
            <div className="grid content-start gap-4">
              <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-line">
                {matrix.facts.map((fact, index) => (
                  <div className={`p-5 ${index % 2 ? "border-l border-line" : ""} ${index > 1 ? "border-t border-line" : ""}`} key={fact.label}>
                    <p className="text-3xl font-semibold tracking-[-.03em] text-ink">{fact.value}</p>
                    <p className="mt-1 text-sm text-steel">{fact.label}</p>
                  </div>
                ))}
              </div>
              <figure className="overflow-hidden rounded-lg border border-line bg-surface">
                <div className="grid grid-cols-2 gap-px bg-line">
                  {mosaic.map((photo) => (
                    <div className="relative aspect-[225/184] bg-surface-muted" key={photo.src}>
                      <Image alt={photo.caption} className="object-cover" fill sizes="(min-width: 768px) 14rem, 50vw" src={photo.src} />
                    </div>
                  ))}
                </div>
                <figcaption className="border-t border-line px-4 py-2.5 text-xs text-steel">
                  {mosaic.map((photo) => photo.caption).join(" · ")} — fábrica da matriz. <Link className="font-semibold text-ink hover:text-signal-red-strong" href="/producao">Ver todas</Link>
                </figcaption>
              </figure>
            </div>
          </Container>
          <div className="border-t border-line">
            <Container className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, title, text }, index) => (
                <div className={`flex gap-3 pr-4 ${index % 2 ? "border-l border-line pl-4 sm:pl-6" : ""} ${index === 2 ? "lg:border-l lg:pl-6" : ""}`} key={title}>
                  <Icon className="mt-0.5 shrink-0 text-2xl text-signal-red" />
                  <p className="text-sm leading-6">
                    <span className="block font-semibold text-ink">{title}</span>
                    <span className="text-steel">{text}</span>
                  </p>
                </div>
              ))}
            </Container>
          </div>
        </section>

        {/* LSQ no Brasil */}
        <section className="border-t border-line">
          <Container className="grid gap-8 py-14 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <h2 className="section-title text-2xl md:text-3xl">LSQ XH no Brasil</h2>
              <p className="mt-5 max-w-lg leading-8 text-steel">
                A LSQ XH trabalha com engates rápidos hidráulicos e pneumáticos, engates de refrigeração, válvulas de alta pressão e acessórios.
                Você encontra a série no catálogo, tira as dúvidas técnicas e recebe a cotação direto com o time em São Paulo.
              </p>
              <p className="mt-4 text-sm text-steel">{fullAddress}</p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6 rounded-lg border border-line bg-surface px-6 pt-5">
              <div className="flex items-end gap-4">
                <Mascot className="shrink-0" wave width={92} />
                <div className="pb-8">
                  <p className="text-lg font-semibold text-ink">Comece pelo catálogo.</p>
                  <p className="mt-1 text-sm text-steel">Busque pelo código da série ou navegue pelas famílias.</p>
                </div>
              </div>
              <Link className="signal-button mb-8" href="/produtos">
                Ver produtos <ArrowRight className="icon-shift" />
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </PublicShell>
  );
}
