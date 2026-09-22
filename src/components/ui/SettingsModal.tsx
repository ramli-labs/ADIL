import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../engine/gameState";

function ToggleRow({ label, help, checked, onChange }: { label: string; help: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border border-haze/15 bg-white/[.02] px-4 py-3.5">
      <span>
        <span className="block font-display text-[12.5px] font-bold tracking-[.05em] text-white">{label}</span>
        <span className="mt-1 block font-mono text-[10px] leading-relaxed text-haze">{help}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 flex-none accent-cyan" />
    </label>
  );
}

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { audioOn, setSound, narrationOn, setNarration, reducedMotion, setReducedMotion, resetSave } = useGame();
  const [confirmReset, setConfirmReset] = useState(false);
  const navigate = useNavigate();

  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/80 px-5 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md border border-cyan/25 bg-navy-panel p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between border-b border-haze/15 pb-4">
          <span className="font-display text-[15px] font-bold tracking-[.1em] text-white">PENGATURAN</span>
          <button onClick={onClose} aria-label="Tutup" className="text-haze hover:text-white">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <ToggleRow label="🔊 Efek suara & musik" help="Bunyi klik, pindai bukti, dan musik latar."
            checked={audioOn} onChange={setSound} />
          <ToggleRow label="🗣 Narasi suara" help="Subtitle tetap tampil meski narasi dimatikan."
            checked={narrationOn} onChange={setNarration} />
          <ToggleRow label="🎞 Kurangi animasi" help="Mematikan efek gerak untuk kenyamanan visual."
            checked={reducedMotion} onChange={setReducedMotion} />
        </div>

        <div className="mt-6 border-t border-haze/15 pt-5">
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)}
              className="w-full border border-[#e07a7a]/40 px-4 py-3 font-mono text-[10.5px] tracking-[.14em] text-[#e07a7a] hover:bg-[#e07a7a]/10">
              RESET SELURUH PROGRES
            </button>
          ) : (
            <div className="border border-[#e07a7a]/40 bg-[#e07a7a]/[.06] p-4">
              <p className="text-[13px] leading-relaxed text-white">
                Semua skor, badge, dan riwayat sidang akan dihapus permanen dari perangkat ini. Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="mt-3.5 flex gap-2.5">
                <button onClick={() => setConfirmReset(false)}
                  className="flex-1 border border-haze/30 px-3 py-2.5 font-mono text-[10px] tracking-[.14em] text-haze hover:text-white">
                  BATAL
                </button>
                <button
                  onClick={() => { resetSave(); setConfirmReset(false); onClose(); navigate("/"); }}
                  className="flex-1 border border-[#e07a7a] bg-[#e07a7a]/15 px-3 py-2.5 font-mono text-[10px] tracking-[.14em] text-[#e07a7a] hover:bg-[#e07a7a]/25">
                  YA, HAPUS SEMUA
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
