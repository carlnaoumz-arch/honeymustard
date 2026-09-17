# Honey Mustard QA report

Tested 17 September 2026 against the portable GitHub production build using the Codex in-app browser (Chromium), local production pages, a local-only responsive/failure-condition harness, TypeScript, Node's test runner, and axe-core 4.10.3.

## Latest follow-up: automatic hero playback

At the owner's request, removed pause/resume controls, saved pause behavior, offscreen pausing, and app-level reduced-motion/data-saving playback gates. This supersedes the earlier playback assertions below. The actual desktop/mobile videos and posters are unchanged.

Verified fresh 390px mobile and 1280px desktop loading with no tap inside the site: video playing, muted, autoplay/loop enabled, no controls, zero hero buttons, zero runtime errors, and no horizontal overflow. Reload starts automatically. The simulated reduced-motion and data-saving settings no longer suppress playback. Production build, TypeScript and all seven existing regression tests passed. Actual phone/browser policies can still decline autoplay; readiness, page return and ordinary-touch retries are provided, with the poster as fallback. A physical iPhone was not available for this check.

## Earlier full-site audit result

All final checks below passed. No unresolved application bugs were found within this coverage. This is a tested release, not a guarantee against every possible device, browser, hosting configuration, or future content change.

## Fixed in this update

- “Coffee” previously returned no results despite being suggested by the search field. Search now covers coffee aliases, accents, multiple words, categories, ingredients and beverage sizes.
- Search/category filters now live in the URL and survive refresh, shared links, and Back/Forward navigation.
- Prerendered pages are hydrated rather than discarded. About, featured-dish and branch anchors land correctly after loading.
- Unknown page URLs show a dedicated branded 404, with a menu/home recovery path. Preview returns HTTP 404; production hosting must preserve this behavior.
- The unconfirmed zero-priced wine displays “Ask branch” rather than appearing free.
- Animation pauses offscreen and when the document is hidden; manual pause is remembered for the browser session. Reduced motion/data saving omit automatic video loading. A poster remains usable if autoplay or video loading fails.
- Search text is 16px to avoid iOS input zoom; clear/filter controls have at least 44px height. Mobile navigation closes with Escape and returns focus. Dialog padding no longer behaves as the backdrop.
- Location branch headings now follow the correct semantic hierarchy.
- Fonts and their licenses are bundled locally. The 15 MB video master is retained in `media/` and excluded from the 2.6 MB production directory. Actual playback uses the compressed web videos.
- Each prerendered page has its own metadata. Source is formatted, strictly type-checked, and accompanied by repeatable regression tests and a QA harness.

## Browser coverage

- Responsive checks at 320px and 390px mobile, 768px tablet, and 1280px desktop: no horizontal document overflow in checked pages; manual visual review of mobile home, desktop About/Locations and the new 404.
- All nine menu category buttons plus All: counts 7/9/5/20/5/5/10/13/7, totaling 81.
- Search: coffee → 6; avocado → 6; avocado + Salad → 4; no match → empty-state guidance; clear, both reset controls, and All restore expected results.
- Shared URL loading, page refresh and browser Back/Forward preserve combined filters.
- Both hero links, all six category-rail links, both food-image links, all four featured dishes, gallery/menu/about/branch calls to action, and all non-telephone footer destinations were clicked and verified.
- Featured dishes receive the matching highlighted menu item. About, all four footer branch anchors, and back-to-top navigate correctly.
- Header/mobile/footer/location call selectors, all four branch options, close controls, saved branch persistence, preference clearing and its disabled state were checked. Phone destinations match the data.
- Keyboard skip link focuses main content; Escape dismisses mobile navigation and dialogs.
- Accessibility audits on Home, Menu, Locations, Sources, 404, branch dialog and preferences: **zero final axe violations** in the tested states (WCAG A/AA and best-practice rules). The first Locations audit found a heading-order issue, which was fixed and rechecked.
- Normal production navigation showed no browser console errors or hydration warnings. Cold local page measurements showed zero layout shift in sampled initial views; this is a local diagnostic, not a real-world performance score.

## Failure-condition coverage

The local harness simulates these conditions without changing production code:

- Reduced motion and data saving: no automatic video element; poster remains.
- Blocked autoplay: paused video, poster, and usable controls; no unhandled errors.
- Failed video request: poster remains and navigation works.
- 20-second delayed video: menu navigation works before video readiness.
- Blocked browser storage: selecting a branch and viewing its contact still work.
- Manual pause survives a page reload; Play resumes; opening the footer preferences after scrolling away pauses the offscreen hero.

## Automated checks

`pnpm typecheck`, `pnpm build`, `pnpm test`, and `pnpm format:check` all passed. Seven regression tests cover all 81 item-name searches, nine category memberships, accent/coffee/combined/no-result searches, price handling, branch contact shape, prerendered metadata/assets, and every static navigation link/anchor.

To reproduce interactive checks, run `pnpm qa` after building and open `http://127.0.0.1:4174/__qa`. The harness and axe dependency are development-only and absent from `dist/`.

## Scope and launch facts

No calls or orders were placed. Telephone URIs and the three known map destinations were inspected; no new browser location permission was granted. Physical iOS/Android devices, Safari/Firefox, real cellular throttling, and a customer-facing hosting deployment were not tested in this pass.

Restaurant information still needs owner confirmation: all opening hours, the three directory-listed branches' current contacts/operation, Byblos directions, menus outside Bayada, and the wine price. These are visibly qualified on the site. The GitHub build is the updated deliverable; this pass does not update the older Higgsfield-hosted deployment or publish to its community feed.
