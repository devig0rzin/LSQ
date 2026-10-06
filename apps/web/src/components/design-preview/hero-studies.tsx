interface HeroStudy {
  id: string;
  name: string;
  note: string;
  layout: string;
  selected?: boolean;
}

const studies: readonly HeroStudy[] = [
  {
    id: "A",
    name: "Produto dominante",
    note: "Depende de fotografia oficial em alta resolução.",
    layout: "grid-cols-[0.8fr_1.2fr]",
  },
  {
    id: "B",
    name: "Índice de catálogo",
    note: "Recomendada: mostra a função principal sem criar prova falsa.",
    layout: "grid-cols-[1.2fr_0.8fr]",
    selected: true,
  },
  {
    id: "C",
    name: "Brasil e fábrica",
    note: "Aguardar ativos e dados institucionais confirmados.",
    layout: "grid-cols-[0.9fr_1.1fr]",
  },
];

export function HeroStudies() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {studies.map((study) => (
        <article
          className={`border bg-white p-4 ${study.selected ? "border-signal-red shadow-[inset_0_4px_0_var(--signal-red)]" : "border-line"}`}
          key={study.id}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
            <h3 className="text-base font-semibold text-graphite">
              {study.id}. {study.name}
            </h3>
            {study.selected ? (
              <span className="text-xs font-semibold text-signal-red">Recomendada</span>
            ) : null}
          </div>
          <div className={`mt-4 grid h-40 ${study.layout} gap-2 border border-line bg-technical-white p-3`}>
            <div className="grid content-between border-l-4 border-signal-red bg-white p-3">
              <span className="h-2 w-10 bg-graphite/25" />
              <div className="grid gap-2">
                <span className="h-3 w-full bg-graphite/80" />
                <span className="h-2 w-3/4 bg-steel/35" />
                <span className="h-5 w-20 bg-signal-red" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="border border-line bg-white" />
              <span className="border border-line bg-white" />
              <span className="col-span-2 border border-line bg-white" />
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-steel">{study.note}</p>
        </article>
      ))}
    </div>
  );
}
