/**
 * content.ts — SATU-SATUNYA tempat data JSON dimuat.
 * Semua engine dan komponen membaca konten lewat modul ini, tidak pernah mengimpor JSON langsung.
 * Menambah kasus = menambah entri di cases/evidence/verdicts/dialogue/learning. Tanpa ubah kode.
 */
import casesJson from "../data/cases.json";
import evidenceJson from "../data/evidence.json";
import verdictsJson from "../data/verdicts.json";
import dialogueJson from "../data/dialogue.json";
import charactersJson from "../data/characters.json";
import learningJson from "../data/learning.json";
import endingsJson from "../data/endings.json";
import configJson from "../data/config.json";
import type {
  CaseDef, CharacterProfile, DialogueLine, Endings, Evidence, GameConfig,
  InterviewQuestion, Learning, VerdictSet
} from "../types";

export const config = configJson as unknown as GameConfig;
export const cases = casesJson as unknown as CaseDef[];
export const characters = charactersJson as unknown as Record<string, CharacterProfile>;
export const learning = learningJson as unknown as Learning;
export const endings = endingsJson as unknown as Endings;

const evidenceSets = evidenceJson as unknown as Record<string, Evidence[]>;
const verdictSets = verdictsJson as unknown as Record<string, VerdictSet>;
const dialogueSets = dialogueJson as unknown as Record<string, unknown>;

export const getCase = (id?: string) => cases.find((c) => c.id === id) ?? null;
export const getEvidence = (caseId: string): Evidence[] => evidenceSets[caseId] ?? [];
export const getVerdict = (caseId: string): VerdictSet => verdictSets[caseId];
export const getInterview = (caseId: string): InterviewQuestion[] =>
  (dialogueSets[`${caseId}_interview`] as InterviewQuestion[]) ?? [];
export const getDialogue = (key: string): DialogueLine[] =>
  (dialogueSets[key] as DialogueLine[]) ?? [];
export const academyIntro = getDialogue("academy_intro");
export const getLearning = (caseId: string) => learning.cases[caseId];

/** Validasi ringan — dipanggil sekali saat boot agar kesalahan konten ketahuan lebih awal. */
export function validateContent(): string[] {
  const problems: string[] = [];
  cases.forEach((c) => {
    if (!getEvidence(c.evidence_set).length) problems.push(`${c.id}: evidence_set "${c.evidence_set}" kosong`);
    if (!getVerdict(c.verdict_set)) problems.push(`${c.id}: verdict_set "${c.verdict_set}" tidak ditemukan`);
    if (!getInterview(c.interview_set).length) problems.push(`${c.id}: interview kosong`);
    if (!getDialogue(c.intro_dialogue).length) problems.push(`${c.id}: intro_dialogue "${c.intro_dialogue}" kosong`);
    if (!getLearning(c.learning_ref)) problems.push(`${c.id}: learning_ref "${c.learning_ref}" tidak ditemukan`);
    const ids = getEvidence(c.evidence_set).map((e) => e.id);
    c.analysis.key.forEach((k) => { if (!ids.includes(k)) problems.push(`${c.id}: kunci analisis "${k}" bukan id bukti`); });
  });
  return problems;
}
