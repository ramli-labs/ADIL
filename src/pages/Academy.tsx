import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Character from "../components/character/Character";
import DialogueBox from "../components/character/DialogueBox";
import { useDialogue } from "../engine/dialogueEngine";
import { useGame } from "../engine/gameState";

export default function Academy() {
  const navigate = useNavigate();
  const { academyIntro } = useGame();
  const dlg = useDialogue(academyIntro, () => navigate("/cases"));
  if (!dlg.line) return null;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-1 flex-col gap-6 px-7 py-10 md:px-14">
      <div className="font-mono text-[10px] tracking-[.22em] text-cyan">ADIL ACADEMY · ORIENTASI ANALIS</div>
      <div className="grid flex-1 items-end gap-7 md:grid-cols-[300px_1fr]">
        <Character name={dlg.line.character} state={dlg.line.state} />
        <DialogueBox line={dlg.line} index={dlg.index} total={dlg.total} isLast={dlg.isLast}
          nextLabel="MASUK ARSIP KASUS ▸" onNext={dlg.next} onSkip={dlg.skip} />
      </div>
    </motion.section>
  );
}
