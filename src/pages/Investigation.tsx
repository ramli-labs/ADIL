import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AIChat from "../components/ai/AIChat";
import Character from "../components/character/Character";
import DialogueBox from "../components/character/DialogueBox";
import EvidenceBoard from "../components/evidence/EvidenceBoard";
import Button from "../components/ui/Button";
import { PHASES, scannedEvidence } from "../engine/caseEngine";
import { getDialogue, getEvidence, getInterview, getVerdict } from "../engine/content";
import { useDialogue } from "../engine/dialogueEngine";
import { useGame } from "../engine/gameState";

export default function Investigation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const g = useGame();
  const gameCase = g.getCase(id);

  useEffect(() => {
    if (gameCase && (!g.progress || g.progress.caseId !== gameCase.id)) g.startCase(gameCase.id);
  }, [gameCase, g]);

  const intro = gameCase ? getDialogue(gameCase.intro_dialogue) : [];
  const dlg = useDialogue(intro, () => g.setPhase("evidence"));

  if (!gameCase || !g.progress || g.progress.caseId !== gameCase.id) return null;
  const p = g.progress;
  const evidence = getEvidence(gameCase.evidence_set);
  const scanned = scannedEvidence(gameCase, p);
  const ready = g.canAnalyse(gameCase, p);
  const playerName = (g.save.playerName ?? "ANALIS NUSANTARA").toUpperCase();
  const insights = p.chat.filter((m) => m.unlock);
  const ai = gameCase.ai_decision;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="grid items-start gap-5 px-5 py-8 md:px-10 xl:grid-cols-[1fr_300px]">
      <div className="flex min-w-0 flex-col gap-[18px]">
        <div className="flex flex-wrap items-baseline justify-between gap-3.5 border-b border-cyan/20 pb-3.5">
          <div>
            <div className="font-mono text-[9.5px] tracking-[.2em] text-cyan">{gameCase.room}</div>
            <h2 className="mt-2 font-display text-[clamp(20px,3vw,30px)] font-bold tracking-[.04em]">{gameCase.title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {gameCase.principles.map((pr) => (
              <span key={pr} className="border border-gold/35 px-2.5 py-1.5 font-mono text-[9px] tracking-[.14em] text-gold">{pr}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {PHASES.map((ph) => {
            const blocked = g.phaseLocked(ph.id, gameCase, p);
            const active = ph.id === g.phase;
            return (
              <button key={ph.id} disabled={blocked} onClick={() => g.setPhase(ph.id)}
                className={`border px-3.5 py-2.5 font-mono text-[9.5px] tracking-[.14em] ${active ? "border-gold bg-gold text-navy" : blocked ? "cursor-not-allowed border-haze/20 text-haze/40" : "border-haze/25 text-haze hover:border-cyan hover:text-cyan"}`}>
                {ph.label}
              </button>
            );
          })}
        </div>

        {g.phase === "brief" && dlg.line && (
          <div className="border border-cyan/20 bg-navy/60 p-6 md:p-8">
            <div className="font-mono text-[9px] tracking-[.2em] text-gold">BRIEFING KASUS</div>
            <p className="mb-5 mt-3.5 text-pretty text-[16px] leading-relaxed text-[#e3ebf3]">{gameCase.briefing}</p>
            <div className="mb-5 grid gap-2.5 sm:grid-cols-3">
              {gameCase.background.map((f) => (
                <div key={f.label} className="border-l-2 border-cyan bg-cyan/[.05] px-3.5 py-2.5">
                  <div className="font-mono text-[8.5px] tracking-[.16em] text-haze">{f.label}</div>
                  <div className="mt-1 text-[14px] text-white">{f.value}</div>
                </div>
              ))}
            </div>
            <div className="mb-6 grid gap-3 border border-haze/15 p-4 md:grid-cols-2">
              <div>
                <div className="font-mono text-[8.5px] tracking-[.16em] text-cyan">KEPUTUSAN AI · {ai.system}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white">{ai.output}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-haze">Dasar: {ai.basis} · Keyakinan {ai.confidence}</p>
              </div>
              <div className="border-l border-haze/15 pl-4">
                <div className="font-mono text-[8.5px] tracking-[.16em] text-gold">MANFAAT SISTEM INI</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#e3ebf3]">{ai.benefit}</p>
                <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-haze">AI tidak selalu salah. Tugasmu menilai, bukan menyalahkan.</p>
              </div>
            </div>
            <div className="grid items-end gap-5 border-t border-haze/15 pt-5 md:grid-cols-[210px_1fr]">
              <Character name={dlg.line.character} state={dlg.line.state} />
              <DialogueBox line={dlg.line} index={dlg.index} total={dlg.total} isLast={dlg.isLast}
                nextLabel="BUKA PAPAN BUKTI ▸" onNext={dlg.next} onSkip={dlg.skip} />
            </div>
          </div>
        )}

        {g.phase === "evidence" && (
          <div className="flex flex-col gap-5">
            <EvidenceBoard evidence={evidence} scanned={p.scanned} onScan={(eid) => g.scan(gameCase.evidence_set, eid)} />
            <Button variant="cyan" disabled={!ready} onClick={() => g.setPhase("interview")} className="self-start">
              {ready ? "LANJUT KE INTEROGASI ▸" : `PINDAI MINIMAL ${g.config.thresholds.min_evidence_to_analyse} BERKAS`}
            </Button>
          </div>
        )}

        {g.phase === "interview" && (
          <div className="flex flex-col gap-5">
            <AIChat chat={p.chat} questions={getInterview(gameCase.interview_set)} asked={p.asked}
              playerName={playerName} onAsk={(qid) => g.ask(gameCase, qid)} />
            <Button variant="cyan" onClick={() => g.setPhase("analysis")} className="self-start">LANJUT KE MEJA ANALISIS ▸</Button>
          </div>
        )}

        {g.phase === "analysis" && (
          <div className="border border-gold/25 bg-navy/60 p-6 md:p-7">
            <div className="font-mono text-[9px] tracking-[.2em] text-gold">MEJA ANALISIS · RANGKAI BUKTI</div>
            <p className="mb-1.5 mt-3 text-[15.5px] leading-relaxed text-[#e3ebf3]">{gameCase.analysis.prompt}</p>
            <div className="mb-5 font-mono text-[10px] text-haze">DIPILIH {p.picks.length} / {gameCase.analysis.pick}</div>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {scanned.map((e) => {
                const on = p.picks.includes(e.id);
                const right = p.analysisSubmitted && gameCase.analysis.key.includes(e.id);
                const wrong = p.analysisSubmitted && on && !right;
                return (
                  <button key={e.id} onClick={() => g.togglePick(e.id, gameCase.analysis.pick)}
                    className={`flex flex-col gap-2 border p-3.5 text-left ${right ? "border-cyan bg-cyan/[.08] text-white" : wrong ? "border-[#e07a7a] text-white" : on ? "border-gold bg-gold/10 text-white" : "border-haze/20 bg-white/[.02] text-haze"}`}>
                    <span className="font-mono text-[8.5px] tracking-[.14em] opacity-70">{e.type}</span>
                    <span className="font-display text-[12.5px] font-bold tracking-[.05em]">{e.title}</span>
                    <span className="text-[12px] leading-snug opacity-85">{e.finding}</span>
                  </button>
                );
              })}
            </div>
            {p.analysisSubmitted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 border border-cyan/30 bg-cyan/[.06] p-[18px]">
                <div className="font-mono text-[9px] tracking-[.18em] text-cyan">RANTAI KESIMPULAN</div>
                <p className="mb-0 mt-2.5 text-[15px] leading-relaxed text-white">{gameCase.analysis.conclusion}</p>
              </motion.div>
            )}
            <div className="mt-5">
              {p.analysisSubmitted
                ? <Button onClick={() => navigate(`/case/${gameCase.id}/verdict`)}>LANJUT KE RUANG PUTUSAN ▸</Button>
                : <Button disabled={p.picks.length !== gameCase.analysis.pick} onClick={() => g.lockAnalysis(gameCase)}>KUNCI ANALISIS</Button>}
            </div>
          </div>
        )}

        {g.phase === "verdict" && (
          <div className="flex flex-col gap-4 border border-gold/30 bg-gold/[.05] p-6">
            <div className="font-mono text-[9px] tracking-[.2em] text-gold">SIAP MEMUTUS</div>
            <p className="text-[15px] leading-relaxed text-[#e3ebf3]">{getVerdict(gameCase.verdict_set).question}</p>
            <Button className="self-start" onClick={() => navigate(`/case/${gameCase.id}/verdict`)}>MASUK RUANG PUTUSAN ▸</Button>
          </div>
        )}
      </div>

      <aside className="sticky top-5 flex flex-col gap-[18px] border border-haze/20 bg-[#061222]/70 p-[18px]">
        <div>
          <div className="font-mono text-[9px] tracking-[.2em] text-gold">DOSIR ANALIS</div>
          <div className="mt-2 font-display text-[14px]">{playerName}</div>
        </div>
        <div>
          <div className="mb-2.5 font-mono text-[9px] tracking-[.2em] text-cyan">BUKTI TERKUMPUL · {scanned.length}/{evidence.length}</div>
          <div className="flex flex-col gap-1.5">
            {scanned.length === 0 && <div className="font-mono text-[10px] leading-relaxed text-haze/60">Belum ada bukti dipindai.</div>}
            {scanned.map((e) => (
              <div key={e.id} className="flex items-baseline gap-2 border-l-2 border-cyan/50 pl-2.5 text-[12px] text-[#d7e2ee]">
                <span className="font-mono text-[9px] text-cyan">{e.impact === "HIGH" ? "★" : "•"}</span>
                <span>{e.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2.5 font-mono text-[9px] tracking-[.2em] text-gold">WAWASAN TERBUKA</div>
          <div className="flex flex-col gap-1.5">
            {insights.length === 0 && <div className="font-mono text-[10px] leading-relaxed text-haze/60">Interogasi LUMA untuk membuka wawasan.</div>}
            {insights.map((m, i) => (
              <div key={i} className="border border-gold/25 bg-gold/[.09] px-2.5 py-2 text-[12px] leading-snug text-white">{m.unlock}</div>
            ))}
          </div>
        </div>
        <button onClick={() => navigate("/cases")} className="mt-auto border border-haze/25 py-2.5 font-mono text-[9.5px] tracking-[.16em] text-haze hover:text-white">
          ← KELUAR KE ARSIP KASUS
        </button>
      </aside>
    </motion.section>
  );
}
