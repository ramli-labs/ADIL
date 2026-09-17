/**
 * endingEngine — profil analis, lencana berbasis keputusan, dan ending akhir.
 * Profil TIDAK ditentukan oleh jawaban benar saja, melainkan oleh cara bermain:
 * ketelitian bukti · keberanian bertanya · ketepatan penalaran · kualitas putusan etis.
 */
import type { BadgeDef, CaseDef, CaseProgress, CaseRecord, SaveData, VerdictOption } from "../types";
import { config, endings, getEvidence, getInterview } from "./content";

export const tierLabel = (tier: VerdictOption["tier"]) =>
  ({ best: "PUTUSAN ADIL", mid: "PUTUSAN SEBAGIAN", weak: "PUTUSAN LEMAH" }[tier]);

export interface AxisScores { evidence: number; inquiry: number; reasoning: number; ethics: number }

/** Rasio 0–1 per sumbu, dirata-rata dari seluruh sidang yang sudah selesai. */
export function axisScores(records: Record<string, CaseRecord>): AxisScores {
  const list = Object.values(records);
  if (!list.length) return { evidence: 0, inquiry: 0, reasoning: 0, ethics: 0 };
  const avg = (f: (r: CaseRecord) => number) => list.reduce((a, r) => a + f(r), 0) / list.length;
  return {
    evidence: avg((r) => r.relFound / r.relTotal),
    inquiry: avg((r) => r.asked / r.askTotal),
    reasoning: avg((r) => r.correctPicks / r.pickTotal),
    ethics: avg((r) => r.ethics / config.weights.ethics)
  };
}

/** Profil = sumbu terkuat pemain, asalkan cukup kuat (>= 0.6). */
export function analystProfile(records: Record<string, CaseRecord>) {
  const axes = axisScores(records);
  const best = (Object.entries(axes) as [keyof AxisScores, number][]).sort((a, b) => b[1] - a[1])[0];
  if (!best || best[1] < 0.6) return { ...endings.fallback, axes };
  const profile = endings.profiles.find((p) => p.axis === best[0]) ?? endings.profiles[0];
  return { ...profile, axes };
}

/** Lencana dievaluasi ulang dari seluruh riwayat — selalu konsisten dengan save. */
export function evaluateBadges(save: SaveData): string[] {
  return endings.badges.filter((b) => {
    const c = b.condition;
    const records = Object.entries(save.cases);
    switch (c.type) {
      case "case_ethics": return (save.cases[c.caseId!]?.ethics ?? 0) >= (c.min ?? 30);
      case "full_scan": return records.some(([, r]) => r.scannedAll);
      case "full_interview": return records.some(([, r]) => r.asked === r.askTotal);
      case "perfect_analysis": return records.some(([, r]) => r.correctPicks === r.pickTotal);
      case "complete_case": return records.some(([, r]) => r.scannedAll && r.asked === r.askTotal && r.tier === "best");
      default: return false;
    }
  }).map((b) => b.id);
}

export const badgeById = (id: string): BadgeDef | undefined => endings.badges.find((b) => b.id === id);

export function finalEnding(save: SaveData, totalCases: number, score: number) {
  if (Object.keys(save.cases).length < totalCases) return null;
  return endings.finals.find((f) => score >= f.min) ?? null;
}

/** Ringkasan proses satu sidang, dipakai layar guru. */
export function processSummary(c: CaseDef, p: CaseProgress, r: CaseRecord) {
  return {
    evidenceUsed: `${r.relFound}/${r.relTotal} bukti relevan dari ${getEvidence(c.evidence_set).length} berkas`,
    inquiry: `${r.asked}/${getInterview(c.interview_set).length} pertanyaan diajukan ke LUMA`,
    chain: `${r.correctPicks}/${r.pickTotal} bukti kunci tepat`,
    verdict: tierLabel(r.tier),
    minutes: p.startedAt ? Math.max(1, Math.round((Date.now() - p.startedAt) / 60000)) : null
  };
}
