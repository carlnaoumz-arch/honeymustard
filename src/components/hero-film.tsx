import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
export function HeroFilm(){
 const ref=useRef<HTMLVideoElement>(null);const [source,setSource]=useState<string>();const [playing,setPlaying]=useState(false);const [painted,setPainted]=useState(false);const [failed,setFailed]=useState(false);
 useEffect(()=>{const media=matchMedia("(prefers-reduced-motion: reduce)");const conn=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
 const sync=()=>{if(media.matches||conn?.saveData||["slow-2g","2g"].includes(conn?.effectiveType||"")){ref.current?.pause();setSource(undefined);setPlaying(false);setPainted(false);}else setSource(innerWidth<700?"/assets/hero-mobile.mp4":"/assets/hero.mp4")};sync();media.addEventListener("change",sync);return()=>media.removeEventListener("change",sync)},[]);
 useEffect(()=>{if(source)ref.current?.play().catch(()=>setPlaying(false))},[source]);
 const toggle=()=>{if(playing){ref.current?.pause()}else if(source){ref.current?.play().catch(()=>setFailed(true))}else{setSource(innerWidth<700?"/assets/hero-mobile.mp4":"/assets/hero.mp4")}};
 return <div className="hero-film"><picture><source media="(max-width: 699px)" srcSet="/assets/hero-mobile-poster.webp"/><img className="hero-poster" src="/assets/hero-poster.webp" alt="Chargrilled steak in signature sauce, with French fries and house salad. Animated campaign interpretation of Honey Mustard food." width="1920" height="1080" fetchPriority="high"/></picture>
 {source&&!failed&&<video ref={ref} className={painted?"is-painted":""} src={source} poster="/assets/hero-poster.webp" muted playsInline loop preload="metadata" onPlaying={()=>{setPlaying(true);setPainted(true)}} onPause={()=>setPlaying(false)} onError={()=>{setFailed(true);setPlaying(false);setPainted(false)}} aria-hidden="true"/>}
 <div className="film-shade"/><div className="film-caption">STEAK. SAUCE. THE WHOLE EXPERIENCE.</div>
 {!failed&&<button className="film-control" onClick={toggle} aria-label={playing?"Pause hero animation":"Play hero animation"}>{playing?<PauseIcon size={17} weight="fill"/>:<PlayIcon size={17} weight="fill"/>}<span>{playing?"Pause":"Play"}</span></button>}
 </div>
}
