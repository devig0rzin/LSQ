import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PublicShell } from "@/components/layout/public-shell";
import { Check } from "@/components/ui/icons";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { certificates, matrix } from "@/content/company";

export const metadata: Metadata = { title: "Certificados", description: "Certificados e registros da matriz Songqiao, fabricante dos engates LSQ." };

export default function CertificatesPage() {
  return (
    <PublicShell>
      <div className="site-page">
        <Container className="pt-8 pb-16 md:pt-10 md:pb-20">
          <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-steel">
            <Link className="hover:text-ink" href="/">Início</Link>
            <span aria-hidden="true">›</span>
            <span className="text-graphite">Certificados</span>
          </nav>
          <p className="eyebrow mt-6">Qualidade</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em] md:text-5xl">Certificados</h1>
          <p className="mt-4 max-w-2xl leading-7 text-steel">
            Certificações e registros da matriz Songqiao, fabricante dos engates do catálogo LSQ. Clique para ampliar.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {matrix.credentials.map((item) => (
              <li className="inline-flex items-center gap-2 text-sm font-medium text-ink" key={item}>
                <Check className="text-signal-red" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <PhotoGallery aspect="10/7" columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" photos={certificates} zoomWidth={760} />
          </div>
          <p className="mt-6 text-xs leading-5 text-steel">Os certificados são emitidos na China; os títulos acima são traduções livres para o português.</p>
        </Container>
      </div>
    </PublicShell>
  );
}
