import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { PressureConverter } from "@/components/tools/pressure-converter";
import { WhatsApp } from "@/components/ui/icons";
import { whatsappLink } from "@/content/site";

export const metadata: Metadata = { title: "Calculadora de pressão", description: "Converta pressão entre kPa, MPa, kgf/cm², psi, bar e atm." };

export default function CalculatorPage() {
  return (
    <PublicShell>
      <div className="site-page">
        <Container className="pt-8 pb-16 md:pt-10 md:pb-20">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span className="text-graphite">Calculadora</span>
          </nav>
          <p className="eyebrow mt-6">Ferramenta</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em] md:text-5xl">Calculadora de unidade de pressão</h1>
          <p className="mt-4 max-w-3xl leading-7 text-steel">
            Pressão (símbolo: p) é a razão entre uma força e a área sobre a qual essa força atua. A unidade de pressão no Sistema Internacional
            é o pascal (Pa); como 1 Pa é uma pressão pequena, no dia a dia se usam o quilopascal (1 kPa = 1000 Pa) e o megapascal. Em hidráulica
            também são comuns bar, psi e kgf/cm².
          </p>

          <div className="mt-10">
            <PressureConverter />
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 rounded-lg border border-line bg-surface px-6 pt-5 sm:px-8">
            <div className="flex items-end gap-4">
              <Mascot className="shrink-0" variant="peek" width={76} />
              <p className="max-w-md pb-6 text-sm leading-6 text-steel">
                Precisa confirmar se um engate atende a pressão de trabalho da sua aplicação? O time técnico ajuda a escolher a série.
              </p>
            </div>
            <a className="signal-button mb-6" href={whatsappLink("Olá, quero confirmar a pressão de trabalho de um engate.")} rel="noreferrer" target="_blank">
              <WhatsApp className="text-base" /> Falar com especialista
            </a>
          </div>
        </Container>
      </div>
    </PublicShell>
  );
}
