/**
 * audioEngine — BGM, SFX, dan suara karakter. Voice-ready:
 * bila file audio belum ada, game berjalan normal dengan subtitle saja (tanpa error).
 */
import { Howl } from "howler";
import { config, characters } from "./content";

const SFX: Record<string, string> = {
  click: "assets/audio/effects/ui_click.mp3",
  scan: "assets/audio/effects/evidence_scan.mp3",
  unlock: "assets/audio/effects/insight_unlock.mp3",
  verdict: "assets/audio/effects/verdict_gavel.mp3",
  badge: "assets/audio/effects/badge_unlock.mp3"
};

const AMBIENCE: Record<string, string> = {
  menu: "assets/audio/background/adil_theme.mp3",
  investigation: "assets/audio/background/investigation.mp3",
  verdict: "assets/audio/background/verdict.mp3"
};

class AudioEngine {
  private beds = new Map<string, Howl>();
  private currentBed: string | null = null;
  private voice: Howl | null = null;
  private sfx = new Map<string, Howl>();
  private unlocked = false;
  enabled = true;
  narrationEnabled = true;

  init() {
    Object.entries(SFX).forEach(([k, src]) => {
      this.sfx.set(k, new Howl({ src: [src], html5: true, volume: config.audio.sfx_volume, onloaderror: () => this.sfx.delete(k) }));
    });
    Object.entries(AMBIENCE).forEach(([k, src]) => {
      this.beds.set(k, new Howl({ src: [src], loop: true, html5: true, volume: config.audio.music_volume, onloaderror: () => this.beds.delete(k) }));
    });
  }

  /** Ganti ambience sesuai ruang (menu · investigation · verdict) dengan crossfade pendek. */
  setAmbience(key: keyof typeof AMBIENCE | string) {
    if (!this.enabled || !this.unlocked || this.currentBed === key) return;
    const next = this.beds.get(key);
    if (!next) return;
    const prev = this.currentBed ? this.beds.get(this.currentBed) : null;
    prev?.fade(prev.volume() as number, 0, 600);
    window.setTimeout(() => prev?.pause(), 620);
    next.volume(0);
    next.play();
    next.fade(0, config.audio.music_volume, 800);
    this.currentBed = key;
  }

  playSfx(kind: string) {
    if (!this.enabled) return;
    if (!this.unlocked) { this.unlocked = true; this.setAmbience(this.currentBed ?? "menu"); }
    this.sfx.get(kind)?.play();
  }

  /** Satu suara karakter sekaligus (config.audio.prevent_overlapping_voice). */
  speak(character: string, key: string) {
    if (config.audio.prevent_overlapping_voice) this.stopVoice();
    if (!this.narrationEnabled) return;
    const slug = characters[character]?.slug;
    if (!slug) return;
    const howl = new Howl({
      src: [`assets/audio/characters/${slug}/${key}.mp3`],
      html5: true,
      volume: config.audio.voice_volume,
      onloaderror: () => { if (this.voice === howl) this.voice = null; }
    });
    this.voice = howl;
    howl.play();
  }

  stopVoice() { this.voice?.stop(); this.voice = null; }

  setEnabled(on: boolean) {
    this.enabled = on;
    this.sfx.forEach((h) => h.mute(!on));
    this.beds.forEach((h) => h.mute(!on));
    const bed = this.currentBed ? this.beds.get(this.currentBed) : null;
    if (on) bed?.play(); else bed?.pause();
  }

  setNarrationEnabled(on: boolean) {
    this.narrationEnabled = on;
    if (!on) this.stopVoice();
  }
}

export const audioEngine = new AudioEngine();
export const characterSlug = (name: string) => characters[name]?.slug ?? "arya";
