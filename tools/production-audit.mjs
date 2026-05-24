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
const requiredIsekaiNodes = [
  "modern_last_train",
  "goddess_gate",
  "choice_blessing",
  "blessing_loop",
  "blessing_eye",
  "blessing_body",
  "isekai_training_open",
  "isekai_training_01_loop_choice",
  "isekai_training_06_craft_reward",
  "isekai_training_12_oath_choice",
  "isekai_training_close",
  "isekai_fall",
  "choice_throne",
];
const missingIsekaiNodes = requiredIsekaiNodes.filter((id) => !visited.has(id));
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
const requiredTrialEveNodes = [
  "trial_eve_open",
  "trial_eve_choice",
  "eve_warehouse_payoff",
  "eve_bedroom_payoff",
  "eve_glove_payoff",
  "eve_wax_payoff",
  "trial_eve_cost_choice",
  "eve_take_witness",
  "eve_take_list",
  "eve_take_antalia",
  "trial_eve_last_hook",
];
const missingTrialEveNodes = requiredTrialEveNodes.filter((id) => !visited.has(id));
const requiredCollapseNodes = [
  "collapse_open",
  "collapse_choice_first",
  "collapse_wagon",
  "collapse_hold_antalia",
  "collapse_take_hall",
  "collapse_choice_memory",
  "collapse_use_cedric",
  "collapse_use_scribe",
  "collapse_use_bell",
  "collapse_choice_enter",
  "collapse_enter_now",
  "collapse_finish_page",
  "collapse_enter_together",
  "collapse_enter_join",
];
const missingCollapseNodes = requiredCollapseNodes.filter((id) => !visited.has(id));
const requiredTrialGauntletNodes = [
  "trial_gauntlet_open",
  "trial_round_01_goal",
  "trial_round_01_choice",
  "trial_round_08_reward",
  "trial_round_16_reward",
  "trial_round_24_choice",
  "trial_gauntlet_close",
];
const missingTrialGauntletNodes = requiredTrialGauntletNodes.filter((id) => !visited.has(id));
const requiredRouteLockNodes = [
  "route_lock_open",
  "route_lock_01_goal",
  "route_lock_01_choice",
  "route_lock_08_payoff",
  "route_lock_16_payoff",
  "route_lock_32_payoff",
  "route_lock_48_payoff",
  "route_lock_56_choice",
  "route_lock_close",
];
const missingRouteLockNodes = requiredRouteLockNodes.filter((id) => !visited.has(id));
const requiredConsequenceNodes = [
  "consequence_corridor_open",
  "consequence_01_context",
  "consequence_01_choice",
  "consequence_16_payoff",
  "consequence_32_payoff",
  "consequence_48_payoff",
  "consequence_64_choice",
  "consequence_corridor_close",
];
const missingConsequenceNodes = requiredConsequenceNodes.filter((id) => !visited.has(id));
const requiredCampaignNodes = [
  "campaign_calendar_open",
  "campaign_01_morning_goal",
  "campaign_01_morning_choice",
  "campaign_10_dream_reward",
  "campaign_20_risk_reward",
  "campaign_30_hook_choice",
  "campaign_calendar_close",
];
const missingCampaignNodes = requiredCampaignNodes.filter((id) => !visited.has(id));
const requiredDossierNodes = [
  "campaign_dossier_open",
  "dossier_01_throne_goal",
  "dossier_01_throne_choice",
  "dossier_10_dream_reward",
  "dossier_20_sun_reward",
  "dossier_30_dawn_choice",
  "campaign_dossier_close",
];
const missingDossierNodes = requiredDossierNodes.filter((id) => !visited.has(id));
const requiredCountdownNodes = [
  "crown_countdown_open",
  "countdown_01_edict_goal",
  "countdown_01_edict_choice",
  "countdown_10_memory_reward",
  "countdown_20_blackfire_reward",
  "countdown_30_sunrise_choice",
  "crown_countdown_close",
];
const missingCountdownNodes = requiredCountdownNodes.filter((id) => !visited.has(id));
const requiredArcLedgerNodes = [
  "character_arc_ledger_open",
  "arc_01_cedric_want_goal",
  "arc_01_cedric_want_choice",
  "arc_10_whitehand_betray_reward",
  "arc_20_catmark_choice_reward",
  "arc_30_people_payoff_choice",
  "character_arc_ledger_close",
];
const missingArcLedgerNodes = requiredArcLedgerNodes.filter((id) => !visited.has(id));
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
  isekaiNodes: requiredIsekaiNodes.length - missingIsekaiNodes.length,
  midpointReversalNodes: requiredMidpointNodes.length - missingMidpointNodes.length,
  closedCourtNodes: requiredWolfNodes.length - missingWolfNodes.length,
  lieMapNodes: requiredLieMapNodes.length - missingLieMapNodes.length,
  badEndingIntelNodes: requiredBadIntelNodes.length - missingBadIntelNodes.length,
  trialEveNodes: requiredTrialEveNodes.length - missingTrialEveNodes.length,
  collapseNodes: requiredCollapseNodes.length - missingCollapseNodes.length,
  trialGauntletNodes: requiredTrialGauntletNodes.length - missingTrialGauntletNodes.length,
  routeLockNodes: requiredRouteLockNodes.length - missingRouteLockNodes.length,
  consequenceNodes: requiredConsequenceNodes.length - missingConsequenceNodes.length,
  campaignNodes: requiredCampaignNodes.length - missingCampaignNodes.length,
  dossierNodes: requiredDossierNodes.length - missingDossierNodes.length,
  countdownNodes: requiredCountdownNodes.length - missingCountdownNodes.length,
  arcLedgerNodes: requiredArcLedgerNodes.length - missingArcLedgerNodes.length,
  status: minutes >= 1200 && Object.keys(assets.cg).length >= 80 ? "production target met" : "production gap remains",
};

