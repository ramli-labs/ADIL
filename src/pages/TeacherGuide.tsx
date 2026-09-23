import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { learning } from "../engine/content";
import { useGame } from "../engine/gameState";

/** Halaman guru — seluruh isinya dibaca dari data/learning.json. */
export default function TeacherGuide() {
  const navigate = useNavigate();
  const { cases, save, getLearning, profile } = useGame();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col gap-7 px-7 py-10 md:px-14">
      <div>
        <div className="font-mono text-[12px] tracking-[.22em] text-nara">MODE GURU</div>
        <h2 className="mt-2.5 font-display text-[clamp(24px,4vw,40px)] font-bold">PANDUAN PEMBELAJARAN ADIL</h2>
        <p className="mt-3 max-w-[70ch] text-[14.5px] leading-relaxed text-haze">{learning.meta.competency}</p>
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-[12px] tracking-[.14em] text-haze">
          <span className="border border-haze/25 px-2.5 py-1.5">{learning.meta.curriculum}</span>
          <span className="border border-haze/25 px-2.5 py-1.5">{learning.meta.grade}</span>
          <span className="border border-haze/25 px-2.5 py-1.5">{learning.meta.total_duration}</span>
        </div>
      </div>

      <div className="border border-gold/30 bg-gold/[.06] p-5">
        <div className="font-mono text-[12px] tracking-[.2em] text-gold">RINGKASAN PROFIL SISWA (SESI PERANGKAT INI)</div>
        <div className="mt-2.5 font-display text-[18px] font-black">{profile.label}</div>
        <p className="mt-2 text-[14px] leading-relaxed text-[#e3ebf3]">{profile.desc}</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-cyan">{profile.advice}</p>
      </div>

      <div className="flex flex-col gap-4">
        {cases.map((c) => {
          const l = getLearning(c.learning_ref);
          const r = save.cases[c.id];
          return (
            <div key={c.id} className="border border-haze/20 p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-[12px] tracking-[.16em] text-gold">{c.case_code}</span>
                <span className="font-display text-[15px] font-bold">{c.title}</span>
                <span className="font-mono text-[12px] text-haze">{l.duration} · {l.principle}</span>
                <span className="ml-auto font-mono text-[12px] text-cyan">{r ? `SKOR ${r.total}` : "BELUM DIKERJAKAN"}</span>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div>
                  <div className="font-mono text-[12px] tracking-[.18em] text-cyan">TUJUAN PEMBELAJARAN</div>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-[#e3ebf3]">
                    {l.objectives.map((o) => <li key={o} className="border-l-2 border-cyan/40 pl-2.5">{o}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[12px] tracking-[.18em] text-cyan">PERTANYAAN REFLEKSI</div>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13px] leading-relaxed text-[#e3ebf3]">
                    {l.reflection_questions.map((q) => <li key={q}>{q}</li>)}
                  </ol>
                </div>
                <div>
                  <div className="font-mono text-[12px] tracking-[.18em] text-cyan">AKTIVITAS KELAS</div>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-[#e3ebf3]">
                    {l.discussion_prompts.map((p) => <li key={p} className="border-l-2 border-nara/40 pl-2.5">{p}</li>)}
                  </ul>
                  <div className="mt-2.5 border border-gold/25 bg-gold/[.07] p-2.5 text-[12.5px] leading-relaxed text-white">
                    TUGAS: {l.reflection_activity}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="cyan" onClick={() => window.print()}>CETAK PANDUAN</Button>
        <Button variant="ghost" onClick={() => navigate("/cases")}>← KEMBALI KE ARSIP KASUS</Button>
      </div>
    </motion.section>
  );
}
