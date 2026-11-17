import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { clinic, msg, themes, waLink } from "../data/clinic";
import { Eyebrow, GhostLotus, Lotus, Reveal, SplitHeading, WhatsAppButton, renderEm } from "../components/ui";
import { FaqList } from "../components/Faq";
import { FitBox } from "../components/FitBox";
import { ThemeGlyph } from "../components/glyphs";
import { HashLink } from "../components/links";

// título de seção que encolhe junto com a altura da janela (desktop)
const h2 = "mt-7 text-[clamp(2.2rem,4vw,3.6rem)] lg:mt-[clamp(.75rem,2.4svh,1.75rem)] lg:!text-[clamp(2rem,min(4vw,6.6svh),3.6rem)]";

export default function ThemePage() {
  const { slug } = useParams();
  const theme = themes.find((t) => t.slug === slug);

  useEffect(() => {
    if (!theme) return;
    document.title = `Terapia para ${theme.label.toLowerCase()} online · ${clinic.name}`;
    const meta = document.querySelector('meta[name="description"]');
    const prev = meta?.getAttribute("content") ?? "";
    meta?.setAttribute("content", `${theme.short} Psicoterapia online com ${clinic.name}, ${clinic.crp}.`.slice(0, 160));
    return () => {
      meta?.setAttribute("content", prev);
    };
  }, [theme]);

  if (!theme) return <Navigate to="/" replace />;
  const others = themes.filter((t) => t.slug !== theme.slug);

  return (
    <div key={theme.slug}>
      {/* HERO */}
      <section className="fit-section relative overflow-clip bg-[linear-gradient(180deg,var(--color-cream),var(--color-blush)_180%)] pb-20 pt-32 sm:pt-40 lg:!pb-[clamp(1.5rem,5svh,3rem)] lg:!pt-[clamp(5.25rem,13svh,6.5rem)]">
        <GhostLotus className="-right-24 top-10 h-[40rem] w-[50rem] max-w-none" />
        <FitBox>
          <div className="container-site relative">
            <nav aria-label="Você está em" className="text-[.85rem] text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link to="/" className="hover:text-wine">Início</Link></li>
                <li aria-hidden="true">/</li>
                <li><HashLink hash="#como-ajudo" className="hover:text-wine">Como posso ajudar</HashLink></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink">{theme.label}</li>
              </ol>
            </nav>
            <div className="mt-10 lg:mt-[clamp(1rem,4svh,2.5rem)]">
              <Eyebrow label={`Psicoterapia · ${theme.label}`} />
            </div>
            <SplitHeading
              as="h1"
              text={`${theme.pageH1a} *${theme.pageH1b}*`}
              className="mt-7 max-w-[14em] text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1] tracking-[-.015em] lg:mt-[clamp(.75rem,2.6svh,1.75rem)] lg:text-[clamp(2.6rem,min(6vw,10svh),5.5rem)]"
            />
            <Reveal className="mt-8 max-w-[38rem] lg:mt-[clamp(1rem,3svh,2rem)]">
              <p className="text-[1.15rem] leading-[1.65] lg:text-[clamp(1rem,2.5svh,1.15rem)] lg:leading-[1.55]">{theme.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-[clamp(1rem,3.2svh,2rem)]">
                <WhatsAppButton href={waLink(msg.theme(theme.label))} size="lg" icon="arrow">Conversar sobre isso</WhatsAppButton>
                <HashLink hash="#processo" className="link-underline font-medium text-wine">Como funciona a terapia</HashLink>
              </div>
            </Reveal>
          </div>
        </FitBox>
      </section>

      {/* RECONHECER */}
      <section id="reconhecer" className="fit-section section-pad-sm bg-linen">
        <FitBox>
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow n="01" label="Reconhecer" />
              <SplitHeading text="Talvez você *se reconheça aqui.*" className={h2} />
            </div>
            <Reveal className="lg:col-span-7" stagger={0.1} y={24}>
              <ul className="divide-y divide-bronze/25 border-y border-bronze/25">
                {theme.mirror.map((m, i) => (
                  <li key={i} data-reveal-item className="grid grid-cols-[2rem_1fr] gap-4 py-6 lg:py-[clamp(.55rem,2svh,1.5rem)]">
                    <span className="text-[.8rem] font-medium tracking-[.14em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.45rem] leading-[1.25] text-ink sm:text-[1.7rem] lg:text-[clamp(1.15rem,3svh,1.7rem)]">{m}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </FitBox>
      </section>

      {/* CAMINHOS */}
      <section id="caminhos" className="fit-section section-pad-sm bg-ivory">
        <FitBox>
          <div className="container-site">
            <Eyebrow n="02" label="Como a terapia ajuda" />
            <SplitHeading text="Caminhos que *podemos percorrer juntos.*" className={`${h2} max-w-[18ch]`} />
            <Reveal className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-[clamp(1.25rem,5svh,3rem)]" stagger={0.12}>
              {theme.paths.map((p, i) => (
                <article key={p.t} data-reveal-item className="rounded-[2rem] border border-bronze/15 bg-cream p-8 shadow-soft lg:p-[clamp(1.25rem,3.6svh,2rem)]">
                  <span className="font-display text-[2.4rem] italic text-bronze lg:text-[clamp(1.75rem,4.6svh,2.4rem)]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-[1.55rem] leading-tight lg:text-[clamp(1.2rem,3.2svh,1.55rem)]">{p.t}</h3>
                  <p className="mt-3 lg:text-[clamp(.9rem,2.2svh,1.0625rem)] lg:leading-[1.55]">{p.d}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </FitBox>
      </section>

      {/* ABORDAGEM */}
      <section id={`abordagem-${theme.slug}`} className="fit-section section-pad-sm relative overflow-clip bg-cream">
        <FitBox>
          <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Eyebrow n="03" label="Como eu trabalho" />
              <SplitHeading text={`Como trabalho *${theme.label.toLowerCase()}.*`} className={h2} />
            </div>
            <Reveal className="lg:col-span-7">
              <div className="rounded-[2rem] border border-bronze/15 bg-ivory p-8 shadow-card sm:p-10 lg:p-[clamp(1.5rem,4svh,2.5rem)]">
                <span className="flex size-12 items-center justify-center rounded-full bg-cream text-bronze"><ThemeGlyph icon={theme.icon} /></span>
                <p className="mt-6 text-[1.1rem] leading-[1.75] lg:mt-[clamp(.75rem,2.4svh,1.5rem)] lg:text-[clamp(.95rem,2.4svh,1.1rem)] lg:leading-[1.6]">{theme.approach}</p>
              </div>
            </Reveal>
          </div>
        </FitBox>
      </section>

      {/* DÚVIDAS DO TEMA */}
      <section id={`duvidas-tema-${theme.slug}`} className="fit-section section-pad-sm bg-linen">
        <FitBox>
          <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-14">
            <div className="lg:col-span-5">
              <Eyebrow n="04" label="Dúvidas" />
              <SplitHeading text="Perguntas *sobre este tema.*" className={h2} />
            </div>
            <div className="lg:col-span-7">
              <FaqList items={theme.faq} idPrefix={`tf-${theme.slug}`} />
            </div>
          </div>
        </FitBox>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: theme.faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
            }),
          }}
        />
      </section>

      {/* OUTROS TEMAS */}
      <section id="outros-temas" className="fit-section section-pad-sm bg-ivory">
        <FitBox>
          <div className="container-site">
            <Eyebrow n="05" label="Outros temas" />
            <SplitHeading text="Outros temas *que atendo.*" className={h2} />
            <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-[clamp(1.25rem,5svh,3rem)] lg:grid-cols-4" stagger={0.08} y={24}>
              {others.map((t) => (
                <Link
                  key={t.slug}
                  data-reveal-item
                  to={`/terapia/${t.slug}`}
                  className="group flex flex-col gap-3 rounded-3xl border border-bronze/15 bg-cream p-6 transition-[transform,box-shadow] duration-500 ease-silk hover:-translate-y-1 hover:shadow-soft lg:gap-[clamp(.4rem,1.2svh,.75rem)] lg:p-[clamp(1rem,2.6svh,1.5rem)]"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-ivory text-bronze"><ThemeGlyph icon={t.icon} /></span>
                  <span className="font-display text-[1.35rem] leading-tight text-ink lg:text-[clamp(1.1rem,2.8svh,1.35rem)]">{renderEm(t.title)}</span>
                  <span className="text-[.8rem] font-medium uppercase tracking-[.2em] text-bronze-deep">{t.label}</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </FitBox>
      </section>

      {/* CTA FINAL */}
      <section className="fit-section section-pad-tight bg-cream px-2.5 sm:px-4">
        <div data-theme="dark" className="grain relative overflow-hidden rounded-[1.75rem] bg-wine-deep text-ivory sm:rounded-[2.5rem]">
          <FitBox>
            <div className="container-site relative grid gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:py-[clamp(1.5rem,6svh,4rem)]">
              <div className="lg:col-span-8">
                <div className="w-16 text-gold-soft"><Lotus base sw={1.3} className="w-full" /></div>
                <h2 className="mt-6 text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.04]">{renderEm("Dar o primeiro passo *pode ser só uma mensagem.*")}</h2>
                <p className="mt-4 max-w-[34rem] text-ivory/75">Me conte, em poucas palavras, o que você está vivendo. Respondo assim que terminar os atendimentos.</p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <WhatsAppButton href={waLink(msg.theme(theme.label))} variant="light" size="lg">Enviar uma mensagem</WhatsAppButton>
              </div>
            </div>
          </FitBox>
        </div>
      </section>
    </div>
  );
}
