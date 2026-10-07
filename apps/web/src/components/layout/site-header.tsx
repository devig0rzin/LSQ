import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { WhatsApp } from "@/components/ui/icons";
import { whatsappLink } from "@/content/site";
import type { NavigationItem } from "@/types/content";

export function SiteHeader({ navigation, contactHref = "/contato" }: { navigation: readonly NavigationItem[]; contactHref?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/92 text-white backdrop-blur-md supports-[backdrop-filter]:bg-ink/80">
      <Container className="flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link className="shrink-0 rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white" href="/">
          <Image alt="LSQ XH — página inicial" className="h-auto w-[7.5rem]" height={58} preload src="/brand/lsq-logo-reference.png" width={220} />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              className="relative py-2 text-sm font-medium text-white/80 transition-colors duration-150 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-signal-red after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
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
