import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { clinic, msg, themes, waLink } from "../data/clinic";
import { gsap, ScrollTrigger, getLenis, MQ } from "../motion/setup";
import { HashLink } from "./links";
import { Logo } from "./Logo";
import { WhatsAppButton, WhatsAppIcon } from "./ui";
import { ThemeGlyph } from "./glyphs";

export function Header() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(false);
  const [acc, setAcc] = useState(false);
  const menuRef = useRef(false);
  menuRef.current = menu;

  // rolagem: encolhe, esconde ao descer e mostra ao subir
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const qy = gsap.quickTo(el, "yPercent", { duration: 0.6, ease: "silk" });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() < 160 || el.contains(document.activeElement) || menuRef.current) qy(0);
        else qy(self.direction === 1 ? -140 : 0);
      },
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      st.kill();
      gsap.set(el, { yPercent: 0 });
    };
  }, []);

  // tom escuro quando o topo da tela está sobre uma seção escura
  useEffect(() => {
    const active = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? active.add(e.target) : active.delete(e.target)));
        setTone(active.size ? "dark" : "light");
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    const attach = () => document.querySelectorAll('[data-theme="dark"]').forEach((n) => io.observe(n));
    const timers = [200, 1200, 3000].map((t) => window.setTimeout(attach, t));
    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
      setTone("light");
    };
  }, [pathname]);

  // menu: trava rolagem e avisa o botão flutuante
  useEffect(() => {
    document.documentElement.dataset.menu = menu ? "open" : "closed";
    window.dispatchEvent(new Event("menu:toggle"));
    if (menu) getLenis()?.stop();
    else getLenis()?.start();
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);
  useEffect(() => setMenu(false), [pathname]);

  const dark = tone === "dark" && !menu;
  const bg = menu
    ? "bg-cream"
    : scrolled
      ? dark
        ? "bg-wine-deep/80 backdrop-blur-xl shadow-[0_1px_0_rgba(216,192,154,.18)]"
        : "bg-cream/85 backdrop-blur-xl shadow-[0_1px_0_rgba(146,108,62,.14)]"
      : "bg-transparent";
  const text = dark ? "text-ivory/85" : "text-ink/85";
  const nav = "link-underline text-[.9rem] xl:text-[.95rem] " + text;
  const close = () => setMenu(false);

  return (
    <>
      <a href="#conteudo" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-wine px-4 py-2 text-ivory">
        Pular para o conteúdo
      </a>
      <header
        ref={ref}
        data-scrolled={scrolled}
        data-tone={dark ? "dark" : "light"}
        data-menu-open={menu}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ${bg}`}
      >
        <div
          className={`container-site flex items-center justify-between gap-6 transition-[height] duration-700 ease-silk ${
            scrolled ? "h-[4.25rem] lg:h-[4.75rem]" : "h-[5rem] lg:h-[6.25rem]"
          }`}
        >
          <HashLink hash="#inicio" onClick={close} className={`${dark ? "text-ivory" : "text-ink"} transition-colors duration-700`}>
            <span className="sr-only">Nailza Costa, psicóloga. Ir para o topo</span>
            <span aria-hidden="true">
              <Logo size="sm" className={dark ? "text-ivory" : ""} />
            </span>
          </HashLink>

          <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex xl:gap-8 min-[1400px]:gap-10">
            <HashLink hash="#sobre" className={nav}>Sobre</HashLink>
            <div
              className="relative"
              onMouseEnter={() => setDd(true)}
              onMouseLeave={() => setDd(false)}
              onFocus={() => setDd(true)}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDd(false)}
            >
              <button type="button" aria-expanded={dd} aria-haspopup="true" className={`${nav} inline-flex items-center gap-1.5 py-6`}>
                Como posso ajudar
                <ChevronDown className={`size-4 transition-transform duration-500 ${dd ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div
                className={`absolute left-1/2 top-full w-[35rem] -translate-x-1/2 transition-[opacity,transform,visibility] duration-500 ease-silk ${
                  dd ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="rounded-3xl border border-bronze/15 bg-ivory p-4 shadow-card">
                  <ul className="grid grid-cols-2 gap-1">
                    {themes.map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={`/terapia/${t.slug}`}
                          onClick={() => setDd(false)}
                          className="flex items-center gap-3 rounded-2xl p-3 text-ink transition-colors duration-500 hover:bg-linen"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-bronze">
                            <ThemeGlyph icon={t.icon} className="size-5" />
                          </span>
                          <span className="font-display text-[1.1rem] leading-tight">{t.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <HashLink hash="#como-ajudo" onClick={() => setDd(false)} className="mt-2 flex items-center gap-2 border-t border-bronze/15 px-3 pt-4 text-[.9rem] font-medium text-wine">
                    Ver todos os temas <ArrowRight className="size-4" aria-hidden="true" />
                  </HashLink>
                </div>
              </div>
            </div>
            <HashLink hash="#online" className={nav}>Terapia online</HashLink>
            <HashLink hash="#duvidas" className={nav}>Dúvidas</HashLink>
            <HashLink hash="#processo" className={`${nav} hidden xl:inline`}>Como funciona</HashLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <WhatsAppButton href={waLink(msg.header)} variant={dark ? "light" : "primary"} icon="none">
                Agendar conversa
              </WhatsAppButton>
            </div>
            <button
              type="button"
              className="relative flex size-11 items-center justify-center lg:hidden"
              aria-label={menu ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-silk ${dark ? "text-ivory" : "text-ink"} ${menu ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-silk ${dark ? "text-ivory" : "text-ink"} ${menu ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* menu mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-lenis-prevent
        className={`fixed inset-0 z-40 overflow-y-auto bg-cream pt-24 transition-[opacity,visibility] duration-500 lg:hidden ${menu ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="container-site pb-12">
          <ul className="divide-y divide-bronze/15 font-display text-[2rem] text-ink">
            <li><HashLink hash="#sobre" onClick={close} className="flex items-center justify-between py-4">Sobre <ArrowRight className="size-5 text-bronze" /></HashLink></li>
            <li>
              <button type="button" aria-expanded={acc} onClick={() => setAcc((v) => !v)} className="flex w-full items-center justify-between py-4 text-left">
                Como posso ajudar <ArrowRight className={`size-5 text-bronze transition-transform duration-500 ${acc ? "rotate-90" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-silk ${acc ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0 overflow-hidden" inert={!acc}>
                  <ul className="grid gap-2 pb-5 font-sans text-base sm:grid-cols-2">
                    {themes.map((t) => (
                      <li key={t.slug}>
                        <Link to={`/terapia/${t.slug}`} onClick={close} className="flex items-center gap-3 rounded-2xl bg-ivory p-3 text-ink">
                          <span className="flex size-9 items-center justify-center rounded-full bg-cream text-bronze"><ThemeGlyph icon={t.icon} className="size-4" /></span>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                    <li className="sm:col-span-2">
                      <HashLink hash="#como-ajudo" onClick={close} className="inline-flex items-center gap-2 py-2 text-[.95rem] font-medium text-wine">Ver todos os temas <ArrowRight className="size-4" /></HashLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li><HashLink hash="#processo" onClick={close} className="flex items-center justify-between py-4">Como funciona <ArrowRight className="size-5 text-bronze" /></HashLink></li>
            <li><HashLink hash="#online" onClick={close} className="flex items-center justify-between py-4">Terapia online <ArrowRight className="size-5 text-bronze" /></HashLink></li>
            <li><HashLink hash="#duvidas" onClick={close} className="flex items-center justify-between py-4">Dúvidas <ArrowRight className="size-5 text-bronze" /></HashLink></li>
          </ul>
          <div className="mt-8">
            <WhatsAppButton href={waLink(msg.header)} size="lg" className="w-full">
              Agendar conversa no WhatsApp
            </WhatsAppButton>
            <p className="mt-6 text-[.9rem] text-muted">
              {clinic.name} · {clinic.role} · {clinic.crp}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { WhatsAppIcon, MQ };
