import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mascot } from "@/components/brand/mascot";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductDescription } from "@/components/catalog/product-description";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Check, Headset, Layers, Ruler, WhatsApp } from "@/components/ui/icons";
import { getCategoryLabel, getProduct, products, relatedProducts } from "@/content/catalog";
import { getProductDetails, splitIntro } from "@/content/product-details";
import { whatsappLink } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  const intro = splitIntro(getProductDetails(product.slug).blocks).intro.join(" ");
  return {
    title: `${product.code ? `${product.code} · ` : ""}${product.name}`,
    description: intro ? intro.slice(0, 160) : `${product.name} — catálogo técnico LSQ XH.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const family = getCategoryLabel(product.category);
  const title = product.code ? `${product.code} · ${product.name}` : product.name;
  const message = `Olá, tenho interesse no produto ${title}. Pode me ajudar?`;
  const related = relatedProducts(product);
  const details = getProductDetails(product.slug);
  const { intro, rest } = splitIntro(details.blocks);
  const hasTables = rest.some((block) => block.type === "table");
  const hasDrawings = rest.some((block) => block.type === "img");

  const highlights = [
    { icon: Layers, text: product.subfamily ?? family },
    product.iso ? { icon: Check, text: `Referência ${product.iso}` } : null,
    { icon: Ruler, text: hasTables ? "Tabela de medidas nesta página" : "Dimensões e roscas sob consulta" },
    { icon: Headset, text: "Atendimento técnico pelo WhatsApp" },
  ].filter((item) => item !== null);

  const summary = [
    product.code ? { label: "Série / código", value: product.code } : null,
    { label: "Família", value: family },
    product.subfamily ? { label: "Subfamília", value: product.subfamily } : null,
    product.iso ? { label: "Referência normativa", value: product.iso } : null,
  ].filter((item) => item !== null);

  return (
    <PublicShell>
      <div className="site-page">
        <Container className="pt-6 pb-14 md:pt-8 md:pb-20">
          <nav aria-label="Trilha de navegação" className="flex flex-wrap items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <Link className="hover:text-ink" href="/produtos">Produtos</Link>
            <span aria-hidden="true">›</span>
            <Link className="hover:text-ink" href={`/produtos?categoria=${product.category}`}>{family}</Link>
            {product.subfamily ? (
              <>
                <span aria-hidden="true">›</span>
                <Link className="hover:text-ink" href={`/produtos?categoria=${product.category}&familia=${encodeURIComponent(product.subfamily)}`}>{product.subfamily}</Link>
              </>
            ) : null}
            <span aria-hidden="true">›</span>
            <span className="text-graphite">{product.label}</span>
          </nav>

          <section className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
            <ProductGallery alt={product.name} images={product.images} />
            <div className="lg:pt-2">
              {product.code ? <p className="text-sm font-semibold tracking-[.06em] text-signal-red-strong">{product.code}</p> : null}
              <h1 className="mt-2 text-3xl leading-[1.08] font-semibold tracking-[-.035em] md:text-[2.6rem]">{product.name}</h1>
              {intro.length ? (
                <div className="mt-5 grid gap-2 leading-7 text-steel">
                  {intro.map((line) => <p key={line}>{line}</p>)}
                </div>
              ) : (
                <p className="mt-5 leading-7 text-steel">
                  Série da família {family.toLocaleLowerCase("pt-BR")} no catálogo LSQ. Envie a aplicação ao time técnico para confirmar medidas, roscas e pressão de trabalho antes da cotação.
                </p>
              )}
              <ul className="mt-6 grid gap-x-5 gap-y-3 border-y border-line py-5 sm:grid-cols-2">
                {highlights.map(({ icon: Icon, text }) => (
                  <li className="flex items-center gap-2.5 text-[.8125rem] text-graphite" key={text}>
                    <Icon className="shrink-0 text-lg text-signal-red" /> {text}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="signal-button" href={whatsappLink(message)} rel="noreferrer" target="_blank">
                  <WhatsApp className="text-base" /> Falar com especialista
                </a>
                {rest.length ? <a className="outline-button" href="#dados-tecnicos">Ver dados técnicos</a> : null}
                <Link className="outline-button" href={`/contato?produto=${product.slug}`}>Solicitar cotação</Link>
              </div>
              <div className="mt-8 flex items-end gap-3 rounded-md border border-line bg-surface px-4 pt-3">
                <Mascot className="shrink-0" variant="peek" width={58} />
                <p className="pb-3 text-[.8125rem] leading-5 text-steel">
                  Dúvida na medida ou na rosca? <a className="font-semibold text-ink underline decoration-line-strong underline-offset-2 hover:text-signal-red-strong" href={whatsappLink(`Olá, tenho uma dúvida sobre a medida do produto ${title}.`)} rel="noreferrer" target="_blank">Envie uma foto da peça</a> que o time técnico confirma.
                </p>
              </div>
            </div>
          </section>
        </Container>

        <section className="border-y border-line bg-surface text-graphite" id="dados-tecnicos">
          <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="min-w-0">
              <h2 className="section-title text-2xl md:text-3xl">{hasTables || hasDrawings ? "Especificações e medidas" : "Especificações"}</h2>
              <div className="mt-8">
                {rest.length ? (
                  <ProductDescription blocks={rest} name={product.name} />
                ) : (
                  <p className="max-w-2xl leading-7 text-steel">Pressão de trabalho, materiais, vedação e dimensões são informados pelo time técnico conforme a configuração da série.</p>
                )}
              </div>
              <p className="mt-8 max-w-3xl text-xs leading-5 text-steel">
                Dados conforme o catálogo publicado pela LSQ. Confirme medidas, roscas e pressão de trabalho com o time técnico antes da compra.
              </p>
            </div>
            <aside className="h-fit rounded-md border border-line bg-page p-5 lg:sticky lg:top-32">
              <h2 className="text-sm font-semibold">Resumo</h2>
              <dl className="mt-3 border-t border-line">
                {summary.map((item) => (
                  <div className="grid gap-0.5 border-b border-line py-3" key={item.label}>
                    <dt className="text-xs text-steel">{item.label}</dt>
                    <dd className="text-sm font-semibold text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <a className="signal-button mt-5 w-full" href={whatsappLink(`Olá, gostaria do desenho técnico em PDF do produto ${title}.`)} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base" /> Pedir desenho em PDF
              </a>
              <Link className="outline-button mt-2 w-full" href={`/contato?produto=${product.slug}`}>Solicitar cotação</Link>
            </aside>
          </Container>
        </section>

        {related.length ? (
          <section>
            <Container className="py-14 md:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="section-title text-2xl">Da mesma família</h2>
                <Link className="text-link" href={`/produtos?categoria=${product.category}`}>
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
