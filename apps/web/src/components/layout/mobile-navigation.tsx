"use client";

import { useRef } from "react";

import { Menu, Phone, WhatsApp } from "@/components/ui/icons";
import { contact, whatsappLink } from "@/content/site";
import type { NavigationItem } from "@/types/content";

interface MobileNavigationProps {
  contactHref: string;
  navigation: readonly NavigationItem[];
}

export function MobileNavigation({ contactHref, navigation }: MobileNavigationProps) {
  const disclosureRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    disclosureRef.current?.removeAttribute("open");
  }

  return (
    <details className="group relative lg:hidden" ref={disclosureRef}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-sm border border-white/25 px-3.5 text-sm font-semibold transition-colors duration-150 active:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
        <Menu className="text-lg" />
        Menu
      </summary>
      <div className="absolute top-[calc(100%+0.75rem)] right-0 w-[min(21rem,calc(100vw-2rem))] rounded-md border border-white/10 bg-panel p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <nav aria-label="Principal no celular" className="grid">
          {navigation.map((item) => (
            <a
              className="rounded-sm px-3 py-3.5 text-base font-semibold text-white/90 transition-colors duration-150 active:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
              href={item.href}
              key={item.label}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid gap-2 border-t border-white/10 p-2 pt-4">
            <a className="signal-button w-full" href={whatsappLink("Olá, vim pelo site da LSQ e quero falar com um especialista.")} onClick={closeMenu} rel="noreferrer" target="_blank">
              <WhatsApp className="text-base" /> Falar com especialista
            </a>
            <a className="outline-button w-full" href={contact.phoneHref} onClick={closeMenu}>
              <Phone className="text-base" /> {contact.phoneDisplay}
            </a>
            <a className="sr-only" href={contactHref}>Página de contato</a>
          </div>
        </nav>
      </div>
    </details>
  );
}
