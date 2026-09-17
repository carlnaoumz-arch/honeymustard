import { useEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { pages } from "./pages";
import { metadata, normalizePath } from "./metadata";
import { NotFound } from "./routes/not-found";
import "./styles.css";
const path = normalizePath(location.pathname);
const Page = pages[path] || NotFound;
const meta = metadata[path] || metadata["/404"];
document.title = meta.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", meta.description);
function App() {
  useEffect(() => {
    const scrollToHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
        if (id === "main" || id === "page-top")
          target?.focus({ preventScroll: true });
      });
    };
    void document.fonts.ready.then(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
  return <Page />;
}
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
