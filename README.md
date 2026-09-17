# Honey Mustard Lebanon

A responsive restaurant website with an animated food hero, an 81-item searchable menu, branch selection, contact details, and a complete mobile-friendly footer.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
```

## Production build

```sh
pnpm build
pnpm preview --port 4173
```

The build prerenders Home, Menu, Locations, the information notes page, and a custom 404 page into `dist/`. Configure the static host to serve `404.html` with HTTP 404 for unknown pages; avoid a catch-all rewrite to the homepage. Deploy that folder to a static host that resolves `/menu`, `/locations`, and `/sources` to their directory `index.html` files. Assets use root-relative paths, so serve the site at the domain root.

## Project structure

- `src/routes/` — page components
- `src/components/` — shared navigation, footer, branch selector, and hero playback
- `src/data/menu.json` — categories, descriptions, prices, and beverage sizes
- `src/data/branches.json` — branch contacts and listed hours
- `src/styles.css` — responsive design system
- `public/assets/` — actual restaurant photographs, logo, generated animation, and posters
- `src/prerender.tsx` — static HTML generation

The site uses React 19 and Vite. The portable router adapter preserves the page components originally authored for TanStack Start. No backend, API key, or database is required.

The original 1080p animation master is preserved in `media/`, outside the public build. Compressed desktop/mobile videos are in `public/assets/`. Fonts are served locally with their open-source licenses. Playback uses the compressed videos only. Menu and brand navigation stays on this website; phone calls and directions remain functional customer actions.

See [HANDOFF.md](HANDOFF.md) for research sources, verification gaps, media notes, and completed browser checks. Confirm outstanding branch information and the flagged wine price before a customer launch.

## Verification

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm format:check
pnpm qa
```

The local-only QA harness at `http://127.0.0.1:4174/__qa` offers mobile/tablet/desktop widths, accessibility audits, and controlled video/storage failure conditions. It is not included in the deployed `dist/`. See [QA-REPORT.md](QA-REPORT.md) for coverage and limitations.

Menu query and category filters are shareable URL parameters and survive refresh and browser history navigation. Search supports multiple words, accent-insensitive matching, ingredients, categories, beverage sizes, and coffee aliases. Invalid routes show the 404 page.
