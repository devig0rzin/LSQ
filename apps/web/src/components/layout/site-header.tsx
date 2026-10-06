import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button-link";
import type { NavigationItem } from "@/types/content";

export function SiteHeader({ navigation, contactHref = "/contato" }: { navigation: readonly NavigationItem[]; contactHref?: string }) { return <header className="sticky top-0 z-40 border-b border-white/15 bg-graphite text-white"><Container className="flex min-h-20 items-center justify-between gap-6"><Link className="shrink-0 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white" href="/"><Image alt="LSQ XH" className="h-auto w-32" height={58} priority src="/brand/lsq-logo-reference.png" width={220} /></Link><nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">{navigation.map((item) => <Link className="border-b border-transparent py-2 text-sm font-medium text-white/80 hover:border-signal-red hover:text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white" href={item.href} key={item.label}>{item.label}</Link>)}</nav><div className="hidden lg:block"><ButtonLink className="border-white/35 text-white hover:border-white hover:bg-white hover:text-graphite" href={contactHref} variant="secondary">Falar com especialista</ButtonLink></div><MobileNavigation contactHref={contactHref} navigation={navigation} /></Container></header>; }
