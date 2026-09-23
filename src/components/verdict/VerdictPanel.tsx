import { motion } from "framer-motion";
import type { VerdictOption } from "../../types";

export default function VerdictPanel({
  question, options, onPick
}: { question: string; options: VerdictOption[]; onPick: (o: VerdictOption) => void }) {
  return (
    <div>
      <div className="border border-gold/40 bg-gradient-to-br from-gold/10 to-navy/70 p-6 md:p-8">
        <div className="font-mono text-[12px] tracking-[.22em] text-gold">RUANG PUTUSAN</div>
        <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-white md:text-[24px]">{question}</h3>
        <p className="mt-2.5 font-mono text-[12px] text-haze">Putusanmu menentukan skor etika. Tidak ada tombol undo.</p>
      </div>
      <div className="mt-3.5 flex flex-col gap-3">
        {options.map((o, i) => (
          <motion.button key={o.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            whileHover={{ x: 4 }} onClick={() => onPick(o)}
            className="flex items-center gap-4 border border-gold/25 bg-white/[.025] p-[18px] text-left hover:border-gold/60">
            <span className="shrink-0 font-display text-[18px] font-black text-gold">{o.label}</span>
            <span className="text-[14.5px] leading-relaxed text-[#e3ebf3]">{o.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
