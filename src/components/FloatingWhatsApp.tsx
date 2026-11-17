import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { msg, waLink } from "../data/clinic";
import { WhatsAppIcon } from "./ui";

export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  const [avoid, setAvoid] = useState(false);
  const [footer, setFooter] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMenu = () => setMenu(document.documentElement.dataset.menu === "open");
    window.addEventListener("menu:toggle", onMenu);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("menu:toggle", onMenu);
    };
  }, []);

  useEffect(() => {
    const avoidSet = new Set<Element>();
    const darkSet = new Set<Element>();
    const ioAvoid = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? avoidSet.add(e.target) : avoidSet.delete(e.target)));
        setAvoid(avoidSet.size > 0);
      },
      { rootMargin: "-66% 0px 0px 0px" },
    );
    const ioFooter = new IntersectionObserver((es) => setFooter(es.some((e) => e.isIntersecting)));
    const ioDark = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? darkSet.add(e.target) : darkSet.delete(e.target)));
        setDark(darkSet.size > 0);
      },
      { rootMargin: "-85% 0px 0px 0px" },
    );
    const attach = () => {
      document.querySelectorAll("[data-float-avoid]").forEach((n) => ioAvoid.observe(n));
      document.querySelectorAll("footer").forEach((n) => ioFooter.observe(n));
      document.querySelectorAll('[data-theme="dark"]').forEach((n) => ioDark.observe(n));
    };
    const timers = [200, 1200, 3000].map((t) => window.setTimeout(attach, t));
    return () => {
      timers.forEach(clearTimeout);
      ioAvoid.disconnect();
      ioFooter.disconnect();
      ioDark.disconnect();
      setAvoid(false);
      setFooter(false);
    };
  }, [pathname]);

  const visible = pastHero && !avoid && !footer && !menu;
  return (
    <a
      href={waLink(msg.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar conversa no WhatsApp (abre em nova aba)"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-4 right-4 z-40 flex h-[3.625rem] items-center rounded-full pl-0 pr-0 shadow-wine transition-[opacity,transform,background-color,color] duration-500 ease-silk sm:bottom-6 sm:right-6 lg:h-[3.75rem] ${
        dark ? "bg-ivory text-wine" : "bg-wine text-ivory"
      } ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-[.95rem] font-medium opacity-0 transition-[max-width,opacity,padding] duration-500 ease-silk group-hover:max-w-[12rem] group-hover:pl-6 group-hover:opacity-100 group-focus-visible:max-w-[12rem] group-focus-visible:pl-6 group-focus-visible:opacity-100">
        Agendar conversa
      </span>
      <span className="flex size-[3.625rem] items-center justify-center lg:size-[3.75rem]">
        <WhatsAppIcon className="size-[1.65rem]" />
      </span>
    </a>
  );
}
