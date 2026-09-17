import { renderToString } from "react-dom/server";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pages } from "./pages";
import { metadata } from "./metadata";
import { NotFound } from "./routes/not-found";
const template = readFileSync("dist/index.html", "utf8");
const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
for (const [path, Page] of Object.entries({ ...pages, "/404": NotFound })) {
  const meta = metadata[path];
  const html = template
    .replace(
      "</head>",
      (["/sources", "/404"].includes(path)
        ? '<meta name="robots" content="noindex">'
        : "") + "</head>",
    )
    .replace(
      '<div id="root"></div>',
      '<div id="root">' + renderToString(<Page />) + "</div>",
    )
    .replace(
      /<title>.*?<\/title>/s,
      "<title>" + escape(meta.title) + "</title>",
    )
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/s,
      "$1" + escape(meta.description) + "$2",
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/s,
      "$1" + escape(meta.title) + "$2",
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/s,
      "$1" + escape(meta.description) + "$2",
    );
  const dir = path === "/" || path === "/404" ? "dist" : "dist" + path;
  mkdirSync(dir, { recursive: true });
  writeFileSync(dir + (path === "/404" ? "/404.html" : "/index.html"), html);
}
