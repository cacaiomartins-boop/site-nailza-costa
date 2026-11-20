import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { clinic, msg, themes, waLink } from "../data/clinic";
import { gsap, MQ, useMotion, whenIntroDone } from "../motion/setup";
import { GhostLotus, WhatsAppButton } from "./ui";
import { ThemeGlyph } from "./glyphs";
import { HashLink } from "./links";

const heroCards = [themes[0], themes[1], themes[3]];

export function Hero() {
  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    const qa = (s: string) => Array.from(root.querySelectorAll(s));

    mm.add(MQ.ok, () => {
      gsap.set(qa("[data-hero-in]"), { autoAlpha: 1 });
      const tl = gsap.timeline({ paused: true });
      const ghost = q("[data-ghost] > svg");

      tl.fromTo(
        q("[data-hero-frame]"),
        { clipPath: "inset(38% 22% 0% 22% round 50cqw 50cqw 32px 32px)" },
        { clipPath: "inset(0% 0% 0% 0% round 50cqw 50cqw 32px 32px)", duration: 1.6, ease: "breath" },
        0,
      )
        .set(q("[data-hero-frame]"), { clearProps: "clipPath" }, 1.6)
        .fromTo(q("[data-hero-photo]"), { scale: 1.16, filter: "blur(14px)" }, { scale: 1, duration: 2.2 }, 0)
        .to(q("[data-hero-photo]"), { filter: "blur(0px)", duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(q("[data-hero-shadow]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 0.2)
        .fromTo(ghost, { opacity: 0 }, { opacity: 1, duration: 2.4, ease: "breath" }, 0.2)
        .fromTo(q("[data-hero-eyebrow]"), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 1.6, ease: "power3.out" }, 0.15)
        .fromTo(q("[data-hero-eyebrow-line]"), { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.2 }, 0.15)
        .fromTo(q("[data-hero-arc]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.9, ease: "power2.inOut" }, 0.55)
        .fromTo(q("[data-hero-arc-dot]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.8, ease: "back.out(2)" }, 1.35)
        .fromTo(
          qa("[data-h1-line]"),
          { yPercent: 140, rotate: 2, transformOrigin: "0% 100%" },
          { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12 },
          0.35,
        )
        .fromTo(q("[data-hero-sub]"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.95)
        .fromTo(qa("[data-hero-cta]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1.5, stagger: 0.08, clearProps: "transform" }, 1.05)
        .fromTo(qa("[data-hero-card]"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.12 }, 1.25)
        .fromTo(qa("[data-hero-underline]"), { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.1, ease: "power2.inOut", stagger: 0.22 }, 1.5)
        .fromTo(q("[data-hero-cue-line]"), { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 1.4 }, 1.6)
        .fromTo(q("[data-hero-cue-text]"), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 1.1 }, 1.95);

      let killed = false;
      whenIntroDone().then(() => {
        if (!killed) tl.play();
      });

      const bounce = gsap.to(q("[data-cue-arrow]"), { y: 4, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      return () => {
        killed = true;
        tl.kill();
        bounce.kill();
      };
    });

    // parallax ao rolar (desktop)
    mm.add(MQ.desktop, () => {
      const textEl = q("[data-hero-text]") as HTMLElement;
      const p = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      p.to(q("[data-hero-portrait]"), { yPercent: 10, scale: 1.05, ease: "none" }, 0)
        .to(textEl, { y: () => -0.14 * textEl.offsetHeight, ease: "none" }, 0)
        .to(qa("[data-hero-card]"), { yPercent: (i: number) => -(38 + 32 * i), ease: "none" }, 0);
    });

    // parallax do mouse
    mm.add(MQ.fine, () => {
      const photo = q("[data-hero-photo]");
      const qx = gsap.quickTo(photo, "xPercent", { duration: 1.8, ease: "power3.out" });
      const qy = gsap.quickTo(photo, "yPercent", { duration: 1.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        if (window.scrollY > window.innerHeight) return;
        qx(-(1.6 * (e.clientX / window.innerWidth - 0.5)));
        qy(-(1.2 * (e.clientY / window.innerHeight - 0.5)));
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });
  });

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate overflow-clip bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-cream)_55%,var(--color-blush)_150%)] pb-14 pt-[6.75rem] sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-6 lg:pt-[clamp(5.25rem,14svh,6.5rem)]"
    >
      <div data-ghost>
        <GhostLotus className="-right-24 top-10 h-[46rem] w-[56rem] max-w-none" />
      </div>
      <div className="container-site grid w-full gap-12 lg:grid-cols-2 lg:gap-x-10">
        {/* TEXTO */}
        <div data-hero-text className="flex flex-col lg:self-center lg:pr-8 xl:pr-16">
          <div data-hero-in data-hero-eyebrow className="flex items-center gap-3 text-bronze sm:gap-4">
            <span data-hero-eyebrow-line className="h-px w-8 bg-current opacity-70 sm:w-14" />
            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[.72rem] font-medium uppercase tracking-[.3em] sm:text-[.75rem]">
              {clinic.hero.eyebrow.map((w, i) => (
                <li key={w} className="flex items-center gap-2.5">
                  {i > 0 && <span className="size-[3px] rounded-full bg-current" aria-hidden="true" />}
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <h1
            data-hero-in
            className="mt-7 max-w-[8.2em] text-[clamp(2.6rem,11.5vw,4.25rem)] font-medium leading-[.98] tracking-[-.015em] lg:mt-[clamp(1rem,3svh,1.75rem)] lg:text-[clamp(2.4rem,min(4.8vw,7.6svh),5.75rem)]"
          >
            <span className="block overflow-clip pb-[.1em]" style={{ overflowClipMargin: ".3em" }}>
              <span data-h1-line className="block">{clinic.hero.h1a}</span>
            </span>
            <span className="block overflow-clip pb-[.28em]" style={{ overflowClipMargin: ".35em" }}>
              <span data-h1-line className="block">
                <em className="relative inline-block">
                  {clinic.hero.h1b}
                  <svg
                    viewBox="0 0 400 26"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[.2em] -left-[.04em] -right-[.04em] h-[.27em] w-[calc(100%+.08em)] text-bronze"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                  >
                    <path data-hero-underline d="M3 17.2C64 11.4 142 8.2 220 8.8c62 .5 118 3.5 177 8.6" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
                    <path data-hero-underline d="M54 21.8c78-4.6 164-6.2 262-3.2" strokeWidth="1.25" opacity=".5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </em>
              </span>
            </span>
          </h1>

          <p data-hero-in data-hero-sub className="mt-6 max-w-[34rem] text-[1.1rem] leading-[1.65] text-text sm:text-[1.15rem] lg:mt-[clamp(.9rem,2.6svh,1.5rem)] lg:text-[clamp(1rem,2.5svh,1.15rem)] lg:leading-[1.55]">
            {clinic.hero.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-[clamp(1rem,3.2svh,1.75rem)]">
            <div data-hero-in data-hero-cta>
              <WhatsAppButton href={waLink(msg.hero)} size="lg" icon="arrow">
                {clinic.hero.cta}
              </WhatsAppButton>
            </div>
            <HashLink
              hash="#processo"
              className="link-underline text-[1rem] font-medium text-wine"
            >
              <span data-hero-in data-hero-cta className="inline-block">Como funciona</span>
            </HashLink>
          </div>

          <div data-hero-in data-hero-cta className="mt-8 text-[.9375rem] leading-relaxed text-muted lg:mt-[clamp(.9rem,2.6svh,1.5rem)]">
            <p>
              {clinic.name} · {clinic.crp}
            </p>
            <p>Online para todo o Brasil e exterior</p>
          </div>

          <div className="mt-10 hidden items-center gap-4 text-bronze lg:mt-[clamp(.35rem,1.6svh,1.5rem)] lg:flex">
            <span data-hero-cue-line className="h-12 w-px bg-bronze/50 lg:h-[clamp(1.5rem,5svh,3rem)]" />
            <span data-hero-in data-hero-cue-text className="flex items-center gap-3 text-[.78rem] font-medium uppercase tracking-[.26em]">
              <span className="flex size-8 items-center justify-center rounded-full border border-bronze/40">
                <ArrowDown data-cue-arrow className="size-4" aria-hidden="true" />
              </span>
              {clinic.hero.cue}
            </span>
          </div>
        </div>

        {/* FOTO */}
        <div data-hero-stage className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:max-w-none lg:self-center">
          <div data-hero-portrait className="relative ml-auto w-full lg:w-[min(100%,calc((100svh_-_16rem)*0.8),30rem)] [container-type:inline-size]">
            <div className="relative aspect-[4/5]">
              <div
                data-hero-in
                data-hero-shadow
                className="absolute inset-x-[10%] -bottom-5 h-14 rounded-[50%] bg-bronze-deep/25 blur-2xl"
              />
              <div
                data-hero-in
                data-hero-frame
                className="relative h-full w-full overflow-hidden rounded-b-[2rem] rounded-t-[50cqw] bg-sand"
              >
                <img
                  data-hero-photo
                  src={clinic.photoHero}
                  srcSet="/img/nailza-480.webp 480w, /img/nailza.webp 874w"
                  sizes="(min-width: 1024px) 30rem, min(92vw, 30rem)"
                  alt={`${clinic.name}, psicóloga, sorrindo, sentada em frente ao computador`}
                  width={874}
                  height={874}
                  fetchPriority="high"
                  className="h-full w-full object-cover [object-position:50%_18%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-deep/15 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-b-[2rem] rounded-t-[50cqw] ring-1 ring-inset ring-white/25" />
              </div>
              <svg
                data-hero-in
                aria-hidden="true"
                viewBox="0 0 100 125"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] overflow-visible text-bronze sm:-inset-5 sm:h-[calc(100%+2.5rem)] sm:w-[calc(100%+2.5rem)] lg:-inset-6 lg:h-[calc(100%+3rem)] lg:w-[calc(100%+3rem)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path data-hero-arc d="M0.5 125V50A49.5 49.5 0 0 1 99.5 50V125" vectorEffect="non-scaling-stroke" opacity=".7" />
                <circle data-hero-arc-dot cx="99.5" cy="124" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>

          <ul className="no-scrollbar mt-8 flex snap-x gap-3 overflow-x-auto pb-2 lg:absolute lg:-left-8 lg:bottom-6 lg:mt-0 lg:w-[16rem] lg:flex-col lg:overflow-visible lg:pb-0 xl:-left-14 xl:w-[17rem]">
            {heroCards.map((t, i) => (
              <li
                key={t.slug}
                data-hero-in
                data-hero-card
                className={`w-[17.25rem] shrink-0 snap-start lg:w-full ${i === 0 ? "lg:ml-0" : i === 1 ? "lg:ml-3 xl:ml-7" : "lg:ml-6 xl:ml-14"}`}
              >
                <Link
                  to={`/terapia/${t.slug}`}
                  className="flex items-start gap-3 rounded-2xl border border-white/60 bg-ivory/85 p-4 shadow-soft backdrop-blur transition-transform duration-500 ease-silk hover:-translate-y-1"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-bronze">
                    <ThemeGlyph icon={t.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[1.15rem] leading-tight text-ink">{t.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[.85rem] leading-snug text-muted">{t.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
