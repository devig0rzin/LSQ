"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Tour360 } from "@/components/ui/icons";
import type { MediaAsset } from "@/content/site";

export interface FactoryScene {
  id: string;
  label: string;
  asset: MediaAsset;
}

export function FactoryViewer({ scenes, tourUrl }: { scenes: readonly FactoryScene[]; tourUrl: string }) {
  const [active, setActive] = useState(0);
  const scene = scenes[active];

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_15rem]">
      <div className="relative isolate aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-panel lg:aspect-auto lg:min-h-[34rem]">
        {scenes.map((item, index) => (
          <Image
            alt={item.asset.alt}
            className={`object-cover transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
            fill
            key={item.id}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 70vw, 100vw"
            src={item.asset.src}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-7">
          <p className="text-lg font-semibold md:text-xl">{scene.label}</p>
          <a className="signal-button" href={tourUrl} rel="noreferrer" target="_blank">
            <Tour360 className="text-lg" /> Explorar tour 360° <ArrowUpRight />
          </a>
        </div>
        {scene.asset.illustrative ? <span className="illustrative-tag !top-3 !bottom-auto">Imagem ilustrativa</span> : null}
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" role="group" aria-label="Ambientes da fábrica">
        {scenes.map((item, index) => (
          <button
            aria-pressed={index === active}
            className={`group flex w-44 shrink-0 items-center gap-3 rounded-md border p-2 text-left transition-colors lg:w-auto ${index === active ? "border-signal-red bg-signal-red/10" : "border-white/10 bg-panel hover:border-white/30"}`}
            key={item.id}
            onClick={() => setActive(index)}
            type="button"
          >
            <span className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-sm">
              <Image alt="" className="object-cover" fill sizes="4rem" src={item.asset.src} />
            </span>
            <span className="text-[.8125rem] leading-5 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
