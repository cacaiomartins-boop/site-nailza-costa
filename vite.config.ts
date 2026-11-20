import { build, defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { prerender } from "./scripts/prerender.mjs";

// Gera dist/404.html (cópia da página principal vazia, com noindex). A Vercel serve esse arquivo
// com status HTTP 404 em endereços que não existem (ver rewrites em vercel.json).
function pagina404(): Plugin {
  return {
    name: "pagina-404",
    apply: (config, { command }) => command === "build" && !config.build?.ssr,
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const html = String(index.source).replace('content="index, follow"', 'content="noindex, follow"');
      this.emitFile({ type: "asset", fileName: "404.html", source: html });
    },
  };
}

// Pré-render: depois do build do cliente, faz o build de servidor e grava o HTML completo de cada página.
function preRender(): Plugin {
  return {
    name: "pre-render",
    apply: (config, { command }) => command === "build" && !config.build?.ssr,
    enforce: "post",
    async closeBundle() {
      await build({
        configFile: false,
        logLevel: "warn",
        plugins: [react(), tailwindcss()],
        build: { ssr: "src/entry-server.tsx", outDir: "dist-ssr", emptyOutDir: true },
      });
      await prerender();
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pagina404(), preRender()],
  server: { port: 8080, host: true },
});
