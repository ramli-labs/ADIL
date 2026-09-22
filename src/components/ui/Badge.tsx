import { motion } from "framer-motion";
import type { BadgeDef } from "../../types";

export default function Badge({ badge, owned }: { badge: BadgeDef; owned: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className={`p-5 border ${owned ? "border-gold bg-gradient-to-br from-gold/15 to-transparent text-gold" : "border-haze/20 bg-white/[.02] text-haze/70"}`}>
      <div className="mb-4 h-6 w-6 rotate-45 border-[1.5px] border-current" />
      <div className="font-display text-[13px] font-bold tracking-[.06em]">{badge.label}</div>
      <p className="mt-2 text-[12.5px] leading-relaxed opacity-85">{badge.desc}</p>
      <div className="mt-3 font-mono text-[9px] tracking-[.16em]">{owned ? "TERBUKA" : "TERKUNCI"}</div>
    </motion.div>
  );
}
