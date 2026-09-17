/** @typedef {{id:string,name:string,description:string,price:number|null,sizes:{name:string,price:number}[]}} MenuItem */
/** @typedef {{category:string,items:MenuItem[]}} MenuGroup */
const coffeeIds = new Set([
  "espresso",
  "doppio",
  "macchiato",
  "cappuccino",
  "latte",
  "flavored-latte",
]);
/** @param {string} value */
export function normalize(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
/** @param {MenuGroup[]} menu @param {string} category @param {string} query */
export function filterMenu(menu, category = "All", query = "") {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  return menu
    .filter((group) => category === "All" || group.category === category)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const sizes = item.sizes
          .map((size) =>
            size.name === "GLS"
              ? "glass"
              : size.name === "BTL"
                ? "bottle"
                : size.name,
          )
          .join(" ");
        const text = normalize(
          `${item.name} ${item.description} ${group.category} ${sizes} ${coffeeIds.has(item.id) ? "coffee café" : ""}`,
        );
        return tokens.every((token) => text.includes(token));
      }),
    }))
    .filter((group) => group.items.length > 0);
}
/** @param {number|null} price */
export function formatPrice(price) {
  return price !== null && price > 0 ? `${price.toFixed(2)} $` : "Ask branch";
}
