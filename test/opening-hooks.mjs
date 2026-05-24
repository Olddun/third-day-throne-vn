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

const { story, longformPlan } = await import("../web/game.js");
const { readFile } = await import("node:fs/promises");

function collectUntilChoice(start) {
  const texts = [];
  let cursor = start;
  const visited = new Set();
  while (story[cursor] && !story[cursor].choices) {
    if (visited.has(cursor)) throw new Error(`Loop before first choice at ${cursor}`);
    visited.add(cursor);
    texts.push(story[cursor].text ?? "");
    cursor = story[cursor].next;
  }
  return { texts, choiceId: cursor };
}

const opening = collectUntilChoice("start");
const openingText = opening.texts.join("\n");
for (const hook of ["三十七名猫族俘虏", "刑台", "王印", "玩家替塞德里克"]) {
  if (!openingText.includes(hook)) throw new Error(`Opening lacks immediate hook: ${hook}`);
}
if (opening.choiceId !== "choice_throne") {
  throw new Error(`First player decision should be choice_throne, got ${opening.choiceId}`);
}

const throneChoices = story.choice_throne.choices.map((choice) => choice.label);
if (throneChoices.join("/") !== "斩袭营者/扣军令") {
  throw new Error(`First choice labels lost dilemma framing: ${throneChoices.join("/")}`);
}

const harsh = story.choice_throne.choices.find((choice) => choice.label === "斩袭营者");
const delay = story.choice_throne.choices.find((choice) => choice.label === "扣军令");
if (!harsh || !delay) throw new Error("Missing first dilemma choices");
if (!(harsh.effects.vigilance > 0 && harsh.effects.closeness < 0)) {
  throw new Error("斩袭营者 must trade trust for authority pressure");
}
if (!(delay.effects.observation > 0 && delay.effects.closeness > 0)) {
  throw new Error("扣军令 must reward trust/information");
}
const harshText = [story.opening_execute.text, story.opening_execute_cost.text, story.opening_execute_mark.text].join("");
const delayText = [story.opening_delay.text, story.observed_light.text, story.opening_delay_mark.text].join("");
if (!/冷了下去|求救/.test(harshText)) {
  throw new Error("斩袭营者 branch lacks immediate emotional cost");
}
if (!/剑柄|反扑/.test(delayText)) {
  throw new Error("扣军令 branch lacks immediate political cost");
}

const morningChoices = story.choice_morning.choices;
const morningLabels = morningChoices.map((choice) => choice.label).join("/");
if (morningLabels !== "逼她现形/装作不知/设铃试探") {
  throw new Error(`Morning choices lost roleplay tension: ${morningLabels}`);
}
for (const choice of morningChoices) {
  const effects = Object.values(choice.effects ?? {});
  if (!effects.some((value) => value < 0) && choice.label !== "装作不知") {
    throw new Error(`Morning choice lacks stat cost: ${choice.label}`);
  }
}
if (!story.teaser_cost.text.includes("拒绝")) {
  throw new Error("设铃试探 branch lacks visible relationship backlash");
}

const indexHtml = await readFile(new URL("../web/index.html", import.meta.url), "utf8");
if (!indexHtml.includes("你是新王塞德里克")) {
  throw new Error("Title screen no longer states the player identity");
}

if (longformPlan.productionTargets.plannedEndings < 15 || longformPlan.productionTargets.plannedCg < 80) {
  throw new Error("Longform plan is not exposed through the runtime debug surface");
}

console.log("Opening hooks OK: first minute pressure, identity, dilemma costs, and longform plan are present.");
