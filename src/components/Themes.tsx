import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinic, msg, themes, waLink } from "../data/clinic";
import { gsap, MQ, useMotion, getLenis } from "../motion/setup";
import { ArrowLink, Eyebrow, GhostLotus, Lotus, SplitHeading, WhatsAppButton, bloom } from "./ui";
import { ThemeGlyph } from "./glyphs";
import { renderEm } from "./ui";

const total = themes.length + 1;
const pad = (n: number) => String(n).padStart(2, "0");

export function Themes() {
  const t = clinic.themesIntro;
  const [idx, setIdx] = useState(1);
  const [progress, setProgress] = useState(1 / total);
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const ref = useMotion<HTMLElement>((mm, root) => {
    const track = root.querySelector<HTMLElement>("[data-track]")!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const header = root.querySelector<HTMLElement>("[data-themes-head]");

    // ---------- DESKTOP: carrossel preso pela rolagem ----------
    mm.add(MQ.desktop, () => {
      root.dataset.reel = "on";
      const dist = () => track.scrollWidth - (track.parentElement as HTMLElement).clientWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + 0.8 * dist(),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const vw = window.innerWidth;
            let count = 0;
            cards.forEach((c) => {
              if (c.offsetLeft - self.progress * dist() < vw * 0.58) count++;
            });
            setIdx(Math.max(1, Math.min(total, count)));
            setProgress(1 / total + (1 - 1 / total) * self.progress);
            track.dataset.moving = "1";
            window.clearTimeout((track as unknown as { _t?: number })._t);
            (track as unknown as { _t?: number })._t = window.setTimeout(() => delete track.dataset.moving, 200);
          },
        },
      });
      if (header)
        gsap.to(header, {
          xPercent: 20,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: () => "+=" + 0.35 * dist(), scrub: true },
        });

      // entrada de cada card (círculo que abre de baixo)
      cards.forEach((card, i) => {
        const article = card.querySelector("article");
        const inner = card.querySelector("[data-card-inner]");
        gsap.set(article, { clipPath: "circle(0% at 50% 100%)" });
        gsap.set(inner, { scale: 1.1, transformOrigin: "50% 100%" });
        const play = () => {
          const tl = gsap.timeline({ delay: 0 });
          tl.to(article, { clipPath: "circle(140% at 50% 100%)", duration: 1.9, ease: "power3.inOut" }, 0)
            .to(inner, { scale: 1, duration: 2.1 }, 0);
          const lot = card.querySelector("[data-end-lotus]");
          if (lot) tl.add(bloom(lot, { dur: 1.5, stagger: 0.1 }), 0.3);
        };
        gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 90%",
            once: true,
            onEnter: play,
          },
        });
        // cards que já aparecem na entrada
        if (card.getBoundingClientRect().left < window.innerWidth * 0.9) gsap.delayedCall(0.15 + 0.16 * i, play);
      });

      const focusCard = (e: FocusEvent) => {
        const card = (e.target as HTMLElement).closest("[data-card]") as HTMLElement | null;
        const st = tween.scrollTrigger;
        if (!card || !st) return;
        const cx = card.offsetLeft + card.offsetWidth / 2;
        const prog = Math.max(0, Math.min(1, (cx - window.innerWidth / 2) / dist()));
        const y = st.start + (st.end - st.start) * prog;
        const l = getLenis();
        if (l) l.scrollTo(y, { duration: 1.1 });
        else window.scrollTo({ top: y });
      };
      track.addEventListener("focusin", focusCard);
      return () => {
        track.removeEventListener("focusin", focusCard);
        delete root.dataset.reel;
        gsap.set([track, header], { clearProps: "all" });
        gsap.set(cards.map((c) => c.querySelector("article")), { clearProps: "clipPath" });
        gsap.set(cards.map((c) => c.querySelector("[data-card-inner]")), { clearProps: "transform" });
      };
    });

    // ---------- MOBILE / TABLET: rolagem nativa ----------
    mm.add(MQ.small, () => {
      cards.forEach((c, i) => {
        gsap.from(c, {
          autoAlpha: 0,
          y: 40,
          duration: 1.2,
          delay: 0.14 * Math.min(i, 2),
          scrollTrigger: { trigger: c, start: "top 92%", once: true },
        });
        const lot = c.querySelector("[data-end-lotus]");
        if (lot) gsap.timeline({ scrollTrigger: { trigger: c, start: "top 85%", once: true } }).add(bloom(lot, { dur: 1.5 }));
      });
    });
  });

  // contador e botões no mobile
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (window.matchMedia("(min-width:1024px) and (min-height:640px)").matches) return;
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setIdx(Math.round(p * (total - 1)) + 1);
      setProgress(1 / total + (1 - 1 / total) * p);
      setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <div>
    <section
      ref={ref}
      id="como-ajudo"
      className="group/help relative bg-cream py-24 sm:py-32 lg:py-0 data-[reel=on]:flex data-[reel=on]:h-svh data-[reel=on]:items-center data-[reel=on]:overflow-visible lg:data-[reel=on]:py-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
        <GhostLotus className="-bottom-20 -right-16 h-[34rem] w-[42rem] max-w-none" />
      </div>
      <div ref={trackRef} className="no-scrollbar relative w-full overflow-x-auto group-data-[reel=on]/help:overflow-visible">
        <div data-track className="flex w-max items-stretch gap-8 px-5 sm:px-10 lg:px-[max(2.5rem,calc((100%-82rem)/2+2.5rem))]">
          <div data-themes-head className="flex w-[min(74vw,26rem)] shrink-0 flex-col justify-center lg:w-[clamp(26rem,34vw,34rem)]">
            <Eyebrow n="02" label="Como posso ajudar" />
            <SplitHeading text={t.title} className="mt-7 text-[clamp(2.1rem,3.3vw,3.4rem)] leading-[1.04]" />
            <p className="mt-6 max-w-[28rem] text-text">{t.text}</p>
            <div className="mt-8 flex items-center gap-3 group-data-[reel=on]/help:hidden">
              <button type="button" aria-label="Tema anterior" aria-disabled={edge.start} onClick={() => step(-1)} className={`flex size-11 items-center justify-center rounded-full border border-bronze/35 text-bronze transition-opacity ${edge.start ? "opacity-40" : ""}`}>
                <ChevronLeft className="size-5" />
              </button>
              <button type="button" aria-label="Próximo tema" aria-disabled={edge.end} onClick={() => step(1)} className={`flex size-11 items-center justify-center rounded-full border border-bronze/35 text-bronze transition-opacity ${edge.end ? "opacity-40" : ""}`}>
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <ul className="flex items-stretch gap-8">
            {themes.map((th) => (
              <li
                key={th.slug}
                data-card
                className="w-[min(84vw,22rem)] shrink-0 [container-type:inline-size] lg:w-[clamp(24rem,30vw,27rem)] lg:h-[min(38rem,calc(100svh-10rem))] min-[1600px]:w-[29rem] min-[1600px]:h-[min(40rem,calc(100svh-10rem))]"
              >
                <article className="group/card relative flex h-full flex-col items-center overflow-hidden rounded-t-[50cqw] rounded-b-[2rem] bg-ivory bg-[radial-gradient(70%_60%_at_50%_0%,var(--color-linen),transparent)] px-6 pb-8 pt-11 text-center shadow-card transition-transform duration-700 ease-silk hover:-translate-y-1.5 sm:px-8 lg:pb-[clamp(1rem,2.6svh,1.75rem)] lg:pt-[clamp(1.5rem,4.4svh,2.75rem)]">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-t-[50cqw] rounded-b-[1.5rem] border border-bronze/15" />
                  <div data-card-inner className="relative flex h-full w-full flex-col items-center">
                    <span className="font-display text-[2.9rem] italic leading-none text-bronze lg:text-[clamp(1.9rem,5svh,2.9rem)]">{th.n}</span>
                    <span className="mt-3 text-bronze lg:mt-[clamp(.3rem,1.2svh,.75rem)]"><ThemeGlyph icon={th.icon} className="size-7 lg:size-[clamp(1.25rem,3.4svh,1.75rem)]" /></span>
                    <span className="mt-3 text-[.78rem] font-medium uppercase tracking-[.22em] text-bronze-deep lg:mt-[clamp(.3rem,1.2svh,.75rem)]">{th.label}</span>
                    <h3 className="mt-3 text-[1.65rem] font-medium leading-[1.1] lg:mt-[clamp(.3rem,1.2svh,.75rem)] lg:text-[clamp(1.25rem,3.5svh,1.65rem)]">{renderEm(th.title)}</h3>
                    <p className="mt-3 text-[1.0625rem] leading-[1.62] lg:mt-[clamp(.3rem,1.2svh,.75rem)] lg:text-[clamp(.86rem,2.1svh,1rem)] lg:leading-[1.5]">{th.short}</p>
                    <div className="mt-auto flex w-full flex-col items-center gap-3 pt-5 lg:gap-[clamp(.4rem,1.2svh,.75rem)] lg:pt-[clamp(.5rem,1.6svh,1.25rem)]">
                      <div aria-hidden="true" className="flex w-full items-center gap-3 text-bronze/45">
                        <span className="h-px flex-1 bg-current" /><span className="size-1 rounded-full bg-current" /><span className="h-px flex-1 bg-current" />
                      </div>
                      <WhatsAppButton href={waLink(msg.theme(th.label))} variant="outline" icon="none" className="w-full">
                        {th.cta}
                      </WhatsAppButton>
                      <ArrowLink to={`/terapia/${th.slug}`}>Saiba mais<span className="sr-only"> sobre {th.label.toLowerCase()}</span></ArrowLink>
                    </div>
                  </div>
                </article>
              </li>
            ))}
            <li data-card className="w-[min(84vw,22rem)] shrink-0 [container-type:inline-size] lg:w-[clamp(24rem,30vw,27rem)] lg:h-[min(38rem,calc(100svh-10rem))] min-[1600px]:w-[29rem] min-[1600px]:h-[min(40rem,calc(100svh-10rem))]">
              <article className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-t-[50cqw] rounded-b-[2rem] bg-wine-deep px-8 pb-10 pt-12 text-center text-ivory shadow-card">
                <div data-card-inner className="flex flex-col items-center">
                  <div data-end-lotus className="w-24 text-gold-soft"><Lotus base sw={1.4} className="w-full" /></div>
                  <h3 className="mt-6 text-[1.75rem] text-ivory">{t.notFound}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ivory/80">{t.notFoundText}</p>
                  <div className="mt-6">
                    <WhatsAppButton href={waLink(msg.other)} variant="light">Falar com a Nailza</WhatsAppButton>
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-site relative mt-10 flex items-center gap-6 group-data-[reel=on]/help:absolute group-data-[reel=on]/help:bottom-8 group-data-[reel=on]/help:left-0 group-data-[reel=on]/help:right-0 group-data-[reel=on]/help:mt-0">
        <div role="img" className="flex items-baseline gap-1 font-display text-[1.4rem] italic text-bronze-ink" aria-label={`Tema ${idx} de ${total}`}>
          <span className="inline-block h-[1.6em] overflow-hidden leading-[1.6]" aria-hidden="true">
            <span className="flex flex-col transition-transform duration-700 ease-silk" style={{ transform: `translateY(-${Math.floor(idx / 10) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, d) => <span key={d} className="h-[1.6em]">{d}</span>)}
            </span>
          </span>
          <span className="inline-block h-[1.6em] overflow-hidden leading-[1.6]" aria-hidden="true">
            <span className="flex flex-col transition-transform duration-700 ease-silk" style={{ transform: `translateY(-${(idx % 10) * 10}%)` }}>
              {Array.from({ length: 10 }, (_, d) => <span key={d} className="h-[1.6em]">{d}</span>)}
            </span>
          </span>
          <span aria-hidden="true" className="px-1 text-bronze/60">/</span>
          <span aria-hidden="true">{pad(total)}</span>
        </div>
        <div className="h-px w-40 bg-bronze/20" aria-hidden="true">
          <div className="h-full origin-left bg-bronze transition-transform duration-500" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
    </div>
  );
}
