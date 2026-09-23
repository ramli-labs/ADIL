import { motion } from "framer-motion";
import type { Evidence } from "../../types";

const impactColor = (impact: Evidence["impact"]) =>
  impact === "HIGH" ? "#D4AF37" : impact === "MEDIUM" ? "#00D9FF" : "#AAB7C4";

export default function EvidenceCard({
  evidence, scanned, showConcept = true, onScan
}: { evidence: Evidence; scanned: boolean; showConcept?: boolean; onScan: () => void }) {
  const color = impactColor(evidence.impact);
  return (
    <motion.button
      layout
      type="button"
      whileHover={{ y: -3 }}
      onClick={onScan}
      aria-label={scanned ? `${evidence.title} — sudah dipindai` : `Pindai berkas ${evidence.title}`}
      className={`w-full cursor-pointer border p-4.5 p-[18px] text-left ${scanned ? "border-cyan/45 bg-gradient-to-br from-cyan/[.09] to-navy/50" : "border-haze/20 bg-white/[.02]"}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[12px] tracking-[.16em] text-haze">{evidence.type}</span>
        <span className="border px-1.5 py-0.5 font-mono text-[12px] tracking-[.14em]" style={{ color, borderColor: `${color}55` }}>
          IMPACT {evidence.impact}
        </span>
      </div>
      <h4 className="mb-2 mt-3 font-display text-[13.5px] font-bold tracking-[.06em] text-white">{evidence.title}</h4>
      <p className="m-0 text-[13px] leading-relaxed text-haze">{evidence.description}</p>
      {scanned ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3.5 border-t border-dashed border-cyan/30 pt-3">
          <div className="font-mono text-[12px] tracking-[.16em] text-cyan">TEMUAN</div>
          <p className="mb-0 mt-1.5 text-[13.5px] leading-snug text-white">{evidence.finding}</p>
          {showConcept && <p className="mb-0 mt-2.5 font-mono text-[12px] leading-relaxed text-gold">KONSEP: {evidence.learningConcept}</p>}
        </motion.div>
      ) : (
        <div className="mt-3.5 font-mono text-[12px] tracking-[.16em] text-cyan">▸ PINDAI BERKAS</div>
      )}
    </motion.button>
  );
}
