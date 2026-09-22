/**
 * gameState — progres pemain, save/load, dan aksi investigasi.
 * Satu-satunya pemilik state; engine lain murni fungsi.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { CaseDef, CaseProgress, CaseRecord, Feedback, Phase, SaveData, VerdictOption } from "../types";
import { academyIntro, cases, characters, config, getCase, getEvidence, getInterview, getLearning, validateContent } from "./content";
import { canAnalyse, correctPicks, feedbackFor, newProgress, phaseLocked } from "./caseEngine";
import { audioEngine } from "./audioEngine";
import { analystProfile, evaluateBadges, finalEnding } from "./endingEngine";
import { justiceScore, rankFor, scoreCase } from "./scoringEngine";

const emptySave: SaveData = {
  playerName: null, cases: {}, badges: [], teacherMode: config.teacher_mode.default_visible,
  settings: { sound: true, narration: true, reducedMotion: false }
};

function useGameStore() {
  const [save, setSave] = useState<SaveData>(emptySave);
  const [progress, setProgress] = useState<CaseProgress | null>(null);
  const [phase, setPhaseState] = useState<Phase>("brief");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  useEffect(() => {
    const problems = validateContent();
    if (problems.length) console.warn("[ADIL] masalah konten:\n" + problems.join("\n"));
    let loaded = emptySave;
    try {
      const raw = localStorage.getItem(config.save.key);
      if (raw) {
        const parsed = JSON.parse(raw) as SaveData;
        loaded = { ...emptySave, ...parsed, settings: { ...emptySave.settings, ...parsed.settings } };
      }
    } catch { /* localStorage tidak tersedia */ }
    setSave(loaded);
    audioEngine.init();
    audioEngine.setEnabled(loaded.settings.sound);
    audioEngine.setNarrationEnabled(loaded.settings.narration);
  }, []);

  const persist = useCallback((next: SaveData) => {
    setSave(next);
    if (!config.save.autosave) return;
    try { localStorage.setItem(config.save.key, JSON.stringify(next)); } catch { /* noop */ }
  }, []);

  const flash = useCallback((f: Feedback | undefined) => {
    if (!f) return;
    setFeedback(f);
    window.setTimeout(() => setFeedback((cur) => (cur === f ? null : cur)), 3200);
  }, []);

  const setPhase = useCallback((p: Phase) => {
    setPhaseState(p);
    audioEngine.setAmbience(p === "verdict" ? "verdict" : "investigation");
  }, []);

  const startCase = useCallback((caseId: string) => {
    setProgress(newProgress(caseId));
    setPhaseState("brief");
    setNewBadges([]);
    audioEngine.setAmbience("investigation");
  }, []);

  const scan = useCallback((caseId: string, evidenceId: string) => {
    const ev = getEvidence(caseId).find((e) => e.id === evidenceId);
    audioEngine.playSfx("scan");
    flash(feedbackFor("scan", { evidence: ev }));
    setProgress((p) => (p ? { ...p, scanned: { ...p.scanned, [evidenceId]: true } } : p));
  }, [flash]);

  const ask = useCallback((c: CaseDef, questionId: string) => {
    const q = getInterview(c.interview_set).find((x) => x.id === questionId);
    if (!q) return;
    audioEngine.playSfx(q.unlock && q.unlock === q.unlock.toUpperCase() ? "unlock" : "click");
    audioEngine.speak("LUMA", `${c.id}_${questionId}`);
    flash(feedbackFor("ask", { unlock: q.unlock }));
    setProgress((p) =>
      p && !p.asked.includes(questionId)
        ? { ...p, asked: [...p.asked, questionId], chat: [...p.chat, { who: "player", text: q.q }, { who: "LUMA", text: q.a, unlock: q.unlock }] }
        : p
    );
  }, [flash]);

  const togglePick = useCallback((evidenceId: string, max: number) => {
    audioEngine.playSfx("click");
    setProgress((p) => {
      if (!p || p.analysisSubmitted) return p;
      if (p.picks.includes(evidenceId)) return { ...p, picks: p.picks.filter((x) => x !== evidenceId) };
      if (p.picks.length >= max) return p;
      return { ...p, picks: [...p.picks, evidenceId] };
    });
  }, []);

  const lockAnalysis = useCallback((c: CaseDef) => {
    audioEngine.playSfx("unlock");
    setProgress((p) => {
      if (!p) return p;
      flash(feedbackFor("lock", { correct: correctPicks(c, p), total: c.analysis.key.length }));
      return { ...p, analysisSubmitted: true };
    });
  }, [flash]);

  const submitVerdict = useCallback((c: CaseDef, option: VerdictOption): CaseRecord => {
    audioEngine.playSfx("verdict");
    const current = progress ?? newProgress(c.id);
    const record = scoreCase(c, current, option);
    const next: SaveData = { ...save, cases: { ...save.cases }, badges: [...save.badges] };
    const prev = next.cases[c.id];
    next.cases[c.id] = prev && prev.total > record.total ? { ...record, total: prev.total } : record;
    const all = evaluateBadges(next);
    const fresh = all.filter((id) => !next.badges.includes(id));
    next.badges = all;
    if (fresh.length) { setNewBadges(fresh); window.setTimeout(() => audioEngine.playSfx("badge"), 500); }
    else setNewBadges([]);
    persist(next);
    setProgress({ ...current, verdictId: option.id });
    return record;
  }, [persist, progress, save]);

  const setSound = useCallback((on: boolean) => {
    audioEngine.setEnabled(on);
    persist({ ...save, settings: { ...save.settings, sound: on } });
  }, [persist, save]);

  const setNarration = useCallback((on: boolean) => {
    audioEngine.setNarrationEnabled(on);
    persist({ ...save, settings: { ...save.settings, narration: on } });
  }, [persist, save]);

  const setReducedMotion = useCallback((on: boolean) => {
    persist({ ...save, settings: { ...save.settings, reducedMotion: on } });
  }, [persist, save]);

  const toggleAudio = useCallback(() => setSound(!save.settings.sound), [setSound, save.settings.sound]);

  const score = justiceScore(save.cases);

  return {
    cases, characters, config, academyIntro,
    save, progress, phase, setPhase, feedback, newBadges,
    audioOn: save.settings.sound, toggleAudio,
    narrationOn: save.settings.narration, setNarration,
    reducedMotion: save.settings.reducedMotion, setReducedMotion,
    setSound,
    justiceScore: score, rank: rankFor(score),
    profile: analystProfile(save.cases),
    ending: finalEnding(save, cases.length, score),
    startCase, scan, ask, togglePick, lockAnalysis, submitVerdict,
    getCase, getLearning,
    canAnalyse, phaseLocked,
    setPlayerName: (playerName: string) => persist({ ...save, playerName }),
    setTeacherMode: (teacherMode: boolean) => persist({ ...save, teacherMode }),
    resetSave: () => {
      persist(emptySave);
      setProgress(null);
      setNewBadges([]);
      audioEngine.setEnabled(emptySave.settings.sound);
      audioEngine.setNarrationEnabled(emptySave.settings.narration);
    },
    isUnlocked: (id: string) => {
      const i = cases.findIndex((c) => c.id === id);
      return i <= 0 || Boolean(save.cases[cases[i - 1].id]);
    }
  };
}

type Store = ReturnType<typeof useGameStore>;
const GameContext = createContext<Store | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(GameContext.Provider, { value: useGameStore() }, children);
}

export function useGame(): Store {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame harus dipakai di dalam <GameProvider>");
  return ctx;
}
