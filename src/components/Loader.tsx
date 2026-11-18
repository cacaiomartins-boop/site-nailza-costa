import { useEffect, useRef, useState } from "react";
import { gsap, getLenis, shouldShowIntro } from "../motion/setup";
import { Logo } from "./Logo";

export function Loader() {
  const [show, setShow] = useState(shouldShowIntro());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const root = ref.current;
    if (!root) return;
    const html = document.documentElement;
    const block = (e: Event) => e.preventDefault();
    getLenis()?.stop();
    html.style.overflow = "hidden";
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });

    let done = false;
    const release = () => {
      html.style.overflow = "";
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      getLenis()?.start();
    };
    const finish = () => {
      if (done) return;
      done = true;
      release();
      try {
        sessionStorage.setItem("site-intro-seen", "1");
      } catch {
        /* ok */
      }
      setShow(false);
    };

    const ctx = gsap.context(() => {
      const mark = root.querySelector("[data-loader-mark]");
      const word = root.querySelector(".logo-word");
      const role = root.querySelector(".logo-role");
      const bar = root.querySelector("[data-bar]");
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(mark, { autoAlpha: 0, y: 22, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 0)
        .fromTo(word, { yPercent: 105 }, { yPercent: 0, duration: 0.9 }, 0.65)
        .fromTo(role, { autoAlpha: 0, scaleX: 1.22 }, { autoAlpha: 1, scaleX: 1, duration: 1, ease: "power3.out" }, 0.8)
        .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0)
        .add(() => {
          root.style.pointerEvents = "none";
          release();
          window.dispatchEvent(new Event("site:intro-done"));
        }, 1.85)
        .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, 1.85);
    }, root);

    const safety = window.setTimeout(() => {
      window.dispatchEvent(new Event("site:intro-done"));
      finish();
    }, 3800);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
      release();
    };
  }, [show]);

  if (!show) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream text-bronze"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div data-loader-mark className="invisible">
        <img src="/img/logo-mark.webp" alt="" width={405} height={520} className="h-[12rem] w-auto sm:h-[15rem]" />
      </div>
      <div className="mt-8 text-ink">
        <Logo mark={false} size="md" />
      </div>
      <div className="mt-8 h-px w-36 bg-bronze/15 sm:w-44">
        <div data-bar className="h-full w-full origin-left bg-bronze/80" />
      </div>
    </div>
  );
}
