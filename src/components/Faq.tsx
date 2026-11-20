import { useState } from "react";
import { Plus } from "lucide-react";
import { clinic, msg, waLink } from "../data/clinic";
import { ScrollTrigger, gsap } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Eyebrow, Reveal, SplitHeading, WhatsAppButton } from "./ui";

export type FaqItem = { q: string; a: string };

/** Só uma resposta aberta por vez (a 1ª começa aberta), para a altura não variar. */
export function FaqList({
  items,
  idPrefix = "faq",
  columns = 1,
}: {
  items: FaqItem[];
  idPrefix?: string;
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
    gsap.delayedCall(0.15, () => ScrollTrigger.refresh());
    gsap.delayedCall(0.8, () => ScrollTrigger.refresh());
  };

  const row = (f: FaqItem, i: number) => {
    const isOpen = open === i;
    return (
      <li key={f.q} data-reveal-item className="border-t border-bronze/25">
        <h3 className="font-sans">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={`${idPrefix}-${i}`}
            onClick={() => toggle(i)}
            className="group flex w-full items-center gap-5 py-7 text-left sm:gap-7 sm:py-8 lg:gap-4 lg:py-[clamp(.7rem,2.3svh,1.6rem)]"
          >
            <span className="font-display text-[1.2rem] italic text-bronze-ink">{String(i + 1).padStart(2, "0")}</span>
            <span
              className={`flex-1 font-display text-[1.35rem] font-medium leading-[1.25] transition-colors duration-500 ease-silk group-hover:text-wine sm:text-[1.5rem] lg:text-[clamp(1.05rem,2.4svh,1.35rem)] ${isOpen ? "text-wine" : "text-ink"}`}
            >
              {f.q}
            </span>
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-700 ease-silk lg:size-10 ${
                isOpen ? "rotate-[135deg] border-wine bg-wine text-ivory" : "border-bronze/35 text-bronze"
              }`}
            >
              <Plus className="size-5" aria-hidden="true" />
            </span>
          </button>
        </h3>
        <div
          id={`${idPrefix}-${i}`}
          role="region"
          className={`grid transition-[grid-template-rows] duration-700 ease-silk ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden" inert={!isOpen}>
            <p
              className={`max-w-prose pb-8 pl-12 pr-2 leading-[1.75] transition-[opacity,transform] duration-700 ease-silk sm:pl-14 sm:pr-16 lg:pb-[clamp(.75rem,2.2svh,1.5rem)] lg:pl-10 lg:pr-2 lg:text-[clamp(.9rem,2.1svh,1.0625rem)] lg:leading-[1.55] ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              {f.a}
            </p>
          </div>
        </div>
      </li>
    );
  };

  if (columns === 2) {
    const half = Math.ceil(items.length / 2);
    return (
      <Reveal stagger={0.07} y={28} start="top 85%">
        <div className="grid gap-x-10 lg:grid-cols-2 lg:items-start">
          <ul>{items.slice(0, half).map((f, i) => row(f, i))}</ul>
          <ul className="border-b border-bronze/25 lg:border-b-0">{items.slice(half).map((f, i) => row(f, i + half))}</ul>
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal stagger={0.07} y={28} start="top 85%">
      <ul className="border-b border-bronze/25">{items.map((f, i) => row(f, i))}</ul>
    </Reveal>
  );
}

export function Faq() {
  const f = clinic.faqIntro;
  return (
    <section id="duvidas" className="fit-section section-pad relative overflow-clip bg-linen">
      <FitBox>
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Eyebrow n="07" label="Dúvidas" />
            <SplitHeading
              text={f.title}
              className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:mt-[clamp(.75rem,2.4svh,1.75rem)] lg:!text-[clamp(2rem,min(3.6vw,6svh),3.4rem)]"
            />
            <Reveal className="mt-6 lg:mt-[clamp(.75rem,2.4svh,1.5rem)]">
              <p className="max-w-[26rem] lg:text-[clamp(.95rem,2.3svh,1.0625rem)] lg:leading-[1.55]">{f.text}</p>
              <div className="mt-8 lg:mt-[clamp(.9rem,3svh,2rem)]">
                <WhatsAppButton href={waLink(msg.doubt)} variant="outline">{f.cta}</WhatsAppButton>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={clinic.faq} columns={2} />
          </div>
        </div>
      </FitBox>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: clinic.faq.map((x) => ({
              "@type": "Question",
              name: x.q,
              acceptedAnswer: { "@type": "Answer", text: x.a },
            })),
          }),
        }}
      />
    </section>
  );
}
