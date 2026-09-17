import { useEffect, useRef, useState } from "react";

export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string>();
  const [painted, setPainted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Keep the existing, full-quality responsive video files.
    setSource(
      window.innerWidth < 700 ? "/assets/hero-mobile.mp4" : "/assets/hero.mp4",
    );
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!source || !element) return;
    // Set both the attributes and properties before requesting mobile playback.
    element.defaultMuted = true;
    element.muted = true;
    element.playsInline = true;
    const play = () => {
      if (document.visibilityState !== "hidden" && element.paused) {
        // A browser can still decline autoplay. Keep the poster and retry on
        // readiness, returning to the page, or the first ordinary interaction.
        void element.play().catch(() => {});
      }
    };
    element.addEventListener("loadeddata", play);
    element.addEventListener("canplay", play);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("touchstart", play, { passive: true });
    document.addEventListener("pointerdown", play, { passive: true });
    document.addEventListener("keydown", play);
    play();
    return () => {
      element.removeEventListener("loadeddata", play);
      element.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("touchstart", play);
      document.removeEventListener("pointerdown", play);
      document.removeEventListener("keydown", play);
      element.pause();
    };
  }, [source]);
  return (
    <div className="hero-film">
      <picture>
        <source
          media="(max-width: 699px)"
          srcSet="/assets/hero-mobile-poster.webp"
        />
        <img
          className="hero-poster"
          src="/assets/hero-poster.webp"
          alt="Chargrilled steak in signature sauce, with French fries and house salad. Animated campaign interpretation of Honey Mustard food."
          width="1920"
          height="1080"
          fetchPriority="high"
        />
      </picture>
      {source && !failed && (
        <video
          ref={video}
          className={painted ? "is-painted" : ""}
          src={source}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onPlaying={() => {
            setPainted(true);
          }}
          onError={() => {
            setFailed(true);
            setPainted(false);
          }}
          aria-hidden="true"
        />
      )}
      <div className="film-shade" />
      <div className="film-caption">STEAK. SAUCE. THE WHOLE EXPERIENCE.</div>
    </div>
  );
}
