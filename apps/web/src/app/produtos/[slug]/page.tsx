import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { ProductTabs } from "@/components/catalog/product-tabs";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Check, Headset, Layers, Ruler, WhatsApp } from "@/components/ui/icons";
import { getCategoryLabel, getProduct, products, relatedProducts } from "@/content/catalog";
import { media, whatsappLink } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.code ? `${product.code} · ` : ""}${product.name}`, description: `${product.name} — catálogo técnico LSQ XH.` };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const family = getCategoryLabel(product.category);
  const title = product.code ? `${product.code} · ${product.name}` : product.name;
  const message = `Olá, tenho interesse no produto ${title}. Pode me ajudar?`;
  const related = relatedProducts(product);

  const highlights = [
    { icon: Layers, text: family },
    product.iso ? { icon: Check, text: `Referência ${product.iso}` } : null,
    { icon: Ruler, text: "Dimensões e roscas sob consulta" },
    { icon: Headset, text: "Atendimento técnico pelo WhatsApp" },
  ].filter((item) => item !== null);

  const specs = [
    product.code ? { label: "Série / código", value: product.code } : null,
    { label: "Família", value: family },
    product.iso ? { label: "Referência normativa", value: product.iso } : null,
  ].filter((item) => item !== null);

  return (
    <PublicShell>
      <div className="ink-page">
        <Container className="pt-6 pb-14 md:pt-8 md:pb-20">
          <nav aria-label="Trilha de navegação" className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
            <Link className="hover:text-white" href="/produtos">Produtos</Link>
            <span aria-hidden="true">›</span>
            <Link className="hover:text-white" href={`/produtos?categoria=${product.category}`}>{family}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-white/80">{product.label}</span>
          </nav>

          <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
            <ProductGallery alt={product.name} images={product.images} />
            <div className="lg:pt-2">
              {product.code ? <p className="text-sm font-semibold tracking-[.06em] text-white/60">{product.code}</p> : null}
              <h1 className="mt-2 text-3xl leading-[1.08] font-semibold tracking-[-.035em] md:text-[2.6rem]">{product.name}</h1>
              <p className="mt-5 leading-7 text-white/70">
                Série da família {family.toLocaleLowerCase("pt-BR")} no catálogo LSQ. Envie a aplicação ao time técnico para confirmar medidas, roscas e pressão de trabalho antes da cotação.
              </p>
              <ul className="mt-6 grid gap-x-5 gap-y-3 border-y border-white/10 py-5 sm:grid-cols-2">
                {highlights.map(({ icon: Icon, text }) => (
                  <li className="flex items-center gap-2.5 text-[.8125rem] text-white/80" key={text}>
                    <Icon className="shrink-0 text-lg text-signal-red" /> {text}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="signal-button" href={whatsappLink(message)} rel="noreferrer" target="_blank">
                  <WhatsApp className="text-base" /> Falar com especialista
                </a>
                <Link className="outline-button" href={`/contato?produto=${product.slug}`}>Solicitar cotação</Link>
              </div>
            </div>
          </section>
        </Container>

        <section className="bg-technical-white text-graphite">
          <Container className="py-10 md:py-14">
            <ProductTabs
              tabs={[
                {
                  id: "visao",
                  label: "Visão geral",
                  content: (
                    <div className="grid gap-8 md:grid-cols-[1fr_.9fr] md:items-center">
                      <div>
                        <h2 className="text-2xl font-semibold tracking-[-.02em]">{title}</h2>
                        <p className="mt-4 max-w-xl leading-7 text-steel">
                          As informações desta página seguem o catálogo publicado pela LSQ. Para validar compatibilidade, dimensões e aplicação, fale com o time técnico: a resposta sai com a especificação certa para a sua demanda.
                        </p>
                        <a className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-red hover:text-graphite" href={whatsappLink(message)} rel="noreferrer" target="_blank">
                          Consultar aplicação <ArrowRight />
                        </a>
                      </div>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-ink">
                        <Image alt={media.macro.alt} className="object-cover" fill sizes="(min-width: 768px) 40vw, 100vw" src={media.macro.src} />
                        <span className="illustrative-tag">Imagem ilustrativa</span>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "specs",
                  label: "Especificações",
                  content: (
                    <div className="max-w-2xl">
                      <dl className="border-t border-[#dfe3e6]">
                        {specs.map((spec) => (
                          <div className="grid grid-cols-[1fr_1.2fr] gap-4 border-b border-[#dfe3e6] py-3.5" key={spec.label}>
                            <dt className="text-sm text-steel">{spec.label}</dt>
                            <dd className="text-sm font-semibold">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-5 text-sm leading-6 text-steel">Pressão de trabalho, materiais, vedação e dimensões são informados pelo time técnico conforme a configuração da série.</p>
                    </div>
                  ),
                },
                {
                  id: "docs",
                  label: "Documentação",
                  content: (
                    <div className="max-w-2xl">
                      <p className="leading-7 text-steel">Desenhos técnicos e tabelas dimensionais desta série são enviados sob consulta.</p>
                      <a className="signal-button mt-5" href={whatsappLink(`Olá, gostaria do desenho técnico do produto ${title}.`)} rel="noreferrer" target="_blank">
                        <WhatsApp className="text-base" /> Pedir desenho técnico
                      </a>
                    </div>
                  ),
                },
              ]}
            />
          </Container>
        </section>

        {related.length ? (
          <section>
            <Container className="py-14 md:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="border-l-2 border-signal-red pl-4 text-2xl font-semibold tracking-[-.03em]">Da mesma família</h2>
                <Link className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-red hover:text-white" href={`/produtos?categoria=${product.category}`}>
                  Ver {family.toLocaleLowerCase("pt-BR")} <ArrowRight />
                </Link>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {related.map((item) => <ProductCard key={item.slug} product={item} />)}
              </div>
            </Container>
          </section>
        ) : null}
      </div>
    </PublicShell>
  );
}
