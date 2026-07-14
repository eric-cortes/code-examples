import type { DynamicState, RuleEvent } from "../types/models.js";

type RuleContext = {
  therapistMessage: string;
  state: DynamicState;
  traits: string[];
  triggers: string[];
  language: "en" | "de";
};

export type RuleResult = {
  nextState: DynamicState;
  appliedRules: string[];
  dynamicRules: string[];
  events: RuleEvent[];
};

const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));

function deriveMood(state: DynamicState): string {
  if (state.stress > 75) return "anxious";
  if (state.trust < 25 && state.openness < 25) return "guarded";
  if (state.emotionalIntensity > 70) return "distressed";
  if (state.openness > 60 && state.trust > 60) return "vulnerable";
  return "sad";
}

export function evaluateRules(ctx: RuleContext): RuleResult {
  const next = { ...ctx.state };
  const appliedRules: string[] = [];
  const dynamicRules: string[] = [];
  const events: RuleEvent[] = [];

  const msg = ctx.therapistMessage.toLowerCase();
  const empathic =
    /that sounds|i hear|that seems hard|makes sense|das klingt|ich höre|das ergibt sinn|das verstehe ich|es tut mir leid/.test(
      msg,
    );
  const challenging =
    /you should|why didn't you|that's irrational|du solltest|warum hast du nicht|das ist irrational|das ist doch/.test(
      msg,
    );
  const invitesEmotion =
    /how do you feel|tell me more|what was that like|what feels hardest|wie fühlst du dich|erzähl mir mehr|was war das für ein gefühl|was fühlt sich am schwersten an/.test(
      msg,
    );
  const hitsTrigger = ctx.triggers.some((t) => msg.includes(t.toLowerCase()));

  if (empathic) {
    next.trust += 6;
    next.stress -= 4;
    next.openness += 5;
    appliedRules.push("empathy_increases_rapport");
  }

  if (challenging && next.trust < 40) {
    next.trust -= 10;
    next.stress += 12;
    appliedRules.push("premature_challenge_causes_rupture");
    events.push({ type: "rupture", severity: "medium" });
  }

  if (invitesEmotion && next.trust >= 25) {
    next.openness += 4;
    appliedRules.push("emotion_invitation_increases_disclosure");
  }

  if (hitsTrigger) {
    next.stress += 15;
    next.emotionalIntensity += 10;
    appliedRules.push("trigger_activation");
    events.push({ type: "trigger_activation", severity: "high" });
  }

  if (ctx.traits.includes("distrustful") && empathic) next.trust -= 2;
  if (ctx.traits.includes("avoidant") && invitesEmotion) next.openness -= 2;

  next.trust = clamp(next.trust);
  next.stress = clamp(next.stress);
  next.openness = clamp(next.openness);
  next.emotionalIntensity = clamp(next.emotionalIntensity);
  next.currentMood = deriveMood(next);

  if (next.trust < 30)
    dynamicRules.push("Use short, guarded answers with minimal disclosure.");
  if (next.trust > 70)
    dynamicRules.push("Be more emotionally open and elaborate naturally.");
  if (next.stress > 70)
    dynamicRules.push(
      "Speech may become tense, fragmented, and less organized.",
    );
  if (ctx.traits.includes("avoidant"))
    dynamicRules.push("When overwhelmed, redirect emotionally intense topics.");
  if (ctx.language === "de")
    dynamicRules.push(
      "Antworte natürlich auf Deutsch und bleibe in der Rolle.",
    );

  if (
    events.length === 0 &&
    invitesEmotion &&
    next.openness > ctx.state.openness
  ) {
    events.push({ type: "initial_disclosure", severity: "low" });
  }

  return { nextState: next, appliedRules, dynamicRules, events };
}
