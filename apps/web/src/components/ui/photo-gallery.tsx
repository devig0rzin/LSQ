"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/content/company";

interface PhotoGalleryProps {
  photos: readonly GalleryPhoto[];
  /** Proporção da miniatura (ex.: "4/3" para fotos, "3/4" para certificados). */
  aspect?: string;
  /** Mostra a legenda embaixo da miniatura. */
  captions?: boolean;
  /** Fundo da miniatura: "photo" (cover) ou "document" (contain, fundo claro). */
  fit?: "photo" | "document";
  columns?: string;
  /** Largura máxima da foto ampliada, para fotos de baixa resolução não estourarem. */
  zoomWidth?: number;
}

/** Grade de fotos com ampliação em diálogo nativo (Esc fecha, setas navegam). */
export function PhotoGallery({ photos, aspect = "4/3", captions = true, fit = "photo", columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4", zoomWidth }: PhotoGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  function step(delta: number) {
    setOpen((current) => (current === null ? null : (current + delta + photos.length) % photos.length));
  }

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className={`grid gap-3 sm:gap-4 ${columns}`}>
        {photos.map((photo, index) => (
          <li key={photo.src}>
            <button
              className="group block w-full overflow-hidden rounded-md border border-line bg-surface text-left transition-[border-color,box-shadow] duration-200 hover:border-signal-red hover:shadow-[0_14px_32px_-14px_rgba(19,27,37,0.28)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-signal-red-strong"
              onClick={() => setOpen(index)}
              type="button"
            >
              <span className={`relative block overflow-hidden ${fit === "document" ? "bg-page p-3" : "bg-surface-muted"}`} style={{ aspectRatio: aspect }}>
                <Image
                  alt={photo.caption}
                  className={`${fit === "document" ? "object-contain p-3" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 768px) 33vw, 50vw"
                  src={photo.src}
                />
              </span>
              {captions ? <span className="block border-t border-line px-3 py-2.5 text-[.8125rem] font-medium text-ink">{photo.caption}</span> : null}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        aria-label={current?.caption ?? "Foto ampliada"}
        className="m-auto max-w-none rounded-lg border border-line bg-surface p-0 text-graphite shadow-2xl backdrop:bg-[rgb(19_27_37/70%)]"
        onClose={() => setOpen(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        ref={dialogRef}
        style={{ width: `min(${zoomWidth ?? 1024}px, calc(100vw - 2rem))` }}
      >
        {current ? (
          <figure>
            <div className={`relative bg-page ${zoomWidth ? "" : "h-[min(75vh,48rem)]"}`} style={zoomWidth ? { aspectRatio: aspect } : undefined}>
              <Image alt={current.caption} className="object-contain" fill sizes={`${zoomWidth ?? 1024}px`} src={current.src} />
            </div>
            <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm">
              <span className="font-medium text-ink">{current.caption}</span>
              <span className="flex items-center gap-2">
                <button aria-label="Anterior" className="outline-button min-h-10 px-3" onClick={() => step(-1)} type="button">‹</button>
                <span className="text-xs text-steel tabular-nums">{(open ?? 0) + 1} / {photos.length}</span>
                <button aria-label="Próxima" className="outline-button min-h-10 px-3" onClick={() => step(1)} type="button">›</button>
                <button className="signal-button min-h-10 px-4" onClick={() => setOpen(null)} type="button">Fechar</button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
