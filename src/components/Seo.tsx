import { useEffect } from "react";
import { clinic } from "../data/clinic";

type Props = {
  title: string;
  description: string;
  /** caminho canônico da página (ex.: "/privacidade"). null = sem canonical (página 404). */
  path: string | null;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

const head = () => document.head;

function upsert(selector: string, create: () => HTMLElement) {
  let el = head().querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    head().appendChild(el);
  }
  return el;
}

function meta(attr: "name" | "property", key: string, content: string) {
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
}

/** Atualiza title, description, canonical, Open Graph, Twitter e robots a cada página (sem mudar nada visível). */
export function Seo({ title, description, path, noindex = false, jsonLd }: Props) {
  useEffect(() => {
    const url = path === null ? null : clinic.siteUrl + (path === "/" ? "/" : path);
    document.title = title;
    meta("name", "description", description);
    meta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    meta("property", "og:title", title);
    meta("property", "og:description", description);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", description);

    const canonical = head().querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (url) {
      const link = canonical ?? (upsert('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }) as HTMLLinkElement);
      link.href = url;
      meta("property", "og:url", url);
    } else {
      canonical?.remove();
      head().querySelector('meta[property="og:url"]')?.remove();
    }

    head().querySelector("script[data-seo-jsonld]")?.remove();
    if (jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo-jsonld", "");
      s.text = JSON.stringify(jsonLd);
      head().appendChild(s);
    }
    return () => {
      head().querySelector("script[data-seo-jsonld]")?.remove();
    };
  }, [title, description, path, noindex, jsonLd]);
  return null;
}

/** Título de página de tema: até ~60 caracteres. */
export function themeTitle(label: string) {
  const full = `Terapia online para ${label.toLowerCase()} | ${clinic.name}`;
  return full.length <= 60 ? full : `Terapia para ${label.toLowerCase()} | ${clinic.name}`;
}

/** Descrição de página de tema: até ~155 caracteres. */
export function themeDescription(short: string) {
  const full = `${short} Psicoterapia online com ${clinic.name}.`;
  return full.length <= 155 ? full : short;
}
