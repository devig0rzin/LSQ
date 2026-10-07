import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Phone, WhatsApp } from "@/components/ui/icons";
import { categories } from "@/content/catalog";
import { contact, whatsappLink } from "@/content/site";
import type { NavigationItem } from "@/types/content";

export function SiteFooter({ navigation }: { navigation: readonly NavigationItem[] }) {
  return (
    <footer className="border-t border-white/10 bg-[#08090a] text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image alt="LSQ XH" className="h-auto w-32" height={58} src="/brand/lsq-logo-reference.png" width={220} />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">Engates rápidos, válvulas e componentes para fluidos. Catálogo técnico e atendimento comercial direto.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[.14em] text-white/45 uppercase">Produtos</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link className="text-white/75 hover:text-white" href={`/produtos?categoria=${category.slug}`}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[.14em] text-white/45 uppercase">Navegação</h2>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link className="text-white/75 hover:text-white" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[.14em] text-white/45 uppercase">Atendimento</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li>
              <a className="inline-flex items-center gap-2 text-white/85 hover:text-white" href={whatsappLink()} rel="noreferrer" target="_blank">
                <WhatsApp className="text-base text-[#3ccf6b]" /> WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-white/85 hover:text-white" href={contact.phoneHref}>
                <Phone className="text-base text-signal-red" /> {contact.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-wrap justify-between gap-3 py-5 text-xs text-white/40">
          <p>© {new Date().getFullYear()} LSQ XH</p>
          <p>Imagens marcadas como ilustrativas não representam instalações reais.</p>
        </Container>
      </div>
    </footer>
  );
}
