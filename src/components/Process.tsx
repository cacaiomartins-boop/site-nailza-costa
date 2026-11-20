import { clinic, msg, waLink } from "../data/clinic";
import { gsap, MQ, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Eyebrow, Lotus, SplitHeading, WhatsAppButton, Reveal, bloom } from "./ui";

export function Process() {
  const p = clinic.process;
  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    const qa = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const steps = qa("[data-step]");
    const dots = qa("[data-dot]");
    const rings = qa("[data-ring]");
    const lits = qa("[data-lit]");
    const segs = qa("[data-seg-x]");
    const glow = q("[data-lotus-glow]");
    const lotus = q("[data-proc-lotus]");
    const petals = Array.from(lotus?.querySelectorAll(".lotus-petal") ?? []);
    const rules = Array.from(lotus?.querySelectorAll(".lotus-rule") ?? []);
    const ldot = Array.from(lotus?.querySelectorAll(".lotus-dot") ?? []);

    // ---------- DESKTOP: linha do tempo horizontal ----------
    mm.add(MQ.wide, () => {
      gsap.set(segs, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(dots, { scale: 0 });
      gsap.set(lits, { autoAlpha: 0.55, y: 10 });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(ldot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(glow, { autoAlpha: 0, scale: 0.8 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q("[data-track-p]"), start: "top 70%", end: "bottom 65%", scrub: 0.6 },
      });
      let t = 0.08;
      steps.forEach((_, i) => {
        tl.to(dots[i], { scale: 1, duration: 0.35, ease: "back.out(2)" }, t)
          .to(lits[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, t)
          .fromTo(rings[i], { scale: 1, autoAlpha: 0.85 }, { scale: 2.1, autoAlpha: 0, duration: 1.4, ease: "power2.out" }, t);
        if (segs[i]) tl.to(segs[i], { scaleX: 1, duration: i === steps.length - 1 ? 0.6 : 1 }, t + 0.2);
        t += 0.3 + 0.7;
      });
      tl.to(glow, { autoAlpha: 0.7, scale: 1, duration: 0.8 }, t - 0.4)
        .to(petals, { drawSVG: "0% 100%", duration: 0.7, stagger: 0.12, ease: "power1.inOut" }, t - 0.3)
        .to(rules, { drawSVG: "0% 100%", duration: 0.55 }, t)
        .to(ldot, { scale: 1, duration: 0.3, ease: "back.out(2)" }, t + 0.2);
    });

    // ---------- MOBILE / TABLET: linha vertical ----------
    mm.add(MQ.narrow, () => {
      gsap.set(dots, { scale: 0 });
      gsap.set(lits, { autoAlpha: 0.55, y: 10 });
      gsap.set(qa("[data-text]"), { autoAlpha: 0.55, y: 10 });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(ldot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(glow, { autoAlpha: 0.5 });
      gsap.fromTo(
        q("[data-vfill]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-track-p]"), start: "top 62%", end: "bottom 62%", scrub: 0.6 } },
      );
      steps.forEach((li, i) => {
        const tw = gsap
          .timeline({ paused: true })
          .to(dots[i], { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0)
          .to([lits[i], ...li.querySelectorAll("[data-text]")], { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0)
          .fromTo(rings[i], { scale: 1, autoAlpha: 0.85 }, { scale: 2.1, autoAlpha: 0, duration: 1.2, ease: "power2.out" }, 0);
        gsap.timeline({
          scrollTrigger: {
            trigger: li,
            start: "center 62%",
            onEnter: () => tw.play(),
            onLeaveBack: () => tw.reverse(),
          },
        });
      });
      gsap
        .timeline({ scrollTrigger: { trigger: lotus, start: "top 60%", once: true } })
        .to(petals, { drawSVG: "0% 100%", duration: 1.3, stagger: 0.12, ease: "power2.inOut" }, 0)
        .to(rules, { drawSVG: "0% 100%", duration: 1 }, 0.4)
        .to(ldot, { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.5);
    });
  });

  return (
    <section ref={ref} id="processo" className="fit-section section-pad relative overflow-clip bg-linen">
      <FitBox>
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow n="04" label="Como funciona" />
            <SplitHeading text={p.title} className="mt-7 max-w-[16ch] text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:!text-[clamp(2.1rem,min(4.4vw,7svh),4.25rem)]" />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="max-w-[28rem] text-[1.1rem]">{p.text}</p>
          </Reveal>
        </div>

        <div data-track-p className="relative mt-16 lg:mt-[clamp(2rem,8svh,6rem)]">
          <div aria-hidden="true" className="absolute bottom-3 left-[1.375rem] top-3 w-px bg-bronze/20 lg:hidden">
            <div data-vfill className="h-full origin-top bg-bronze" />
          </div>
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-0">
            {p.steps.map((s, i) => (
              <li key={s.t} data-step className="relative flex flex-col pl-14 lg:pl-0 lg:pr-8">
                <span data-lit className="font-display text-[2.6rem] italic leading-none text-gold sm:text-[3.4rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute left-[.7rem] top-[.8rem] flex items-center lg:static lg:mt-6 lg:w-full">
                  <span className="relative block size-[22px] shrink-0 rounded-full border border-bronze/60 bg-linen">
                    <span data-dot className="absolute inset-0 m-auto size-2 rounded-full bg-bronze" />
                    <span data-ring className="absolute inset-0 rounded-full border border-bronze opacity-0" />
                  </span>
                  <span data-seg-x className="hidden h-px flex-1 bg-bronze/45 lg:block" />
                </div>
                <h3 data-text className="mt-4 text-[1.5rem] font-medium leading-tight lg:mt-6">{s.t}</h3>
                <p data-text className="mt-2 max-w-[19rem] text-[1rem] leading-[1.65]">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="relative mx-auto mt-12 flex w-fit items-center justify-center lg:absolute lg:-right-2 lg:top-[3.25rem] lg:mt-0 lg:-translate-y-1/2">
            <div
              data-lotus-glow
              aria-hidden="true"
              className="absolute inset-[-40%] rounded-full bg-[radial-gradient(closest-side,rgba(184,147,95,.35),transparent)]"
            />
            <div data-proc-lotus className="relative w-[3.4rem] text-bronze lg:w-14">
              <Lotus base sw={1.3} className="w-full" />
            </div>
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 lg:mt-[clamp(1.75rem,7svh,5rem)] lg:flex-row lg:items-center lg:gap-8">
          <WhatsAppButton href={waLink(msg.step)} size="lg">{p.cta}</WhatsAppButton>
          <p className="font-display text-[1.35rem] italic text-bronze-deep">{p.closing}</p>
        </Reveal>
      </div>
      </FitBox>
    </section>
  );
}
