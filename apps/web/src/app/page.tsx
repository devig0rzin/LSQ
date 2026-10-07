import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Catalog, Headset, Layers, Play, Tour360, WhatsApp } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { categories, countByCategory, featuredProducts, products } from "@/content/catalog";
import { factoryTourUrl, media, whatsappLink } from "@/content/site";

const homeFamilies = categories.filter((category) => category.media).slice(0, 4);

const facts = [
  { icon: Catalog, title: `${products.length} produtos`, text: "no catálogo técnico" },
  { icon: Layers, title: `${categories.length} famílias`, text: "de engates, válvulas e acessórios" },
  { icon: Headset, title: "Atendimento direto", text: "por WhatsApp e telefone" },
  { icon: Tour360, title: "Tour 360°", text: "pela fábrica na China" },
];

export default function HomePage() {
  return (
    <PublicShell>
      <div className="ink-page">
        {/* HERO */}
        <section className="photo-veil relative isolate flex min-h-[38rem] items-end overflow-hidden md:min-h-[44rem] md:items-center">
          <div className="absolute inset-0 -z-10">
            <MediaImage asset={media.hero} className="object-[70%_center] md:object-center" eager hideTag sizes="100vw" />
          </div>
          <Container className="relative z-10 pt-40 pb-12 md:py-24">
            <h1 className="max-w-[13ch] text-[2.6rem] leading-[1.02] font-semibold tracking-[-.045em] text-balance sm:text-6xl lg:text-7xl">
              Soluções em conexões <span className="text-signal-red">hidráulicas</span> para o seu negócio.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/75">
              Engates rápidos, válvulas e componentes para fluidos. Encontre a série no catálogo técnico e fale direto com o time comercial da LSQ.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="signal-button" href="/produtos">
                Ver produtos <ArrowRight className="icon-shift" />
              </Link>
              <a className="outline-button" href={whatsappLink("Olá, vim pelo site da LSQ e quero falar com um especialista.")} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base" /> Falar com especialista
              </a>
            </div>
          </Container>
          <span className="illustrative-tag">Imagem ilustrativa</span>
        </section>

        {/* FAIXA DE FATOS */}
        <section aria-label="Resumo" className="border-y border-white/10 bg-panel">
          <Container className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, title, text }, index) => (
              <div
                className={[
                  "flex items-center gap-3.5 border-white/10 py-5 sm:py-6",
                  index % 2 ? "border-l pl-4 sm:pl-6" : "pr-4",
                  index === 2 ? "lg:border-l lg:pl-6" : "",
                  index > 1 ? "border-t lg:border-t-0" : "",
                ].join(" ")}
                key={title}
              >
                <Icon className="shrink-0 text-[1.6rem] text-white/70" />
                <p className="text-sm leading-5">
                  <span className="block font-semibold text-white">{title}</span>
                  <span className="text-white/55">{text}</span>
                </p>
              </div>
            ))}
          </Container>
        </section>

        {/* FAMÍLIAS */}
        <section>
          <Container className="py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="border-l-2 border-signal-red pl-4 text-2xl font-semibold tracking-[-.03em] md:text-4xl">Nossas famílias de produtos</h2>
              <Link className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-red hover:text-white" href="/produtos">
                Ver catálogo completo <ArrowRight />
              </Link>
            </div>
            <div className="no-scrollbar -mx-[var(--page-gutter)] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--page-gutter)] pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {homeFamilies.map((category) => (
                <Link
                  className="family-card group relative flex aspect-[4/5] w-[72%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-md border border-white/10 bg-panel focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white sm:aspect-[4/4.4] sm:w-auto"
                  href={`/produtos?categoria=${category.slug}`}
                  key={category.slug}
                >
                  <Image alt="" className="object-cover" fill sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 72vw" src={category.media as string} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="relative p-5">
                    <h3 className="text-lg leading-6 font-semibold">{category.label}</h3>
                    <p className="mt-1 text-xs text-white/60">{countByCategory(category.slug)} produtos</p>
                    <span className="family-card__cta mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-red transition-colors">
                      Ver produtos <ArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* FÁBRICA */}
        <section className="photo-veil relative isolate overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 -z-10">
            <MediaImage asset={media.factoryExterior} hideTag sizes="100vw" />
          </div>
          <Container className="relative z-10 grid min-h-[30rem] items-end gap-8 py-14 md:min-h-[32rem] md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-md">
              <h2 className="text-3xl leading-[1.05] font-semibold tracking-[-.04em] md:text-5xl">Conheça a fábrica na China.</h2>
              <p className="mt-5 leading-7 text-white/75">
                O tour 360° percorre o ambiente de produção que abastece o catálogo da LSQ. Abra no seu ritmo, direto no navegador.
              </p>
              <Link className="signal-button mt-7" href="/fabrica">
                Conheça a fábrica <ArrowRight className="icon-shift" />
              </Link>
            </div>
            <a
              aria-label="Abrir tour 360° da fábrica em nova aba"
              className="group hidden size-24 items-center justify-center rounded-full border border-white/50 bg-black/30 backdrop-blur-sm transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-signal-red md:flex md:justify-self-center"
              href={factoryTourUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Play className="ml-1 text-3xl" />
            </a>
          </Container>
          <span className="illustrative-tag">Imagem ilustrativa</span>
        </section>

        {/* DESTAQUES */}
        <section>
          <Container className="py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="border-l-2 border-signal-red pl-4 text-2xl font-semibold tracking-[-.03em] md:text-4xl">Produtos em destaque</h2>
              <Link className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-red hover:text-white" href="/produtos">
                Ver todos os produtos <ArrowRight />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {featuredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="relative isolate overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 -z-10 opacity-70">
            <MediaImage asset={media.contact} className="object-right" hideTag sizes="100vw" />
          </div>
          <Container className="py-16 md:py-20">
            <h2 className="max-w-lg text-3xl leading-tight font-semibold tracking-[-.04em] md:text-4xl">Precisa localizar uma série?</h2>
            <p className="mt-4 max-w-md leading-7 text-white/70">Envie o código, a foto da peça ou a aplicação. O time comercial responde pelo WhatsApp.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="signal-button" href={whatsappLink("Olá, preciso localizar uma série no catálogo da LSQ.")} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base" /> Falar no WhatsApp
              </a>
              <Link className="outline-button" href="/contato">Outras formas de contato</Link>
            </div>
          </Container>
        </section>
      </div>
    </PublicShell>
  );
}
