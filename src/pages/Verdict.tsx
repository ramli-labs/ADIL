import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import VerdictPanel from "../components/verdict/VerdictPanel";
import { getVerdict } from "../engine/content";
import { useGame } from "../engine/gameState";

export default function Verdict() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCase, submitVerdict } = useGame();
  const gameCase = getCase(id);
  if (!gameCase) return null;
  const set = getVerdict(gameCase.verdict_set);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-4xl px-7 py-10 md:px-10">
      <VerdictPanel question={set.question} options={set.options}
        onPick={(o) => { submitVerdict(gameCase, o); navigate(`/case/${gameCase.id}/result`); }} />
    </motion.section>
  );
}
