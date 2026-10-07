import Image from "next/image";
import { hasHeaderRow, type DetailBlock } from "@/content/product-details";

/** Linha curta e isolada ("Soquete", "Especificações:") funciona como subtítulo. */
function isHeading(block: DetailBlock) {
  return block.type === "p" && block.lines.length === 1 && block.lines[0].length <= 48 && !/[.!?]$/.test(block.lines[0]);
}

function TableBlock({ block }: { block: DetailBlock & { type: "table" } }) {
  const header = hasHeaderRow(block);
  const [head, ...body] = header ? block.rows : [[], ...block.rows];
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-max border-collapse text-sm">
        {header ? (
          <thead className="bg-page">
            <tr>
              {head.map((cell, index) => (
                <th className="border-b border-line px-3.5 py-2.5 text-left text-xs font-semibold tracking-[.02em] text-ink" colSpan={cell.span} key={index} scope="col">
                  {cell.text}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {body.map((row, rowIndex) => (
            <tr className="border-b border-line last:border-b-0 even:bg-page/60" key={rowIndex}>
              {row.map((cell, cellIndex) =>
                !header && cellIndex === 0 ? (
                  <th className="px-3.5 py-2.5 text-left font-medium text-steel" key={cellIndex} scope="row">{cell.text}</th>
                ) : (
                  <td className={`px-3.5 py-2.5 tabular-nums ${cellIndex === 0 ? "font-semibold text-ink" : "text-graphite"}`} colSpan={cell.span} key={cellIndex}>
                    {cell.text}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageBlock({ block, alt }: { block: DetailBlock & { type: "img" }; alt: string }) {
  return (
    <figure className="w-fit max-w-full">
      <a className="block rounded-md border border-line bg-white p-3 transition-colors hover:border-signal-red" href={block.src} rel="noreferrer" target="_blank" title="Abrir em tamanho original">
        <Image alt={alt} className="h-auto max-h-[28rem] w-auto max-w-full" height={block.h} sizes="(min-width: 1024px) 48rem, 100vw" src={block.src} width={block.w} />
      </a>
    </figure>
  );
}

/** Descrição técnica do produto (texto, tabelas de medidas e desenhos), fiel ao site atual. */
export function ProductDescription({ blocks, name }: { blocks: readonly DetailBlock[]; name: string }) {
  // número do desenho (1, 2, 3…) para o texto alternativo de cada imagem
  const drawingNumber = blocks.map((_, index) => blocks.slice(0, index + 1).filter((block) => block.type === "img").length);
  return (
    <div className="grid max-w-4xl gap-5">
      {blocks.map((block, index) => {
        if (block.type === "table") return <TableBlock block={block} key={index} />;
        if (block.type === "img") {
          return <ImageBlock alt={`${name} — desenho técnico ${drawingNumber[index]}`} block={block} key={index} />;
        }
        if (block.type === "list") {
          return (
            <ul className="grid list-disc gap-1.5 pl-5 leading-7 text-graphite" key={index}>
              {block.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          );
        }
        if (isHeading(block)) {
          return <h3 className="mt-3 text-base font-semibold text-ink" key={index}>{block.lines[0].replace(/:$/, "")}</h3>;
        }
        return (
          <div className="grid gap-1 leading-7 text-graphite" key={index}>
            {block.lines.map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
          </div>
        );
      })}
    </div>
  );
}
