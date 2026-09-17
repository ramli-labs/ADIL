# ADIL — PANDUAN ASET

## Struktur
```
public/assets/
  characters/<slug>/<state>.png     arya · luma · prof_nara
  environments/<room>.png
  ui/
  audio/{background,characters,effects}/
  effects/
```

## Karakter
| SPESIFIKASI | NILAI |
|---|---|
| Format | PNG transparan |
| Rasio | 3:4 (mis. 900×1200) |
| Ukuran file | < 400 KB per state |
| State wajib | idle · speaking · explanation · warning · conclusion |
| Framing | 3/4 badan, kepala di sepertiga atas, ruang kosong bawah untuk subtitle |

Konsistensi antar state: pertahankan posisi kepala, pencahayaan, dan skala tetap sama —
hanya ekspresi dan pose tangan yang berubah, agar pergantian state tidak "melompat".

## Environment
1920 px sisi panjang, JPG/WebP < 500 KB, area tengah relatif kosong (UI menumpuk di atasnya),
kontras rendah agar teks tetap terbaca.

## UI & effects
Ikon lencana memakai id dari `data/endings.json`: `ui/badge_data_fairness.png`, dst.
Overlay efek murni dekoratif; tidak ada logika yang bergantung padanya.

## Palet & tipografi (kunci identitas ADIL)
| PERAN | NILAI |
|---|---|
| Midnight Navy | #081A33 |
| Deep | #050e1c |
| Justice Gold | #D4AF37 |
| AI Cyan | #00D9FF |
| Gray | #AAB7C4 |
| Nara (ungu) | #C7A6FF |
| Judul | Orbitron |
| Isi | Inter |
| Data/teknis | JetBrains Mono |

## Optimasi
Total aset disarankan < 25 MB agar cepat dibuka lewat jaringan sekolah.
Kompres PNG dengan pngquant/TinyPNG; pertimbangkan WebP untuk environment.

## Atribusi
Setiap aset pihak ketiga wajib dicatat di `docs/asset-attribution.md` (nama, sumber, lisensi, tautan).
