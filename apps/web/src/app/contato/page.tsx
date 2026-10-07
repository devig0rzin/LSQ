import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { contact, media, whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Contato", description: "Fale com o time comercial da LSQ XH pelo WhatsApp ou telefone." };

export default function ContactPage() {
  return (
    <PublicShell>
      <div className="ink-page">
        <Container className="py-10 md:py-16">
          <div className="grid overflow-hidden rounded-md border border-white/10 md:grid-cols-[.9fr_1.1fr]">
            <section className="relative isolate overflow-hidden bg-panel p-7 md:p-10">
              <div className="absolute inset-0 -z-10 opacity-45">
                <Image alt="" className="object-cover object-right" fill sizes="(min-width: 768px) 45vw, 100vw" src={media.contact.src} />
              </div>
              <h1 className="text-3xl leading-tight font-semibold tracking-[-.04em] md:text-4xl">Fale com o nosso time especializado</h1>
              <p className="mt-4 max-w-sm leading-7 text-white/70">Conte o que você procura. Respondemos com a série certa e a cotação.</p>

              <ul className="mt-10 grid gap-6">
                <li>
                  <a className="group flex items-center gap-4" href={whatsappLink("Olá, vim pela página de contato da LSQ.")} rel="noreferrer" target="_blank">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25d366] text-xl text-white"><WhatsApp /></span>
                    <span>
                      <span className="block text-xs font-semibold tracking-[.08em] text-white/55 uppercase">WhatsApp</span>
                      <span className="text-lg font-semibold group-hover:text-signal-red">{contact.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center gap-4" href={contact.phoneHref}>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 text-xl"><Phone /></span>
                    <span>
                      <span className="block text-xs font-semibold tracking-[.08em] text-white/55 uppercase">Telefone</span>
                      <span className="text-lg font-semibold group-hover:text-signal-red">{contact.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-12 flex items-center gap-3 border-t border-white/10 pt-6">
                <Image alt="LSquinho, mascote da LSQ" className="h-auto w-14" height={120} src="/brand/lsquinho-mascot-reference.png" width={120} />
                <p className="text-sm leading-6 text-white/60">Atendimento para empresas (CNPJ) e pessoas físicas (CPF).</p>
              </div>
            </section>

            <section className="bg-technical-white p-6 sm:p-8 md:p-10">
              <h2 className="mb-6 text-lg font-semibold text-graphite">Envie sua mensagem</h2>
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
