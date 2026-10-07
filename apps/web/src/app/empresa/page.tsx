import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Catalog, Headset, Layers, Tour360 } from "@/components/ui/icons";
import { MediaImage } from "@/components/ui/media-image";
import { categories, products } from "@/content/catalog";
import { media } from "@/content/site";

export const metadata: Metadata = { title: "Empresa", description: "Conheça a LSQ XH: engates rápidos, válvulas e componentes para fluidos." };

const pillars = [
  { icon: Catalog, title: "Catálogo técnico", text: `${products.length} séries organizadas em ${categories.length} famílias.` },
  { icon: Tour360, title: "Fábrica na China", text: "Ambiente de produção aberto em tour 360°." },
  { icon: Headset, title: "Atendimento direto", text: "WhatsApp e telefone com o time comercial." },
  { icon: Layers, title: "CNPJ e CPF", text: "Atendimento para empresas e pessoas físicas." },
];

export default function CompanyPage() {
  return (
    <PublicShell>
      <div className="ink-page">
        <section className="photo-veil relative isolate flex min-h-[24rem] items-end overflow-hidden md:min-h-[28rem]">
          <div className="absolute inset-0 -z-10">
            <MediaImage asset={media.factoryExterior} eager hideTag sizes="100vw" />
          </div>
          <Container className="relative z-10 pb-10 md:pb-14">
            <h1 className="text-4xl font-semibold tracking-[-.045em] md:text-6xl">Nossa empresa</h1>
            <p className="mt-3 max-w-md text-white/75">Conexões para fluidos, da fábrica na China ao atendimento no Brasil.</p>
          </Container>
          <span className="illustrative-tag">Imagem ilustrativa</span>
        </section>

        <section className="bg-technical-white text-graphite">
          <Container className="grid gap-10 py-14 md:grid-cols-[1fr_1.05fr] md:items-center md:py-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-.035em] md:text-4xl">Sobre a LSQ</h2>
              <p className="mt-5 max-w-lg leading-8 text-steel">
                A LSQ XH trabalha com engates rápidos hidráulicos e pneumáticos, engates de refrigeração, válvulas de alta pressão e acessórios. O catálogo reúne as séries da fábrica na China, e o atendimento comercial é feito direto com o time no Brasil.
              </p>
              <p className="mt-4 max-w-lg leading-8 text-steel">
                O objetivo é simples: você encontra a série, tira as dúvidas técnicas e recebe a cotação sem intermediários.
              </p>
              <Link className="signal-button mt-7" href="/fabrica">
                Conheça nossa fábrica <ArrowRight className="icon-shift" />
              </Link>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md">
              <MediaImage asset={media.factoryInterior} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          </Container>
          <div className="border-t border-[#dfe3e6]">
            <Container className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
              {pillars.map(({ icon: Icon, title, text }, index) => (
                <div className={`flex gap-3 pr-4 ${index % 2 ? "border-l border-[#dfe3e6] pl-4 sm:pl-6" : ""} ${index === 2 ? "lg:border-l lg:pl-6" : ""}`} key={title}>
                  <Icon className="mt-0.5 shrink-0 text-2xl text-signal-red" />
                  <p className="text-sm leading-6">
                    <span className="block font-semibold">{title}</span>
                    <span className="text-steel">{text}</span>
                  </p>
                </div>
              ))}
            </Container>
          </div>
        </section>

        <section>
          <Container className="flex flex-wrap items-center justify-between gap-6 py-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-.03em] md:text-3xl">Comece pelo catálogo.</h2>
              <p className="mt-2 text-white/65">Busque pelo código da série ou navegue pelas famílias.</p>
            </div>
            <Link className="signal-button" href="/produtos">
              Ver produtos <ArrowRight className="icon-shift" />
            </Link>
          </Container>
        </section>
      </div>
    </PublicShell>
  );
}
