"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brand } from "@/content/site";

type MascotVariant = "full" | "peek";

interface MascotProps {
  /** full = corpo inteiro; peek = cabeça e ombros, para "espiar" de uma borda. */
  variant?: MascotVariant;
  className?: string;
  /** Largura renderizada em px (para o `sizes` da imagem). */
  width: number;
  /** Texto alternativo. Vazio quando o mascote é só decorativo ao lado de um texto. */
  alt?: string;
  /** Pequeno aceno ao aparecer. */
  wave?: boolean;
}

const SOURCES: Record<MascotVariant, { src: string; w: number; h: number }> = {
  full: { src: brand.mascot.full, w: 390, h: 751 },
  peek: { src: brand.mascot.peek, w: 390, h: 420 },
};

/**
 * LSquinho, mascote da LSQ. Fica escondido até entrar na tela e então surge
 * com um deslocamento curto. Com movimento reduzido, aparece direto.
 */
export function Mascot({ variant = "full", className = "", width, alt = "", wave = false }: MascotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      node.dataset.state = "shown";
      return;
    }
    node.dataset.state = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.state = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const source = SOURCES[variant];
  return (
    <div
      className={`mascot ${variant === "peek" ? "mascot--peek" : ""} ${wave ? "mascot--wave" : ""} ${className}`}
      data-state="shown"
      ref={ref}
      style={{ width, transformOrigin: "50% 100%" }}
    >
      <Image alt={alt} className="h-auto w-full select-none" draggable={false} height={source.h} sizes={`${width}px`} src={source.src} width={source.w} />
    </div>
  );
}
