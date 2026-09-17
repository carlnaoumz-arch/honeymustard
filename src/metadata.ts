export const metadata: Record<string, { title: string; description: string }> =
  {
    "/": {
      title: "Honey Mustard Lebanon | Salads & Grills",
      description:
        "Your next craving starts here. Browse Honey Mustard's salads, grills, full menu and branch contacts in Lebanon.",
    },
    "/menu": {
      title: "Full Menu | Honey Mustard Lebanon",
      description:
        "Browse all 81 Honey Mustard menu items: salads, grills, burgers, sandwiches, desserts and drinks, with published Bayada prices.",
    },
    "/locations": {
      title: "Locations & Contact | Honey Mustard Lebanon",
      description:
        "Find Honey Mustard Lebanon branch contacts, listed hours and available directions.",
    },
    "/sources": {
      title: "Information Sources | Honey Mustard Lebanon",
      description:
        "Read how the Honey Mustard menu, branch details and imagery were sourced.",
    },
    "/404": {
      title: "Page Not Found | Honey Mustard Lebanon",
      description:
        "Find your next craving on the Honey Mustard menu or return to the homepage.",
    },
  };
export function normalizePath(path: string) {
  return path.replace(/\/index\.html$/, "").replace(/\/+$/, "") || "/";
}
