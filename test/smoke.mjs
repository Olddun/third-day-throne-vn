const elements = new Map();
const classList = () => ({ add() {}, remove() {}, contains() { return false; } });
const makeElement = () => ({
  addEventListener() {},
  appendChild() {},
  classList: classList(),
  close() {},
  dataset: {},
  src: "",
  getAttribute(name) {
    return this[name] ?? "";
  },
  querySelectorAll() {
    return [];
  },
  querySelector() {
    return null;
  },
  showModal() {},
  style: { setProperty() {} },
});

globalThis.document = {
  createElement: makeElement,
  querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, makeElement());
    return elements.get(selector);
  },
};
globalThis.window = {
  addEventListener() {},
  setTimeout,
};
globalThis.localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
};
globalThis.Image = class Image {};

const { assets, initialStats, speakerActors, story, storySections } = await import("../web/game.js");

const requiredNodes = ["start", "choice_blessing", "choice_throne", "choice_morning", "choice_library", "ending"];
const missingNodes = requiredNodes.filter((id) => !story[id]);
if (missingNodes.length) {
  throw new Error(`Missing required story nodes: ${missingNodes.join(", ")}`);
}

for (const id of ["cat_intro_cg", "human_reveal_cg"]) {
  if (!story[id]?.cg || !story[id]?.cgMotion) {
    throw new Error(`Key appearance node is missing animated CG metadata: ${id}`);
  }
}

const namedSpeakers = new Set(
  Object.values(story)
    .map((node) => node.speaker)
    .filter((speaker) => speaker && !["旁白", "系统"].includes(speaker)),
);
for (const speaker of namedSpeakers) {
  if (!speakerActors[speaker]) throw new Error(`Named speaker lacks portrait mapping: ${speaker}`);
}

let firstChoiceDepth = 0;
let cursor = "start";
while (story[cursor] && !story[cursor].choices) {
  firstChoiceDepth += 1;
  cursor = story[cursor].next;
}
if (firstChoiceDepth < 4) {
  throw new Error(`Goddess blessing branch arrives too early: ${firstChoiceDepth} story nodes`);
}

const textChars = Object.values(story).reduce((sum, node) => {
  const textTotal = node.text ? node.text.length : 0;
  const choiceTotal = (node.choices ?? []).reduce((inner, choice) => inner + choice.label.length + choice.hint.length, 0);
  return sum + textTotal + choiceTotal;
}, 0);
if (textChars < 8200) {
  throw new Error(`Story text is too thin for a complete route: ${textChars} chars`);
}

import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const assetPaths = [
  ...Object.values(assets.backgrounds),
  ...Object.values(assets.characters).flatMap((expressions) => Object.values(expressions)),
  ...Object.values(assets.cg),
  ...Object.values(assets.music),
].map((src) => new URL(`../web/${src.replace("./", "")}`, import.meta.url));

for (const url of assetPaths) {
  await access(fileURLToPath(url));
}

const indexHtml = await readFile(new URL("../web/index.html", import.meta.url), "utf8");
const stylesCss = await readFile(new URL("../web/styles.css", import.meta.url), "utf8");
for (const token of [
  "cast-layer",
  "portrait",
  "portrait-label",
  "speaking",
  "grayscale",
  "dialogue-tools",
  "log-inline-button",
  "auto-button",
  "skip-button",
  "map-button",
  "quick-save-button",
  "quick-load-button",
  "settings-inline-button",
]) {
  if (!indexHtml.includes(token) && !stylesCss.includes(token)) {
    throw new Error(`Missing cast display token: ${token}`);
  }
}

for (const [actor, expressions] of Object.entries(assets.characters)) {
  if (Object.keys(expressions).length < 3) {
    throw new Error(`Character lacks expression variants: ${actor}`);
  }
}

for (const token of [
  "cg-live",
  "cg-shot",
  "cg-part",
  "cat-body",
  "cat-face",
  "human-head",
  "human-hair",
  "background-image: var(--cg-image)",
]) {
  if (indexHtml.includes(token) || stylesCss.includes(token)) {
    throw new Error(`CG stage still contains duplicate/partial image layer token: ${token}`);
  }
}

