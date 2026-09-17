# ADIL — DOKUMENTASI PROMPT AI (GAMBAR)

Prompt siap pakai untuk generator gambar (Midjourney · Firefly · Imagen · Stable Diffusion).
Setiap karakter memiliki **5 state**: idle · speaking · explanation · warning · conclusion.

## ATURAN GLOBAL — tempelkan di akhir setiap prompt
```
cinematic educational game character art, futuristic AI courtroom, palette midnight navy #081A33,
justice gold #D4AF37, AI cyan #00D9FF, soft rim light, volumetric haze, holographic reflections,
3/4 body, consistent head position and lighting across states, transparent background, 8k
```
Karakter **3:4** · Environment **16:9** · Negative: `text, watermark, logo, extra fingers, distorted face, low contrast`

> **Konsistensi antar state adalah yang terpenting.** Generate satu state dulu sebagai acuan,
> lalu pakai fitur character reference / seed yang sama untuk empat state sisanya.

---

## ARYA — Mentor Etika AI (`assets/characters/arya/`)
Basis (selalu disertakan):
```
Indonesian young male mentor, 28 years old, warm brown skin, short neat black hair, clean-shaven,
minimalist navy technology jacket with thin cyan light seams, holographic tablet, approachable posture
```
| STATE | TAMBAHAN PROMPT | FILE |
|---|---|---|
| idle | relaxed neutral expression, tablet lowered, calm stance | `idle.png` |
| speaking | mouth mid-sentence, open explaining hand gesture | `speaking.png` |
| explanation | pointing at floating data on the holographic tablet, engaged expression | `explanation.png` |
| warning | lowered eyebrows, firm eye contact, tablet showing a red flag indicator | `warning.png` |
| conclusion | affirming nod, slight smile, tablet closed, settled posture | `conclusion.png` |

## LUMA — Asisten Sistem AI (`assets/characters/luma/`)
LUMA **bukan** antagonis: netral dan tenang, tidak mengancam.
```
transparent cyan holographic AI avatar, genderless humanoid silhouette, glowing circuit patterns
beneath the surface, two soft light points as eyes, floating above a floor emitter, edge particles
```
| STATE | TAMBAHAN PROMPT | FILE |
|---|---|---|
| idle | stable symmetrical float, slow pulsing core | `idle.png` |
| speaking | waveform ripples across the chest, brighter core | `speaking.png` |
| explanation | body partially dissolving into rotating data rings and numerals | `explanation.png` |
| warning | denser opacity, colder deep-cyan tone, circuit patterns locked static | `warning.png` |
| conclusion | patterns converging into a single steady core, calm settled glow | `conclusion.png` |

## PROF. NARA — Penguji Etika AI (`assets/characters/prof_nara/`)
```
Indonesian female professor, 55 years old, dignified face, silver-streaked dark hair in an elegant bun,
structured deep navy techwear robe with gold woven trim, thin holographic reading visor, floating screens
```
| STATE | TAMBAHAN PROMPT | FILE |
|---|---|---|
| idle | composed posture, hands clasped, screens dimmed | `idle.png` |
| speaking | measured explaining gesture, warm authority | `speaking.png` |
| explanation | reading a floating document, head slightly tilted | `explanation.png` |
| warning | direct gaze at viewer, screens flaring gold | `warning.png` |
| conclusion | verdict moment, hand resting on the podium, screens settling to gold | `conclusion.png` |

---

## ENVIRONMENTS (`assets/environments/`)
| FILE | PROMPT |
|---|---|
| `home_courtroom.png` | grand futuristic AI courtroom from the analyst desk, tall holographic pillars, gold scales-of-justice hologram at center, empty seats in blue haze |
| `academy.png` | futuristic academy hall for young analysts, curved glass balconies, floating orientation holograms, gold accents on navy architecture |
| `archive_room.png` | records archive room, walls of glowing document panels, dust motes in cyan light, central scanning table |
| `vision_lab.png` | computer vision laboratory, camera arrays, face-detection wireframes projected in the air, cold cyan lighting |
| `guidance_center.png` | school career guidance center in 2035, branching path holograms, softer warm lighting |
| `main_courtroom.png` | solemn main courtroom, giant gold circular emblem, single spotlight on a podium, deep navy shadows |
| `verdict_room.png` | verdict chamber, empty podium under a beam of light, gold particles |
| `result_room.png` | ceremonial hall, holographic badge rising from a pedestal, gold particles in the air |

## UI & EFFECTS
| FILE | PROMPT |
|---|---|
| `ui/logo_adil.png` | minimal geometric emblem, rotated gold square outline with glowing cyan diamond core, flat vector, transparent background |
| `ui/evidence_frame.png` | translucent glass evidence card frame, thin cyan border, corner brackets, empty center |
| `ui/badge_<id>.png` | futuristic hexagonal achievement badge, gold rim, cyan glass center, engraved icon, flat game UI |
| `effects/hologram_grid.png` | seamless holographic grid overlay, thin cyan lines on transparent background |
| `effects/particles_gold.png` | scattered soft gold light particles on transparent background |

## CATATAN PRODUKSI
1. Generate **idle** dulu untuk tiap tokoh → jadikan acuan gaya.
2. Pakai seed/character-reference yang sama untuk 4 state sisanya.
3. Hapus latar (remove.bg atau alpha matte), simpan PNG transparan 900×1200.
4. Kompres < 400 KB, taruh di `public/assets/characters/<slug>/<state>.png`.
5. Catat alat dan tanggal generate di `docs/asset-attribution.md`.
