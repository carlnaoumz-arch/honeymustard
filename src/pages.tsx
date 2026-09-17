import type { ComponentType } from "react";
import { Route as home } from "./routes/index";
import { Route as menu } from "./routes/menu";
import { Route as locations } from "./routes/locations";
import { Route as sources } from "./routes/sources";
export const pages: Record<string, ComponentType> = {
  "/": home.options.component,
  "/menu": menu.options.component,
  "/locations": locations.options.component,
  "/sources": sources.options.component,
};
