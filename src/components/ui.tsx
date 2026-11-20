import { createElement, useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, MQ, useMotion } from "../motion/setup";

/* ------------------------------------------------------------------ */
/* Texto com *itálico*                                                 */
/* ------------------------------------------------------------------ */
export function renderEm(text: string): ReactNode[] {
  return text.split("*").map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

/* ------------------------------------------------------------------ */
/* Símbolo da marca: flor de lótus de traço                            */
/* ------------------------------------------------------------------ */
const r1 = (n: number) => Math.round(n * 10) / 10;
function petal(a: number[], b: number[], w: number, w2 = w) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1],
    L = Math.hypot(dx, dy),
    ux = dx / L,
    uy = dy / L,
    nx = -uy;
  const p = (t: number, o: number) => [a[0] + ux * L * t + nx * o, a[1] + uy * L * t + ux * o];
  const c1 = p(0.3, w),
    c2 = p(0.82, 0.62 * w),
    c3 = p(0.82, -0.62 * w2),
    c4 = p(0.3, -w2);
  return (
    `M${r1(a[0])} ${r1(a[1])}C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(b[0])} ${r1(b[1])}` +
    `C${r1(c3[0])} ${r1(c3[1])} ${r1(c4[0])} ${r1(c4[1])} ${r1(a[0])} ${r1(a[1])}Z`
  );
}
export const PETALS = [
  petal([300, 352], [300, 12], 110),
  petal([300, 352], [98, 100], 70, 88),
  petal([300, 352], [502, 100], 88, 70),
  petal([300, 368], [8, 248], 50, 118),
  petal([300, 368], [592, 248], 118, 50),
];

export function LotusPaths({ base = true }: { base?: boolean }) {
  return (
    <>
      {PETALS.map((d, i) => (
        <path key={i} className="lotus-petal" d={d} vectorEffect="non-scaling-stroke" />
      ))}
      {base && (
        <>
          <path className="lotus-rule" d="M40 438H272" vectorEffect="non-scaling-stroke" />
          <path className="lotus-rule" d="M560 438H328" vectorEffect="non-scaling-stroke" />
          <circle className="lotus-dot" cx="300" cy="438" r="11" fill="currentColor" stroke="none" />
        </>
      )}
    </>
  );
}

export function Lotus({
  base = true,
  sw = 1.5,
  className = "",
}: {
  base?: boolean;
  sw?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={base ? "-10 0 620 470" : "-10 0 620 400"}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <LotusPaths base={base} />
    </svg>
  );
}

/** Animação de "florescer": devolve uma timeline. */
export function bloom(
  root: Element | null | undefined,
  o: { delay?: number; dur?: number; stagger?: number; ease?: string } = {},
) {
  const tl = gsap.timeline({ delay: o.delay ?? 0 });
  if (!root) return tl;
  const petals = root.querySelectorAll(".lotus-petal");
  const rules = root.querySelectorAll(".lotus-rule");
  const dot = root.querySelectorAll(".lotus-dot");
  tl.fromTo(
    petals,
    { drawSVG: "50% 50%" },
    { drawSVG: "0% 100%", duration: o.dur ?? 1.2, stagger: o.stagger ?? 0.12, ease: o.ease ?? "power2.inOut" },
    0,
  );
  if (rules.length)
    tl.fromTo(rules, { drawSVG: "100% 100%" }, { drawSVG: "0% 100%", duration: 0.9, ease: "breath" }, 0.45);
  if (dot.length)
    tl.fromTo(
      dot,
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.6, ease: "back.out(2)" },
      0.4,
    );
  return tl;
}