if (/不是.{0,18}而是|不是|而是/.test(JSON.stringify(story))) {
  throw new Error("Story still contains the banned not-this-but-that phrasing pattern");
}

if (/innerHTML\s*=.*hint|<small>/.test(await readFile(new URL("../web/game.js", import.meta.url), "utf8"))) {
  throw new Error("Choice buttons still expose explanatory hint text");
}

const gameJs = await readFile(new URL("../web/game.js", import.meta.url), "utf8");
if (!gameJs.includes('(node.speaker ?? "旁白") === "旁白"') || !gameJs.includes('dom.speaker.classList.add("hidden")')) {
  throw new Error("Narration no longer has a protected no-nameplate branch");
}
for (const token of ["splitTextPages", "你的选择", "branchMapHtml", "branchMap", "choiceLog", "quickStoreKey"]) {
  if (!gameJs.includes(token)) throw new Error(`VN control/text paging logic is missing: ${token}`);
}

for (const [section, cgs] of Object.entries(storySections)) {
  if (new Set(cgs).size < 3) throw new Error(`Section lacks at least 3 unique CGs: ${section}`);
  for (const cg of cgs) {
    if (!assets.cg[cg]) throw new Error(`Section references missing CG asset: ${section} -> ${cg}`);
  }
}

if (Object.keys(storySections).length < 6) {
  throw new Error(`Final route needs at least 6 story sections: ${Object.keys(storySections).length}`);
}

const visited = new Set();
const stack = ["start"];
while (stack.length) {
  const id = stack.pop();
  if (!id || visited.has(id)) continue;
  const node = story[id];
  if (!node) throw new Error(`Broken story reference: ${id}`);
  visited.add(id);
  if (node.next) stack.push(node.next);
  for (const choice of node.choices ?? []) {
    if (!story[choice.next]) throw new Error(`Broken choice from ${id} to ${choice.next}`);
    stack.push(choice.next);
  }
}

if (!visited.has("ending")) {
  throw new Error("Ending is unreachable");
}

const reachableCgs = new Set([...visited].flatMap((id) => (story[id].cg ? [story[id].cg] : [])));
if (reachableCgs.size < 21) {
  throw new Error(`Complete route needs at least 21 reachable CGs: ${reachableCgs.size}`);
}
for (const [cg] of Object.entries(assets.cg)) {
  if (!reachableCgs.has(cg)) throw new Error(`CG asset is not reachable in story: ${cg}`);
}
for (const [section, cgs] of Object.entries(storySections)) {
  const missingReachable = cgs.filter((cg) => !reachableCgs.has(cg));
  if (missingReachable.length) {
    throw new Error(`Section CGs are not reachable: ${section} -> ${missingReachable.join(", ")}`);
  }
}

for (const [id, node] of Object.entries(story)) {
  if (node.text && node.text.length > 68) {
    throw new Error(`Dialogue/narration line is too long at ${id}: ${node.text.length} chars`);
  }
  for (const choice of node.choices ?? []) {
    if (choice.label.length > 6) throw new Error(`Choice label is too long at ${id}: ${choice.label}`);
    if (/[+-]|亲近|警戒|观察|因为|所以|底线|选择/.test(choice.label)) {
      throw new Error(`Choice label exposes mechanics/reasoning at ${id}: ${choice.label}`);
    }
  }
}

if (visited.size < 230) {
  throw new Error(`Playable story is too short for a complete ending: only ${visited.size} reachable nodes`);
}

if (story.ending.chapter !== "大结局" || !/大结局/.test(story.ending.text)) {
  throw new Error("Ending node is not a final grand ending");
}

const stats = { ...initialStats, closeness: 5, observation: 1 };
const lockedChoice = story.choice_library.choices[2];
if (!lockedChoice.requires(stats, {})) {
  throw new Error("Intimate route unlock condition regressed");
}

console.log(`Smoke OK: ${visited.size} story nodes, ${assetPaths.length} assets.`);
