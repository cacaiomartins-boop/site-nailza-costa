import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Gera dist/404.html (cópia da página principal, com noindex). A Vercel serve esse arquivo
// com status HTTP 404 em endereços que não existem (ver rewrites em vercel.json).
function pagina404(): Plugin {
  return {
    name: "pagina-404",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") return;
      const html = String(index.source).replace('content="index, follow"', 'content="noindex, follow"');
      this.emitFile({ type: "asset", fileName: "404.html", source: html });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), pagina404()],
  server: { port: 8080, host: true },
});
