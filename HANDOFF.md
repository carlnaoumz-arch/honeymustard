# Honey Mustard Lebanon — website handoff

Completed 17 September 2026.

## Preview and files

- Local production preview: http://127.0.0.1:4173/
- Higgsfield deployment: https://honey-mustard-lebanon.higgsfield.app — currently shows a Higgsfield sign-in gate to signed-out visitors. Public customer access remains a hosting limitation. The site has **not** been listed on the community feed.
- The repository root contains the portable React/Vite source, media and data; `pnpm build` generates the prerendered `dist/` production build. This is a portable version of the components authored during this task, not an export of Higgsfield's private scaffold.
- The source includes the original 1080p animation master; playback uses the smaller web versions.
- Run with Node 20.19+ or 22.12+ and pnpm: `pnpm install`, `pnpm dev`; production: `pnpm build`, `pnpm preview --port 4173`. Serve `dist/` on a static host that resolves `/menu`, `/locations` and `/sources` to their directory `index.html` files. Opening HTML directly with `file://` is not supported.
- The local preview stays available while its server process runs. It is not a public internet URL.

## Design and content

Charcoal backgrounds, cream editorial typography, honey yellow actions, and restrained teal details adapt the dark restaurant composition of the supplied Pinterest reference. The real stacked wordmark and actual restaurant photography retain the business identity. Home, Full Menu, Locations and Sources share one responsive system. Natural scrolling is preserved.

All **81 exposed Bayada menu items across nine categories** are native, searchable content. Official names, descriptions, prices, glass/bottle sizes and listed add-ons are retained, including source spelling. Structured content lives in `src/data/menu.json` and `src/data/branches.json`. Components and styles are in `src/components`, `src/routes` and `src/styles.css`. Content can be moved into locale-specific files when Arabic or French is added.

The Higgsfield cloud version uses React 19 and TanStack Start. The portable version uses the same authored components, with a small route adapter and prerendering for standalone static hosting. It needs no credentials, database or backend. It includes metadata, social artwork, icons, alt text and supported Restaurant JSON-LD facts.

## Higgsfield animation

The 8-second, 1920×1080 animation was generated with Higgsfield Seedance 2.5 using restaurant food references and the official steak description. It is a photorealistic campaign interpretation, not an interactive 3D model or an exact menu photograph. It uses a slow camera move, realistic food depth and warm light. The generation changes some sauce presentation and steak slicing, so exact dish imagery remains the real restaurant photography elsewhere.

- Master: `media/hero-master.mp4` (approximately 15 MB)
- Desktop: `hero.mp4` (1440 px, approximately 818 KB)
- Mobile crop: `hero-mobile.mp4` (640 px, approximately 348 KB)
- Exact-frame desktop/mobile WebP posters load before playback.
- Muted inline playback, a pause button, reduced-motion/data-saving handling and static autoplay-failure fallback are implemented. No required content depends on the video.

## Sources and verification

Sources were checked in rendered browser pages on 17 September 2026:

- [Official Instagram](https://www.instagram.com/honeymustard.lb/) confirms “Salads & Grills”, Level Two Bayada and **+961 78 885 839**.
- [Official Omega menu](https://menu.omegasoftware.ca/honeymustard) identifies Bayada and supplies the 81 items. Its `$` symbol is preserved without assuming exchange rates or tax treatment.
- [Dinesty listing](https://web.dinestyapp.com/restaurant/honey-mustard) supplies actual photographs, four directory-listed branches and hours. Three usable map destinations were read from its actions.
- [Jal El Dib menu reference](https://menubarcode.com/256545) rendered an empty catalog; branch price parity could not be established.
- [Pinterest inspiration](https://www.pinterest.com/pin/924223154823788151/) supplied the dark restaurant art direction. 21st.dev and MotionSites informed interaction and motion choices; Godly could not be inspected through the available reader. No third-party component source was copied.

## Facts still awaiting confirmation

1. Current operation and phone details for Byblos/Jbeil, Badaro and Jal El Dib. They are labeled directory-listed, not officially confirmed.
2. Current opening hours for every branch. No live “Open now” claim is displayed.
3. A valid Byblos map destination. The directory's 0,0 pin was rejected; its card says “Call for directions.”
4. Menus and price differences outside Bayada; the separate Jal El Dib catalog was empty.
5. The menu's **Ksara reserve du couvent, 0.00 $** entry. Its price is displayed as “Ask branch” with an explicit confirmation note.
6. Verified online ordering, WhatsApp or booking channels. Calls are provided; no checkout, reservation confirmation or unsupported messaging channel is implied.

## Checks completed

- Cloud type check and production build passed before deployment; final cloud deployment includes accessibility polish. Portable client and prerender builds pass.
- Browser layout/refresh checks at 320 px and 390 px phones, 768 px tablet and 1280 px desktop; no horizontal document overflow in checked views.
- All 81 items render; search, category selection, combined search/filter, empty results and reset work. Sizes and source-price notes render natively.
- Branch selection, persisted selection, correct telephone links, three directory-derived map destinations, official menu and Instagram links checked. No phone calls or orders were placed.
- Animation playback and pause checked. Isolated test-server simulations verified reduced motion and data saving omit video; blocked autoplay retains the poster; a 20-second media delay leaves menu navigation working. These were controlled browser simulations, not measurements on a physical low-bandwidth phone.
- Keyboard skip-link and native dialog Escape behavior checked; visible focus and reduced-motion CSS are included. No browser console errors were observed in the final production preview.
- Gallery uses actual photography and lazy loading. Media dimensions and poster frames reserve the hero layout.

## Before public launch

Confirm the outstanding business facts above, choose a customer-accessible hosting destination, and set absolute social-image/canonical URLs to that final domain. The portable build can be hosted independently of the current Higgsfield sign-in gate. No domain purchase, payment integration or public community publication was performed.

## Navigation update — 17 September 2026

At the owner's request, all original-menu, directory, and Instagram navigation has been removed. Food, gallery, and About actions stay within this website. The footer no longer promotes the source-notes page; historical research links remain in this handoff only. Telephone and map directions remain as functional customer actions. Restaurant structured data now points to the built-in `/menu`.

## Footer update — 17 September 2026

Added structured site navigation, menu-category shortcuts, Bayada contact details, links to all four branch sections, branch selection, visit information, current-year copyright, back-to-top navigation and a site-preferences dialog for clearing the saved branch. All footer links are internal or telephone actions. Verified desktop and a 390-pixel local browser frame, category filtering, branch dialog, preferences clearing/disabled state and back-to-top. Production build and deployment passed.

## QA and reliability update — 17 September 2026

The GitHub/portable version now has persistent shareable menu filters, multiword and accent-insensitive search with coffee aliases, hydration of prerendered HTML, reliable section links, real 404 content, page-specific metadata, local fonts, larger mobile search controls, correct branch heading hierarchy, keyboard navigation dismissal, robust dialog backdrop handling, and animation pause persistence/offscreen suspension. The unused 1080p master was moved out of the public build. Typed checks, regression tests, formatting, and a local-only accessibility/failure-condition harness are included.

This update targets the requested GitHub repository. The older Higgsfield deployment is not synchronized with this QA update. No community feed publication was performed. See `QA-REPORT.md` for the final test coverage.
