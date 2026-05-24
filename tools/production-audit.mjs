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
  status: minutes >= 1200 && Object.keys(assets.cg).length >= 80 ? "production target met" : "production gap remains",
};

if (branchNodes < 10) throw new Error(`Need 10+ actual branch nodes, found ${branchNodes}`);
if (endings.length < 15) throw new Error(`Need 15+ reachable endings, found ${endings.length}`);
if (longformPlan.cgPlan.length < 80) throw new Error(`Need 80+ planned CGs, found ${longformPlan.cgPlan.length}`);

console.log(JSON.stringify(report, null, 2));
