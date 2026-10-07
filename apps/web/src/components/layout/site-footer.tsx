import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { Container } from "@/components/layout/container";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { categories } from "@/content/catalog";
import { brand, contact, fullAddress, whatsappLink } from "@/content/site";
import type { NavigationItem } from "@/types/content";

export function SiteFooter({ navigation }: { navigation: readonly NavigationItem[] }) {
  return (
    <footer className="border-t-[3px] border-signal-red bg-surface text-graphite">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Image alt={brand.name} className="h-auto w-32" height={brand.logo.height} src={brand.logo.src} width={brand.logo.width} />
          <p className="mt-5 max-w-xs text-sm leading-6 text-steel">Engates rápidos, válvulas e componentes para fluidos. Catálogo técnico e atendimento comercial direto.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[.14em] text-steel uppercase">Produtos</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link className="text-graphite hover:text-signal-red-strong" href={`/produtos?categoria=${category.slug}`}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[.14em] text-steel uppercase">Navegação</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link className="text-graphite hover:text-signal-red-strong" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <h2 className="text-xs font-semibold tracking-[.14em] text-steel uppercase">Atendimento</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 font-medium text-ink hover:text-signal-red-strong" href={whatsappLink()} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base text-[#1faa53]" /> WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 font-medium text-ink hover:text-signal-red-strong" href={contact.phoneHref}>
                <Phone className="text-base text-signal-red" /> {contact.phoneDisplay}
              </a>
              <span aria-hidden="true" className="mx-1.5 text-line-strong">·</span>
              <a className="font-medium text-ink hover:text-signal-red-strong" href={contact.phone2Href}>{contact.phone2Display}</a>
            </li>
            <li>
              <a className="font-medium text-ink hover:text-signal-red-strong" href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li className="leading-6 text-steel">
              <a className="hover:text-ink" href={contact.mapsUrl} rel="noreferrer" target="_blank">{fullAddress}</a>
              <span className="block">{contact.hours}</span>
            </li>
          </ul>
          <div className="mt-6 flex items-end gap-3">
            <Mascot className="shrink-0" variant="peek" width={56} />
            <p className="pb-1 text-xs leading-5 text-steel">Envie o código ou a foto da peça. O time comercial responde pelo WhatsApp.</p>
          </div>
        </div>
      </Container>
      <div className="border-t border-line bg-page">
        <Container className="flex flex-wrap justify-between gap-3 py-5 text-xs text-steel">
          <p>© {new Date().getFullYear()} {contact.legalName} · CNPJ {contact.cnpj}</p>
          <p>A imagem de destaque da página inicial é ilustrativa; fotos de produto, fábrica e certificados são da LSQ e da matriz.</p>
        </Container>
      </div>
    </footer>
  );
}
