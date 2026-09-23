import { GraduationCap, Scale, Settings, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGame } from "../../engine/gameState";
import SettingsModal from "./SettingsModal";

export default function Hud() {
  const { justiceScore, audioOn, toggleAudio, getCase, config } = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const active = getCase(id);
  const context = active && pathname.startsWith("/case") ? `${active.case_code} · ${active.topic}` : `ADIL ACADEMY · SESI ${config.game.year_setting}`;

  return (
    <header className="glass relative z-20 flex flex-wrap items-center gap-4 border-b border-cyan/15 px-6 py-3.5">
      <Link to="/" className="flex min-h-[44px] items-center gap-3">
        <span className="grid h-[30px] w-[30px] rotate-45 place-items-center border-[1.5px] border-gold">
          <Scale className="h-3 w-3 -rotate-45 text-cyan" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-[19px] font-black tracking-[.3em] text-white">ADIL</span>
          <span className="mt-1 font-mono text-[12px] tracking-[.22em] text-haze">{config.game.subtitle.toUpperCase()}</span>
        </span>
      </Link>
      <div className="flex-1" />
      <span className="font-mono text-[12px] tracking-[.16em] text-haze">{context}</span>
      <div className="flex items-center gap-2.5 border border-gold/35 bg-gold/[.07] px-3 py-1.5">
        <span className="font-mono text-[12px] tracking-[.18em] text-gold">JUSTICE SCORE</span>
        <span className="font-display text-[15px] font-bold">{justiceScore}</span>
      </div>
      <Link to="/teacher" className="flex min-h-[44px] items-center gap-2 border border-nara/35 px-3 py-2 font-mono text-[12px] tracking-[.16em] text-nara hover:bg-nara/10">
        <GraduationCap className="h-3.5 w-3.5" /> GURU
      </Link>
      <button onClick={toggleAudio} className="flex min-h-[44px] items-center gap-2 border border-haze/30 px-3 py-2 font-mono text-[12px] tracking-[.16em] text-haze hover:border-cyan hover:text-cyan">
        {audioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        {audioOn ? "AUDIO ON" : "AUDIO OFF"}
      </button>
      <button onClick={() => setSettingsOpen(true)} aria-label="Pengaturan"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 border border-haze/30 px-3 py-2 text-haze hover:border-cyan hover:text-cyan">
        <Settings className="h-3.5 w-3.5" />
      </button>
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}
    </header>
  );
}
