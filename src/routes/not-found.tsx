import { SiteShell, ArrowRightIcon } from "@/components/restaurant";
export function NotFound() {
  return (
    <SiteShell active="">
      <main id="main" tabIndex={-1} className="section not-found">
        <p className="kicker">404 · A LITTLE OFF THE MENU</p>
        <h1>
          Looking for
          <br />
          <em>something good?</em>
        </h1>
        <p>
          This page could not be found. Your next craving is still on the menu.
        </p>
        <a className="choose-location" href="/menu">
          Explore the menu <ArrowRightIcon size={20} />
        </a>
        <a className="not-found-home" href="/">
          Back to home
        </a>
      </main>
    </SiteShell>
  );
}
