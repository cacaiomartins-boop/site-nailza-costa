import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { clinic, msg, waLink } from "../data/clinic";
import { gsap, MQ, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { Lotus, Seal, WhatsAppButton, WhatsAppIcon, renderEm, bloom } from "./ui";

function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T | "";
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-[.75rem] font-medium uppercase tracking-[.22em] text-ivory/70">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2 text-[.9rem] transition-colors duration-500 ${
              value === o ? "border-gold-soft bg-gold-soft text-wine-deep" : "border-ivory/25 text-ivory/85 hover:border-ivory/60"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Contact() {
  const c = clinic.contact;
  const [name, setName] = useState("");
  const [where, setWhere] = useState<"No Brasil" | "No exterior" | "">("");
  const [period, setPeriod] = useState<"Manhã" | "Tarde" | "Noite" | "">("");
  const [trap, setTrap] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (trap) return;
    if (name.trim().length < 2) {
      setError("Por favor, digite o seu nome.");
      document.getElementById("contact-name")?.focus();
      return;
    }
    setError("");
    const parts = [`Olá, ${clinic.first}! Meu nome é ${name.trim()}. Vim pelo site e gostaria que você me chamasse.`];
    if (where) parts.push(`Moro ${where === "No Brasil" ? "no Brasil" : "no exterior"}.`);
    if (period) parts.push(`Prefiro o período da ${period.toLowerCase() === "manhã" ? "manhã" : period.toLowerCase()}.`);
    window.open(waLink(parts.join(" ")), "_blank", "noopener,noreferrer");
  };

  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    mm.add(MQ.ok, () => {
      const wide = window.matchMedia("(min-width: 640px)").matches;
      gsap.fromTo(
        q("[data-cta-panel]"),
        { clipPath: wide ? "inset(5% 7% 3% 7% round 4rem)" : "inset(2.5% 3.5% 1.5% 3.5% round 2.5rem)" },
        {
          clipPath: wide ? "inset(0% round 2.5rem)" : "inset(0% round 1.75rem)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "top 22%", scrub: 0.8 },
        },
      );
      gsap.fromTo(q("[data-cta-inner]"), { y: wide ? 90 : 40 }, { y: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 22%", scrub: 0.8 } });
      gsap.fromTo(root.querySelectorAll("[data-cta-glow]"), { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 } });
      const lot = q("[data-cta-lotus]");
      gsap.timeline({ scrollTrigger: { trigger: lot, start: "top 85%", once: true } }).add(bloom(lot, { dur: 1.6, stagger: 0.12, ease: "breath" }));
    });
  });

  return (
    <section ref={ref} id="contato" className="fit-section section-pad-tight bg-cream px-2.5 sm:px-4">
      <div
        data-cta-panel
        data-theme="dark"
        className="grain relative overflow-hidden rounded-[1.75rem] bg-wine-deep text-ivory sm:rounded-[2.5rem]"
      >
        <div data-cta-glow aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(184,147,95,.3),transparent)]" />
        <div data-cta-glow aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(216,192,154,.16),transparent)]" />
        <FitBox>
        <div data-cta-inner className="container-site relative grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-[clamp(1.5rem,6svh,4rem)]">
          <div className="lg:col-span-6">
            <div data-cta-lotus className="w-20 text-gold-soft lg:w-[clamp(3rem,9svh,5rem)]">
              <Lotus base sw={1.3} className="w-full" />
            </div>
            <h2 className="mt-8 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] lg:mt-[clamp(.75rem,3svh,2rem)] lg:!text-[clamp(2.1rem,min(4.4vw,7svh),4.25rem)]">{renderEm(c.title)}</h2>
            <p className="mt-6 max-w-[30rem] text-ivory/75 lg:mt-[clamp(.75rem,2.4svh,1.5rem)] lg:text-[clamp(.95rem,2.3svh,1.0625rem)] lg:leading-[1.55]">{c.text}</p>
            <div className="mt-8 lg:mt-[clamp(.9rem,3svh,2rem)]">
              <WhatsAppButton href={waLink(msg.contact)} variant="light" size="lg">{c.cta}</WhatsAppButton>
            </div>
            <p className="mt-5 text-[.9rem] text-ivory/70 lg:mt-[clamp(.6rem,2svh,1.25rem)]">{c.line}</p>
          </div>

          <div className="lg:col-span-6">
            <form
              data-float-avoid
              onSubmit={submit}
              noValidate
              className="rounded-[2rem] border border-ivory/15 bg-ivory/10 p-6 backdrop-blur max-sm:p-5 sm:p-9 lg:p-[clamp(1.25rem,4svh,2.25rem)]"
            >
              <h3 className="text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.08] lg:text-[clamp(1.5rem,min(2.4vw,4.2svh),2.25rem)]">{c.cardTitle}</h3>
              <p className="mt-2 text-[1rem] text-ivory/75 lg:text-[clamp(.9rem,2.1svh,1rem)] lg:leading-[1.5]">{c.cardText}</p>
              <div className="mt-6 lg:mt-[clamp(.6rem,2.2svh,1.5rem)]">
                <label htmlFor="contact-name" className="text-[.75rem] font-medium uppercase tracking-[.22em] text-ivory/70">
                  Seu nome
                </label>
                <input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  aria-invalid={!!error}
                  aria-describedby={error ? "contact-error" : undefined}
                  className="mt-2 h-12 w-full lg:h-11 rounded-full border border-ivory/20 bg-ivory/10 px-5 text-ivory placeholder:text-ivory/40 focus:border-gold-soft focus:outline-none"
                  placeholder="Como posso te chamar?"
                />
                {error && <p id="contact-error" role="alert" className="mt-2 text-[.9rem] text-gold-soft">{error}</p>}
              </div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-4">
                <Chips label="Eu moro" options={["No Brasil", "No exterior"]} value={where} onChange={setWhere} />
                <Chips label="Melhor período" options={["Manhã", "Tarde", "Noite"]} value={period} onChange={setPeriod} />
              </div>
              <input
                type="text"
                name="site"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                className="mt-7 inline-flex h-14 lg:h-12 lg:mt-[clamp(.9rem,2.8svh,1.75rem)] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-ivory px-4 text-[.95rem] font-medium sm:gap-3 sm:px-7 sm:text-base text-wine shadow-soft transition-colors duration-500 hover:bg-white"
              >
                <WhatsAppIcon className="size-[1.15em]" />
                Abrir mensagem no WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </button>
              <p className="mt-4 text-[.85rem] leading-snug text-ivory/65">
                {c.privacy}{" "}
                <Link to="/privacidade" className="underline underline-offset-4 hover:text-ivory">
                  Política de privacidade
                </Link>
              </p>
            </form>
          </div>
        </div>
        </FitBox>

        <div className="pointer-events-none relative px-5 pb-8 sm:absolute sm:bottom-6 sm:right-8 sm:p-0">
          <Seal text="ONLINE PARA TODO O BRASIL · E EXTERIOR · " className="hidden size-28 text-gold-soft sm:block [&_circle:first-child]:fill-wine-deep/60" />
        </div>
      </div>
    </section>
  );
}
