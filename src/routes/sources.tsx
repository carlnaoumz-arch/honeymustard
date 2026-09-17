import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/restaurant";
export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Information Sources | Honey Mustard Lebanon" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Sources,
});
function Sources() {
  return (
    <SiteShell>
      <main tabIndex={-1} id="main" className="section sources-page">
        <h1>Information sources.</h1>
        <p>Checked 17 September 2026.</p>
        <section>
          <h2>Menu</h2>
          <p>
            The official Omega menu, linked from the official Instagram,
            identifies Bayada. This website includes all 81 exposed items in
            nine categories, including beverage sizes and the published add-ons.
            Descriptions and names retain source wording. Prices use the
            source's $ symbol. No currency conversion or tax assumption is made.
          </p>
          <p>
            Ksara reserve du couvent is listed at 0.00 $. This may be an
            incomplete price and requires branch confirmation. No unlisted salad
            selections or extras have been invented.
          </p>
          <p>
            The Jal El Dib menu reference rendered an empty catalog. Branch
            differences cannot be established from it.
          </p>
        </section>
        <section>
          <h2>Branches &amp; contact</h2>
          <p>
            Official Instagram confirms “Salads &amp; Grills”, Level Two Bayada
            and +961 78 885 839. Dinesty lists four branches, contact numbers
            and daily hours. Other branches and all opening hours need current
            official confirmation. No live “Open now” status is shown.
          </p>
          <p>
            Bayada, Badaro and Jal El Dib direction destinations were taken from
            their directory actions. They are directory pins, not newly geocoded
            guesses. The Byblos directory points to 0,0; its directions action
            has therefore been withheld.
          </p>
          <p>
            No WhatsApp number, online checkout or guaranteed reservation is
            presented. Call your branch about service and availability.
          </p>
        </section>
        <section>
          <h2>Brand &amp; imagery</h2>
          <p>
            The logo is the actual asset on the official menu. Gallery and
            category photographs come from the restaurant's Dinesty listing.
            They are category imagery rather than a promise about an exact menu
            item. The hero is an AI-generated steak campaign animation made
            using Higgsfield. Its plating is a creative interpretation; use the
            real photographs as the reference for restaurant presentation.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
