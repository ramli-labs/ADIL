# ADIL — PANDUAN PENGGUNA

## Menjalankan
**Versi web (React):**
```bash
cd react-app
npm install
npm run dev        # buka http://localhost:5173
npm run build      # hasil siap deploy di dist/
```
**Versi HTML siap main:** buka `ADIL - The AI Trial.dc.html` langsung di browser.

## Deploy ke Vercel
Framework **Vite** · Build `npm run build` · Output `dist` · `vercel.json` sudah menangani SPA rewrite.

## Cara bermain
1. **MULAI SIDANG** — orientasi dari Arya, Prof. Nara, dan LUMA.
2. **ARSIP KASUS** — pilih sidang. Kasus berikutnya terbuka setelah yang sebelumnya selesai.
3. **BRIEFING** — baca duduk perkara, keputusan AI, dan manfaat sistemnya.
4. **PAPAN BUKTI** — klik tiap berkas untuk memindai. Tidak semua berkas relevan.
5. **INTEROGASI AI** — tanyai LUMA. Beberapa pertanyaan membuka wawasan kunci.
6. **ANALISIS** — pilih bukti kunci dan kunci rantai kesimpulanmu.
7. **PUTUSAN** — jatuhkan putusan. Tidak ada undo.
8. **HASIL** — skor, lencana, profil analis, dan (bila diaktifkan) ringkasan diskusi guru.

## Kontrol
- **AUDIO ON/OFF** di header: mematikan musik, suara tokoh, dan efek sekaligus.
- **LEWATI DIALOG**: melompati adegan percakapan.
- **RESET DOSIR** di Profil: menghapus seluruh progres perangkat ini.

## Progres
Tersimpan otomatis di browser (localStorage). Mengganti browser atau mode penyamaran
akan memulai progres baru.

## Masalah umum
| GEJALA | SEBAB & SOLUSI |
|---|---|
| Tidak ada suara | File audio belum dipasang — game sengaja berjalan dengan subtitle saja |
| Karakter tidak tampil | Sprite belum ada di `public/assets/characters/` |
| Progres hilang | localStorage dibersihkan atau browser berbeda |
| Tombol fase terkunci | Pindai minimal 3 berkas; putusan terbuka setelah analisis dikunci |
