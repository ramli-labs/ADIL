# ADIL — THE AI TRIAL
Game investigasi etika AI untuk siswa SMP. Pemain berperan sebagai **AI Justice Analyst**
dan menilai apakah keputusan sebuah sistem AI sudah adil, transparan, dan bertanggung jawab.

## Jalankan
```bash
npm install
npm run dev
npm run build      # dist/ siap deploy
```
Vercel: framework **Vite**, build `npm run build`, output `dist` (`vercel.json` sudah menangani SPA rewrite).

## Arsitektur singkat
```
src/
  data/        KONTEN — cases · evidence · verdicts · dialogue · characters · learning · endings · config
  engine/      LOGIKA — content · gameState · caseEngine · scoringEngine · endingEngine · dialogueEngine · audioEngine
  components/  UI     — character · evidence · ai · verdict · teacher · ui
  pages/       LAYAR  — Home Academy CaseSelection Investigation Verdict Result Profile Archive TeacherGuide
public/assets/ characters · environments · ui · audio · effects
docs/          dokumentasi lengkap
```
**Tidak ada satu pun teks kasus, dialog, atau materi pembelajaran di dalam kode.**

## Menambah kasus baru (tanpa menyentuh kode)
Tambahkan entri di `cases.json`, `evidence.json`, `dialogue.json`, `verdicts.json`, dan `learning.json`
dengan id yang sama. Langkah rinci ada di `docs/architecture-guide.md`.

## Dokumentasi
| DOKUMEN | ISI |
|---|---|
| `docs/architecture-guide.md` | struktur data, engine, aturan skor, cara menambah kasus |
| `docs/asset-guide.md` | spesifikasi sprite, environment, UI, palet |
| `docs/audio-specification.md` | musik, SFX, standar teknis, sumber legal |
| `docs/voice-script.md` | naskah suara lengkap + nama file per baris |
| `docs/ai-prompt-documentation.md` | prompt generate gambar untuk 5 state tiap tokoh |
| `docs/teacher-guide.md` | panduan mengajar, RPP ringkas, cara membaca hasil siswa |
| `docs/user-guide.md` | cara bermain & menjalankan |
| `docs/qa-checklist.md` | daftar uji sebelum rilis |
| `docs/demo-video-storyboard.md` | storyboard video demo 90 detik |
| `docs/asset-attribution.md` | pencatatan lisensi aset |