if (branchNodes < 10) throw new Error(`Need 10+ actual branch nodes, found ${branchNodes}`);
if (endings.length < 15) throw new Error(`Need 15+ reachable endings, found ${endings.length}`);
if (longformPlan.cgPlan.length < 80) throw new Error(`Need 80+ planned CGs, found ${longformPlan.cgPlan.length}`);
if (Object.keys(assets.cg).length < 80) throw new Error(`Need 80+ actual CG assets, found ${Object.keys(assets.cg).length}`);
if (reachableCg.size < 80) throw new Error(`Need 80+ reachable CGs, found ${reachableCg.size}`);
if (missingIsekaiNodes.length) throw new Error(`Isekai opening nodes are not reachable: ${missingIsekaiNodes.join(", ")}`);
if (missingMidpointNodes.length) throw new Error(`Midpoint reversal nodes are not reachable: ${missingMidpointNodes.join(", ")}`);
if (missingWolfNodes.length) throw new Error(`Closed court suspicion nodes are not reachable: ${missingWolfNodes.join(", ")}`);
if (missingLieMapNodes.length) throw new Error(`Lie map nodes are not reachable: ${missingLieMapNodes.join(", ")}`);
if (missingBadIntelNodes.length) throw new Error(`Bad ending intel nodes are not reachable: ${missingBadIntelNodes.join(", ")}`);
if (missingTrialEveNodes.length) throw new Error(`Trial eve nodes are not reachable: ${missingTrialEveNodes.join(", ")}`);
if (missingCollapseNodes.length) throw new Error(`Collapse nodes are not reachable: ${missingCollapseNodes.join(", ")}`);
if (missingTrialGauntletNodes.length) throw new Error(`Trial gauntlet nodes are not reachable: ${missingTrialGauntletNodes.join(", ")}`);
if (missingRouteLockNodes.length) throw new Error(`Route lock nodes are not reachable: ${missingRouteLockNodes.join(", ")}`);
if (missingConsequenceNodes.length) throw new Error(`Consequence corridor nodes are not reachable: ${missingConsequenceNodes.join(", ")}`);
if (missingCampaignNodes.length) throw new Error(`Campaign calendar nodes are not reachable: ${missingCampaignNodes.join(", ")}`);
if (missingDossierNodes.length) throw new Error(`Campaign dossier nodes are not reachable: ${missingDossierNodes.join(", ")}`);
if (missingCountdownNodes.length) throw new Error(`Crown countdown nodes are not reachable: ${missingCountdownNodes.join(", ")}`);
if (missingArcLedgerNodes.length) throw new Error(`Character arc ledger nodes are not reachable: ${missingArcLedgerNodes.join(", ")}`);
if (/不是|而是/.test(storyText)) throw new Error("Story still contains banned not-but phrasing");

console.log(JSON.stringify(report, null, 2));
