import { clinic } from "../data/clinic";
import { gsap, SplitText, MQ, useMotion } from "../motion/setup";
import { Lotus } from "./ui";

export function Manifesto() {
  const m = clinic.manifesto;
  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    const qa = (s: string) => Array.from(root.querySelectorAll(s));
    const shell = q("[data-manifesto-shell]");
    const text = q("[data-manifesto-text]") as HTMLElement;
    const split = SplitText.create(text, { type: "words", wordsClass: "manifesto-word", aria: "none" });
    const words = split.words;
    const lotus = q("[data-manifesto-lotus]");
    const petals = qa(".lotus-petal");
    const rules = qa(".lotus-rule");
    const dot = qa(".lotus-dot");

    mm.add(MQ.ok, () => {
      gsap.fromTo(
        shell,
        { clipPath: "inset(0% 3% 0% 3% round 2.5rem 2.5rem 0rem 0rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0rem)",
          ease: "none",
          scrollTrigger: { trigger: shell, start: "top bottom", end: "top 20%", scrub: true },
        },
      );
    });

    mm.add(MQ.desktop, () => {
      gsap.set(words, { opacity: 0.14 });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q("[data-manifesto-quote]"), { opacity: 0, y: 26 });
      gsap.set(qa("[data-manifesto-value]"), { opacity: 0, y: 14 });
      gsap.set(q("[data-manifesto-line]"), { scaleX: 0, transformOrigin: "0% 50%" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: text, start: "top 55%", end: "85% bottom", scrub: 0.8 },
      });
      tl.to(q("[data-manifesto-line]"), { scaleX: 1, duration: 0.16 }, 0)
        .to(words, { opacity: 1, stagger: { amount: 0.62 }, duration: 0.12 }, 0.02)
        .to(petals, { drawSVG: "0% 100%", duration: 0.4, stagger: 0.06, ease: "power1.inOut" }, 0.2)
        .to(dot, { scale: 1, duration: 0.1, ease: "back.out(2)" }, 0.6)
        .to(rules, { drawSVG: "0% 100%", duration: 0.13 }, 0.62)
        .to(q("[data-manifesto-quote]"), { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.76)
        .to(qa("[data-manifesto-value]"), { opacity: 1, y: 0, duration: 0.1, stagger: 0.03 }, 0.86);
      return () => gsap.set([...words], { clearProps: "opacity" });
    });

    mm.add(MQ.small, () => {
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, {
        opacity: 1,
        stagger: { amount: 0.8 },
        ease: "none",
        scrollTrigger: { trigger: text, start: "top 82%", end: "bottom 40%", scrub: true },
      });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      gsap
        .timeline({ scrollTrigger: { trigger: lotus, start: "top 85%", once: true } })
        .to(petals, { drawSVG: "0% 100%", duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0)
        .to(rules, { drawSVG: "0% 100%", duration: 1.1 }, 0.4)
        .to(dot, { scale: 1, duration: 0.7, ease: "back.out(2)" }, 0.4);
      gsap.from([q("[data-manifesto-quote]"), ...qa("[data-manifesto-value]")], {
        opacity: 0,
        y: 20,
        duration: 1.1,
        stagger: 0.08,
        scrollTrigger: { trigger: q("[data-manifesto-quote]"), start: "top 90%", once: true },
      });
    });

    return () => split.revert();
  });

  return (
    <section ref={ref} id="manifesto" data-theme="dark" className="relative bg-cream">
      <div
        data-manifesto-shell
        className="grain relative overflow-clip bg-wine-deep py-24 text-ivory sm:py-32 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-[clamp(4rem,13svh,11rem)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(184,147,95,.26),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-52 -left-32 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(122,58,52,.6),transparent)]"
        />
        <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-5 text-gold-soft">
              <h2 className="!text-gold-soft font-sans !text-[.75rem] font-medium uppercase tracking-[.32em]">{m.left}</h2>
              <span data-manifesto-line className="h-px flex-1 bg-gold-soft/50" />
              <span className="text-[.75rem] font-medium uppercase tracking-[.32em]">{m.right}</span>
            </div>
            <p
              data-manifesto-text
              className="mt-10 font-display text-[clamp(2rem,4.2vw,3.9rem)] font-medium leading-[1.12] tracking-[-.01em] text-ivory lg:mt-[clamp(2rem,6svh,3.5rem)] lg:text-[clamp(2rem,min(4.2vw,6.6svh),3.9rem)]"
            >
              {m.text}
            </p>
            <p data-manifesto-quote className="mt-10 font-display text-[1.5rem] italic text-gold-soft sm:text-[1.75rem] lg:mt-[clamp(1.25rem,4svh,2.5rem)]">
              “{m.quote}”
            </p>
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-[clamp(1rem,3svh,2rem)] text-[.75rem] font-medium uppercase tracking-[.3em] text-ivory/85">
              {m.values.map((v, i) => (
                <li key={v} data-manifesto-value className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold-soft" />}
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div data-manifesto-lotus className="mx-auto w-48 text-gold-soft sm:w-64 lg:col-span-4 lg:w-full lg:max-w-[22rem]">
            <Lotus base sw={1.4} className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
