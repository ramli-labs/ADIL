import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getEvidence } from "../engine/content";
import { useGame } from "../engine/gameState";

export default function CaseSelection() {
  const navigate = useNavigate();
  const { cases, save, isUnlocked, startCase, getLearning } = useGame();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col gap-7 px-7 py-10 md:px-14">
      <div>
        <div className="font-mono text-[10px] tracking-[.22em] text-cyan">PILIH BERKAS SIDANG</div>
        <h2 className="mt-2.5 font-display text-[clamp(26px,4vw,42px)] font-bold tracking-[.04em]">ARSIP KASUS AKTIF</h2>
      </div>
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {cases.map((c, i) => {
          const record = save.cases[c.id];
          const unlocked = isUnlocked(c.id);
          const learning = getLearning(c.learning_ref);
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`flex flex-col border p-5 ${unlocked ? "border-cyan/25 bg-gradient-to-b from-cyan/[.07] to-navy/50" : "border-haze/15 bg-white/[.015] opacity-60"}`}>
              <div className="flex items-center justify-between gap-2.5">
                <span className="font-mono text-[9.5px] tracking-[.16em] text-gold">{c.case_code}</span>
                <span className={`border px-2 py-1 font-mono text-[9px] tracking-[.14em] ${record ? "border-gold/50 text-gold" : unlocked ? "border-cyan/45 text-cyan" : "border-haze/25 text-haze/60"}`}>
                  {record ? `SKOR ${record.total}` : unlocked ? "TERBUKA" : "TERKUNCI"}
                </span>
              </div>
              <h3 className="mb-1 mt-3.5 font-display text-[17px] font-bold leading-snug tracking-[.04em] text-white">{c.title}</h3>
              <div className="font-mono text-[9.5px] text-haze">{c.title_en}</div>
              <div className="my-4 flex flex-wrap gap-2">
                <span className="border border-cyan/30 px-2 py-1 font-mono text-[9px] tracking-[.12em] text-cyan">{c.topic}</span>
                <span className="border border-haze/25 px-2 py-1 font-mono text-[9px] tracking-[.12em] text-haze">{c.difficulty}</span>
                <span className="border border-haze/25 px-2 py-1 font-mono text-[9px] tracking-[.12em] text-haze">{getEvidence(c.evidence_set).length} BERKAS</span>
              </div>
              <p className="mb-4 text-pretty text-[13.5px] leading-relaxed text-haze">{c.briefing.slice(0, 120)}…</p>
              <div className="mb-5 font-mono text-[9.5px] leading-relaxed text-haze/70">{learning?.duration} · {learning?.principle}</div>
              <button disabled={!unlocked} onClick={() => { startCase(c.id); navigate(`/case/${c.id}`); }}
                className={`mt-auto flex items-center justify-center gap-2 py-3.5 font-display text-[11px] font-bold tracking-[.14em] ${unlocked ? "bg-cyan text-navy hover:brightness-110" : "cursor-not-allowed bg-haze/10 text-haze/60"}`}>
                {!unlocked && <Lock className="h-3.5 w-3.5" />}
                {unlocked ? (record ? "BUKA ULANG SIDANG" : "MULAI INVESTIGASI ▸") : "SELESAIKAN SIDANG SEBELUMNYA"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
