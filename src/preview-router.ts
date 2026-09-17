import { useSyncExternalStore, type ComponentType } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("hm:navigate", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("hm:navigate", callback);
  };
}
const getSearch = () => window.location.search;
const getServerSearch = () => "";
export function updateSearch(
  values: Record<string, string | null>,
  push = false,
) {
  const url = new URL(window.location.href);
  Object.entries(values).forEach(([key, value]) =>
    value ? url.searchParams.set(key, value) : url.searchParams.delete(key),
  );
  url.hash = "";
  window.history[push ? "pushState" : "replaceState"](null, "", url);
  window.dispatchEvent(new Event("hm:navigate"));
}
export function createFileRoute(_path: string) {
  return <T = Record<string, string>>(options: {
    component: ComponentType;
    head?: () => unknown;
    validateSearch?: (search: Record<string, unknown>) => T;
  }) => ({
    options,
    useSearch: () => {
      const search = useSyncExternalStore(
        subscribe,
        getSearch,
        getServerSearch,
      );
      const params = Object.fromEntries(new URLSearchParams(search));
      return options.validateSearch
        ? options.validateSearch(params)
        : (params as T);
    },
  });
}
