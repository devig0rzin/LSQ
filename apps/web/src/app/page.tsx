import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { ProductCard } from "@/components/catalog/product-card";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { HeroProduct } from "@/components/home/hero-product";
import { ArrowRight, Catalog, Headset, Layers, Play, Tour360, WhatsApp } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { categories, categoryCover, countByCategory, featuredProducts, products } from "@/content/catalog";
import { factoryTourUrl, media, whatsappLink } from "@/content/site";

const facts = [
  { icon: Catalog, title: `${products.length} produtos`, text: "no catálogo técnico" },
  { icon: Layers, title: `${categories.length} famílias`, text: "de engates, válvulas e acessórios" },
  { icon: Headset, title: "Atendimento direto", text: "por WhatsApp e telefone" },
  { icon: Tour360, title: "Tour 360°", text: "pela fábrica na China" },
];

export default function HomePage() {
  return (
    <PublicShell>
      <div className="site-page">
        {/* HERO: engate em destaque com legendas técnicas */}
        <HeroProduct>
          <p className="eyebrow hidden sm:block">Engates rápidos · Válvulas · Componentes</p>
          <h1 className="mt-0 max-w-[14ch] text-[2.1rem] leading-[1.04] font-semibold tracking-[-.045em] text-balance sm:mt-4 sm:text-5xl lg:text-[3.6rem]">
            Soluções em conexões <span className="text-signal-red">hidráulicas</span> para o seu negócio.
          </h1>
          <p className="mt-3 max-w-md text-[.9375rem] leading-7 text-steel md:mt-5 md:text-base">
            Engates rápidos, válvulas e componentes para fluidos. Encontre a série no catálogo técnico e fale direto com o time comercial da LSQ.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
            <Link className="signal-button" href="/produtos">
              Ver produtos <ArrowRight className="icon-shift" />
            </Link>
            <a className="outline-button" href={whatsappLink("Olá, vim pelo site da LSQ e quero falar com um especialista.")} rel="noreferrer" target="_blank">
              <WhatsApp className="text-base text-[#1faa53]" /> Falar com especialista
            </a>
          </div>
        </HeroProduct>

        {/* FAIXA DE FATOS */}
        <section aria-label="Resumo" className="border-y border-line bg-surface">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, title, text }, index) => (
              <div
                className={[
                  "flex items-center gap-3.5 border-line py-5 sm:py-6",
                  index % 2 ? "border-l pl-4 sm:pl-6" : "pr-4",
                  index === 2 ? "lg:border-l lg:pl-6" : "",
                  index > 1 ? "border-t lg:border-t-0" : "",
                ].join(" ")}
                key={title}
              >
                <Icon className="shrink-0 text-[1.6rem] text-signal-red" />
                <p className="text-sm leading-5">
                  <span className="block font-semibold text-ink">{title}</span>
                  <span className="text-steel">{text}</span>
                </p>
              </div>
            ))}
          </Container>
        </section>

        {/* FAMÍLIAS: fotos reais de produto */}
        <section>
          <Container className="py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Catálogo</p>
                <h2 className="section-title mt-3 text-2xl md:text-4xl">Nossas famílias de produtos</h2>
              </div>
              <Link className="text-link" href="/produtos">
                Ver catálogo completo <ArrowRight />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  className="family-card group flex flex-col overflow-hidden rounded-md border border-line bg-surface focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong"
                  href={`/produtos?categoria=${category.slug}`}
                  key={category.slug}
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#eef1f5]">
                    <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 22rem, 50vw" src={categoryCover(category)} />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-4 sm:p-5">
                    <h3 className="text-[.9375rem] leading-5 font-semibold sm:text-base">{category.label}</h3>
                    <p className="mt-1 text-xs text-steel">{countByCategory(category.slug)} produtos</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[.8125rem] font-semibold text-signal-red-strong">
                      Ver produtos <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* FÁBRICA */}
        <section className="border-y border-line bg-surface">
          <Container className="grid gap-10 py-16 md:grid-cols-[.85fr_1.15fr] md:items-center md:py-20">
            <div>
              <p className="eyebrow">Matriz na China</p>
              <h2 className="mt-3 text-3xl leading-[1.08] font-semibold tracking-[-.04em] md:text-[2.6rem]">Conheça a fábrica que abastece o catálogo.</h2>
              <p className="mt-5 max-w-md leading-7 text-steel">
                O tour 360° percorre o ambiente de produção da matriz. Abra no seu ritmo, direto no navegador.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="signal-button" href="/producao">
                  Conheça a fábrica <ArrowRight className="icon-shift" />
                </Link>
                <a className="outline-button" href={factoryTourUrl} rel="noreferrer" target="_blank">
                  <Tour360 className="text-lg" /> Abrir tour 360°
                </a>
              </div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
              <MediaImage asset={media.factoryExterior} sizes="(min-width: 768px) 55vw, 100vw" />
              <a
                aria-label="Abrir tour 360° da fábrica em nova aba"
                className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-signal-red shadow-lg transition-[background-color,color,transform] duration-200 hover:scale-105 hover:bg-signal-red hover:text-white"
                href={factoryTourUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Play className="ml-1 text-3xl" />
              </a>
            </div>
          </Container>
        </section>

        {/* DESTAQUES */}
        <section>
          <Container className="py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Mais procurados</p>
                <h2 className="section-title mt-3 text-2xl md:text-4xl">Produtos em destaque</h2>
              </div>
              <Link className="text-link" href="/produtos">
                Ver todos os produtos <ArrowRight />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featuredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </Container>
        </section>

        {/* CTA com o LSquinho */}
        <section className="pb-16 md:pb-24">
          <Container>
            <div className="blueprint relative overflow-hidden rounded-lg border border-line">
              <div className="grid items-end gap-6 px-6 pt-10 sm:px-10 md:grid-cols-[1fr_auto] md:gap-10 md:px-14 md:pt-14">
                <div className="pb-10 md:pb-14">
                  <h2 className="max-w-lg text-3xl leading-tight font-semibold tracking-[-.04em] md:text-4xl">Precisa localizar uma série?</h2>
                  <p className="mt-4 max-w-md leading-7 text-steel">Envie o código, a foto da peça ou a aplicação. O time comercial responde pelo WhatsApp.</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a className="signal-button" href={whatsappLink("Olá, preciso localizar uma série no catálogo da LSQ.")} rel="noreferrer" target="_blank">
                      <WhatsApp className="text-base" /> Falar no WhatsApp
                    </a>
                    <Link className="outline-button" href="/contato">Outras formas de contato</Link>
                  </div>
                </div>
                <div className="flex items-end justify-center gap-4 md:justify-end">
                  <p className="speech-bubble speech-bubble--right mb-[11rem] hidden max-w-[13rem] px-4 py-3 text-sm leading-5 text-graphite lg:block">
                    Manda a foto da peça que a gente encontra a série certa.
                  </p>
                  <Mascot alt="LSquinho, mascote da LSQ" className="max-w-[9.5rem] md:max-w-none" wave width={190} />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </PublicShell>
  );
}
