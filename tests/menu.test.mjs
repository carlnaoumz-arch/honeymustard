import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { filterMenu, formatPrice } from "../src/lib/menu-search.mjs";
const menu = JSON.parse(
  readFileSync(new URL("../src/data/menu.json", import.meta.url)),
);
const items = menu.flatMap((group) => group.items);
const ids = (groups) =>
  groups.flatMap((group) => group.items.map((item) => item.id));
test("complete catalog: 81 unique, searchable items in nine categories", () => {
  assert.equal(items.length, 81);
  assert.equal(menu.length, 9);
  assert.equal(new Set(items.map((item) => item.id)).size, 81);
  for (const item of items)
    assert.ok(
      ids(filterMenu(menu, "All", item.name)).includes(item.id),
      item.name,
    );
  for (const group of menu)
    assert.deepEqual(
      ids(filterMenu(menu, group.category)),
      group.items.map((item) => item.id),
    );
});
test("coffee and accented café find actual coffees, not tea", () => {
  const expected = [
    "espresso",
    "doppio",
    "macchiato",
    "cappuccino",
    "latte",
    "flavored-latte",
  ];
  assert.deepEqual(ids(filterMenu(menu, "All", "coffee")), expected);
  assert.deepEqual(ids(filterMenu(menu, "Hot Beverages", " CAFÉ ")), expected);
});
test("search handles ingredients, combined words, category constraints and empty results", () => {
  assert.equal(ids(filterMenu(menu, "All", "avocado")).length, 6);
  assert.equal(ids(filterMenu(menu, "Salad", "avocado")).length, 4);
  const avocado = ids(filterMenu(menu, "Salad", "avocado"));
  assert.deepEqual(ids(filterMenu(menu, "All", "AVOCADO salad")), avocado);
  assert.equal(ids(filterMenu(menu, "Dessert", "coffee")).length, 0);
  assert.equal(ids(filterMenu(menu, "All", "zzzz-no-such-dish")).length, 0);
  assert.equal(ids(filterMenu(menu, "All", "  ")).length, 81);
});
test("prices never imply unavailable prices are free", () => {
  assert.equal(formatPrice(0), "Ask branch");
  assert.equal(formatPrice(null), "Ask branch");
  assert.equal(formatPrice(5.5), "5.50 $");
  for (const item of items) {
    assert.ok(item.price !== null || item.sizes.length > 0, item.id);
    for (const size of item.sizes) assert.ok(size.price > 0, item.id);
  }
});
test("published branch contact actions are usable, with no invalid map destination", () => {
  const branches = JSON.parse(
    readFileSync(new URL("../src/data/branches.json", import.meta.url)),
  );
  assert.equal(branches.length, 4);
  for (const branch of branches) {
    assert.match(branch.phone, /^\+961\d{8}$/);
    if (branch.destination) assert.notEqual(branch.destination, "0,0");
  }
});
