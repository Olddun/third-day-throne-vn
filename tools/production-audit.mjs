const elements = new Map();
const classList = () => ({ add() {}, remove() {}, contains() { return false; }, toggle() {} });
const makeElement = () => ({
  addEventListener() {},
  appendChild() {},
  classList: classList(),
  close() {},
  dataset: {},
  disabled: false,
  innerHTML: "",
  src: "",
  textContent: "",
  getAttribute(name) {
    return this[name] ?? "";
  },
  querySelectorAll() {
    return [];
  },
  querySelector() {
    return makeElement();
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
globalThis.window = { addEventListener() {}, setTimeout };
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
globalThis.Image = class Image {};

const { assets, longformPlan, story } = await import("../web/game.js");

const visited = new Set();
const stack = ["start"];
while (stack.length) {
  const id = stack.pop();
  if (!id || visited.has(id)) continue;
  const node = story[id];
  if (!node) throw new Error(`Broken story reference: ${id}`);
  visited.add(id);
  if (node.next) stack.push(node.next);
  for (const choice of node.choices ?? []) stack.push(choice.next);
}

const reachableNodes = [...visited].map((id) => [id, story[id]]);
const textChars = reachableNodes.reduce((sum, [, node]) => {
  const text = node.text?.length ?? 0;
  const choices = (node.choices ?? []).reduce((inner, choice) => inner + choice.label.length, 0);
  return sum + text + choices;
}, 0);
const branchNodes = reachableNodes.filter(([, node]) => node.choices?.length).length;
const endings = reachableNodes.filter(([, node]) => node.next === null && /结局|大结局/.test(node.text ?? ""));
const reachableCg = new Set(reachableNodes.flatMap(([, node]) => (node.cg ? [node.cg] : [])));
const minutes = Math.round((textChars / 350) * 10) / 10;
const requiredMidpointNodes = [
  "midpoint_false_victory",
  "midpoint_choice_memory",
  "midpoint_memory_room",
  "midpoint_choice_blame",
  "midpoint_public_hook",
];
const missingMidpointNodes = requiredMidpointNodes.filter((id) => !visited.has(id));
const requiredWolfNodes = [
  "wolf_table_open",
  "wolf_table_choice",
  "wolf_accuse_rowan",
  "wolf_accuse_viktor",
  "wolf_accuse_luca",
  "wolf_accuse_scribe",
  "wolf_table_new_goal",
];
const missingWolfNodes = requiredWolfNodes.filter((id) => !visited.has(id));
const requiredLieMapNodes = [
  "lie_map_open",
  "lie_map_choice",
  "lie_map_order",
  "lie_map_seal",
  "lie_map_key",
  "lie_map_moon",
  "lie_map_join",
];
const missingLieMapNodes = requiredLieMapNodes.filter((id) => !visited.has(id));
const requiredBadIntelNodes = [
  "bad_ledger_password",
  "bad_cage_password",
  "bad_empty_bed_password",
  "bad_black_sun_password",
];
const missingBadIntelNodes = requiredBadIntelNodes.filter((id) => !visited.has(id));
const storyText = JSON.stringify(story);

const report = {
  reachableNodes: visited.size,
  playableTextChars: textChars,
  estimatedMinutes: minutes,
  targetMinutes: longformPlan.productionTargets.intendedPlayHours * 60,
  branchNodes,
  reachableEndings: endings.length,
  plannedEndings: longformPlan.endings.length,
  reachableCg: reachableCg.size,
  actualCgAssets: Object.keys(assets.cg).length,
  plannedCg: longformPlan.cgPlan.length,
  midpointReversalNodes: requiredMidpointNodes.length - missingMidpointNodes.length,
  closedCourtNodes: requiredWolfNodes.length - missingWolfNodes.length,
  lieMapNodes: requiredLieMapNodes.length - missingLieMapNodes.length,
  badEndingIntelNodes: requiredBadIntelNodes.length - missingBadIntelNodes.length,
  status: minutes >= 1200 && Object.keys(assets.cg).length >= 80 ? "production target met" : "production gap remains",
};

if (branchNodes < 10) throw new Error(`Need 10+ actual branch nodes, found ${branchNodes}`);
if (endings.length < 15) throw new Error(`Need 15+ reachable endings, found ${endings.length}`);
if (longformPlan.cgPlan.length < 80) throw new Error(`Need 80+ planned CGs, found ${longformPlan.cgPlan.length}`);
if (missingMidpointNodes.length) throw new Error(`Midpoint reversal nodes are not reachable: ${missingMidpointNodes.join(", ")}`);
if (missingWolfNodes.length) throw new Error(`Closed court suspicion nodes are not reachable: ${missingWolfNodes.join(", ")}`);
if (missingLieMapNodes.length) throw new Error(`Lie map nodes are not reachable: ${missingLieMapNodes.join(", ")}`);
if (missingBadIntelNodes.length) throw new Error(`Bad ending intel nodes are not reachable: ${missingBadIntelNodes.join(", ")}`);
if (/不是|而是/.test(storyText)) throw new Error("Story still contains banned not-but phrasing");

console.log(JSON.stringify(report, null, 2));
