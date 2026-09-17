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

The build prerenders Home, Menu, Locations, and the information notes page into `dist/`. Deploy that folder to a static host that resolves `/menu`, `/locations`, and `/sources` to their directory `index.html` files. Assets use root-relative paths, so serve the site at the domain root.

## Project structure

- `src/routes/` — page components
- `src/components/` — shared navigation, footer, branch selector, and hero playback
- `src/data/menu.json` — categories, descriptions, prices, and beverage sizes
- `src/data/branches.json` — branch contacts and listed hours
- `src/styles.css` — responsive design system
- `public/assets/` — actual restaurant photographs, logo, generated animation, and posters
- `src/prerender.tsx` — static HTML generation

The site uses React 19 and Vite. The portable router adapter preserves the page components originally authored for TanStack Start. No backend, API key, or database is required.

The original 1080p animation master is included alongside compressed desktop and mobile videos. Playback uses the compressed videos only. Menu and brand navigation stays on this website; phone calls and directions remain functional customer actions.

See [HANDOFF.md](HANDOFF.md) for research sources, verification gaps, media notes, and completed browser checks. Confirm outstanding branch information and the flagged wine price before a customer launch.
