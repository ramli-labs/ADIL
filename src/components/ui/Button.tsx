import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { audioEngine } from "../../engine/audioEngine";

type Variant = "gold" | "cyan" | "ghost";
const styles: Record<Variant, string> = {
  gold: "bg-gradient-to-br from-gold to-[#f0d576] text-navy hover:brightness-110",
  cyan: "bg-cyan text-navy hover:brightness-110",
  ghost: "border border-haze/30 text-haze hover:border-cyan hover:text-cyan"
};

export default function Button({
  children, onClick, variant = "gold", disabled, className = ""
}: { children: ReactNode; onClick?: () => void; variant?: Variant; disabled?: boolean; className?: string }) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      disabled={disabled}
      onClick={() => { if (disabled) return; audioEngine.playSfx("click"); onClick?.(); }}
      className={`font-display text-[12px] font-bold tracking-[.18em] px-7 py-4 transition disabled:cursor-not-allowed disabled:bg-haze/10 disabled:text-haze/50 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
