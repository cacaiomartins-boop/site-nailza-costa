// Pré-renderização: depois do build normal (dist/) e do build de servidor (dist-ssr/),
// gera o HTML completo de cada página (título, canonical, textos, links) para quem não executa JavaScript.
// O site continua funcionando igual no navegador: o React monta por cima e as animações rodam como antes.
// Chamado pelo plugin "prerender" do vite.config.ts, então vale para `vite build` e `npm run build`.
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://www.nailzacosta.com.br";
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, "s");
  if (!re.test(html)) throw new Error(`meta ${key} não encontrada no index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

export async function prerender(root = process.cwd()) {
  const dist = resolve(root, "dist");
  const ssr = resolve(root, "dist-ssr");
  const shell = readFileSync(join(dist, "index.html"), "utf8");
  const { render, pages } = await import(pathToFileURL(join(ssr, "entry-server.js")).href);

  let count = 0;
  for (const page of pages()) {
    let html = shell;
    const body = render(page.path);
    if (!body || body.length < 2000) throw new Error(`HTML vazio para ${page.path}`);
    html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered>${body}</div>`);
    html = html.replace(/<title>.*?<\/title>/s, `<title>${esc(page.title)}</title>`);
    html = setMeta(html, "name", "description", page.description);
    html = setMeta(html, "property", "og:title", page.title);
    html = setMeta(html, "property", "og:description", page.description);
    html = setMeta(html, "name", "twitter:title", page.title);
    html = setMeta(html, "name", "twitter:description", page.description);

    const url = SITE + (page.path === "/" ? "/" : page.path);
    let extra = `    <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n`;
    if (page.jsonLd) {
      extra += `    <script type="application/ld+json" data-seo-jsonld>${JSON.stringify(page.jsonLd)}</script>\n`;
    }
    html = html.replace("  </head>", `${extra}  </head>`);

    const out = page.path === "/" ? join(dist, "index.html") : join(dist, page.path, "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    count++;
    console.log(`prerender ${page.path} (${Math.round(html.length / 1024)} KB)`);
  }
  rmSync(ssr, { recursive: true, force: true });
  console.log(`pré-render concluído: ${count} páginas`);
}
