import { useRef, useState } from "react";
import { Pause, Play, Star } from "lucide-react";
import { clinic } from "../data/clinic";
import { gsap, MQ, ScrollTrigger, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Eyebrow, SplitHeading } from "./ui";

export function Reviews() {
  const r = clinic.reviews;
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const ref = useMotion<HTMLElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      const q = (s: string) => root.querySelector(s);
      // selo de nota
      const badge = q("[data-badge]");
      gsap.set(badge, { autoAlpha: 1 });
      gsap
        .timeline({ scrollTrigger: { trigger: badge, start: "top 85%", once: true } })
        .from(badge, { y: 28, autoAlpha: 0, duration: 1.2 }, 0)
        .from(root.querySelectorAll("[data-star]"), { scale: 0, rotate: -80, duration: 0.9, ease: "back.out(2.4)", stagger: 0.07 }, 0.25)
        .from(q("[data-score]"), { yPercent: 40, autoAlpha: 0, duration: 1.1 }, 0.2);

      // faixa em movimento
      const wrap = q("[data-marquee]");
      const track = q("[data-marquee-track]");
      gsap.set(wrap, { autoAlpha: 1 });
      gsap.from(wrap, { y: 40, autoAlpha: 0, duration: 1.4, scrollTrigger: { trigger: wrap, start: "top 88%", once: true } });
      const tw = gsap.to(track, { xPercent: -50, duration: 72, ease: "none", repeat: -1, paused: true });
      tweenRef.current = tw;
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive && !pausedRef.current) tw.play();
          else tw.pause();
        },
      });
      const slow = () => gsap.to(tw, { timeScale: 0, duration: 0.8, ease: "power2.out", overwrite: true });
      const fast = () => !pausedRef.current && gsap.to(tw, { timeScale: 1, duration: 1.6, delay: 0.3, overwrite: true });
      wrap?.addEventListener("pointerenter", slow);
      wrap?.addEventListener("pointerleave", fast);
      wrap?.addEventListener("focusin", slow);
      wrap?.addEventListener("focusout", fast);

      // aspas
      gsap.from(root.querySelectorAll("[data-quote]"), {
        yPercent: 35,
        rotate: -14,
        scale: 0.7,
        opacity: 0,
        duration: 2,
        stagger: 0.06,
        scrollTrigger: { trigger: wrap, start: "top 78%", once: true },
      });
      return () => {
        wrap?.removeEventListener("pointerenter", slow);
        wrap?.removeEventListener("pointerleave", fast);
        wrap?.removeEventListener("focusin", slow);
        wrap?.removeEventListener("focusout", fast);
      };
    });
  });

  const toggle = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    const tw = tweenRef.current;
    if (!tw) return;
    if (next) tw.pause();
    else {
      tw.timeScale(1);
      tw.play();
    }
  };

  const cards = (hidden: boolean) =>
    r.items.map((it, i) => (
      <li key={(hidden ? "b" : "a") + i} aria-hidden={hidden || undefined} className="w-[min(84vw,22rem)] shrink-0">
        <figure className="flex h-full flex-col rounded-3xl border border-bronze/15 bg-cream p-7 lg:p-[clamp(1.25rem,3.4svh,1.75rem)]">
          <span data-quote className="block h-14 origin-bottom-left font-display text-[6rem] leading-[.9] text-bronze/75 lg:h-[clamp(2.25rem,6svh,3.5rem)] lg:text-[clamp(4rem,10svh,6rem)]" aria-hidden="true">“</span>
          <blockquote className="font-display text-[1.3rem] leading-[1.35] text-ink lg:text-[clamp(1.05rem,2.7svh,1.3rem)]">{it.q}</blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-bronze/12 pt-5 lg:mt-[clamp(.75rem,2.4svh,2rem)] lg:pt-[clamp(.6rem,1.8svh,1.25rem)]">
            <span className="flex size-10 items-center justify-center rounded-full bg-sand text-[.72rem] font-medium tracking-wider text-bronze-deep">
              {it.who.replace(/[^A-Za-zÀ-ú]/g, "").slice(0, 2)}
            </span>
            <span className="text-[.72rem] font-medium uppercase tracking-[.24em] text-muted">{it.who} · Doctoralia</span>
          </figcaption>
        </figure>
      </li>
    ));

  return (
    <section ref={ref} id="avaliacoes" className="fit-section section-pad relative overflow-clip bg-ivory">
      <FitBox>
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="06" label="Acolhimento" />
            <SplitHeading text={r.title} className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:mt-[clamp(.75rem,2.4svh,1.75rem)] lg:!text-[clamp(2.1rem,min(4.4vw,7svh),4.25rem)]" />
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a
              data-badge
              data-reveal
              href={clinic.doctoralia}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-3xl border border-bronze/20 bg-cream px-6 py-5 transition-shadow duration-500 hover:shadow-soft"
            >
              <span data-score className="font-display text-[3.25rem] font-medium leading-[.82] text-ink">{r.rating}</span>
              <span>
                <span className="flex gap-1 text-bronze" aria-label="5 de 5 estrelas">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} data-star className="size-[1.05rem] fill-current" aria-hidden="true" />
                  ))}
                </span>
                <span className="mt-1.5 block text-[.9rem] text-muted">
                  {r.count} {r.countLabel} →<span className="sr-only"> (abre em nova aba)</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div data-marquee data-reveal className="mt-14 overflow-hidden lg:mt-[clamp(1.25rem,5svh,3.5rem)]" role="region" aria-label="Depoimentos">
        <ul data-marquee-track className="flex w-max gap-6 pl-6">
          {cards(false)}
          {cards(true)}
        </ul>
      </div>

      <div className="container-site mt-8 flex flex-wrap items-center justify-between gap-4 lg:mt-[clamp(.75rem,2.4svh,2rem)]">
        <p className="max-w-[40rem] text-[.875rem] text-muted">{r.note}</p>
        <button
          type="button"
          aria-pressed={paused}
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-bronze/30 px-4 py-2 text-[.85rem] text-bronze-deep transition-colors hover:bg-linen"
        >
          {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          <span className="sr-only">{paused ? r.play : r.pause}</span>
          <span aria-hidden="true">{paused ? "Retomar" : "Pausar"}</span>
        </button>
      </div>
      </FitBox>
    </section>
  );
}
