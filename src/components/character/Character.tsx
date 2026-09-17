import { motion } from "framer-motion";
import { useGame } from "../../engine/gameState";
import type { CharacterState } from "../../types";

/**
 * <Character name="ARYA" state="speaking" />
 * State: idle · speaking · explanation · warning · conclusion (lihat data/characters.json).
 * Sprite dimuat dari public/assets/characters/<slug>/<state>.png; bila belum ada,
 * kerangka holografik tetap tampil sehingga layout tidak pernah rusak.
 */
export default function Character({
  name, state = "idle", compact = false, className = ""
}: { name: string; state?: CharacterState | string; compact?: boolean; className?: string }) {
  const { characters } = useGame();
  const info = characters[name];
  const slug = info?.slug ?? "arya";
  const entrance = info?.animation.entrance ?? "slide-up";
  const initial = entrance === "hologram-materialize"
    ? { opacity: 0, scale: 0.94, filter: "blur(8px)" }
    : entrance === "fade-forward" ? { opacity: 0, scale: 1.03 } : { opacity: 0, y: 24 };

  return (
    <motion.div key={`${name}-${state}`} initial={initial} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className={`border border-cyan/20 bg-gradient-to-b from-cyan/[.08] to-transparent p-3 ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-panel">
        <img src={`/assets/characters/${slug}/${state}.png`} alt={`${name} — ${state}`}
          className="h-full w-full object-cover object-top"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }} />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,.07)_0_2px,transparent_2px_10px)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scanline bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
        {!compact && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-center font-mono text-[9px] text-haze/70">
            assets/characters/{slug}/{state}.png
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="font-display text-[14px] font-bold tracking-[.1em]" style={{ color: info?.accent }}>{name}</span>
        <span className="border border-cyan/35 px-2 py-1 font-mono text-[8.5px] tracking-[.14em] text-cyan">{String(state).toUpperCase()}</span>
      </div>
      {info && !compact && <div className="mt-1.5 font-mono text-[9.5px] text-haze">{info.expressions[String(state)] ?? info.role}</div>}
    </motion.div>
  );
}
