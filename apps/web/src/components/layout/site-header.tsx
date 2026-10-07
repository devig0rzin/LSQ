import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Phone, Tour360, WhatsApp } from "@/components/ui/icons";
import { brand, contact, factoryTourUrl, whatsappLink } from "@/content/site";
import type { NavigationItem } from "@/types/content";

export function SiteHeader({ navigation, contactHref = "/contato" }: { navigation: readonly NavigationItem[]; contactHref?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 text-graphite shadow-[0_1px_0_var(--line)] backdrop-blur-md supports-[backdrop-filter]:bg-surface/88">
      {/* Faixa institucional fina, só no computador */}
      <div className="hidden border-b border-line bg-page lg:block">
        <Container className="flex h-8 items-center justify-between text-xs text-steel">
          <p>Engates rápidos, válvulas e componentes para fluidos</p>
          <div className="flex items-center gap-5">
            <a className="inline-flex items-center gap-1.5 hover:text-ink" href={contact.phoneHref}>
              <Phone /> {contact.phoneDisplay}
            </a>
            <a className="hover:text-ink" href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.hours.replace("Segunda a sexta", "Seg. a sex.")}</span>
            <a className="inline-flex items-center gap-1.5 hover:text-ink" href={factoryTourUrl} rel="noreferrer" target="_blank">
              <Tour360 /> Tour 360° da fábrica
            </a>
          </div>
        </Container>
      </div>
      <Container className="flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link className="shrink-0 rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong" href="/">
          <Image alt={`${brand.name} — página inicial`} className="h-auto w-[7rem] md:w-[7.75rem]" height={brand.logo.height} preload src={brand.logo.src} width={brand.logo.width} />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              className="relative py-2 text-[.9375rem] font-medium text-graphite transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-signal-red after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a className="signal-button min-h-10 px-4" href={whatsappLink("Olá, vim pelo site da LSQ e quero falar com um especialista.")} rel="noreferrer" target="_blank">
            <WhatsApp className="text-base" />
            Falar com especialista
          </a>
        </div>
        <MobileNavigation contactHref={contactHref} navigation={navigation} />
      </Container>
    </header>
  );
}
