import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const routes = [
  "index.html",
  "menu/index.html",
  "locations/index.html",
  "sources/index.html",
  "404.html",
];
test("production pages are prerendered with unique metadata and local asset links", () => {
  const titles = new Set();
  for (const route of routes) {
    const html = readFileSync(resolve("dist", route), "utf8");
    assert.ok(html.includes("<main"), route);
    assert.ok(html.includes('id="main"'), route);
    titles.add(html.match(/<title>(.*?)<\/title>/s)[1]);
    assert.ok(!html.includes("fonts.googleapis.com"));
    assert.ok(!html.includes('href="https://menu.omegasoftware'));
    for (const match of html.matchAll(
      /(?:src|href|srcSet)="(\/[^"?#]*)(?:[?#][^"]*)?"/g,
    )) {
      const path = match[1];
      assert.ok(
        existsSync(resolve("dist", "." + path)),
        `${route}: missing ${path}`,
      );
    }
  }
  assert.equal(titles.size, routes.length);
  assert.ok(readFileSync("dist/404.html", "utf8").includes("noindex"));
  assert.ok(!existsSync("dist/assets/hero-master.mp4"));
});

test("every prerendered navigation link resolves internally or to an approved contact action", () => {
  const checked = new Set();
  for (const route of routes) {
    const html = readFileSync(resolve("dist", route), "utf8");
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (href.startsWith("tel:")) {
        assert.match(href, /^tel:\+961\d{8}$/);
        continue;
      }
      const url = new URL(href, `http://local.test/${route}`);
      if (url.origin !== "http://local.test") {
        assert.equal(
          url.origin + url.pathname,
          "https://www.google.com/maps/dir/",
        );
        assert.ok(url.searchParams.get("destination"));
        continue;
      }
      let file = resolve("dist", "." + url.pathname);
      if (!url.pathname.endsWith(".html")) file = resolve(file, "index.html");
      assert.ok(existsSync(file), `${route}: ${href}`);
      if (url.hash)
        assert.ok(
          readFileSync(file, "utf8").includes(
            `id="${decodeURIComponent(url.hash.slice(1))}"`,
          ),
          `${route}: missing target ${href}`,
        );
      checked.add(href);
    }
  }
  assert.ok(checked.size >= 20);
});
