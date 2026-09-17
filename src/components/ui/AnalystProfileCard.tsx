import { motion } from "framer-motion";
import type { AxisScores } from "../../engine/endingEngine";
import type { ProfileDef } from "../../types";

const AXIS_LABEL: Record<keyof AxisScores, string> = {
  evidence: "KETELITIAN BUKTI",
  inquiry: "KEBERANIAN BERTANYA",
  reasoning: "KETEPATAN PENALARAN",
  ethics: "KUALITAS PUTUSAN ETIS"
};

/** Profil analis — ditentukan cara bermain, bukan sekadar jawaban benar. */
export default function AnalystProfileCard({ profile }: { profile: ProfileDef & { axes: AxisScores } }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="border border-gold/35 bg-gradient-to-br from-gold/10 to-transparent p-6">
      <div className="font-mono text-[9px] tracking-[.22em] text-gold">PROFIL ANALIS</div>
      <div className="mt-3 font-display text-[22px] font-black tracking-[.05em] text-white">{profile.label}</div>
      <p className="mt-2.5 text-[14px] leading-relaxed text-[#e3ebf3]">{profile.desc}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-cyan">{profile.advice}</p>
      <div className="mt-5 flex flex-col gap-2.5">
        {(Object.keys(AXIS_LABEL) as (keyof AxisScores)[]).map((k) => (
          <div key={k}>
            <div className="flex justify-between font-mono text-[9.5px] tracking-[.14em] text-haze">
              <span>{AXIS_LABEL[k]}</span><span className="text-white">{Math.round(profile.axes[k] * 100)}%</span>
            </div>
            <div className="mt-1 h-1.5 bg-haze/20">
              <div className="h-full bg-gold transition-all" style={{ width: `${Math.round(profile.axes[k] * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
