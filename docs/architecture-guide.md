# ADIL — PANDUAN ARSITEKTUR

## Prinsip utama
**Konten edukatif tidak pernah ditulis di dalam kode.** Semua teks kasus, dialog, bukti,
putusan, dan materi pembelajaran berada di `src/data/*.json`. Kode hanya membaca dan menampilkan.

```
src/
  data/       KONTEN  — diedit guru/penulis, tanpa menyentuh kode
  engine/     LOGIKA  — aturan main, skor, save, audio
  components/ TAMPILAN— potongan UI yang dapat dipakai ulang
  pages/      LAYAR   — merangkai engine + komponen
```

## Lapisan data (src/data)
| FILE | ISI | DIEDIT SAAT |
|---|---|---|
| `cases.json` | struktur kasus: briefing, keputusan AI, isu etis, referensi ke set lain | menambah/mengubah kasus |
| `evidence.json` | berkas bukti per kasus (id, temuan, dampak, konsep) | menambah bukti |
| `verdicts.json` | pertanyaan putusan + opsi, skor, umpan balik | menyesuaikan penilaian etis |
| `dialogue.json` | seluruh dialog: orientasi, intro kasus, interogasi, penutup | menulis naskah |
| `characters.json` | profil tokoh: state, ekspresi, animasi, identitas suara | menambah tokoh |
| `learning.json` | tujuan pembelajaran, refleksi, diskusi, miskonsepsi, glosarium | menyesuaikan kurikulum |
| `endings.json` | profil analis, lencana, ending akhir | mengubah sistem penghargaan |
| `config.json` | bobot skor, ambang, pangkat, tema, audio, save | menyetel keseimbangan |

Semua JSON dimuat **hanya** di `engine/content.ts`. Tidak ada komponen yang mengimpor JSON langsung.

## Lapisan engine (src/engine)
| MODUL | TANGGUNG JAWAB | BERGANTUNG PADA |
|---|---|---|
| `content.ts` | memuat & memvalidasi seluruh JSON, menyediakan getter | — |
| `gameState.ts` | state pemain, save/load, aksi investigasi (satu-satunya pemilik state) | semua engine |
| `caseEngine.ts` | fase kasus, syarat lanjut, umpan balik aksi | content |
| `scoringEngine.ts` | Evidence + Reasoning + Ethics → Justice Score | content, caseEngine |
| `endingEngine.ts` | profil analis, lencana, ending, ringkasan proses | content |
| `dialogueEngine.ts` | urutan dialog, subtitle, pemicu suara | audioEngine |
| `audioEngine.ts` | BGM per ruang, SFX, suara tokoh (anti-tumpang-tindih) | content |

Engine selain `gameState` adalah **fungsi murni** — mudah diuji dan tidak menyentuh React.

## Validasi konten
`validateContent()` dijalankan sekali saat boot dan memperingatkan di console bila:
- `evidence_set` / `verdict_set` / `intro_dialogue` / `learning_ref` menunjuk data yang tidak ada
- kunci analisis (`analysis.key`) bukan id bukti yang valid

## Menambah kasus baru — TANPA UBAH KODE
1. `cases.json` — tambahkan objek kasus baru (id unik, mis. `case005`).
2. `evidence.json` — tambahkan `"case005": [ ... ]` minimal 5–6 berkas, tandai `relevant`.
3. `dialogue.json` — tambahkan `case005_intro`, `case005_interview`, `case005_closing`.
4. `verdicts.json` — tambahkan `"case005": { question, options }`; satu opsi `tier: "best"` (score 40).
5. `learning.json` — tambahkan `cases.case005` dengan tujuan, refleksi, diskusi, miskonsepsi.
6. (Opsional) taruh `environments/<nama>.png` dan rujuk di field `environment`.

Kasus baru langsung muncul di arsip, terhitung di skor, dan masuk panduan guru.

## Aturan skor
```
Justice Score = Evidence(35) + Reasoning(25) + Ethics(40)   [maks 100]

Evidence  = (bukti relevan ditemukan / total bukti relevan) × 35
Reasoning = (pertanyaan diajukan/total × 0,5 + bukti kunci tepat/total × 0,5) × 25
Ethics    = skor opsi putusan yang dipilih (0–40, dari verdicts.json)
```
Bobot dapat diubah di `config.json → weights` tanpa menyentuh kode.

## Profil & lencana
Profil analis dihitung dari **empat sumbu cara bermain** (ketelitian bukti, keberanian bertanya,
ketepatan penalaran, kualitas putusan etis) — bukan dari jumlah jawaban benar.
Lencana dievaluasi ulang dari seluruh riwayat setiap kali sebuah sidang selesai
(`evaluateBadges`), sehingga save selalu konsisten.

## Save
Kunci `config.save.key` (`adil.save.v3`) di localStorage. Isi: nama pemain, rekaman per kasus,
lencana, dan status mode guru. Naikkan versi kunci bila struktur berubah agar save lama tidak rusak.
