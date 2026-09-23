import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { CaseDef, CaseRecord, LearningCase } from "../../types";
import { tierLabel } from "../../engine/endingEngine";

/**
 * Layer guru — tampil setelah putusan.
 * Isinya murni dari data/learning.json; tidak ada teks pedagogis di dalam kode.
 */
export default function TeacherPanel({
  gameCase, learning, record
}: { gameCase: CaseDef; learning: LearningCase; record: CaseRecord }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="border border-nara/40 bg-nara/[.06] p-6">
      <div className="flex flex-wrap items-center gap-3">
        <GraduationCap className="h-4 w-4 text-nara" />
        <span className="font-mono text-[12px] tracking-[.22em] text-nara">RINGKASAN DISKUSI GURU</span>
        <span className="ml-auto font-mono text-[12px] tracking-[.16em] text-haze">{learning.duration} · {gameCase.case_code}</span>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <h4 className="font-mono text-[12px] tracking-[.18em] text-gold">ISU KASUS</h4>
          <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-[#e3ebf3]">
            {gameCase.ethical_issues.map((i) => <li key={i} className="border-l-2 border-gold/40 pl-3">{i}</li>)}
          </ul>

          <h4 className="mt-5 font-mono text-[12px] tracking-[.18em] text-gold">TUJUAN PEMBELAJARAN</h4>
          <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-[#e3ebf3]">
            {learning.objectives.map((o) => <li key={o} className="border-l-2 border-cyan/40 pl-3">{o}</li>)}
          </ul>

          <h4 className="mt-5 font-mono text-[12px] tracking-[.18em] text-gold">PRINSIP ETIKA AI</h4>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white">{learning.principle} — {learning.takeaway}</p>
        </div>

        <div>
          <h4 className="font-mono text-[12px] tracking-[.18em] text-gold">PENALARAN SISWA (SESI INI)</h4>
          <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-[12px] text-haze">
            <div className="border border-haze/20 p-2.5">BUKTI RELEVAN<br /><span className="text-white">{record.relFound}/{record.relTotal}</span></div>
            <div className="border border-haze/20 p-2.5">PERTANYAAN<br /><span className="text-white">{record.asked}/{record.askTotal}</span></div>
            <div className="border border-haze/20 p-2.5">BUKTI KUNCI<br /><span className="text-white">{record.correctPicks}/{record.pickTotal}</span></div>
            <div className="border border-haze/20 p-2.5">PUTUSAN<br /><span className="text-white">{tierLabel(record.tier)}</span></div>
          </div>

          <h4 className="mt-5 font-mono text-[12px] tracking-[.18em] text-gold">PERTANYAAN REFLEKSI</h4>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-[13.5px] leading-relaxed text-[#e3ebf3]">
            {learning.reflection_questions.map((q) => <li key={q}>{q}</li>)}
          </ol>

          <h4 className="mt-5 font-mono text-[12px] tracking-[.18em] text-gold">AKTIVITAS DISKUSI KELAS</h4>
          <ul className="mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-[#e3ebf3]">
            {learning.discussion_prompts.map((p) => <li key={p} className="border-l-2 border-nara/40 pl-3">{p}</li>)}
          </ul>

          <h4 className="mt-5 font-mono text-[12px] tracking-[.18em] text-gold">TUGAS REFLEKSI</h4>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white">{learning.reflection_activity}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-nara/25 pt-4">
        <h4 className="font-mono text-[12px] tracking-[.18em] text-gold">MISKONSEPSI YANG SERING MUNCUL</h4>
        <div className="mt-2 grid gap-2.5 md:grid-cols-2">
          {learning.misconceptions.map((m) => (
            <div key={m.wrong} className="border border-haze/20 p-3 text-[13px] leading-relaxed">
              <div className="text-[#e07a7a]">✕ {m.wrong}</div>
              <div className="mt-1.5 text-cyan">✓ {m.right}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
