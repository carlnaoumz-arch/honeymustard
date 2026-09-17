import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRightIcon, ArrowRightIcon, MapPinIcon, PhoneIcon, ListIcon, XIcon, ForkKnifeIcon, BowlFoodIcon, FireIcon, HamburgerIcon, IceCreamIcon, CoffeeIcon } from "@phosphor-icons/react";
import branches from "@/data/branches.json";
export { branches, ArrowUpRightIcon, ArrowRightIcon, MapPinIcon, PhoneIcon };
const BranchContext = createContext({openBranch:()=>{}});
export const useBranch = () => useContext(BranchContext);
export function Brand(){return <a className="brand" href="/" aria-label="Honey Mustard home"><img src="/assets/logo.jpg" width="130" height="60" alt="Honey Mustard"/><span>SALADS &amp; GRILLS</span></a>}
export function SiteShell({children,active="home"}:{children:ReactNode;active?:string}){
 const [nav,setNav]=useState(false); const [selected,setSelected]=useState(""); const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{try{setSelected(localStorage.getItem("hm-branch")||"")}catch{}},[]);
 const choose=(id:string)=>{setSelected(id);try{localStorage.setItem("hm-branch",id)}catch{}};
 const branch=branches.find(b=>b.id===selected);
 const openBranch=()=>dialog.current?.showModal();
 return <BranchContext.Provider value={{openBranch}}><div id="page-top" tabIndex={-1}/><a className="skip-link" href="#main">Skip to content</a>
 <header className="site-header"><div className="header-inner"><Brand/><nav className={nav?"main-nav is-open":"main-nav"} aria-label="Main navigation">
 {[["/","Home","home"],["/menu","Full Menu","menu"],["/locations","Locations","locations"],["/#about","About","about"]].map(([href,label,id])=><a key={id} href={href} aria-current={id===active?"page":undefined} onClick={()=>setNav(false)}>{label}</a>)}
 </nav><div className="header-actions"><button className="branch-trigger" onClick={openBranch}><MapPinIcon size={17}/><span>{branch?.name||"Choose a branch"}</span></button><a className="header-menu" href="/menu">View Menu <ArrowUpRightIcon size={17}/></a><button className="nav-toggle" aria-label={nav?"Close navigation":"Open navigation"} aria-expanded={nav} onClick={()=>setNav(!nav)}>{nav?<XIcon size={23}/>:<ListIcon size={23}/>}</button></div></div></header>
 {children}
 <SiteFooter selectedBranch={branch?.name} onChooseBranch={openBranch} onClearBranch={()=>{setSelected("");try{localStorage.removeItem("hm-branch")}catch{}}}/>
 <nav className="mobile-actions" aria-label="Quick actions"><a href="/menu"><ForkKnifeIcon size={20}/>Menu</a><a href="/locations"><MapPinIcon size={20}/>Locations</a><button onClick={openBranch}><PhoneIcon size={20}/>Call</button></nav>
 <dialog ref={dialog} aria-labelledby="branch-dialog-title" className="branch-dialog" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}>
 <div className="dialog-head"><div><span className="kicker">LET'S GET YOU THERE</span><h2 id="branch-dialog-title">Choose your branch.</h2></div><button aria-label="Close branch selector" onClick={()=>dialog.current?.close()}><XIcon size={24}/></button></div>
 <p>Choose a location for its contact details.</p><div className="branch-options">{branches.map(b=><button key={b.id} aria-pressed={selected===b.id} onClick={()=>choose(b.id)}><span>{b.name}<small>{b.address}</small></span><span>{selected===b.id?"✓":"↗"}</span></button>)}</div>
 {branch&&<div className="selected-contact"><p>{branch.official?"Verified Bayada contact.":"Directory-listed contact. Call to confirm current service."}</p><a className="call-action" href={"tel:"+branch.phone}><PhoneIcon size={19}/>Call {branch.name}<span>{branch.displayPhone}</span></a><a href={"/locations#"+branch.id}>See branch details <ArrowRightIcon size={16}/></a></div>}
 </dialog></BranchContext.Provider>
}
export function CategoryRail(){const categories=[["Salad",BowlFoodIcon,"Salads"],["Main course",FireIcon,"Grills"],["Burgers and Sandwiches",HamburgerIcon,"Burgers & sandwiches"],["Appetizers",ForkKnifeIcon,"Appetizers"],["Dessert",IceCreamIcon,"Something sweet"],["Cold Beverages",CoffeeIcon,"Drinks"]];return <nav className="category-rail" aria-label="Explore menu categories">{categories.map(([category,Icon,label])=><a key={String(category)} href={"/menu?category="+encodeURIComponent(String(category))}>{typeof Icon!=="string"&&<Icon size={30} weight="light"/>}<span>{String(label)}</span><ArrowUpRightIcon size={16}/></a>)}</nav>}
export function BranchCards({compact=false}:{compact?:boolean}){return <div className={compact?"branch-cards compact":"branch-cards"}>{branches.map((b,i)=><article className="branch-card" key={b.id} id={b.id}><div className="branch-number">0{i+1}</div><div className="branch-info"><h3>{b.name}</h3><p>{b.address}</p><span className="hours">Listed daily hours: {b.hours.replace("–","to")}</span>{!compact&&<small>{b.official?"Verified Bayada contact. Call to confirm current opening hours.":"Directory-listed branch. Current operation and hours await official confirmation."}</small>}</div><div className="branch-links"><a href={"tel:"+b.phone}><PhoneIcon size={16}/>{b.displayPhone}</a>{b.destination?<a href={"https://www.google.com/maps/dir/?api=1&destination="+b.destination} target="_blank" rel="noreferrer">Directions <ArrowUpRightIcon size={16}/></a>:<span className="muted">Call for directions</span>}</div></article>)}</div>}


