# ADIL — PANDUAN PENGGUNA

## Menjalankan
```bash
npm install
npm run dev        # buka http://localhost:5173
npm run build      # hasil siap deploy di dist/
npm test           # uji end-to-end; sekali saja: npx playwright install chromium
```

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
- **AUDIO ON/OFF** di header: mematikan musik dan efek suara.
- **⚙ PENGATURAN** di header, berisi empat hal:
  - *Efek suara & musik* — bunyi klik, pindai bukti, musik latar.
  - *Narasi suara* — suara tokoh, terpisah dari efek suara. Subtitle tetap tampil meski dimatikan,
    jadi aman dipakai di kelas tanpa headphone.
  - *Kurangi animasi* — mematikan seluruh efek gerak, untuk yang tidak nyaman dengan animasi.
  - *Reset seluruh progres* — menghapus skor, lencana, dan riwayat. Perlu konfirmasi dulu.
- **LEWATI DIALOG**: melompati adegan percakapan.
- **RESET DOSIR** di Profil: sama dengan reset di Pengaturan, juga perlu konfirmasi.

Seluruh permainan bisa dijalankan memakai keyboard saja: `Tab` berpindah antar elemen,
`Enter` memilih, `Esc` menutup Pengaturan.

## Main tanpa internet
ADIL dapat dipasang seperti aplikasi biasa. Buka situsnya sekali saat masih ada internet,
lalu pilih **Install/Pasang** di browser (ikon di bilah alamat). Setelah itu satu sidang penuh
bisa diselesaikan tanpa koneksi sama sekali — teks, gambar, dan efek suara sudah tersimpan
di perangkat. Musik latar dan suara tokoh baru tersimpan setelah pertama kali diputar,
jadi kalau ingin lengkap saat offline, mainkan sekali dulu ketika masih online.

Bila ada versi baru, muncul pemberitahuan **"Versi baru ADIL tersedia"** di pojok layar.
Progres tidak hilang saat memuat ulang.

## Progres
Tersimpan otomatis di browser (localStorage) setiap kali satu sidang selesai. Mengganti browser
atau memakai mode penyamaran akan memulai progres baru.

Perlu diketahui: progres **di tengah** sidang tidak ikut tersimpan. Bila halaman dimuat ulang
saat sedang memindai bukti, sidang itu mulai dari awal lagi — skor sidang yang sudah selesai
tetap aman.

## Masalah umum
| GEJALA | SEBAB & SOLUSI |
|---|---|
| Tidak ada suara | Cek ⚙ Pengaturan: *Efek suara* dan *Narasi suara* diatur terpisah. Bila file audio belum dipasang, game tetap berjalan dengan subtitle |
| Tampilan masih versi lama | Muat ulang halaman. Versi baru menunggu sampai kamu menekan MUAT ULANG |
| Karakter tidak tampil | Sprite belum ada di `public/assets/characters/` |
| Progres hilang | localStorage dibersihkan atau browser berbeda |
| Tombol fase terkunci | Pindai minimal 3 berkas; putusan terbuka setelah analisis dikunci |
