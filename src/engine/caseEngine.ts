/**
 * caseEngine — alur satu kasus: fase, pembukaan bukti, interogasi, analisis.
 * Murni fungsi + tipe; tidak menyentuh React maupun penyimpanan.
 */
import type { CaseDef, CaseProgress, Evidence, InterviewQuestion, Phase } from "../types";
import { config, getEvidence, getInterview } from "./content";

export const PHASES: { id: Phase; label: string }[] = [
  { id: "brief", label: "01 · BRIEFING" },
  { id: "evidence", label: "02 · PAPAN BUKTI" },
  { id: "interview", label: "03 · INTEROGASI AI" },
  { id: "analysis", label: "04 · ANALISIS" },
  { id: "verdict", label: "05 · PUTUSAN" }
];

export const newProgress = (caseId: string): CaseProgress => ({
  caseId, scanned: {}, asked: [], chat: [], picks: [], analysisSubmitted: false, verdictId: null, startedAt: Date.now()
});

export const scannedEvidence = (c: CaseDef, p: CaseProgress): Evidence[] =>
  getEvidence(c.evidence_set).filter((e) => p.scanned[e.id]);

export const relevantFound = (c: CaseDef, p: CaseProgress) =>
  scannedEvidence(c, p).filter((e) => e.relevant).length;

export const canAnalyse = (c: CaseDef, p: CaseProgress) =>
  scannedEvidence(c, p).length >= config.thresholds.min_evidence_to_analyse;

export const correctPicks = (c: CaseDef, p: CaseProgress) =>
  p.picks.filter((id) => c.analysis.key.includes(id)).length;

export const remainingQuestions = (c: CaseDef, p: CaseProgress): InterviewQuestion[] =>
  getInterview(c.interview_set).filter((q) => !p.asked.includes(q.id));

/** Fase mana yang boleh dibuka pada kondisi sekarang — dipakai untuk mengunci tab. */
export function phaseLocked(phase: Phase, c: CaseDef, p: CaseProgress): boolean {
  if (phase === "analysis") return !canAnalyse(c, p);
  if (phase === "verdict") return !p.analysisSubmitted;
  return false;
}

/** Umpan balik tiap aksi — setiap interaksi wajib memberi respons. */
export function feedbackFor(action: "scan" | "ask" | "pick" | "lock", payload: { evidence?: Evidence; unlock?: string; correct?: number; total?: number }) {
  switch (action) {
    case "scan": return payload.evidence?.relevant
      ? { tone: "good" as const, text: `BERKAS RELEVAN — ${payload.evidence.finding}` }
      : { tone: "neutral" as const, text: "BERKAS DIPINDAI — tidak menjelaskan inti kasus." };
    case "ask": return payload.unlock
      ? { tone: "good" as const, text: `WAWASAN TERBUKA: ${payload.unlock}` }
      : { tone: "neutral" as const, text: "LUMA menjawab." };
    case "pick": return { tone: "neutral" as const, text: "Bukti ditambahkan ke rantai kesimpulan." };
    case "lock": return { tone: (payload.correct === payload.total ? "good" : "warn") as "good" | "warn",
      text: `${payload.correct}/${payload.total} bukti kunci tepat.` };
  }
}
