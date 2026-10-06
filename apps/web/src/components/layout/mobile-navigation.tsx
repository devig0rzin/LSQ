"use client";

import { useRef } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import type { NavigationItem } from "@/types/content";

interface MobileNavigationProps {
  contactHref: string;
  navigation: readonly NavigationItem[];
}

export function MobileNavigation({
  contactHref,
  navigation,
}: MobileNavigationProps) {
  const disclosureRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    disclosureRef.current?.removeAttribute("open");
  }

  return (
    <details className="group relative lg:hidden" ref={disclosureRef}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center border border-white/35 px-4 text-sm font-semibold transition-[background-color,border-color] duration-150 hover:border-white hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white">
        Menu
      </summary>
      <div className="absolute top-[calc(100%+0.75rem)] right-0 w-[min(21rem,calc(100vw-2rem))] border border-line bg-white p-3 text-graphite shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
        <nav aria-label="Principal no celular" className="grid">
          {navigation.map((item) => (
            <a
              className="border-b border-line px-3 py-3 text-base font-semibold transition-colors duration-150 last:border-b-0 hover:bg-technical-white hover:text-signal-red focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-signal-red-strong"
              href={item.href}
              key={item.label}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <ButtonLink className="mt-3" href={contactHref} onClick={closeMenu}>
            Falar com especialista
          </ButtonLink>
        </nav>
      </div>
    </details>
  );
}
