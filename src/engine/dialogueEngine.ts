/**
 * dialogueEngine — mengurutkan baris dialog, memicu suara, menyediakan subtitle & skip.
 * Kunci audio: line.audioFile bila ada, jika tidak `line_<n>`.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DialogueLine } from "../types";
import { audioEngine } from "./audioEngine";

export function useDialogue(lines: DialogueLine[], onFinish?: () => void) {
  const [index, setIndex] = useState(0);
  const key = useMemo(() => lines.map((l) => l.text).join("|"), [lines]);

  useEffect(() => { setIndex(0); }, [key]);

  useEffect(() => {
    const line = lines[index];
    if (line) audioEngine.speak(line.character, line.audioFile ?? `line_${index + 1}`);
  }, [key, index]);

  const next = useCallback(() => {
    audioEngine.playSfx("click");
    if (index + 1 < lines.length) setIndex(index + 1);
    else { audioEngine.stopVoice(); onFinish?.(); }
  }, [index, lines.length, onFinish]);

  const skip = useCallback(() => { audioEngine.stopVoice(); audioEngine.playSfx("click"); onFinish?.(); }, [onFinish]);

  return { line: lines[index] ?? null, index, total: lines.length, isLast: index + 1 >= lines.length, next, skip };
}
