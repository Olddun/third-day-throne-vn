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
for (const hook of ["现代人", "女神", "异世界", "权能"]) {
  if (!openingText.includes(hook)) throw new Error(`Opening lacks immediate hook: ${hook}`);
}
if (opening.choiceId !== "choice_blessing") {
  throw new Error(`First player decision should be choice_blessing, got ${opening.choiceId}`);
}

const blessingChoices = story.choice_blessing.choices.map((choice) => choice.label);
if (blessingChoices.join("/") !== "回档王权/全知魔眼/修炼圣体") {
  throw new Error(`Blessing choice lost isekai framing: ${blessingChoices.join("/")}`);
}
for (const choice of story.choice_blessing.choices) {
  if (!choice.flags?.blessing) throw new Error(`Blessing choice lacks persistent flag: ${choice.label}`);
}

const throneOpening = collectUntilChoice("isekai_fall");
const throneOpeningText = throneOpening.texts.join("\n");
for (const hook of ["三十七名猫族俘虏", "刑台", "王印", "你替这位新王"]) {
  if (!throneOpeningText.includes(hook)) throw new Error(`Throne opening lacks pressure hook: ${hook}`);
}
if (throneOpening.choiceId !== "choice_throne") {
  throw new Error(`Second player decision should be choice_throne, got ${throneOpening.choiceId}`);
}

const trainingOpening = collectUntilChoice("isekai_training_open");
const trainingText = trainingOpening.texts.join("\n");
for (const hook of ["死亡回档", "疼痛", "攻略", "爽点"]) {
  if (!trainingText.includes(hook)) throw new Error(`Isekai tutorial lacks growth hook: ${hook}`);
}
if (trainingOpening.choiceId !== "isekai_training_01_loop_choice") {
  throw new Error(`Tutorial should reach training choice, got ${trainingOpening.choiceId}`);
}
const trainingChoices = story.isekai_training_01_loop_choice.choices.map((choice) => choice.label).join("/");
if (trainingChoices !== "读回档/练魔力/压贵族") {
  throw new Error(`Training choices lost loop/growth framing: ${trainingChoices}`);
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
if (!indexHtml.includes("你是现代人") || !indexHtml.includes("女神给你一次选择外挂")) {
  throw new Error("Title screen no longer states the modern isekai identity");
}

if (longformPlan.productionTargets.plannedEndings < 15 || longformPlan.productionTargets.plannedCg < 80) {
  throw new Error("Longform plan is not exposed through the runtime debug surface");
}

console.log("Opening hooks OK: modern isekai identity, goddess blessing, throne pressure, and costs are present.");
