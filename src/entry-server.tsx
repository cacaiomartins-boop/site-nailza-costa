// Usado só no build: gera o HTML de cada página (ver scripts/prerender.mjs).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { clinic, themes } from "./data/clinic";
import { themeDescription, themeTitle } from "./components/Seo";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

/** Páginas que viram arquivo HTML no build, com os dados de SEO de cada uma (mesma fonte do componente Seo). */
export function pages(): PageSeo[] {
  const base = clinic.siteUrl;
  return [
    { path: "/", title: clinic.seo.homeTitle, description: clinic.seo.homeDescription },
    ...themes.map((t) => ({
      path: `/terapia/${t.slug}`,
      title: themeTitle(t.label),
      description: themeDescription(t.short),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Como posso ajudar", item: `${base}/#como-ajudo` },
          { "@type": "ListItem", position: 3, name: t.label, item: `${base}/terapia/${t.slug}` },
        ],
      },
    })),
    { path: "/privacidade", title: clinic.seo.privacyTitle, description: clinic.seo.privacyDescription },
  ];
}
