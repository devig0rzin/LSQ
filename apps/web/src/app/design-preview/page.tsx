import type { Metadata } from "next";

import { ProductCardConcept } from "@/components/catalog/product-card-concept";
import { HeroStudies } from "@/components/design-preview/hero-studies";
import { TokenSwatch } from "@/components/design-preview/token-swatch";
import { TypeSpecimen } from "@/components/design-preview/type-specimen";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button, ButtonLink } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";
import { previewNavigation } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Design Preview",
  description: "Preview interno da fundação visual LSQ XH para o Gate A.",
};

const colors = [
  { name: "Signal red", hex: "#E31B23", color: "#E31B23", role: "Marca e ação primária", dark: true },
  { name: "Signal strong", hex: "#B5121B", color: "#B5121B", role: "Hover, active e erro", dark: true },
  { name: "Graphite", hex: "#17191C", color: "#17191C", role: "Texto e superfície de autoridade", dark: true },
  { name: "Steel", hex: "#5F6872", color: "#5F6872", role: "Metadados e texto secundário", dark: true },
  { name: "Line", hex: "#D7DCE0", color: "#D7DCE0", role: "Divisores e contornos" },
  { name: "Technical white", hex: "#F7F8F8", color: "#F7F8F8", role: "Fundo técnico" },
] as const;

function SectionIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-5 border-l-4 border-signal-red pl-5 md:grid-cols-[0.8fr_1.2fr] md:items-end md:pl-7">
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-graphite text-pretty">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-steel md:justify-self-end">
        {description}
      </p>
    </div>
  );
}

export default function DesignPreviewPage() {
  return (
    <>
      <SiteHeader contactHref="#componentes" navigation={previewNavigation} />
      <main id="conteudo-principal">
        <section
          className="relative overflow-hidden border-b border-line bg-white py-16 sm:py-24"
          id="fundacao"
        >
          <div aria-hidden="true" className="absolute inset-0 technical-grid-lines" />
          <Container className="relative technical-grid gap-y-12">
            <div className="col-span-4 md:col-span-5 lg:col-span-7">
              <p className="text-sm font-semibold text-signal-red">Design foundation · Gate A</p>
              <h1 className="mt-6 max-w-[14ch] text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-graphite text-pretty">
                Catálogo industrial com precisão editorial.
              </h1>
            </div>
            <div className="col-span-4 grid content-end gap-7 border-t-4 border-graphite bg-technical-white p-6 md:col-span-6 md:col-start-1 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <p className="text-lg leading-8 text-graphite">
                Produto e informação técnica conduzem a experiência. O vermelho
                sinaliza decisões; o restante permanece sóbrio e legível.
              </p>
              <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="text-steel">Direção</dt>
                  <dd className="mt-1 font-semibold text-graphite">Catálogo de engenharia</dd>
                </div>
                <div>
                  <dt className="text-steel">Status</dt>
                  <dd className="mt-1 font-semibold text-graphite">Revisão interna</dd>
                </div>
              </dl>
            </div>
          </Container>
        </section>

        <Section className="border-b border-line bg-technical-white" id="cores">
          <Container>
            <SectionIntro
              description="Seis bases funcionais. O sistema deriva estados dessas cores sem criar uma paleta decorativa ou competir com o produto."
              title="Cor como sinalização"
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {colors.map((color) => (
                <TokenSwatch {...color} key={color.name} />
              ))}
            </div>
          </Container>
        </Section>

        <Section className="border-b border-line bg-white" id="tipografia">
          <Container>
            <SectionIntro
              description="IBM Plex Sans aproxima engenharia e leitura editorial em uma única família. Pesos e escala fazem a hierarquia; labels decorativos não são necessários."
              title="Tipografia técnica, sem frieza"
            />
            <div className="mt-12">
              <TypeSpecimen
                label="Display"
                meta="72–112 / 90% / 600"
                sample="Componentes para sistemas de fluidos"
                sampleClassName="text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
              />
              <TypeSpecimen
                label="Heading 2"
                meta="36–56 / 102% / 600"
                sample="Encontre a família adequada à aplicação"
                sampleClassName="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
              />
              <TypeSpecimen
                label="Body"
                meta="18 / 178% / 400"
                sample="Informação organizada para apoiar a descoberta do produto e preparar uma conversa comercial objetiva."
                sampleClassName="text-lg leading-8 text-steel"
              />
              <TypeSpecimen
                label="Technical data"
                meta="14 / 143% / 600"
                sample="Série LSQ-S1 · conteúdo em validação"
                sampleClassName="text-sm leading-5 font-semibold text-graphite tabular-nums"
              />
            </div>
          </Container>
        </Section>

        <Section className="border-b border-line" id="componentes">
          <Container>
            <SectionIntro
              description="Controles retos, densidade confortável e estados explícitos. Cada elemento informa o que acontece, sem brilho, pills ou decoração gratuita."
              title="Componentes fundamentais"
            />
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div className="border-t-4 border-graphite bg-white p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-graphite">Ações</h3>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Button>Falar com especialista</Button>
                  <Button variant="secondary">Explorar produtos</Button>
                  <Button variant="quiet">Ver detalhes</Button>
                  <Button disabled>Indisponível</Button>
                </div>
                <div className="mt-8 border-t border-line pt-6">
                  <ButtonLink href="#produto" variant="secondary">
                    Revisar card de produto
                  </ButtonLink>
                </div>
              </div>

              <div className="border-t-4 border-signal-red bg-white p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-graphite">Campos</h3>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <Field
                    autoComplete="off"
                    hint="Exemplo de campo de busca futura."
                    id="preview-search"
                    label="Buscar no catálogo"
                    name="preview-search"
                    placeholder="Ex.: série ou família…"
                    type="search"
                  />
                  <Field
                    autoComplete="off"
                    error="Revise o formato antes de continuar."
                    id="preview-code"
                    label="Código do produto"
                    name="preview-code"
                    placeholder="Ex.: LSQ-S1…"
                    spellCheck={false}
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 border border-line bg-white p-6 sm:p-8">
              <div className="grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-12">
                {Array.from({ length: 12 }, (_, index) => (
                  <div
                    className={`h-20 border border-signal-red/25 bg-signal-red/8 ${index > 3 ? "hidden md:block" : ""} ${index > 5 ? "md:hidden lg:block" : ""}`}
                    key={index}
                  />
                ))}
              </div>
              <p className="mt-5 text-sm text-steel">4 colunas no celular · 6 no tablet · 12 no desktop</p>
            </div>
          </Container>
        </Section>

        <Section className="border-b border-line bg-white" id="produto">
          <Container>
            <SectionIntro
              description="Este é um contrato visual, não um produto publicado. Campos sem validação são omitidos e o status da origem permanece visível."
              title="Produto como informação"
            />
            <div className="mt-12 max-w-5xl">
              <ProductCardConcept
                product={{
                  code: "LSQ-S1",
                  family: "Engates hidráulicos",
                  href: "#composicoes",
                  name: "Engate rápido hidráulico",
                  statusLabel: "Conteúdo em validação",
                  technicalNote: "Dados técnicos entram somente após revisão comercial.",
                }}
              />
            </div>
          </Container>
        </Section>

        <Section className="bg-technical-white" id="composicoes" density="spacious">
          <Container>
            <SectionIntro
              description="As três opções foram avaliadas contra disponibilidade de assets e risco de inventar prova. A composição B é a base recomendada para o próximo gate."
              title="Estudos para a Home"
            />
            <div className="mt-12">
              <HeroStudies />
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter navigation={previewNavigation} />
    </>
  );
}
