import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnalystProfileCard from "../components/ui/AnalystProfileCard";
import Button from "../components/ui/Button";
import ScoreBoard from "../components/ui/ScoreBoard";
import TeacherPanel from "../components/teacher/TeacherPanel";
import { getDialogue, getVerdict } from "../engine/content";
import { audioEngine } from "../engine/audioEngine";
import { badgeById, tierLabel } from "../engine/endingEngine";
import { useGame } from "../engine/gameState";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const g = useGame();
  const gameCase = g.getCase(id);
  const record = gameCase ? g.save.cases[gameCase.id] : undefined;
  const closing = gameCase ? getDialogue(gameCase.ending_dialogue)[0] : undefined;

  // Putar suara penutup (mis. Prof. Nara) sekali saat layar hasil tampil.
  useEffect(() => {
    if (closing) audioEngine.speak(closing.character, closing.audioFile ?? "line_1");
    return () => audioEngine.stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing?.text]);

  if (!gameCase || !record) return null;

  const option = getVerdict(gameCase.verdict_set).options.find((o) => o.id === (g.progress?.verdictId ?? record.verdict));
  const learning = g.getLearning(gameCase.learning_ref);
  const nextCase = g.cases[g.cases.findIndex((c) => c.id === gameCase.id) + 1];

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col gap-6 px-7 py-10 md:px-14">
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <div className="font-mono text-[12px] tracking-[.22em] text-cyan">PUTUSAN TERCATAT · {gameCase.case_code}</div>
          <h2 className="mb-1 mt-3 font-display text-[clamp(30px,5vw,52px)] font-black tracking-[.03em]">{tierLabel(record.tier)}</h2>
          <div className="mb-5 font-display text-[15px] tracking-[.1em] text-gold">{gameCase.title}</div>
          <div className="mb-5 flex items-baseline gap-3.5 border-y border-gold/30 py-[18px]">
            <span className="font-display text-[60px] font-black leading-none text-gold">{record.total}</span>
            <span className="font-mono text-[12px] leading-relaxed tracking-[.18em] text-haze">JUSTICE SCORE<br />SIDANG INI (MAKS 100)</span>
          </div>
          <ScoreBoard record={record} config={g.config} />
        </motion.div>

        <div className="flex flex-col gap-4">
          {option && (
            <div className="border border-cyan/25 bg-cyan/[.06] p-5">
              <div className="font-mono text-[12px] tracking-[.2em] text-cyan">EVALUASI PUTUSANMU</div>
              <p className="mb-0 mt-2.5 text-[15px] leading-relaxed text-white">{option.feedback}</p>
            </div>
          )}
          <div className="border border-gold/30 bg-gold/[.06] p-5">
            <div className="font-mono text-[12px] tracking-[.2em] text-gold">PELAJARAN KASUS · {learning.principle}</div>
            <p className="mb-0 mt-2.5 text-[15px] leading-relaxed text-white">{learning.takeaway}</p>
          </div>
          {closing && (
            <div className="border border-nara/30 bg-nara/[.05] p-5">
              <div className="font-display text-[13px] font-bold tracking-[.1em] text-nara">
                {closing.character} · {g.characters[closing.character]?.role}
              </div>
              <p className="mb-0 mt-2 text-[14.5px] leading-relaxed text-[#e3ebf3]">{closing.text}</p>
            </div>
          )}
          {g.newBadges.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7 }} className="border border-gold bg-gradient-to-br from-gold/20 to-transparent p-5">
              <div className="font-mono text-[12px] tracking-[.22em] text-gold">LENCANA TERBUKA</div>
              {g.newBadges.map((bid) => {
                const b = badgeById(bid);
                return b ? (
                  <div key={bid} className="mt-3">
                    <div className="font-display text-[18px] font-black tracking-[.06em]">{b.label}</div>
                    <div className="mt-1 text-[13.5px] leading-relaxed text-[#e3ebf3]">{b.desc}</div>
                  </div>
                ) : null;
              })}
            </motion.div>
          )}
          {g.ending && (
            <div className="border border-nara/40 bg-nara/[.08] p-5">
              <div className="font-mono text-[12px] tracking-[.22em] text-nara">SELURUH SIDANG SELESAI</div>
              <div className="mb-1.5 mt-2.5 font-display text-[18px] font-black tracking-[.05em]">{g.ending.title}</div>
              <p className="mb-0 text-[14px] leading-relaxed text-[#e3ebf3]">{g.ending.text}</p>
            </div>
          )}
          <AnalystProfileCard profile={g.profile} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-y border-haze/15 py-4">
        <label className="flex cursor-pointer items-center gap-2.5 font-mono text-[12px] tracking-[.16em] text-haze">
          <input type="checkbox" checked={g.save.teacherMode} onChange={(e) => g.setTeacherMode(e.currentTarget.checked)}
            className="h-3.5 w-3.5 accent-[#C7A6FF]" />
          MODE GURU — tampilkan ringkasan diskusi
        </label>
      </div>

      {g.save.teacherMode && <TeacherPanel gameCase={gameCase} learning={learning} record={record} />}

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => { if (nextCase) { g.startCase(nextCase.id); navigate(`/case/${nextCase.id}`); } else navigate("/profile"); }}>
          {nextCase ? `SIDANG BERIKUTNYA: ${nextCase.title_en.toUpperCase()} ▸` : "LIHAT PROFIL AKHIR ▸"}
        </Button>
        <Button variant="ghost" onClick={() => { g.startCase(gameCase.id); navigate(`/case/${gameCase.id}`); }}>ULANG SIDANG INI</Button>
        <Button variant="ghost" onClick={() => navigate("/profile")}>PROFIL ANALIS</Button>
      </div>
    </motion.section>
  );
}
