import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "../../engine/gameState";

const tone = {
  good: "border-cyan/60 bg-cyan/15 text-white",
  warn: "border-gold/60 bg-gold/15 text-white",
  neutral: "border-haze/40 bg-navy/90 text-haze"
};

/**
 * Setiap aksi pemain memberi umpan balik terlihat.
 * Live region dipasang di pembungkus yang selalu ada — kalau role-nya ikut muncul-hilang
 * bersama toast, pembaca layar tidak sempat mendaftarkannya dan teksnya tak pernah diumumkan.
 */
export default function FeedbackToast() {
  const { feedback } = useGame();
  return (
    <div role="status" aria-live="polite">
      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border px-5 py-3 font-mono text-[11px] tracking-[.08em] backdrop-blur ${tone[feedback.tone]}`}>
            {feedback.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
