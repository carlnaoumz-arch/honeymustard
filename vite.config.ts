import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";
import { normalizePath } from "./src/metadata";
const routes = ["/", "/menu", "/locations", "/sources"];
export default defineConfig({
  plugins: [
    {
      name: "prerendered-preview",
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url || "/", "http://localhost");
          const path = normalizePath(url.pathname);
          if (routes.includes(path))
            req.url = (path === "/" ? "" : path) + "/index.html" + url.search;
          else if (req.headers.accept?.includes("text/html")) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.end(readFileSync("dist/404.html"));
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@tanstack/react-router": fileURLToPath(
        new URL("./src/preview-router.ts", import.meta.url),
      ),
    },
  },
  esbuild: { jsx: "automatic" },
  build: { outDir: "dist" },
});
