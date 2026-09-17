# ADIL — SPESIFIKASI AUDIO (MUSIK & SFX)

Engine audio game **sudah siap menerima file asli**: begitu file di bawah ada di jalur yang benar,
game memakainya. Bila belum ada, SFX memakai bunyi sintetis internal dan musik dilewati — tanpa error.

## MUSIK LATAR (looping)
| FILE | KEBUTUHAN |
|---|---|
| `assets/audio/background/adil_theme.mp3` | Ambient sinematik, 90–120 detik, loop mulus, tanpa vokal, tempo lambat 70–80 BPM. Pad string rendah + denyut sintetis halus + satu motif piano/gamelan elektronik. Volume mix rendah (musik diputar pada 35%). |
| `assets/audio/background/investigation.mp3` (opsional) | Lebih tegang, denyut jam, tanpa melodi dominan. |
| `assets/audio/background/verdict.mp3` (opsional) | Khidmat, string bertahan, satu dentum rendah. |

## EFEK SUARA
| KUNCI | FILE | KEBUTUHAN | DURASI |
|---|---|---|---|
| click | `assets/audio/effects/ui_click.mp3` | klik antarmuka holografik, kering, tidak tajam | 80–150 ms |
| scan | `assets/audio/effects/evidence_scan.mp3` | sapuan pemindai data naik | 300–500 ms |
| unlock | `assets/audio/effects/insight_unlock.mp3` | dering kristal saat wawasan terbuka | 400–700 ms |
| verdict | `assets/audio/effects/verdict_gavel.mp3` | ketuk palu sidang + ekor reverb futuristik | 800–1500 ms |
| badge | `assets/audio/effects/badge_unlock.mp3` | fanfare pendek keemasan | 1–2 s |

## STANDAR TEKNIS
- Format: MP3 192 kbps (atau OGG untuk ukuran lebih kecil), 44.1/48 kHz.
- SFX: mono. Musik: stereo. Puncak −1 dB, SFX sekitar −18 LUFS agar tidak menutupi suara karakter.
- Total budget aset audio disarankan < 8 MB agar cepat dibuka lewat proyektor sekolah / jaringan lambat.

## SUMBER LEGAL YANG DISARANKAN
- **Musik**: Kevin MacLeod (incompetech.com, CC-BY), Free Music Archive (filter CC0/CC-BY), Pixabay Music (bebas komersial).
- **SFX**: Freesound.org (filter CC0), Pixabay SFX, Kenney.nl (UI/game SFX, CC0).
- Simpan kredit lisensi di `assets/audio/CREDITS.md` — wajib bila memakai CC-BY.

## KONTROL YANG SUDAH ADA DI GAME
- Tombol `AUDIO ON/OFF` di header: mematikan musik, suara karakter, dan SFX sekaligus.
- Suara karakter tidak pernah bertumpuk — baris baru menghentikan baris sebelumnya.
- Tombol `LEWATI DIALOG` menghentikan suara yang sedang berjalan.
- Musik hanya dimulai setelah interaksi pertama pengguna (mematuhi kebijakan autoplay browser).
