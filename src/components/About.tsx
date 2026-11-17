import { clinic, msg, waLink } from "../data/clinic";
import { gsap, MQ, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Eyebrow, GhostLotus, Lotus, Reveal, Seal, SplitHeading, WhatsAppButton, bloom } from "./ui";

export function About() {
  const a = clinic.about;
  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    mm.add(MQ.ok, () => {
      const arch = q("[data-about-arch]");
      gsap.fromTo(
        arch,
        { clipPath: "inset(38% 22% 0% 22% round 999px 999px 28px 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)",
          duration: 1.6,
          ease: "breath",
          scrollTrigger: { trigger: arch, start: "top 85%", once: true },
          onComplete: () => gsap.set(arch, { clearProps: "clipPath" }),
        },
      );
      // lótus com scrub
      const lotus = q("[data-about-lotus]");
      const petals = lotus?.querySelectorAll(".lotus-petal") ?? [];
      const dot = lotus?.querySelectorAll(".lotus-dot");
      const rules = lotus?.querySelectorAll(".lotus-rule");
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules ?? [], { drawSVG: "100% 100%" });
      gsap.set(dot ?? [], { scale: 0, transformOrigin: "50% 50%" });
      gsap
        .timeline({ scrollTrigger: { trigger: arch, start: "top 75%", end: "center 40%", scrub: 0.8 } })
        .to(petals, { drawSVG: "0% 100%", stagger: 0.12, ease: "power2.inOut" }, 0)
        .to(rules ?? [], { drawSVG: "0% 100%" }, ">-0.2")
        .to(dot ?? [], { scale: 1, ease: "back.out(2)" }, "<0.2");
      gsap.from(root.querySelectorAll("[data-about-quote] > *"), {
        opacity: 0,
        y: 18,
        duration: 1.2,
        stagger: 0.14,
        scrollTrigger: { trigger: arch, start: "top 55%", once: true },
      });
      // cartão de número
      const stat = q("[data-stat]") as HTMLElement | null;
      const card = q("[data-stat-card]");
      gsap.from(card, { autoAlpha: 0, y: 32, duration: 1.3, delay: 0.35, scrollTrigger: { trigger: arch, start: "top 90%", once: true } });
      const o = { v: 0 };
      gsap.to(o, {
        v: a.stat.value,
        duration: 2.2,
        delay: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: arch, start: "top 90%", once: true },
        onUpdate: () => stat && (stat.textContent = String(Math.round(o.v))),
      });
    });
  });

  return (
    <section
      ref={ref}
      id="sobre"
      className="fit-section section-pad relative overflow-x-clip bg-[linear-gradient(180deg,var(--color-ivory)_0%,var(--color-ivory)_30%,var(--color-cream)_100%)]"
    >
      <GhostLotus className="-left-24 top-24 h-[34rem] w-[42rem] max-w-none" />
      <FitBox>
      <div className="container-site relative grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-x-14 lg:gap-y-0">
        {/* conjunto visual */}
        <div>
          <div className="relative mx-auto w-full max-w-[28rem] pb-32 [container-type:inline-size] sm:pb-16 lg:max-w-[min(28rem,calc((100svh_-_14rem)*0.8))] lg:pb-[clamp(2.5rem,7svh,4rem)]">
            <div
              data-about-arch
              className="relative rounded-t-[50cqw] rounded-b-[1.75rem] border border-bronze/25 bg-cream p-2 shadow-card"
            >
              <div className="grain rounded-t-[50cqw] rounded-b-[1.4rem] border border-bronze/20 bg-cream px-[13%] pb-[14%] pt-[20%] text-center">
                <div data-about-lotus className="mx-auto w-[62%] text-bronze">
                  <Lotus base sw={1.5} className="w-full" />
                </div>
                <div data-about-quote className="mt-8">
                  <p className="font-display text-[clamp(1.3rem,2.1vw,1.85rem)] italic leading-[1.3] text-ink">
                    “{a.quote}”
                  </p>
                  <p className="mt-8 text-[.78rem] font-medium uppercase tracking-[.28em] text-bronze-deep">
                    {a.signature}
                  </p>
                </div>
              </div>
            </div>
            <Seal text="PSICÓLOGA · CRP 05/26271 · ONLINE · BRASIL E EXTERIOR · " className="absolute bottom-0 -left-3 size-[7.5rem] sm:-left-8 sm:size-36" />
            <div
              data-stat-card
              className="absolute bottom-0 -right-2 rounded-[1.5rem] border border-white/60 bg-ivory/75 px-4 py-3.5 shadow-soft backdrop-blur-xl sm:-right-8 sm:px-6 sm:py-5"
            >
              <p className="font-display text-[2.4rem] font-medium leading-[.9] tabular-nums text-bronze sm:text-[3.6rem]">
                <span data-stat>{a.stat.value}</span>
              </p>
              <p className="mt-1 max-w-[11rem] text-[.875rem] leading-snug text-ink sm:text-[.98rem]">{a.stat.label}</p>
              <p className="font-display italic text-bronze-deep">{a.stat.note}</p>
            </div>
          </div>
        </div>

        {/* texto */}
        <div>
          <Eyebrow n="03" label="Quem vai caminhar com você" />
          <SplitHeading text={a.title} className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:!text-[clamp(2.1rem,min(4.4vw,7svh),4.25rem)]" />
          <Reveal className="mt-8 max-w-[38rem] space-y-5 text-[1.0625rem] lg:mt-[clamp(1rem,3svh,2rem)] lg:space-y-[clamp(.6rem,1.8svh,1.25rem)] lg:text-[clamp(.88rem,2.05svh,1rem)] lg:leading-[1.55] xl:text-[clamp(.95rem,2.3svh,1.0625rem)]" stagger={0.1} y={24}>
            {a.paragraphs.map((p, i) => (
              <p key={i} data-reveal-item>{p}</p>
            ))}
          </Reveal>
          <Reveal className="mt-10 max-w-[38rem] lg:mt-[clamp(1rem,3.4svh,2.5rem)]" stagger={0.1} y={24}>
            <dl className="divide-y divide-bronze/20 border-y border-bronze/20">
              {a.sheet.map((s) => (
                <div key={s.k} data-reveal-item className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6 lg:py-[clamp(.45rem,1.4svh,1rem)]">
                  <dt className="text-[.75rem] font-medium uppercase tracking-[.22em] text-bronze-deep">{s.k}</dt>
                  <dd className="text-[1rem] leading-snug text-ink">{s.v}</dd>
                </div>
              ))}
              <div data-reveal-item className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6 lg:py-[clamp(.45rem,1.4svh,1rem)]">
                <dt className="text-[.75rem] font-medium uppercase tracking-[.22em] text-bronze-deep">{a.registerLabel}</dt>
                <dd className="text-[1rem] leading-snug text-ink">
                  {clinic.crp} ·{" "}
                  <a href={clinic.crpUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-wine">
                    Verificar no Cadastro Nacional
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
          <div className="mt-10 lg:mt-[clamp(1rem,3.4svh,2.5rem)]">
            <WhatsAppButton href={waLink(msg.about)} size="lg">{a.cta}</WhatsAppButton>
          </div>
        </div>
      </div>
      </FitBox>
    </section>
  );
}

export { bloom };
