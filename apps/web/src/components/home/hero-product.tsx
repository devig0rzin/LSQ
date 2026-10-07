"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

/** Pontos da peça (em % da imagem recortada) e o lado em que a legenda aparece. */
const CALLOUTS = [
  { label: "Plugue", x: 6.4, y: 50, side: "down" },
  { label: "Sextavado", x: 36.5, y: 8, side: "up" },
  { label: "Luva serrilhada", x: 72.6, y: 3, side: "up" },
  { label: "Rosca de conexão", x: 89.4, y: 78, side: "down" },
] as const;

/**
 * Hero com o engate em destaque: entra deslizando, flutua de leve, inclina conforme o
 * ponteiro (computador) e acompanha a rolagem com um pequeno paralaxe.
 * Com movimento reduzido fica estático.
 */
export function HeroProduct({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;
    stage.dataset.ready = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;

    const apply = () => {
      raf = 0;
      const scroll = Math.min(window.scrollY, 800);
      tilt.style.transform = `translate3d(0, ${scroll * -0.06}px, 0) rotateX(${pointerY * -4}deg) rotateY(${pointerX * 6}deg)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = stage.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      schedule();
    };
    const onLeave = () => {
      pointerX = 0;
      pointerY = 0;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section aria-label="Apresentação" className="hero-product relative overflow-hidden">
      <div className="page-container grid items-center gap-6 pt-8 pb-14 md:pt-12 lg:min-h-[min(calc(100svh-6.5rem),46rem)] lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-6 lg:py-10">
        <div className="relative z-10 order-2 lg:order-1">{children}</div>

        <div className="hero-product__stage relative order-1 lg:order-2" ref={stageRef}>
          {/* Fundo técnico: brilho, grade de projeto, anel e linha de centro */}
          <div aria-hidden="true" className="hero-product__glow" />
          <div aria-hidden="true" className="hero-product__grid" />
          <svg aria-hidden="true" className="hero-product__ring" viewBox="0 0 400 400">
            <circle cx="200" cy="200" fill="none" r="196" stroke="var(--line-strong)" strokeWidth="1" />
            <circle className="hero-product__arc" cx="200" cy="200" fill="none" r="196" stroke="var(--signal-red)" strokeDasharray="230 1002" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
          <div aria-hidden="true" className="hero-product__axis" />

          <div className="relative mx-auto w-[min(100%,46rem)] px-2 sm:px-8">
            <div className="hero-product__float">
              <div className="hero-product__tilt" ref={tiltRef}>
                <div className="relative">
                  <Image
                    alt="Engate rápido hidráulico montado: plugue, sextavados, luva serrilhada e rosca de conexão"
                    className="hero-product__image h-auto w-full select-none"
                    draggable={false}
                    fetchPriority="high"
                    height={413}
                    loading="eager"
                    sizes="(min-width: 1024px) 46rem, 100vw"
                    src="/media/engate-hero.webp"
                    width={831}
                  />
                  <ul aria-hidden="true" className="hidden sm:block">
                    {CALLOUTS.map((callout, index) => (
                      <li
                        className={`hero-callout hero-callout--${callout.side}`}
                        key={callout.label}
                        style={{ left: `${callout.x}%`, top: `${callout.y}%`, animationDelay: `${900 + index * 140}ms` }}
                      >
                        <span className="hero-callout__dot" />
                        <span className="hero-callout__line" />
                        <span className="hero-callout__label">{callout.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="hero-product__shadow" />
          </div>
          <span className="illustrative-tag !right-0 !bottom-0">Imagem ilustrativa</span>
        </div>
      </div>
    </section>
  );
}