function SiteFooter({selectedBranch,onChooseBranch,onClearBranch}:{selectedBranch?:string;onChooseBranch:()=>void;onClearBranch:()=>void}){
 const preferences=useRef<HTMLDialogElement>(null);
 return <footer id="site-footer" className="site-footer">
  <div className="footer-grid">
   <div className="footer-intro"><Brand/><p>Salads, grills, and good company.<br/>Find your next craving in Lebanon.</p><button className="footer-branch-button" onClick={onChooseBranch}>Choose your branch <ArrowUpRightIcon size={18}/></button></div>
   <nav className="footer-column" aria-label="Footer navigation"><h2>Explore</h2><a href="/">Home</a><a href="/menu">Full menu</a><a href="/#about">About Honey Mustard</a><a href="/locations">Locations &amp; contact</a></nav>
   <nav className="footer-column" aria-label="Footer menu categories"><h2>Find your craving</h2><a href="/menu?category=Salad">Salads</a><a href="/menu?category=Main%20course">From the grill</a><a href="/menu?category=Burgers%20and%20Sandwiches">Burgers &amp; sandwiches</a><a href="/menu?category=Dessert">Something sweet</a><a href="/menu?category=Cold%20Beverages">Drinks</a></nav>
   <div className="footer-column footer-visit"><h2>Come hungry</h2><address><strong>Bayada</strong><span>Level Two Bayada, Lebanon</span><a href="tel:+96178885839"><PhoneIcon size={16}/>+961 78 885 839</a></address><a href="/locations">Hours &amp; directions <ArrowUpRightIcon size={15}/></a><p>Call your branch for current hours, takeaway availability or table requests.</p></div>
  </div>
  <div className="footer-branches"><div className="footer-branches-heading"><span className="kicker">FIND YOUR HONEY MUSTARD</span><a href="/locations">All branch details <ArrowRightIcon size={16}/></a></div><nav aria-label="Footer branches">{branches.map(b=><a key={b.id} href={"/locations#"+b.id}><div><span>{b.name}</span><small>{b.address}</small></div><ArrowUpRightIcon size={18}/></a>)}</nav></div>
  <div className="footer-word">GOOD FOOD.<span> GOOD MOOD.</span></div>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} Honey Mustard Lebanon.</span><div className="footer-utilities"><button onClick={()=>preferences.current?.showModal()}>Site preferences</button><a href="#page-top">Back to top <ArrowUpRightIcon size={15}/></a></div></div>
  <dialog ref={preferences} className="branch-dialog footer-preferences" aria-labelledby="preferences-title" onClick={e=>{if(e.target===e.currentTarget)preferences.current?.close()}}>
   <div className="dialog-head"><div><span className="kicker">YOUR VISIT</span><h2 id="preferences-title">Site preferences.</h2></div><button aria-label="Close site preferences" onClick={()=>preferences.current?.close()}><XIcon size={24}/></button></div>
   <p>Your selected branch is saved in this browser so it can be remembered on your next visit.</p>
   <div className="footer-saved-branch"><p aria-live="polite">{selectedBranch?"Saved branch: "+selectedBranch:"No branch is saved in this browser."}</p><button disabled={!selectedBranch} onClick={onClearBranch}>Clear saved branch</button></div>
   <p>Menu browsing works without choosing a branch. Call buttons open your phone app. Orders and table requests are arranged directly with the branch.</p>
   <p>Fonts are loaded from Google Fonts. Your browser shares connection information with the font and hosting providers when loading the website.</p>
  </dialog>
 </footer>
}
