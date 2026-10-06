export interface ProductCardConceptData {
  family: string;
  name: string;
  statusLabel: string;
  code?: string;
  technicalNote?: string;
  href?: string;
}

interface ProductCardConceptProps {
  product: ProductCardConceptData;
}

export function ProductCardConcept({ product }: ProductCardConceptProps) {
  return (
    <article className="group grid min-h-[31rem] grid-rows-[15rem_1fr] border border-line bg-white shadow-[0_18px_50px_rgba(23,25,28,0.08)] sm:grid-cols-[1.05fr_0.95fr] sm:grid-rows-1">
      <div className="relative grid place-items-center overflow-hidden border-b border-line bg-technical-white p-8 sm:border-r sm:border-b-0">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-signal-red" />
        <div
          aria-hidden="true"
          className="relative aspect-square w-full max-w-64 border border-line bg-white"
        >
          <div className="absolute inset-[16%] rounded-full border-[18px] border-graphite/15" />
          <div className="absolute inset-[31%] rounded-full border-[10px] border-signal-red/80" />
          <div className="absolute inset-x-[12%] top-1/2 h-px bg-steel/30" />
          <div className="absolute inset-y-[12%] left-1/2 w-px bg-steel/30" />
        </div>
        <p className="absolute right-4 bottom-4 text-xs font-medium text-steel">
          Imagem de produto pendente
        </p>
      </div>

      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm font-semibold text-signal-red">{product.family}</p>
          <span className="max-w-32 text-right text-xs font-medium text-steel">
            {product.statusLabel}
          </span>
        </div>

        <h3 className="mt-6 max-w-[18ch] text-2xl leading-tight font-semibold text-graphite text-pretty">
          {product.name}
        </h3>

        <dl className="mt-6 grid gap-4 text-sm">
          {product.code ? (
            <div className="grid grid-cols-[8rem_1fr] gap-3 border-t border-line pt-3">
              <dt className="font-medium text-steel">Código</dt>
              <dd className="font-semibold text-graphite tabular-nums">
                {product.code}
              </dd>
            </div>
          ) : null}
          {product.technicalNote ? (
            <div className="grid grid-cols-[8rem_1fr] gap-3 border-t border-line pt-3">
              <dt className="font-medium text-steel">Informação técnica</dt>
              <dd className="text-graphite">{product.technicalNote}</dd>
            </div>
          ) : null}
        </dl>

        <a
          className="mt-auto inline-flex min-h-11 items-center border-b border-graphite pt-8 pb-2 text-sm font-semibold text-graphite transition-colors duration-150 hover:border-signal-red hover:text-signal-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong"
          href={product.href ?? "#componentes"}
        >
          Ver estrutura do produto
        </a>
      </div>
    </article>
  );
}
