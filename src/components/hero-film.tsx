import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
export function HeroFilm() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const [source, setSource] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [painted, setPainted] = useState(false);
  const [failed, setFailed] = useState(false);
  const chooseSource = () =>
    window.innerWidth < 700 ? "/assets/hero-mobile.mp4" : "/assets/hero.mp4";
  useEffect(() => {
    try {
      userPaused.current =
        sessionStorage.getItem("hm-animation-paused") === "true";
    } catch {
      /* Storage is optional. */
    }
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const sync = () => {
      if (
        media.matches ||
        connection?.saveData ||
        ["slow-2g", "2g"].includes(connection?.effectiveType || "")
      ) {
        video.current?.pause();
        setSource(undefined);
        setPainted(false);
      } else setSource(chooseSource());
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!source || !video.current || !container.current) return;
    const element = video.current;
    const sync = () => {
      if (
        visible.current &&
        document.visibilityState === "visible" &&
        !userPaused.current
      ) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(container.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [source]);
  const toggle = () => {
    userPaused.current = playing;
    try {
      sessionStorage.setItem("hm-animation-paused", String(playing));
    } catch {
      /* Storage is optional. */
    }
    if (playing) video.current?.pause();
    else if (source) void video.current?.play().catch(() => setPlaying(false));
    else setSource(chooseSource());
  };
  return (
    <div ref={container} className="hero-film">
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
          muted
          playsInline
          loop
          preload="metadata"
          onPlaying={() => {
            setPlaying(true);
            setPainted(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setPlaying(false);
            setPainted(false);
          }}
          aria-hidden="true"
        />
      )}
      <div className="film-shade" />
      <div className="film-caption">STEAK. SAUCE. THE WHOLE EXPERIENCE.</div>
      {!failed && (
        <button
          className="film-control"
          onClick={toggle}
          aria-label={playing ? "Pause hero animation" : "Play hero animation"}
        >
          {playing ? (
            <PauseIcon size={17} weight="fill" />
          ) : (
            <PlayIcon size={17} weight="fill" />
          )}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}
