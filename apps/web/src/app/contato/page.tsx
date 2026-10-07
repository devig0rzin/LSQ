import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Mascot } from "@/components/brand/mascot";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { ArrowUpRight, Phone, WhatsApp } from "@/components/ui/icons";
import { contact, fullAddress, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Contato", description: "Fale com o time comercial da LSQ XH pelo WhatsApp ou telefone." };

export default function ContactPage() {
  return (
    <PublicShell>
      <div className="site-page">
        <Container className="pt-8 pb-14 md:pt-10 md:pb-20">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span className="text-graphite">Contato</span>
          </nav>
          <div className="mt-6 grid overflow-hidden rounded-lg border border-line bg-surface shadow-[var(--shadow-card)] md:grid-cols-[.9fr_1.1fr]">
            <section className="blueprint relative flex flex-col border-b border-line p-7 md:border-r md:border-b-0 md:p-10">
              <p className="eyebrow">Atendimento comercial</p>
              <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-[-.04em] md:text-4xl">Fale com o nosso time especializado</h1>
              <p className="mt-4 max-w-sm leading-7 text-steel">Conte o que você procura. Respondemos com a série certa e a cotação.</p>

              <ul className="mt-10 grid gap-6">
                <li>
                  <a className="group flex items-center gap-4" href={whatsappLink("Olá, vim pela página de contato da LSQ.")} rel="noreferrer" target="_blank">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25d366] text-xl text-white"><WhatsApp /></span>
                    <span>
                      <span className="block text-xs font-semibold tracking-[.08em] text-steel uppercase">WhatsApp</span>
                      <span className="text-lg font-semibold text-ink group-hover:text-signal-red-strong">{contact.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-xl text-ink"><Phone /></span>
                  <span>
                    <span className="block text-xs font-semibold tracking-[.08em] text-steel uppercase">Telefones</span>
                    <a className="text-lg font-semibold text-ink hover:text-signal-red-strong" href={contact.phoneHref}>{contact.phoneDisplay}</a>
                    <span aria-hidden="true" className="mx-2 text-line-strong">·</span>
                    <a className="text-lg font-semibold text-ink hover:text-signal-red-strong" href={contact.phone2Href}>{contact.phone2Display}</a>
                  </span>
                </li>
                <li>
                  <a className="group flex items-center gap-4" href={`mailto:${contact.email}`}>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-lg font-semibold text-ink">@</span>
                    <span>
                      <span className="block text-xs font-semibold tracking-[.08em] text-steel uppercase">E-mail</span>
                      <span className="text-lg font-semibold text-ink group-hover:text-signal-red-strong">{contact.email}</span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 rounded-md border border-line bg-surface p-4 text-sm leading-6">
                <p className="font-semibold text-ink">Endereço</p>
                <p className="text-steel">{fullAddress}</p>
                <p className="mt-2 font-semibold text-ink">Horário</p>
                <p className="text-steel">{contact.hours}</p>
                <a className="text-link mt-3" href={contact.mapsUrl} rel="noreferrer" target="_blank">
                  Ver no mapa <ArrowUpRight />
                </a>
              </div>

              <div className="mt-auto flex items-end gap-4 pt-12">
                <Mascot alt="LSquinho, mascote da LSQ" className="-mb-7 shrink-0 md:-mb-10" wave width={112} />
                <p className="speech-bubble speech-bubble--left mb-8 max-w-[15rem] px-4 py-3 text-sm leading-5 text-graphite">
                  Atendemos empresas (CNPJ) e pessoas físicas (CPF).
                </p>
              </div>
            </section>

            <section className="p-6 sm:p-8 md:p-10">
              <h2 className="mb-6 text-lg font-semibold">Envie sua mensagem</h2>
              <Suspense fallback={<div className="h-96" />}>
                <ContactForm />
              </Suspense>
            </section>
          </div>
        </Container>
      </div>
    </PublicShell>
  );
}
