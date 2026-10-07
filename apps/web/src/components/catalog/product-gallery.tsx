"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: readonly string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3 md:grid-cols-[4.5rem_1fr]">
      <div className="relative order-1 aspect-[5/4] overflow-hidden rounded-md border border-line bg-[#eef1f5] md:order-2">
        <Image alt={alt} className="object-cover" fetchPriority="high" fill loading="eager" sizes="(min-width: 1024px) 40rem, 100vw" src={images[active]} />
      </div>
      {images.length > 1 ? (
        <div className="order-2 flex gap-2 md:order-1 md:flex-col" role="group" aria-label="Fotos do produto">
          {images.map((src, index) => (
            <button
              aria-label={`Ver foto ${index + 1} de ${images.length}`}
              aria-pressed={active === index}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border-2 bg-[#eef1f5] transition-colors md:w-full ${active === index ? "border-signal-red" : "border-line opacity-75 hover:opacity-100"}`}
              key={src}
              onClick={() => setActive(index)}
              type="button"
            >
              <Image alt="" className="object-cover" fill sizes="5rem" src={src} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
