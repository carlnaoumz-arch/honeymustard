import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  BranchCards,
  ArrowUpRightIcon,
  useBranch,
} from "@/components/restaurant";
export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations & Contact | Honey Mustard Lebanon" },
      {
        name: "description",
        content:
          "Find Honey Mustard Lebanon branch contacts, listed hours and available directions.",
      },
    ],
  }),
  component: Locations,
});
function Locations() {
  return (
    <SiteShell active="locations">
      <LocationContent />
    </SiteShell>
  );
}
function LocationContent() {
  const { openBranch } = useBranch();
  return (
    <main tabIndex={-1} id="main">
      <section className="page-intro locations-intro">
        <p className="kicker">COME HUNGRY</p>
        <h1>
          Good food.
          <br />
          <em>Closer to you.</em>
        </h1>
        <p>Find the branch you're looking for, then call or get directions.</p>
        <button className="choose-location" onClick={openBranch}>
          Choose a branch <ArrowUpRightIcon size={20} />
        </button>
      </section>
      <section className="section location-list">
        <BranchCards />
        <div className="verification-note">
          <h2>Before you visit</h2>
          <p>
            Bayada's contact is verified. The other branch details and all
            opening hours await current confirmation. Call your branch before
            travelling.
          </p>
          <p>
            Byblos directions are awaiting confirmation. Call the branch for
            directions.
          </p>
        </div>
      </section>
      <section className="contact-strip section">
        <h2>
          Let's make it
          <br />a Honey Mustard day.
        </h2>
        <div>
          <p>
            For takeaway, delivery availability or table requests, call your
            selected branch. A table is confirmed only by the restaurant.
          </p>
          <button onClick={openBranch} className="contact-call">
            Choose a branch to call <ArrowUpRightIcon size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
