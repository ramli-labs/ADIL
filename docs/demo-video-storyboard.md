# ADIL — STORYBOARD VIDEO DEMONSTRASI

Ketentuan Festival Biru Putih: **MP4, maksimal 3 menit**. Storyboard ini dirancang **2 menit 20 detik**,
menyisakan ruang bila ada bagian yang perlu diperlambat.

## Membuat ulang video secara otomatis

`video-demonstrasi.mp4` di dalam paket dibuat oleh `tools/rekam-demo.cjs`, yang memainkan adegan 1–12
di peramban lalu menempelkan audio asli gim (musik, efek suara, dan dubbing tokoh) pada detik yang sama
dengan saat gim memutarnya. Hasilnya berdurasi sekitar 2 menit, tanpa narator.

```bash
npm run dev -- --port 5174 --host 127.0.0.1   # terminal pertama
node tools/rekam-demo.cjs                       # terminal kedua → video-demonstrasi.mp4
./tools/buat-paket-lomba.sh                     # memasukkannya ke ZIP
```

Jalankan ulang setiap kali tampilan gim berubah, agar video tidak memperlihatkan versi lama.
Bila ingin menambahkan narasi suara sendiri, rekam secara manual mengikuti panduan di bawah.

## Merekam manual

**Rekam pada 1920×1080, 30 fps.** Rasio 16:9. Sebelum merekam: sembunyikan bilah markah, tutup tab lain,
jalankan peramban dalam mode layar penuh, dan siapkan progres bersih (⚙ Pengaturan → Reset seluruh progres).

## Alur

| # | Durasi | Visual | Narasi | Audio |
|---|---|---|---|---|
| 1 | 0:00–0:10 | Fade in Laman Muka. Kursor diam. Sorot blok **TUJUAN PEMBELAJARAN**. | "Tahun 2035. AI ikut menentukan siapa yang mendapat kesempatan — di sekolah sekalipun." | tema ADIL masuk |
| 2 | 0:10–0:20 | Zoom perlahan ke blok tujuan pembelajaran, lalu ke baris "Informatika SMP — Dampak Sosial Informatika". | "ADIL adalah gim edukasi Informatika Fase D untuk menilai keadilan keputusan AI." | tema menahan |
| 3 | 0:20–0:32 | Klik **CARA BERMAIN**. Gulir perlahan melewati lima tahap dan tabel skor. | "Sebelum bermain, murid membaca cara kerjanya: lima tahap, dan bagaimana skor dihitung." | klik UI |
| 4 | 0:32–0:42 | Klik MULAI SIDANG → orientasi Arya, subtitle terlihat jelas. | "Murid berperan sebagai AI Justice Analyst." | suara Arya |
| 5 | 0:42–0:52 | Arsip Kasus. Sorot empat kartu; tampakkan ADIL-002 sampai 004 berstatus TERKUNCI. | "Empat sidang bertingkat. Sidang berikutnya baru terbuka setelah yang sebelumnya diputus." | klik UI |
| 6 | 0:52–1:04 | Briefing ADIL-001. Sorot **Keyakinan 0.71** dan kotak **MANFAAT SISTEM INI**. | "Tiap kasus menyajikan keputusan AI, dasarnya, dan manfaat sistemnya — AI tidak digambarkan sebagai musuh." | denyut rendah |
| 7 | 1:04–1:20 | Papan Bukti. Pindai tiga berkas; temuan dan KONSEP terbuka; toast umpan balik muncul. | "Murid memindai berkas. Tiap pindaian memberi umpan balik langsung dan konsep di baliknya. Tidak semua bukti relevan." | SFX pindai |
| 8 | 1:20–1:34 | Interogasi LUMA. Ajukan dua pertanyaan; wawasan "POTENSI BIAS DATA" muncul di dosir. | "Lalu menginterogasi sistemnya — menanyakan apa yang tidak ia lihat." | suara LUMA |
| 9 | 1:34–1:46 | Meja Analisis. Pilih tiga bukti kunci, klik KUNCI ANALISIS, rantai kesimpulan terbuka. | "Bukti dirangkai menjadi satu rantai sebab-akibat." | SFX unlock |
| 10 | 1:46–1:58 | Ruang Putusan. Sorot keempat opsi, pilih B. | "Baru setelah itu putusan dijatuhkan. Tidak ada tombol undo." | palu |
| 11 | 1:58–2:10 | Layar Hasil. Sorot tiga skor, lencana terbuka, dan EVALUASI PUTUSANMU. | "Skor menilai cara berpikir: ketelitian bukti, keberanian bertanya, dan kualitas putusan etis." | fanfare pendek |
| 12 | 2:10–2:20 | Buka **⚙ Pengaturan** (tampakkan narasi & kurangi animasi), lalu potong ke logo ADIL. | "Dapat dimainkan tanpa internet, tanpa tetikus, dan dengan pengaturan aksesibilitas. ADIL — AI boleh cepat, manusia yang menjaga keadilan." | tema naik lalu outro |

## Yang wajib terlihat di video

Keduabelas adegan di atas sudah mencakup seluruh Standar Wajib Bab III.D, tetapi periksa ulang
sebelum mengunggah — inilah yang dicari juri:

- [ ] Laman Muka memuat **judul, tujuan pembelajaran, dan tombol mulai** (adegan 1–2)
- [ ] **Panduan cara bermain** sebelum gim utama (adegan 3)
- [ ] **Alur misi** dari awal sampai akhir (adegan 6–11, satu sidang utuh)
- [ ] **Indikator progres** terlihat — tab tahap, hitungan berkas, Justice Score (adegan 7–9)
- [ ] **Minimal tiga interaksi berbeda**: pindai berkas, tanya LUMA, pilih bukti, jatuhkan putusan
- [ ] **Umpan balik instan** setelah interaksi (adegan 7, toast dan temuan terbuka)
- [ ] **Sistem penghargaan** — lencana (adegan 11)
- [ ] **Hasil akhir/skor** ditampilkan jelas (adegan 11)

## Tips perekaman

- Gerakkan kursor perlahan dan mantap; jeda satu detik setelah tiap klik agar animasi sempat terbaca.
- Jangan tergesa di adegan 7 dan 11 — di situlah umpan balik dan skor dinilai. Lebih baik memangkas
  adegan 2 atau 5 bila durasi melebihi batas.
- Rekam narasi terpisah lalu tempelkan, agar bebas dari bunyi klik dan napas. Ketentuan menetapkan
  volume musik latar maksimal 20% dari volume narasi.
- Bila menyertakan teks di layar, gunakan ukuran setara minimal 24pt dan tahan sekurang-kurangnya
  3 detik per kalimat pendek.
- Ekspor: MP4 (H.264), 1080p, ≥30 fps, audio AAC ≥128 kbps. Simpan sebagai `video-demonstrasi.mp4`
  di akar proyek, lalu jalankan `./tools/buat-paket-lomba.sh` agar ikut terpaket otomatis.
