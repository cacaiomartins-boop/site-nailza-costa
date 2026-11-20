import { Clock, Leaf, ShieldCheck, Video, Globe } from "lucide-react";
import { clinic, msg, waLink } from "../data/clinic";
import { gsap, MQ, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Eyebrow, Lotus, Seal, SplitHeading, Reveal, WhatsAppButton, bloom } from "./ui";

const chipIcons = [Clock, Video, ShieldCheck];
const abroadItems = ["Atendimento em português", "Horários combinados conforme o seu fuso", "De onde você estiver no mundo"];

export function Online() {
  const o = clinic.online;
  const ref = useMotion<HTMLElement>((mm, root) => {
    mm.add(MQ.ok, () => {
      const frame = root.querySelector("[data-online-frame]");
      const img = root.querySelector("[data-online-img]");
      gsap.fromTo(
        frame,
        { clipPath: "inset(100% 0% 0% 0% round 2rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 2rem)",
          duration: 1.6,
          ease: "breath",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          onComplete: () => gsap.set(frame, { clearProps: "clipPath" }),
        },
      );
      gsap.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 2, scrollTrigger: { trigger: frame, start: "top 85%", once: true } });
      const lot = root.querySelector("[data-online-lotus]");
      gsap.timeline({ scrollTrigger: { trigger: lot, start: "top 85%", once: true } }).add(bloom(lot, { dur: 1.6, ease: "breath" }));
    });
  });

  return (
    <section ref={ref} id="online" className="fit-section section-pad relative bg-cream">
      <FitBox>
      <div className="container-site">
        <div className="max-w-[52rem]">
          <Eyebrow n="05" label="Terapia online" />
          <SplitHeading text={o.title} className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:mt-[clamp(.75rem,2.4svh,1.75rem)] lg:!text-[clamp(2rem,min(3.6vw,5.8svh),3.4rem)]" />
          <Reveal className="mt-6 max-w-[36rem] lg:mt-[clamp(.6rem,2svh,1.5rem)]">
            <p className="text-[1.1rem] lg:text-[clamp(.95rem,2.3svh,1.1rem)] lg:leading-[1.55]">{o.text}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-[clamp(1.25rem,4svh,3rem)] lg:grid-cols-12 lg:gap-10">
          {/* esquerda: consultório virtual */}
          <article className="lg:col-span-7">
            <div className="relative lg:mx-auto lg:max-w-[min(100%,calc((100svh_-_32rem)*1.6))]">
              <div data-online-frame className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sand shadow-card lg:aspect-[16/9]">
                <img
                  data-online-img
                  src={clinic.photoAbout}
                  srcSet="/img/nailza-online-640.webp 640w, /img/nailza-online.webp 1280w"
                  sizes="(min-width: 1024px) 44rem, 92vw"
                  alt="Consultório virtual: mesa com notebook, estante amarela com livros de Psicologia e poltrona ao fundo"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <Seal text={o.seal} className="absolute -bottom-8 right-4 size-28 sm:-bottom-10 sm:right-8 sm:size-36" />
            </div>
            <h3 className="mt-12 text-[1.9rem] sm:text-[2.2rem] lg:mt-[clamp(1.25rem,4svh,2.25rem)] lg:text-[clamp(1.5rem,3.8svh,2.2rem)]">{o.cardTitle}</h3>
            <p className="mt-3 max-w-[36rem] lg:text-[clamp(.9rem,2.2svh,1.0625rem)] lg:leading-[1.5]">{o.cardText}</p>
            <ul className="mt-6 space-y-3 lg:mt-[clamp(.6rem,2svh,1.5rem)] lg:space-y-[clamp(.25rem,1svh,.75rem)] lg:text-[clamp(.9rem,2.2svh,1.0625rem)] lg:leading-[1.5]">
              {o.items.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <Leaf className="mt-1 size-5 shrink-0 text-bronze" strokeWidth={1.4} aria-hidden="true" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="lg:mt-[clamp(.75rem,2.6svh,2rem)] lg:flex lg:items-center lg:gap-4">
              <ul className="mt-6 flex flex-wrap gap-2 lg:order-2 lg:mt-0">
                {o.chips.map((c, i) => {
                  const I = chipIcons[i % chipIcons.length];
                  return (
                    <li key={c} className="inline-flex items-center gap-2 rounded-full border border-bronze/25 bg-ivory px-4 py-2 text-[.85rem] lg:py-1.5">
                      <I className="size-4 text-bronze" strokeWidth={1.5} aria-hidden="true" />
                      {c}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 lg:order-1 lg:mt-0 lg:shrink-0">
                <WhatsAppButton href={waLink(msg.online)} size="lg">{o.cta}</WhatsAppButton>
              </div>
            </div>
          </article>

          {/* direita: brasileiros no exterior */}
          <aside className="lg:col-span-5">
            <div className="grain relative h-full overflow-hidden rounded-[2rem] border border-sage/30 bg-sage-soft/30 p-6 shadow-soft sm:p-10 lg:p-[clamp(1.5rem,4svh,2.5rem)]">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-ivory text-sage">
                  <Globe className="size-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <div data-online-lotus className="w-14 text-sage">
                  <Lotus base sw={1.3} className="w-full" />
                </div>
              </div>
              <p className="mt-8 text-[.75rem] font-medium uppercase tracking-[.3em] text-sage lg:mt-[clamp(.75rem,3svh,2rem)]">Mais atenção a quem mora longe</p>
              <h3 className="mt-3 text-[1.9rem] leading-[1.08] sm:text-[2.2rem] lg:text-[clamp(1.5rem,3.8svh,2.2rem)]">{o.abroadTitle}</h3>
              <p className="mt-4 lg:text-[clamp(.9rem,2.2svh,1.0625rem)] lg:leading-[1.5]">{o.abroadText}</p>
              <ul className="mt-6 space-y-3 lg:mt-[clamp(.6rem,2svh,1.5rem)] lg:space-y-[clamp(.25rem,1svh,.75rem)] lg:text-[clamp(.9rem,2.2svh,1.0625rem)] lg:leading-[1.5]">
                {abroadItems.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <Leaf className="mt-1 size-5 shrink-0 text-sage" strokeWidth={1.4} aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 lg:mt-[clamp(.75rem,2.6svh,2rem)]">
                <WhatsAppButton href={waLink(msg.abroad)} variant="outline">{o.abroadCta}</WhatsAppButton>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </FitBox>
    </section>
  );
}
