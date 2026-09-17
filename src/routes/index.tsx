import { createFileRoute } from "@tanstack/react-router";
import {
  SiteShell,
  CategoryRail,
  BranchCards,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@/components/restaurant";
import { HeroFilm } from "@/components/hero-film";
import menu from "@/data/menu.json";
export const Route = createFileRoute("/")({ component: Home });
function Home() {
  const items = menu.flatMap((g) => g.items);
  const featured = [
    "ribeye",
    "salmon-asian-bowl",
    "swiss-mushroom-burger",
    "volcanic-shrimp",
  ].map((id) => items.find((i) => i.id === id)!);
  return (
    <SiteShell>
      <main tabIndex={-1} id="main">
        <section className="hero">
          <HeroFilm />
          <div className="hero-copy">
            <p className="hero-eyebrow">HONEY MUSTARD · LEBANON</p>
            <h1>
              Your next
              <br />
              craving <em>starts here.</em>
            </h1>
            <p className="hero-description">
              Salads, sizzling grills, and a little something for every craving.
              Welcome to Honey Mustard.
            </p>
            <div className="hero-actions">
              <a className="hero-menu" href="/menu">
                View Menu <ArrowUpRightIcon size={21} />
              </a>
              <a className="hero-branches" href="/locations">
                Find a Branch <ArrowRightIcon size={19} />
              </a>
            </div>
          </div>
        </section>
        <CategoryRail />
        <section className="section featured">
          <div className="section-heading">
            <p className="kicker">A TASTE OF HONEY MUSTARD</p>
            <h2>
              Big on flavour.
              <br />
              <span>Made for your mood.</span>
            </h2>
            <p>From a colourful bowl to something straight off the grill.</p>
          </div>
          <div className="food-editorial">
            <a
              className="food-photo steak-photo"
              href="/menu?category=Main%20course"
            >
              <img
                src="/assets/restaurant-grills.jpg"
                width="1000"
                height="900"
                loading="lazy"
                alt="Honey Mustard grilled dishes in skillets with sauce and fries"
              />
              <div>
                <span>FROM THE GRILL</span>
                <h3>A little sizzle.</h3>
                <ArrowUpRightIcon size={30} />
              </div>
            </a>
            <a className="food-photo salad-photo" href="/menu?category=Salad">
              <img
                src="/assets/restaurant-2.jpg"
                width="1000"
                height="878"
                loading="lazy"
                alt="An actual Honey Mustard salad with greens, fruit, croutons and nuts"
              />
              <div>
                <span>FROM THE GARDEN</span>
                <h3>A little crunch.</h3>
                <ArrowUpRightIcon size={30} />
              </div>
            </a>
          </div>
          <div className="featured-title">
            <h3>Featured on the menu</h3>
            <a href="/menu">
              Explore the full menu <ArrowRightIcon size={18} />
            </a>
          </div>
          <div className="featured-list">
            {featured.map((item) => (
              <a href={"/menu?item=" + item.id + "#" + item.id} key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <span className="featured-price">
                  {item.price?.toFixed(2)} $<ArrowUpRightIcon size={18} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section id="about" className="about-section section">
          <div className="about-image">
            <img
              src="/assets/restaurant-3.jpg"
              alt="A table at Honey Mustard with salad bowls, a skillet and drinks"
              width="1000"
              height="1000"
              loading="lazy"
            />
          </div>
          <div className="about-copy">
            <span className="tiny-mark">honey mustard</span>
            <h2>
              Salads.
              <br />
              Grills.
              <br />
              <em>Good company.</em>
            </h2>
            <p>
              A bowl full of colour. Steak with signature gravy. Burgers,
              sandwiches, and something sweet to finish.
            </p>
            <p>Find your kind of meal at Honey Mustard Lebanon.</p>
            <a href="/locations" className="instagram-action">
              A seat at our table <ArrowUpRightIcon size={22} />
            </a>
          </div>
        </section>
        <section className="section locations-preview">
          <div className="section-heading">
            <h2>
              Find your
              <br />
              <span>Honey Mustard.</span>
            </h2>
            <p>Choose a branch. Make it a good-food kind of day.</p>
          </div>
          <BranchCards compact />
          <a className="locations-more" href="/locations">
            All branch details <ArrowUpRightIcon size={20} />
          </a>
        </section>
        <section className="gallery-section">
          <div className="gallery-heading">
            <h2>A taste of the table.</h2>
            <a href="/menu">
              Explore the menu <ArrowUpRightIcon size={18} />
            </a>
          </div>
          <div className="gallery-grid">
            {[
              ["restaurant-2.jpg", "Salad at Honey Mustard"],
              ["restaurant-3.jpg", "Food and drinks shared at Honey Mustard"],
              ["restaurant-grills.jpg", "Grilled dishes at Honey Mustard"],
            ].map(([src, alt]) => (
              <img
                key={src}
                src={"/assets/" + src}
                alt={alt}
                loading="lazy"
                width="800"
                height="700"
              />
            ))}
          </div>
          <p className="gallery-note">
            Actual restaurant photography. Hero animation is a campaign visual
            based on the restaurant's food.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
