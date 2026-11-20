import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase);
CustomEase.create("silk", "0.22, 1, 0.36, 1");
CustomEase.create("breath", "0.45, 0, 0.2, 1");
gsap.defaults({ ease: "silk", duration: 1.1 });

export { gsap, ScrollTrigger, SplitText };

// Só em desenvolvimento: ?motion=1 ignora "reduzir movimento" para testar as animações.
// (No pré-render, feito em Node, não existe window: por isso os guards typeof window.)
const IS_BROWSER = typeof window !== "undefined";
const FORCE = IS_BROWSER && import.meta.env.DEV && new URLSearchParams(window.location.search).has("motion");
if (FORCE) document.documentElement.classList.add("force-motion");
const NP = FORCE ? "all" : "(prefers-reduced-motion: no-preference)";

export const reduce = () => IS_BROWSER && !FORCE && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const MQ = {
  ok: NP,
  desktop: `${NP} and (min-width: 1024px) and (min-height: 640px)`,
  small: `${NP} and (max-width: 1023px), ${NP} and (max-height: 639px)`,
  fine: `${NP} and (hover: hover) and (pointer: fine)`,
  wide: `${NP} and (min-width: 1024px)`,
  narrow: `${NP} and (max-width: 1023px)`,
};

/* ---------- Lenis (rolagem suave) ---------- */
let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export function initLenis() {
  if (lenis) return;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduce() || coarse) return;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.95,
    anchors: true,
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: string | number | HTMLElement, offset = -72) {
  if (lenis) lenis.scrollTo(target as never, { offset, duration: 1.4 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ---------- Abertura (loader) ---------- */
const introWillShow = (() => {
  if (!IS_BROWSER) return false;
  try {
    return !reduce() && !sessionStorage.getItem("site-intro-seen");
  } catch {
    return !reduce();
  }
})();
export const shouldShowIntro = () => introWillShow;

let introPromise: Promise<void> | null = null;
export function whenIntroDone(): Promise<void> {
  if (!introPromise) {
    introPromise = new Promise<void>((res) => {
      if (!introWillShow) return res();
      window.addEventListener("site:intro-done", () => res(), { once: true });
      setTimeout(res, 3800);
    });
  }
  return introPromise;
}

/* ---------- Hook de movimento ---------- */
// Roda `setup` depois das fontes carregarem, dentro de um gsap.matchMedia que é desfeito ao sair.
export function useMotion<T extends HTMLElement = HTMLElement>(
  setup: (mm: gsap.MatchMedia, root: T) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    let mm: gsap.MatchMedia | null = null;
    let dead = false;
    const run = () => {
      if (dead || !ref.current) return;
      mm = gsap.matchMedia();
      setup(mm, ref.current);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(run);
    else run();
    return () => {
      dead = true;
      mm?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
