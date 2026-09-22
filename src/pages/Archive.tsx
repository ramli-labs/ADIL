import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { getEvidence, learning } from "../engine/content";
import { useGame } from "../engine/gameState";

export default function Archive() {
  const navigate = useNavigate();
  const { cases, save } = useGame();
  const entries = cases.filter((c) => save.cases[c.id])
    .flatMap((c) => getEvidence(c.evidence_set).map((e) => ({ code: c.case_code, ...e })));

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col gap-7 px-7 py-10 md:px-14">
      <div>
        <div className="font-mono text-[10px] tracking-[.22em] text-cyan">ARSIP BUKTI · KONSEP TERKUMPUL</div>
        <h2 className="mt-2.5 font-display text-[clamp(24px,4vw,40px)] font-bold">PERPUSTAKAAN KEADILAN AI</h2>
      </div>

      <div>
        <div className="mb-3 font-mono text-[10px] tracking-[.18em] text-gold">GLOSARIUM</div>
        <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
          {learning.glossary.map((g) => (
            <div key={g.term} className="border border-haze/20 p-3.5">
              <div className="font-display text-[12.5px] font-bold tracking-[.05em] text-cyan">{g.term}</div>
              <div className="mt-1.5 text-[13px] leading-relaxed text-haze">{g.def}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 font-mono text-[10px] tracking-[.18em] text-gold">BERKAS TERBUKA</div>
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {entries.length === 0 && (
            <div className="border border-dashed border-haze/30 p-6 font-mono text-[11px] leading-loose text-haze/70">
              ARSIP MASIH KOSONG.<br />Selesaikan satu sidang untuk mengisinya.
            </div>
          )}
          {entries.map((e) => (
            <div key={`${e.code}-${e.id}`} className="border border-cyan/20 bg-[#061426]/60 p-[18px]">
              <div className="font-mono text-[8.5px] tracking-[.16em] text-gold">{e.code} · {e.type}</div>
              <div className="mb-2 mt-2.5 font-display text-[13px] font-bold tracking-[.05em] text-white">{e.title}</div>
              <div className="text-[13px] leading-relaxed text-haze">{e.learningConcept}</div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="ghost" className="self-start" onClick={() => navigate("/")}>← KEMBALI KE LOBI</Button>
    </motion.section>
  );
}