/** Lótus fantasma, grande, no fundo das seções claras. */
export function GhostLotus({ className = "" }: { className?: string }) {
  const ref = useMotion<HTMLDivElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      const trigger = root.parentElement ?? root;
      gsap.to(root.firstElementChild, {
        yPercent: -14,
        rotate: 6,
        ease: "none",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
  });
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute text-bronze opacity-[.07] ${className}`}>
      <Lotus base={false} sw={1.2} className="h-full w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow, títulos e revelação                                        */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  n,
  label,
  dark = false,
  className = "",
}: {
  n?: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  const ref = useMotion<HTMLDivElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      gsap.set(root, { autoAlpha: 1 });
      const line = root.querySelector("[data-eb-line]");
      const num = root.querySelector("[data-eb-num]");
      const lab = root.querySelector("[data-eb-label]");
      gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set([num, lab].filter(Boolean), { autoAlpha: 0, x: -14 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 88%", once: true } });
      tl.to(line, { scaleX: 1, duration: 1.2 }, 0);
      if (num) tl.to(num, { autoAlpha: 1, x: 0, duration: 1 }, 0);
      tl.to(lab, { autoAlpha: 1, x: 0, duration: 1.6, ease: "power3.out" }, 0.1);
    });
  });
  return (
    <div
      ref={ref}
      data-reveal
      className={`flex items-center gap-4 ${dark ? "text-gold-soft" : "text-bronze"} ${className}`}
    >
      {n && (
        <span data-eb-num className={`font-display text-[1.35rem] italic ${dark ? "" : "text-bronze-ink"}`}>
          {n}
        </span>
      )}
      <span data-eb-line className="h-px w-10 bg-current opacity-60" />
      <span data-eb-label className={`text-[.75rem] font-medium uppercase tracking-[.3em] ${dark ? "" : "text-bronze-ink"}`}>
        {label}
      </span>
    </div>
  );
}

export function SplitHeading({
  text,
  as = "h2",
  className = "",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useMotion<HTMLElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      gsap.set(root, { autoAlpha: 1 });
      SplitText.create(root, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self: { lines: Element[] }) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.25,
            stagger: 0.1,
            ease: "silk",
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          }),
      });
    });
  });
  return createElement(as, { ref, "data-reveal": true, className }, renderEm(text));
}

export function Reveal({
  children,
  className = "",
  y = 36,
  stagger = 0.12,
  start = "top 82%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useMotion<HTMLDivElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      const items = Array.from(root.querySelectorAll("[data-reveal-item]"));
      gsap.set(root, { autoAlpha: 1 });
      gsap.fromTo(
        items.length ? items : root,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger,
          ease: "silk",
          scrollTrigger: { trigger: root, start, once: true },
        },
      );
    });
  });
  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Botões                                                              */
/* ------------------------------------------------------------------ */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Variant = "primary" | "outline" | "light" | "ghost";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-wine text-ivory shadow-wine hover:bg-wine-deep",
  outline: "border border-wine/40 text-wine hover:border-wine hover:bg-wine hover:text-ivory",
  light: "bg-ivory text-wine shadow-soft hover:bg-white",
  ghost: "text-wine underline decoration-wine/30 underline-offset-[6px] hover:decoration-wine",
};

function track(label: string) {
  const w = window as unknown as Record<string, unknown>;
  try {
    (w.dataLayer as unknown[] | undefined)?.push({ event: "whatsapp_click", label });
    (w.gtag as ((...a: unknown[]) => void) | undefined)?.("event", "whatsapp_click", { label });
    (w.fbq as ((...a: unknown[]) => void) | undefined)?.("track", "Contact");
  } catch {
    /* sem rastreio */
  }
}

export function WhatsAppButton({
  href,
  variant = "primary",
  size = "md",
  icon = "wa",
  children,
  className = "",
  external = true,
}: {
  href: string;
  variant?: Variant;
  size?: "md" | "lg";
  icon?: "wa" | "arrow" | "none";
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || variant === "ghost") return;
    const mq = window.matchMedia(MQ.fine);
    if (!mq.matches) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.18);
      qy((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const leave = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [variant]);

  const sizes = size === "lg" ? "h-14 px-7 text-[1.02rem] sm:h-[3.75rem] sm:px-8" : "h-12 px-6 text-[.95rem]";
  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => external && track(String(children))}
      className={`inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[.01em] transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-500 ease-silk ${sizes} ${VARIANTS[variant]} ${className}`}
    >
      {icon === "wa" && <WhatsAppIcon className="size-[1.15em]" />}
      <span>{children}</span>
      {icon === "arrow" && <ArrowRight className="size-[1.1em]" aria-hidden="true" />}
      {external && <span className="sr-only"> (abre o WhatsApp em nova aba)</span>}
    </a>
  );
}

export function ArrowLink({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={`link-underline inline-flex items-center gap-2 text-[.95rem] font-medium text-wine ${className}`}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Selo circular                                                       */
/* ------------------------------------------------------------------ */
export function Seal({ text, className = "" }: { text: string; className?: string }) {
  const id = "seal" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useMotion<HTMLDivElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      gsap.set(root, { autoAlpha: 1 });
      const ring = root.querySelector("[data-seal-ring]");
      gsap.from(root.firstElementChild, {
        scale: 0.4,
        rotate: -120,
        autoAlpha: 0,
        duration: 1.8,
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      });
      const spin = gsap.to(ring, { rotate: 360, duration: 36, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          gsap.to(spin, { timeScale: 1 + Math.min(v / 400, 6), duration: 0.2, overwrite: true });
          gsap.to(spin, { timeScale: 1, duration: 1.8, ease: "power2.out", delay: 0.2, overwrite: false });
        },
      });
    });
  });
  return (
    <div ref={ref} data-reveal className={`text-bronze-deep ${className}`}>
      <svg viewBox="0 0 200 200" className="size-full" role="img" aria-label={text.replace(/·/g, ",")}>
        <circle cx="100" cy="100" r="98" className="fill-ivory/85" />
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeOpacity=".25" />
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <g data-seal-ring>
          <text fontSize="12" fontWeight="500" fill="currentColor" letterSpacing="2">
            <textPath href={`#${id}`} textLength="470" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </g>
        <svg x="72" y="74" width="56" height="52" viewBox="-10 0 620 400" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <LotusPaths base={false} />
        </svg>
      </svg>
    </div>
  );
}
