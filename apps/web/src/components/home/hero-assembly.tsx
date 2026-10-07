"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hero com montagem da peça amarrada ao scroll.
 *
 * Sequência de imagens (não vídeo) desenhada num <canvas>: cada posição de
 * rolagem corresponde a um quadro exato, para frente e para trás, sem os
 * engasgos de seek de vídeo no Safari/iOS.
 *
 * Frames em /public/hero-sequence/{desktop,mobile}/001.webp … 121.webp
 * (gerados por tools/build-hero-frames.py a partir do vídeo do hero).
 */

const FRAME_COUNT = 121;
const MOBILE_QUERY = "(max-width: 767px)";
const frameSrc = (set: "desktop" | "mobile", index: number) =>
  `/hero-sequence/${set}/${String(index + 1).padStart(3, "0")}.webp`;

/** Ordem de carga em refinamento progressivo: primeiro quadros espaçados, depois os intermediários. */
function loadOrder(count: number, lite: boolean) {
  const order: number[] = [];
  const seen = new Set<number>();
  const steps = lite ? [8] : [16, 8, 4, 2, 1];
  for (const step of steps) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.push(count - 1);
  return order;
}

function prefersLiteLoading() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return Boolean(connection?.saveData || connection?.effectiveType?.includes("2g"));
}

export function HeroAssembly({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !sticky || !canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia(MOBILE_QUERY);

    let frames: (HTMLImageElement | null)[] = [];
    let generation = 0;
    let target = 0;
    let current = 0;
    let drawn = -1;
    let raf = 0;

    function nearestLoaded(index: number) {
      for (let offset = 0; offset < FRAME_COUNT; offset++) {
        const before = frames[index - offset];
        if (before) return index - offset;
        const after = frames[index + offset];
        if (after) return index + offset;
      }
      return -1;
    }

    function draw(force = false) {
      const wanted = Math.round(current);
      const index = nearestLoaded(wanted);
      if (index < 0 || (!force && index === drawn)) return;
      const image = frames[index] as HTMLImageElement;
      const { width, height } = canvas as HTMLCanvasElement;
      // object-fit: cover, centralizado (igual ao <img> de fallback)
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      context!.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
      drawn = index;
      canvas!.dataset.ready = "true";
      canvas!.dataset.frame = String(index);
    }

    function progress() {
      const stickyTop = parseFloat(getComputedStyle(sticky!).top) || 0;
      const distance = section!.offsetHeight - sticky!.offsetHeight;
      if (distance <= 0) return 1;
      const raw = (stickyTop - section!.getBoundingClientRect().top) / distance;
      return Math.min(1, Math.max(0, raw));
    }

    function tick() {
      const delta = target - current;
      // inércia suave; encaixa direto quando a diferença é menor que meio quadro
      current = Math.abs(delta) < 0.5 ? target : current + delta * 0.2;
      draw();
      const p = current / (FRAME_COUNT - 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      raf = current === target ? 0 : requestAnimationFrame(tick);
    }

    function onScroll() {
      const p = reduceMotion.matches ? 1 : progress();
      target = p * (FRAME_COUNT - 1);
      hintRef.current?.toggleAttribute("data-hidden", p > 0.03);
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas!.clientWidth * ratio);
      const height = Math.round(canvas!.clientHeight * ratio);
      if (width && height && (canvas!.width !== width || canvas!.height !== height)) {
        canvas!.width = width;
        canvas!.height = height;
        context!.imageSmoothingQuality = "high";
        draw(true);
      }
    }

    function load() {
      const run = ++generation;
      const set = mobile.matches ? "mobile" : "desktop";
      frames = new Array(FRAME_COUNT).fill(null);
      drawn = -1;
      const order = reduceMotion.matches ? [FRAME_COUNT - 1] : loadOrder(FRAME_COUNT, prefersLiteLoading());
      let cursor = 0;

      const next = () => {
        if (run !== generation || cursor >= order.length) return;
        const index = order[cursor++];
        const image = new Image();
        image.decoding = "async";
        image.src = frameSrc(set, index);
        image
          .decode()
          .then(() => {
            if (run !== generation) return;
            frames[index] = image;
            // redesenha se este quadro está mais perto do alvo que o atual
            if (Math.abs(index - Math.round(current)) <= Math.abs(drawn - Math.round(current))) draw(true);
          })
          .catch(() => undefined)
          .finally(next);
      };

      // o primeiro quadro (ou o último, com movimento reduzido) vem antes; o resto em paralelo, 6 por vez
      next();
      const startRest = () => {
        for (let i = 0; i < 5; i++) next();
      };
      if (document.readyState === "complete") setTimeout(startRest, 150);
      else window.addEventListener("load", () => setTimeout(startRest, 150), { once: true });
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    load();
    onScroll();
    current = target;

    const onModeChange = () => {
      load();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mobile.addEventListener("change", onModeChange);
    reduceMotion.addEventListener("change", onModeChange);

    return () => {
      generation++;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobile.removeEventListener("change", onModeChange);
      reduceMotion.removeEventListener("change", onModeChange);
    };
  }, []);

  return (
    <section aria-label="Apresentação" className="hero-assembly relative" ref={sectionRef}>
      <div className="hero-assembly__sticky sticky top-[4.5rem] overflow-hidden bg-ink" ref={stickyRef}>
        <div aria-hidden="true" className="hero-assembly__stage absolute">
          {/* Fallback sem JS e primeiro paint: mesmo enquadramento do canvas (cover, centralizado). */}
          <picture>
            <source media={`(prefers-reduced-motion: reduce) and ${MOBILE_QUERY}`} srcSet={frameSrc("mobile", FRAME_COUNT - 1)} />
            <source media="(prefers-reduced-motion: reduce)" srcSet={frameSrc("desktop", FRAME_COUNT - 1)} />
            <source media={MOBILE_QUERY} srcSet={frameSrc("mobile", 0)} />
            <img alt="" className="absolute inset-0 size-full object-cover" decoding="async" fetchPriority="high" src={frameSrc("desktop", 0)} />
          </picture>
          <canvas className="absolute inset-0 size-full" ref={canvasRef} />
        </div>

        <div className="hero-assembly__veil pointer-events-none absolute inset-0" />

        <div className="relative z-10 h-full">{children}</div>

        <div
          className="hero-assembly__hint pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[.6875rem] font-medium tracking-[.16em] text-white/60 uppercase md:flex"
          ref={hintRef}
        >
          <span className="hero-assembly__mouse" />
          Role para montar
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-white/8">
          <div className="h-full origin-left scale-x-0 bg-signal-red" ref={barRef} />
        </div>
        <span className="illustrative-tag !bottom-4">Animação ilustrativa</span>
      </div>
    </section>
  );
}
