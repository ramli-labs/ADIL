# ADIL — ATRIBUSI ASET

Catat setiap aset pihak ketiga di sini. Wajib untuk lisensi CC-BY.

## Font
| ASET | SUMBER | LISENSI |
|---|---|---|
| Orbitron | `@fontsource/orbitron` (npm) — subset latin, di-host sendiri | SIL Open Font License 1.1 |
| Inter | `@fontsource/inter` (npm) — subset latin, di-host sendiri | SIL Open Font License 1.1 |
| JetBrains Mono | `@fontsource/jetbrains-mono` (npm) — subset latin, di-host sendiri | SIL Open Font License 1.1 |

> Catatan produksi: font dipindahkan dari Google Fonts CDN ke paket `@fontsource` yang di-bundle
> bersama aplikasi, agar identitas visual tetap utuh saat perangkat offline (tanpa ini seluruh
> tipografi jatuh ke font sistem begitu koneksi putus). Lisensi tidak berubah — tetap OFL 1.1.

## Ikon
| ASET | SUMBER | LISENSI |
|---|---|---|
| Lucide React | lucide.dev | ISC License |
| favicon.svg, icon-192.png, icon-512.png, icon-maskable-512.png | Digenerate — bentuk berlian ADIL (Python/Pillow), turunan dari `ui/logo_adil.png` | Dibuat dari nol, tidak ada pihak ketiga |

## Logo institusional
| FILE | ASET | PEMILIK | STATUS PEMAKAIAN |
|---|---|---|---|
| institutional/logo-kemendikdasmen.png | Logo Kementerian Pendidikan Dasar dan Menengah | Kemendikdasmen RI | Dipakai sebagai program resmi — identik dengan penerapan di NEXA & SIGAP |
| institutional/logo-pendidikan-bermutu.png | Pendidikan Bermutu Untuk Semua | Kemendikdasmen RI | idem |
| institutional/logo-ramah.png | Kemendikdasmen RAMAH | Kemendikdasmen RI | idem |
| institutional/logo-sobat-smp.png | Sobat SMP | Kemendikdasmen RI | idem |

> Lambang resmi negara/kementerian, bukan aset berlisensi terbuka. Pemakaian mengikuti
> ketentuan branding program dan harus dilepas bila ADIL dipublikasikan di luar payung program.

## Musik
| FILE | JUDUL | PEMBUAT | SUMBER | LISENSI |
|---|---|---|---|---|
| background/adil_theme.mp3 | Ambient Cinematic | AtlasAudio | pixabay.com/music/ambient-ambient-cinematic-510518/ | Pixabay Content License (bebas komersial, atribusi tidak wajib) |
| background/investigation.mp3 | Tense Crime Atmosphere | Universfield | pixabay.com/music/ambient-tense-crime-atmosphere-277900/ | Pixabay Content License (bebas komersial, atribusi tidak wajib) |
| background/verdict.mp3 | Longinus Reflects On His Deed (Melancholic Orchestral Tribute) | Nickpanek | pixabay.com/music/dramatic-classical-longinus-reflects-on-his-deed-melancholic-orchestral-tribute-317900/ | Pixabay Content License (bebas komersial, atribusi tidak wajib) |

## Efek suara
| FILE | PEMBUAT | SUMBER | LISENSI |
|---|---|---|---|
| effects/ui_click.mp3 | AI-generated | ElevenLabs (Sound Effects) | Cek ketentuan penggunaan komersial akun ElevenLabs yang dipakai |
| effects/evidence_scan.mp3 | AI-generated | ElevenLabs (Sound Effects) | idem |
| effects/insight_unlock.mp3 | AI-generated | ElevenLabs (Sound Effects) | idem |
| effects/verdict_gavel.mp3 | AI-generated | ElevenLabs (Sound Effects) | idem |
| effects/badge_unlock.mp3 | AI-generated | ElevenLabs (Sound Effects) | idem |

> Catatan produksi: kelima SFX diproses ulang (2026-09-17) — dikonversi ke mono, `ui_click` dipotong dari 0,5s
> menjadi 120ms agar responsif, dan level puncak semua file dinormalisasi ke sekitar −1 dBFS agar konsisten
> satu sama lain (sebelumnya bervariasi −10 s/d −26 dB, terlalu njomplang saat dimainkan berurutan).

## Gambar
| FILE | METODE | KETERANGAN |
|---|---|---|
| characters/arya/*.png (5 state) | Digenerate — ilustrasi vektor flat (SVG → PNG, Python/cairosvg) | 2026-09-17, gaya sesuai palet ADIL; placeholder pengganti hasil generator gambar fotorealistik di `ai-prompt-documentation.md` |
| characters/luma/*.png (5 state) | Digenerate — ilustrasi vektor flat (SVG → PNG, Python/cairosvg) | 2026-09-17, avatar holografik cyan, sama seperti di atas |
| characters/prof_nara/*.png (5 state) | Digenerate — ilustrasi vektor flat (SVG → PNG, Python/cairosvg) | 2026-09-17, sama seperti di atas |
| environments/*.png (8 file) | Digenerate — ilustrasi vektor flat (SVG → PNG, Python/cairosvg) | 2026-09-17, adegan geometris/gradient sesuai deskripsi di `ai-prompt-documentation.md` |
| ui/logo_adil.png, ui/evidence_frame.png, ui/badge_*.png (8 lencana) | Digenerate — ilustrasi vektor flat (SVG → PNG, Python/cairosvg) | 2026-09-17 |
| effects/hologram_grid.png, effects/particles_gold.png | Digenerate — pola/partikel prosedural (SVG → PNG, Python/cairosvg) | 2026-09-17 |

> Catatan: seluruh gambar di atas adalah ilustrasi vektor flat buatan sendiri (bukan hasil AI image generator
> seperti Midjourney/Firefly/Imagen yang dirujuk di `ai-prompt-documentation.md`), dibuat sebagai placeholder
> yang konsisten secara gaya dan siap dipakai. Tidak ada isu lisensi pihak ketiga karena dibuat dari nol.
> Bila ingin kualitas fotorealistik/ilustrasi tangan sesuai dokumentasi prompt, gunakan file ini sebagai
> acuan komposisi (posisi kepala, framing 3:4, dsb.) lalu generate ulang dengan tool AI gambar pilihan.

## Suara karakter
| TOKOH | PENGISI SUARA / TTS | LISENSI PEMAKAIAN | JUMLAH BARIS |
|---|---|---|---|
| ARYA | _(isi: nama pengisi suara atau tool TTS yang dipakai)_ | | 9/9 baris (briefing) |
| LUMA | _(isi)_ | | 5/5 briefing + 16/16 interogasi |
| PROF. NARA | _(isi)_ | | 3/3 briefing + 4/4 penutup |

> Catatan produksi (2026-09-17): seluruh 37 file suara karakter dinormalisasi ke sekitar −16 LUFS / puncak −1 dB
> dan diberi jeda 300ms di awal-akhir (sebelumnya bervariasi −22 s/d −32 LUFS, kini konsisten satu sama lain).
> Nama file memakai skema per-adegan (`academy_intro_01.mp3`, `case001_q1.mp3`, dst., lihat kolom `audioFile`
> di `dialogue.json`) agar tidak bentrok dengan file lain yang kebetulan punya urutan baris sama.

> Sumber legal yang disarankan: Freesound (CC0), Pixabay, Kenney.nl (CC0),
> Incompetech/Kevin MacLeod (CC-BY — wajib mencantumkan kredit).
