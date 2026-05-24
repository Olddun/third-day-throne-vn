import { longformPlan } from "../web/story-plan.js";

const {
  productionTargets,
  experienceDeck,
  characterArcs,
  saveTheCatBeats,
  branchPoints,
  endings,
  cgPlan,
  funCheckpoints,
} = longformPlan;

if (productionTargets.intendedPlayHours < 20) {
  throw new Error(`Longform target is too short: ${productionTargets.intendedPlayHours}h`);
}

if (productionTargets.plannedBranchPoints < productionTargets.minimumBranchPoints || branchPoints.length < 10) {
  throw new Error(`Need at least 10 planned branch points, found ${branchPoints.length}`);
}

if (productionTargets.plannedEndings < productionTargets.minimumEndings || endings.length < 15) {
  throw new Error(`Need at least 15 planned endings, found ${endings.length}`);
}

if (productionTargets.plannedCg < productionTargets.minimumCg || cgPlan.length < 80) {
  throw new Error(`Need at least 80 planned CGs, found ${cgPlan.length}`);
}

if (experienceDeck.length < productionTargets.minimumExperienceHooks) {
  throw new Error(`Experience deck is too thin: ${experienceDeck.length}`);
}

for (const hook of experienceDeck) {
  for (const key of ["id", "name", "role", "timing"]) {
    if (!hook[key]) throw new Error(`Experience hook is missing ${key}: ${JSON.stringify(hook)}`);
  }
}

for (const arc of characterArcs) {
  for (const key of ["id", "name", "desire", "wound", "mask", "arc"]) {
    if (!arc[key]) throw new Error(`Character arc is missing ${key}: ${JSON.stringify(arc)}`);
  }
}

if (characterArcs.length < 7) {
  throw new Error(`Main cast is too small for a 20h route: ${characterArcs.length}`);
}

for (const beat of saveTheCatBeats) {
  for (const key of ["id", "chapter", "targetMinutes", "purpose", "playerNeed"]) {
    if (!beat[key]) throw new Error(`Save-the-Cat beat is missing ${key}: ${JSON.stringify(beat)}`);
  }
}

const endingTypes = new Set(endings.map((ending) => ending.type));
for (const requiredType of ["true", "gold", "normal", "bad", "meta"]) {
  if (!endingTypes.has(requiredType)) throw new Error(`Ending matrix lacks ${requiredType} endings`);
}

for (const branch of branchPoints) {
  if (!branch.question || branch.options.length < 2) {
    throw new Error(`Branch point lacks dilemma/options: ${branch.id}`);
  }
  if (/亲近|警戒|观察|好感|正确|错误|因为|所以/.test(branch.options.join(""))) {
    throw new Error(`Branch point exposes mechanics in option labels: ${branch.id}`);
  }
}

for (const gate of funCheckpoints) {
  for (const key of ["id", "promise", "playerQuestion", "failCondition"]) {
    if (!gate[key]) throw new Error(`Fun checkpoint is missing ${key}: ${JSON.stringify(gate)}`);
  }
}

if (!funCheckpoints.some((gate) => gate.failCondition.includes("不能验收"))) {
  throw new Error("Fun checkpoints must include explicit no-acceptance failure conditions");
}

console.log(
  `Blueprint OK: ${branchPoints.length} branch points, ${endings.length} endings, ${cgPlan.length} planned CGs, ${experienceDeck.length} hooks.`,
);
