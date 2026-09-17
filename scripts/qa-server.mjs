// Local-only production QA harness. It is never copied to dist or deployed.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve("dist");
const port = Number(process.env.PORT || 4174);
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webmanifest": "application/manifest+json",
};
const harness = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Honey Mustard QA</title><style>body{margin:0;background:#eee;color:#111;font:14px system-ui}header{padding:12px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}iframe{display:block;border:0;margin:0 auto;background:#171b19}pre{white-space:pre-wrap;padding:12px}button,select,input{padding:7px}</style></head><body><header><label>Width <select id="width"><option>320</option><option selected>390</option><option>768</option><option>1280</option></select></label><label>Page <input id="page" value="/"></label><label>Condition <select id="mode"><option value="normal">Normal</option><option value="reduced">Reduced motion</option><option value="save-data">Save data</option><option value="blocked">Blocked autoplay</option><option value="failed">Failed video</option><option value="slow">Slow video</option><option value="storage">Blocked storage</option></select></label><button id="load">Load page</button><button id="audit">Audit accessibility</button><button id="metrics">Read diagnostics</button></header><iframe title="Website preview" width="390" height="600"></iframe><pre id="results" aria-live="polite">Ready</pre><script>
const frame=document.querySelector('iframe'), result=document.querySelector('#results');
function load(){frame.width=document.querySelector('#width').value;const url=new URL(document.querySelector('#page').value,location.origin);url.searchParams.set('__qa',document.querySelector('#mode').value);frame.src=url.href;result.textContent='Loading';}
document.querySelector('#load').onclick=load;
document.querySelector('#width').onchange=()=>frame.width=document.querySelector('#width').value;
document.querySelector('#audit').onclick=async()=>{result.textContent='Auditing';try{const doc=frame.contentDocument;if(!frame.contentWindow.axe){const script=doc.createElement('script');script.src='/__axe.js';doc.head.append(script);await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=reject});}const audit=await frame.contentWindow.axe.run(doc,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}});result.textContent=JSON.stringify({url:frame.contentWindow.location.href,violations:audit.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary}))})),passes:audit.passes.length},null,2);}catch(error){result.textContent=String(error)}};
document.querySelector('#metrics').onclick=()=>{const win=frame.contentWindow,doc=frame.contentDocument;result.textContent=JSON.stringify({url:win.location.href,width:doc.documentElement.clientWidth,scrollWidth:doc.documentElement.scrollWidth,images:[...doc.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),video:[...doc.querySelectorAll('video')].map(v=>({src:v.currentSrc,paused:v.paused,readyState:v.readyState})),errors:win.__qaErrors||[],cls:win.__qaCLS||0,resources:win.performance.getEntriesByType('resource').filter(e=>!e.name.includes('__axe')).map(e=>({name:new URL(e.name).pathname,ms:Math.round(e.duration),bytes:e.transferSize}))},null,2)};
frame.onload=()=>result.textContent='Loaded '+frame.contentWindow.location.pathname;load();
</script></body></html>`;
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/__qa") {
      res.setHeader("Content-Type", "text/html");
      res.end(harness);
      return;
    }
    if (url.pathname === "/__axe.js") {
      res.setHeader("Content-Type", "text/javascript");
      res.end(await readFile("node_modules/axe-core/axe.min.js"));
      return;
    }
    const mode = url.searchParams.get("__qa");
    let path = resolve(root, "." + decodeURIComponent(url.pathname));
    if (!path.startsWith(root + "/") && path !== root) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
      await stat(path);
    } catch {
      if (extname(path) && extname(path) !== ".html") {
        res.writeHead(404);
        res.end();
        return;
      }
      path = resolve(root, "404.html");
      status = 404;
    }
    if (path.endsWith(".mp4") && req.headers.referer?.includes("__qa=failed")) {
      res.writeHead(503);
      res.end();
      return;
    }
    if (path.endsWith(".mp4") && req.headers.referer?.includes("__qa=slow"))
      await new Promise((r) => setTimeout(r, 20000));
    let body = await readFile(path);
    if (path.endsWith(".html")) {
      const policy =
        mode === "reduced"
          ? `const original=window.matchMedia.bind(window);window.matchMedia=query=>query==='(prefers-reduced-motion: reduce)'?{matches:true,media:query,addEventListener(){},removeEventListener(){}}:original(query);`
          : mode === "save-data"
            ? `Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true});`
            : mode === "blocked"
              ? `HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('QA blocked autoplay','NotAllowedError'))};`
              : mode === "storage"
                ? `Storage.prototype.getItem=Storage.prototype.setItem=Storage.prototype.removeItem=function(){throw new DOMException('QA storage blocked','SecurityError')};`
                : "";
      body = Buffer.from(
        body
          .toString()
          .replace(
            "<head>",
            `<head><script>window.__qaErrors=[];window.__qaCLS=0;window.addEventListener('error',e=>window.__qaErrors.push(e.message));window.addEventListener('unhandledrejection',e=>window.__qaErrors.push(String(e.reason)));try{new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__qaCLS+=e.value})).observe({type:'layout-shift',buffered:true})}catch{};${policy}</script>`,
          ),
      );
    }
    const type = types[extname(path)] || "application/octet-stream";
    res.setHeader("Content-Type", type);
    res.setHeader("Cache-Control", "no-store");
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && path.endsWith(".mp4")) {
      const start = Number(range[1]),
        end = range[2]
          ? Math.min(Number(range[2]), body.length - 1)
          : body.length - 1;
      if (start >= body.length) {
        res.writeHead(416, { "Content-Range": `bytes */${body.length}` });
        res.end();
        return;
      }
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${body.length}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
      });
      res.end(body.subarray(start, end + 1));
      return;
    }
    res.writeHead(status);
    res.end(body);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local QA: http://127.0.0.1:${port}/__qa`),
);
