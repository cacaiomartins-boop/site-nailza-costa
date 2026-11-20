import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "../motion/setup";

const DESKTOP = "(min-width: 1024px) and (min-height: 640px)";
const px = (v: string) => parseFloat(v) || 0;

/**
 * Faz o conteúdo da seção caber inteiro em 100svh no desktop.
 * Mede a altura natural, soma o "chrome" (padding/borda dos ancestrais até a section/footer)
 * e aplica scale linear + margem negativa para o layout encolher junto.
 */
export function FitBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    box.style.transition = "none"; // com "reduzir movimento" o CSS global põe transição em tudo; aqui o ajuste tem de ser imediato
    const mql = window.matchMedia(DESKTOP);
    let last = 1;
    let timer = 0;
    let raf = 0;

    const refreshTriggers = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    };

    const measure = () => {
      box.style.transform = "";
      box.style.marginBlock = "";
      let s = 1;
      if (mql.matches) {
        const h = box.offsetHeight;
        let chrome = 0;
        for (let el = box.parentElement; el; el = el.parentElement) {
          const cs = getComputedStyle(el);
          chrome += px(cs.paddingTop) + px(cs.paddingBottom) + px(cs.borderTopWidth) + px(cs.borderBottomWidth);
          if (el.tagName === "SECTION" || el.tagName === "FOOTER") break;
        }
        if (h > 0) s = Math.min(1, Math.max(0.7, (window.innerHeight - chrome) / h));
        if (s < 0.995) {
          box.style.transformOrigin = "50% 50%";
          box.style.transform = `scale(${s})`;
          box.style.marginBlock = `${-(h * (1 - s)) / 2}px`;
        } else {
          s = 1;
        }
      }
      box.dataset.fit = s.toFixed(3);
      if (Math.abs(s - last) > 0.004) {
        last = s;
        refreshTriggers();
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(box);
    window.addEventListener("resize", schedule);
    mql.addEventListener("change", schedule);
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    fonts?.ready.then(schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      mql.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
