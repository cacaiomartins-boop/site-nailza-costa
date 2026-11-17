import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { clinic, msg, themes, waLink } from "../data/clinic";
import { gsap, MQ, getLenis, scrollToTarget, useMotion } from "../motion/setup";
import { FitBox } from "./FitBox";
import { HashLink } from "./links";
import { Lotus, WhatsAppButton, WhatsAppIcon, renderEm } from "./ui";

export function Footer() {
  const topRef = useRef<HTMLButtonElement>(null);
  const word = clinic.name.toUpperCase().split("");

  const ref = useMotion<HTMLElement>((mm, root) => {
    const q = (s: string) => root.querySelector(s);
    const qa = (s: string) => Array.from(root.querySelectorAll(s));
    mm.add(MQ.ok, () => {
      const wide = window.matchMedia("(min-width: 768px)").matches;
      gsap.fromTo(
        q("[data-footer-panel]"),
        { clipPath: wide ? "inset(0% 4% 0% 4% round 6rem 6rem 0rem 0rem)" : "inset(0% 3% 0% 3% round 3.5rem 3.5rem 0 0)" },
        {
          clipPath: wide ? "inset(0% round 2.5rem 2.5rem 0rem 0rem)" : "inset(0% round 1.75rem 1.75rem 0 0)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "clamp(top 30%)", scrub: true },
        },
      );
      const wm = q("[data-wordmark]");
      const petals = qa("[data-wordmark] .lotus-petal");
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(qa("[data-wm-line]"), { scaleX: 0 });
      gsap.set(qa("[data-wm-dot]"), { scale: 0 });
      gsap.set(qa("[data-wm-char] > span"), { yPercent: 108 });
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: wm, start: "top bottom", end: "clamp(bottom bottom)", scrub: 1.2 },
        })
        .to(petals, { drawSVG: "0% 100%", duration: 0.9, stagger: 0.08 }, 0)
        .to(qa("[data-wm-line]"), { scaleX: 1, duration: 1, ease: "power2.out" }, 0.15)
        .to(qa("[data-wm-dot]"), { scale: 1, duration: 0.35, ease: "back.out(2)" }, 0.3)
        .to(qa("[data-wm-char] > span"), { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "power2.out" }, 0.35);
    });
    // botão "voltar ao topo" magnético
    mm.add(MQ.fine, () => {
      const btn = topRef.current;
      if (!btn) return;
      const qx = gsap.quickTo(btn, "x", { duration: 0.8, ease: "power3.out" });
      const qy = gsap.quickTo(btn, "y", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        qx(gsap.utils.clamp(-12, 12, (e.clientX - (r.left + r.width / 2)) * 0.28));
        qy(gsap.utils.clamp(-12, 12, (e.clientY - (r.top + r.height / 2)) * 0.35));
      };
      const leave = () => {
        qx(0);
        qy(0);
      };
      btn.addEventListener("pointermove", move);
      btn.addEventListener("pointerleave", leave);
      return () => {
        btn.removeEventListener("pointermove", move);
        btn.removeEventListener("pointerleave", leave);
      };
    });
  });

  const label = "text-[.75rem] font-medium uppercase tracking-[.3em] text-gold-soft";
  const link = "text-ivory/80 transition-colors hover:text-ivory lg:text-[.92rem] lg:leading-[1.35]";

  return (
    <footer ref={ref} data-theme="dark" className="fit-section !pb-0 !pt-10 bg-cream">
      <div
        data-footer-panel
        className="grain relative flex flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,var(--color-wine-deep),#3f1b17)] text-ivory lg:flex-1"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(184,147,95,.22),transparent)]" />
        <FitBox>
        <div className="container-site relative py-20 sm:py-24 lg:py-[clamp(1.25rem,5svh,3.5rem)]">
          <div className="flex flex-col gap-8 border-b border-ivory/15 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-[clamp(.9rem,3.4svh,2.5rem)]">
            <p className="max-w-[24ch] font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08] lg:text-[clamp(1.8rem,min(3.6vw,6svh),3.2rem)]">{renderEm(clinic.footer.tagline)}</p>
            <WhatsAppButton href={waLink(msg.header)} variant="light" size="lg">Agendar conversa</WhatsAppButton>
          </div>

          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_1.7fr_1.1fr_1.1fr] lg:gap-x-8 lg:py-[clamp(1rem,4svh,3rem)]">
            <nav aria-label="Navegação do rodapé">
              <h2 className={label}>Navegação</h2>
              <ul className="mt-5 space-y-3 lg:mt-[clamp(.5rem,1.8svh,1.25rem)] lg:space-y-[clamp(.15rem,.9svh,.75rem)]">
                <li><HashLink hash="#sobre" className={link}>Sobre</HashLink></li>
                <li><HashLink hash="#como-ajudo" className={link}>Como posso ajudar</HashLink></li>
                <li><HashLink hash="#processo" className={link}>Como funciona</HashLink></li>
                <li><HashLink hash="#online" className={link}>Terapia online</HashLink></li>
                <li><HashLink hash="#duvidas" className={link}>Dúvidas</HashLink></li>
              </ul>
            </nav>
            <div>
              <h2 className={label}>Temas</h2>
              <ul className="mt-5 space-y-3 lg:mt-[clamp(.5rem,1.8svh,1.25rem)] lg:columns-2 lg:gap-x-5 lg:space-y-0 lg:[&>li]:break-inside-avoid lg:[&>li]:pb-[clamp(.15rem,.9svh,.5rem)]">
                {themes.map((t) => (
                  <li key={t.slug}><Link to={`/terapia/${t.slug}`} className={link}>{t.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={label}>Contato</h2>
              <ul className="mt-5 space-y-3 lg:mt-[clamp(.5rem,1.8svh,1.25rem)] lg:space-y-[clamp(.15rem,.9svh,.75rem)]">
                <li>
                  <a href={waLink(msg.general)} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                    <WhatsAppIcon className="size-4" /> {clinic.whatsappDisplay}
                    <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                  </a>
                </li>
                <li>
                  <a href={clinic.doctoralia} target="_blank" rel="noopener noreferrer" className={link}>
                    Perfil no Doctoralia<span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
                <li className="text-ivory/60">Respondo assim que terminar os atendimentos.</li>
              </ul>
            </div>
            <div>
              <h2 className={label}>Atendimento</h2>
              <ul className="mt-5 space-y-3 text-ivory/80 lg:mt-[clamp(.5rem,1.8svh,1.25rem)] lg:space-y-[clamp(.15rem,.9svh,.75rem)]">
                <li>Online para todo o Brasil</li>
                <li>Online para brasileiros no exterior</li>
                <li>Psicoterapia individual para adultos</li>
              </ul>
            </div>
          </div>

          {/* wordmark gigante */}
          <div data-wordmark aria-hidden="true" className="flex items-center gap-4 py-6 text-gold-soft sm:gap-8 lg:py-[clamp(.25rem,1.6svh,1.5rem)]">
            <div className="flex flex-1 items-center gap-3">
              <span data-wm-dot className="size-1.5 rounded-full bg-current" />
              <span data-wm-line className="h-px flex-1 origin-left bg-current opacity-50" />
            </div>
            <Lotus base={false} sw={1.2} className="h-12 w-auto sm:h-16 lg:h-[clamp(2.25rem,7svh,4rem)]" />
            <div className="flex flex-1 items-center gap-3">
              <span data-wm-line className="h-px flex-1 origin-right bg-current opacity-50" />
              <span data-wm-dot className="size-1.5 rounded-full bg-current" />
            </div>
          </div>
          <p aria-hidden="true" className="flex justify-center font-display text-[clamp(2rem,9.5vw,9rem)] font-medium uppercase leading-[1.05] tracking-[.12em] text-ivory/90 lg:text-[clamp(2rem,min(9.5vw,13svh),9rem)]">
            {word.map((ch, i) => (
              <span key={i} data-wm-char className="inline-block overflow-hidden pb-[.08em]">
                <span className="inline-block">{ch === " " ? " " : ch}</span>
              </span>
            ))}
          </p>

          <p className="mt-10 rounded-2xl bg-ivory/10 px-5 py-3 text-center text-[.9rem] text-ivory/85 lg:mt-[clamp(.6rem,2.4svh,2.5rem)] lg:py-2">{clinic.emergency}</p>

          <div className="mt-8 flex flex-wrap lg:mt-[clamp(.6rem,2.2svh,2rem)] items-center justify-between gap-x-6 gap-y-3 text-[.85rem] text-ivory/70">
            <p>
              {clinic.name} · {clinic.crp} ·{" "}
              <a href={clinic.crpUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ivory">
                Verificar registro no CFP<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/privacidade" className="underline underline-offset-4 hover:text-ivory">Política de privacidade</Link>
              <span>© {clinic.name} · {new Date().getFullYear()}</span>
              <button
                ref={topRef}
                type="button"
                onClick={() => {
                  getLenis() ? getLenis()!.scrollTo(0, { duration: 2.4 }) : scrollToTarget(0);
                  document.getElementById("conteudo")?.focus({ preventScroll: true });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-2 text-ivory/85 transition-colors hover:border-ivory/60 hover:text-ivory"
              >
                <ArrowUp className="size-4" aria-hidden="true" /> Voltar ao topo
              </button>
            </div>
          </div>
        </div>
        </FitBox>
      </div>
    </footer>
  );
}
