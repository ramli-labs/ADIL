export type CharacterName = string;
export type CharacterState = "idle" | "speaking" | "explanation" | "warning" | "conclusion";
export type Phase = "brief" | "evidence" | "interview" | "analysis" | "verdict";

export interface DialogueLine {
  character: CharacterName;
  state: CharacterState | string;
  text: string;
  emotion?: string;
  audioFile?: string;
  subtitle?: string;
}

export interface CharacterProfile {
  full_name: string; role: string; archetype: string; note?: string; accent: string; slug: string;
  voice: { gender: string; age: string; style: string[]; tempo: string; engine_hint: string };
  animation: { entrance: string; idle_motion: string; emphasis: string };
  expressions: Record<string, string>;
  states: CharacterState[];
  sprites: Record<string, string>;
  audio_dir: string;
}

export interface Evidence {
  id: string; title: string; type: string; description: string; finding: string;
  impact: "HIGH" | "MEDIUM" | "LOW"; learningConcept: string; relevant: boolean;
}

export interface InterviewQuestion { id: string; q: string; a: string; unlock?: string }

export interface VerdictOption {
  id: string; label: string; text: string; score: number;
  tier: "best" | "mid" | "weak"; feedback: string; traits?: string[];
}
export interface VerdictSet { question: string; options: VerdictOption[] }

export interface CaseFact { label: string; value: string }
export interface CaseAnalysis { prompt: string; pick: number; key: string[]; conclusion: string }

export interface CaseDef {
  id: string; case_code: string; title: string; title_en: string; topic: string;
  principles: string[]; difficulty: string; room: string; environment: string;
  briefing: string; background: CaseFact[];
  ai_decision: { system: string; output: string; basis: string; confidence: number; benefit: string };
  ethical_issues: string[];
  intro_dialogue: string; evidence_set: string; interview_set: string;
  analysis: CaseAnalysis; verdict_set: string; learning_ref: string; ending_dialogue: string;
}

export interface LearningCase {
  principle: string; objectives: string[]; duration: string; takeaway: string;
  reflection_questions: string[]; discussion_prompts: string[]; reflection_activity: string;
  misconceptions: { wrong: string; right: string }[];
}
export interface Learning {
  meta: { curriculum: string; grade: string; total_duration: string; competency: string };
  cases: Record<string, LearningCase>;
  glossary: { term: string; def: string }[];
}

export interface BadgeDef {
  id: string; label: string; desc: string;
  condition: { type: "case_ethics" | "full_scan" | "full_interview" | "perfect_analysis" | "complete_case"; caseId?: string; min?: number };
}
export interface ProfileDef { id: string; label: string; axis?: string; desc: string; advice: string }
export interface Endings {
  profiles: ProfileDef[];
  fallback: ProfileDef;
  finals: { min: number; title: string; text: string }[];
  badges: BadgeDef[];
}

export interface GameConfig {
  game: { id: string; title: string; subtitle: string; year_setting: number; player_role: string; language: string; version: string };
  weights: { evidence: number; reasoning: number; ethics: number };
  thresholds: { min_evidence_to_analyse: number; badge_ethics_min: number };
  ranks: { min: number; max: number; id: string; label: string; desc: string }[];
  theme: { colors: Record<string, string>; fonts: Record<string, string> };
  audio: { music_volume: number; voice_volume: number; sfx_volume: number; prevent_overlapping_voice: boolean };
  save: { key: string; autosave: boolean };
  teacher_mode: { enabled: boolean; default_visible: boolean; show_after_verdict: boolean };
}

export interface CaseRecord {
  total: number; evidence: number; reasoning: number; ethics: number;
  verdict: string; tier: VerdictOption["tier"]; traits: string[];
  relFound: number; relTotal: number; asked: number; askTotal: number;
  correctPicks: number; pickTotal: number; scannedAll: boolean; completedAt: number;
}

export interface GameSettings { sound: boolean; narration: boolean; reducedMotion: boolean }
export interface SaveData {
  playerName: string | null; cases: Record<string, CaseRecord>; badges: string[]; teacherMode: boolean;
  settings: GameSettings;
}

export interface ChatMessage { who: "player" | "LUMA"; text: string; unlock?: string }
export interface CaseProgress {
  caseId: string; scanned: Record<string, boolean>; asked: string[]; chat: ChatMessage[];
  picks: string[]; analysisSubmitted: boolean; verdictId: string | null; startedAt: number;
}
export interface Feedback { tone: "good" | "neutral" | "warn"; text: string }
