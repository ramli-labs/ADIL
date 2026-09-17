/**
 * scoringEngine — JUSTICE SCORE = Evidence + Reasoning + Ethics (maks 100).
 * Menilai proses, bukan sekadar jawaban benar.
 */
import type { CaseDef, CaseProgress, CaseRecord, VerdictOption } from "../types";
import { config } from "./content";
import { correctPicks, relevantFound } from "./caseEngine";
import { getEvidence, getInterview } from "./content";

export function scoreCase(c: CaseDef, p: CaseProgress, option: VerdictOption): CaseRecord {
  const w = config.weights;
  const relTotal = getEvidence(c.evidence_set).filter((e) => e.relevant).length;
  const relFound = relevantFound(c, p);
  const evidence = Math.round((relFound / relTotal) * w.evidence);

  const askTotal = getInterview(c.interview_set).length;
  const asked = p.asked.length;
  const picks = correctPicks(c, p);
  const pickTotal = c.analysis.key.length;
  const reasoning = Math.round(((asked / askTotal) * 0.5 + (picks / pickTotal) * 0.5) * w.reasoning);

  const ethics = option.score;
  return {
    total: Math.min(100, evidence + reasoning + ethics),
    evidence, reasoning, ethics, verdict: option.id, tier: option.tier, traits: option.traits ?? [],
    relFound, relTotal, asked, askTotal, correctPicks: picks, pickTotal,
    scannedAll: Object.keys(p.scanned).length === getEvidence(c.evidence_set).length,
    completedAt: Date.now()
  };
}

export const justiceScore = (records: Record<string, CaseRecord>) => {
  const totals = Object.values(records).map((r) => r.total);
  return totals.length ? Math.round(totals.reduce((a, b) => a + b, 0) / totals.length) : 0;
};

export const rankFor = (score: number) =>
  config.ranks.find((r) => score >= r.min && score <= r.max) ?? config.ranks[0];
