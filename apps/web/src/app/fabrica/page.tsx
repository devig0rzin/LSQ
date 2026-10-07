import type { Metadata } from "next";
import Link from "next/link";
import { FactoryViewer } from "@/components/factory/factory-viewer";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowRight, Tour360, WhatsApp } from "@/components/ui/icons";
import { factoryTourUrl, media, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Fábrica 360°", description: "Tour 360° pela fábrica na China que abastece o catálogo LSQ XH." };

const scenes = [
  { id: "producao", label: "Linha de produção", asset: media.factoryInterior },
  { id: "qualidade", label: "Controle de qualidade", asset: media.quality },
  { id: "armazenagem", label: "Armazenagem", asset: media.warehouse },
  { id: "externa", label: "Visão externa", asset: media.factoryExterior },
];

export default function FactoryPage() {
  return (
    <PublicShell>
      <div className="ink-page">
        <Container className="pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-.045em] md:text-6xl">Conheça nossa fábrica na China</h1>
              <p className="mt-4 max-w-xl leading-7 text-white/70">
                O tour 360° mostra o ambiente real de produção. Ele abre em uma nova aba e carrega só quando você decidir entrar.
              </p>
            </div>
            <a className="outline-button justify-self-start" href={factoryTourUrl} rel="noreferrer" target="_blank">
              <Tour360 className="text-lg" /> Abrir tour 360°
            </a>
          </div>

          <div className="mt-10">
            <FactoryViewer scenes={scenes} tourUrl={factoryTourUrl} />
          </div>
          <p className="mt-4 text-xs leading-5 text-white/45">
            As fotos desta página são ilustrativas e serão substituídas por imagens da unidade. O tour 360° é o registro real do ambiente.
          </p>
        </Container>

        <section className="border-t border-white/10 bg-panel">
          <Container className="flex flex-wrap items-center justify-between gap-6 py-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-.03em]">Quer ver uma série específica?</h2>
              <p className="mt-2 text-white/65">Peça fotos ou vídeo da peça direto ao time comercial.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="signal-button" href={whatsappLink("Olá, vi o tour da fábrica e quero informações sobre uma série.")} rel="noreferrer" target="_blank">
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
