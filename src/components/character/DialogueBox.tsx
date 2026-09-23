import { motion } from "framer-motion";
import Button from "../ui/Button";
import type { DialogueLine } from "../../types";

/** Subtitle selalu tampil — audio opsional (lihat audioEngine). */
export default function DialogueBox({
  line, index, total, isLast, nextLabel, onNext, onSkip
}: {
  line: DialogueLine; index: number; total: number; isLast: boolean;
  nextLabel?: string; onNext: () => void; onSkip: () => void;
}) {
  return (
    <div className="border border-gold/30 bg-navy/80 p-6 backdrop-blur md:p-8">
      <div className="mb-3.5 font-mono text-[12px] tracking-[.2em] text-gold">TRANSKRIP SUARA · SUBTITLE AKTIF</div>
      <motion.p key={line.text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="m-0 min-h-[4.6em] text-pretty text-[17px] leading-relaxed text-white md:text-[22px]">
        {line.subtitle ?? line.text}
      </motion.p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="cyan" onClick={onNext}>{isLast ? (nextLabel ?? "SELESAI ▸") : "LANJUT ▸"}</Button>
        <button onClick={onSkip} className="border border-haze/30 px-5 py-3.5 font-mono text-[12px] tracking-[.16em] text-haze hover:text-white">
          LEWATI DIALOG
        </button>
        <span className="font-mono text-[12px] text-haze">{index + 1} / {total}</span>
      </div>
    </div>
  );
}
