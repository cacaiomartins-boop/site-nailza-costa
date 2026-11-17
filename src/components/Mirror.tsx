import { clinic, msg, waLink } from "../data/clinic";
import { gsap, MQ, ScrollTrigger, useMotion } from "../motion/setup";
import { Eyebrow, Lotus, SplitHeading, WhatsAppButton, bloom } from "./ui";

export function Mirror() {
  const m = clinic.mirror;
  const ref = useMotion<HTMLElement>((mm, root) => {
    const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-mirror-line]"));
    const markers = Array.from(root.querySelectorAll("[data-mirror-marker]"));
    const closing = root.querySelector<HTMLElement>("[data-mirror-closing]");
    const lotus = root.querySelector("[data-mirror-lotus]");
    const petals = Array.from(root.querySelectorAll(".lotus-petal"));
    const rules = Array.from(root.querySelectorAll(".lotus-rule"));
    const dot = root.querySelector(".lotus-dot");
    const track = root.querySelector<HTMLElement>("[data-mirror-track]");
    const win = root.querySelector<HTMLElement>("[data-mirror-window]");

    // ---------- DESKTOP: seção fixada ----------
    mm.add(MQ.desktop, () => {
      root.dataset.pinned = "true";
      gsap.set(lines, { opacity: 0.35, x: 16 });
      gsap.set(markers, { opacity: 0, scale: 0 });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(closing, { opacity: 0, y: 28 });

      // Ajusta a fonte (busca binária) para as 6 frases + fechamento caberem juntos na janela.
      // As variáveis ficam na JANELA, nunca na seção fixada (o ScrollTrigger restaura o style dela).
      const fit = () => {
        if (!win || !track || !lines[0]) return;
        win.style.removeProperty("--mfs");
        win.style.removeProperty("--mpad");
        const sample = lines[0].querySelector<HTMLElement>("[data-mirror-text]");
        if (!sample) return;
        const def = parseFloat(getComputedStyle(sample).fontSize);
        const lim = win.clientHeight;
        const apply = (px: number) => {
          win.style.setProperty("--mfs", px + "px");
          win.style.setProperty("--mpad", Math.max(3, px * 0.3) + "px");
        };
        if (track.offsetHeight <= lim) return;
        let lo = 16;
        let hi = def;
        for (let k = 0; k < 14; k++) {
          const mid = (lo + hi) / 2;
          apply(mid);
          if (track.offsetHeight <= lim) lo = mid;
          else hi = mid;
        }
        apply(lo);
      };
      fit();
      ScrollTrigger.addEventListener("refreshInit", fit);

      // Só entra deslocamento se, mesmo no menor tamanho, a lista não couber (reserva).
      const targetY = (el: HTMLElement | null, last = false) => () => {
        if (!el || !win || !track) return 0;
        const h = win.clientHeight;
        const over = track.offsetHeight - h;
        if (over <= 0) return 0;
        if (last) return -over;
        return -Math.min(over, Math.max(0, el.offsetTop - h * 0.3));
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + 1.6 * window.innerHeight,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });
      lines.forEach((line, i) => {
        if (i > 0) {
          tl.to(lines[i - 1], { opacity: 0.75, duration: 0.4 }, i)
            .to(markers[i - 1], { scale: 0, opacity: 0, duration: 0.3 }, i);
        }
        tl.to(line, { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" }, i)
          .to(markers[i], { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, i + 0.08)
          .to(track, { y: targetY(line), duration: 0.6, ease: "power1.out" }, i);
        if (petals[i]) tl.to(petals[i], { drawSVG: "0% 100%", duration: 0.9, ease: "power1.inOut" }, i);
      });
      const end = lines.length;
      tl.to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" }, end)
        .to(rules, { drawSVG: "0% 100%", duration: 0.8 }, end)
        .to(track, { y: targetY(closing, true), duration: 0.7, ease: "power1.out" }, end)
        .to(closing, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, end + 0.2)
        .to({}, { duration: 0.6 }, end + 0.9);

      const focusEnd = () => tl.scrollTrigger && window.scrollTo({ top: tl.scrollTrigger.end, behavior: "auto" });
      closing?.addEventListener("focusin", focusEnd);
      return () => {
        closing?.removeEventListener("focusin", focusEnd);
        ScrollTrigger.removeEventListener("refreshInit", fit);
        win?.style.removeProperty("--mfs");
        win?.style.removeProperty("--mpad");
        delete root.dataset.pinned;
        gsap.set(track, { clearProps: "transform" });
      };
    });

    // ---------- MOBILE / TELA BAIXA: sem pin ----------
    mm.add(MQ.small, () => {
      gsap.set(lines, { opacity: 0.35, x: 16 });
      gsap.set(markers, { opacity: 0, scale: 0 });
      gsap.set(closing, { opacity: 0, y: 28 });
      lines.forEach((line, i) => {
        const to = (o: gsap.TweenVars, marker: boolean) => {
          gsap.to(line, { ...o, duration: 0.9, ease: "silk", overwrite: "auto" });
          gsap.to(markers[i], { opacity: marker ? 1 : 0, scale: marker ? 1 : 0, duration: 0.6, ease: marker ? "back.out(2)" : "silk", overwrite: "auto" });
        };
        gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: "top 65%",
            end: "bottom 65%",
            onEnter: () => to({ opacity: 1, x: 0 }, true),
            onLeave: () => to({ opacity: 0.75, x: 0 }, false),
            onEnterBack: () => to({ opacity: 1, x: 0 }, true),
            onLeaveBack: () => to({ opacity: 0.35, x: 16 }, false),
          },
        });
      });
      gsap.set(petals, { drawSVG: "50% 50%" });
      gsap.set(rules, { drawSVG: "100% 100%" });
      gsap.set(dot, { scale: 0 });
      gsap.timeline({ scrollTrigger: { trigger: lotus, start: "top 85%", once: true } }).add(bloom(lotus as Element, { dur: 1.4 }));
      gsap.to(closing, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: closing, start: "top 85%", once: true } });
    });
  });

  return (
    <div>
    <section ref={ref} id="espelho" className="relative overflow-clip bg-linen py-24 sm:py-32 lg:py-40">
      <div className="container-site grid w-full gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div className="lg:col-span-5">
          <Eyebrow n="01" label="Talvez seja com você" />
          <SplitHeading text={m.title} className="mt-7 max-w-[14ch] text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8" />
          <div data-mirror-lotus className="mt-10 hidden w-44 text-bronze sm:block lg:w-[min(14rem,30svh)]">
            <Lotus base sw={1.4} className="w-full" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div data-mirror-window>
            <div data-mirror-track>
              <ol className="divide-y divide-bronze/25 border-y border-bronze/25">
                {m.lines.map((l, i) => (
                  <li
                    key={i}
                    data-mirror-line
                    className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-5 py-6 sm:grid-cols-[2rem_1fr_auto] sm:gap-x-7 sm:py-7"
                  >
                    <span className="text-[.8rem] font-medium tracking-[.14em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
                    <span data-mirror-text className="font-display text-[1.375rem] leading-[1.25] text-ink sm:text-[1.6rem]">
                      {l}
                    </span>
                    <span data-mirror-marker aria-hidden="true" className="size-2.5 translate-y-[-2px] rounded-full bg-bronze" />
                  </li>
                ))}
              </ol>
              <div data-mirror-closing className="mt-10 max-w-[34rem]">
                <p className="text-[1.05rem] leading-relaxed text-text">{m.closing}</p>
                <div className="mt-6">
                  <WhatsAppButton href={waLink(msg.mirror)} variant="outline">
                    {m.cta}
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
