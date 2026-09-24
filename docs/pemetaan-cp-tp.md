# ADIL — PEMETAAN CAPAIAN PEMBELAJARAN & TUJUAN PEMBELAJARAN

Dokumen ini memetakan setiap bagian gim ADIL ke Capaian Pembelajaran (CP) dan Tujuan
Pembelajaran (TP) mata pelajaran **Informatika Fase D (Kelas VII–IX)**.

> Rumusan CP di bawah dikutip persis dari dokumen *Alur dan Tujuan Pembelajaran Informatika Fase D*
> pada platform perangkat ajar resmi Kemendikbud (`static.perangkat-ajar.belajar.id/SMP.D.INF.IPS.1.pdf`).
> Bila sekolah memakai edisi kurikulum yang lebih baru, cocokkan ulang dengan dokumen yang berlaku.

## A. Identitas

| Aspek | Keterangan |
|---|---|
| Mata pelajaran | Informatika |
| Fase / Kelas | Fase D — Kelas VII sampai IX |
| Elemen yang disasar | Dampak Sosial Informatika (DSI); Berpikir Komputasional (BK) |
| Alokasi waktu | 4 × 40 menit (satu sidang per pertemuan) atau 2 × 80 menit |
| Kompetensi utama | Peserta didik mampu mengevaluasi keputusan sistem AI secara kritis, mengenali bias data dan algoritma, serta menjelaskan mengapa tanggung jawab akhir tetap berada pada manusia. |

## B. Rumusan CP yang dirujuk

| Kode | Elemen | Rumusan CP |
|---|---|---|
| BK | Berpikir Komputasional | "Pada akhir fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan beberapa solusi dalam menyelesaikan persoalan dengan data diskrit bervolume kecil dan mendisposisikan berpikir komputasional dalam bidang lain terutama dalam literasi, numerasi, dan literasi sains (*computationally literate*)." |
| DSI | Dampak Sosial Informatika | "Pada akhir fase D, peserta didik mampu memahami ketersediaan data dan informasi lewat aplikasi media sosial, memahami keterbukaan informasi, memilih informasi yang bersifat publik atau privat, menerapkan etika dan menjaga keamanan dirinya dalam masyarakat digital." |

### Catatan kesesuaian

**BK — kesesuaian kuat.** Inti permainan adalah menyelesaikan persoalan dari **data diskrit bervolume
kecil**: enam berkas bukti per sidang yang harus dipilah, dirangkai menjadi rantai sebab-akibat, lalu
dijadikan dasar putusan. Frasa "menghasilkan beberapa solusi" tercermin pada empat opsi putusan yang
masing-masing membawa konsekuensi berbeda.

**DSI — kesesuaian sebagian, perlu dibingkai.** Rumusan DSI menekankan *aplikasi media sosial*,
sedangkan ADIL mengangkat keputusan otomatis di lingkungan sekolah. Yang bertemu langsung adalah
frasa **"menerapkan etika ... dalam masyarakat digital"** serta **"memahami ketersediaan data dan
informasi"** — justru inti ADIL-001, yaitu keputusan yang cacat karena data yang menentukan tidak
pernah tersedia bagi sistem. Unsur publik/privat muncul pada ADIL-003 melalui data pola belajar daring
siswa. Bila juri menuntut kesesuaian harfiah dengan "media sosial", bagian ini dapat dijelaskan sebagai
perluasan konteks masyarakat digital, bukan penggantian rumusan.

## C. Pemetaan per Sidang

Setiap sidang memuat tiga TP yang bersumber dari `src/data/learning.json`, sehingga rumusan di
dokumen ini dan yang tampil di dalam gim tidak dapat berbeda.

### ADIL-001 — Beasiswa yang Berat Sebelah
**Konsep:** bias data & transparansi · **Elemen:** DSI, BK

| TP | Bukti pencapaian di dalam gim |
|---|---|
| Menjelaskan bahwa AI hanya dapat menilai informasi yang tersedia dalam datanya. | Memindai *Laporan Dataset* dan menemukan tidak adanya kolom kondisi ekonomi; menjawab interogasi LUMA tentang dasar penolakan. |
| Mengidentifikasi variabel yang hilang pada sebuah dataset keputusan. | Memilih *Surat Keterangan Ekonomi* sebagai bukti kunci pada tahap Analisis. |
| Menghubungkan tujuan kebijakan dengan metrik yang dipakai sistem. | Memilih *Tujuan Program Beasiswa* sebagai bukti kunci; memilih putusan B yang menuntut variabel diperbaiki, bukan sistem dihapus. |

### ADIL-002 — Siswa yang Tak Terlihat
**Konsep:** bias algoritmik & akuntabilitas · **Elemen:** DSI, BK

| TP | Bukti pencapaian di dalam gim |
|---|---|
| Membedakan akurasi rata-rata dengan akurasi per kelompok. | Memindai *Akurasi per Kelompok* (98,1% / 79,4% / 84%) dan menyimpulkan rata-rata 96% menutupi kegagalan subkelompok. |
| Menjelaskan hubungan keragaman data latih dengan keadilan model. | Memilih *Komposisi Dataset Latih* sebagai bukti kunci. |
| Menilai perlunya ambang keyakinan dan verifikasi manusia. | Memindai *Laporan Confidence* (0,52) dan *Prosedur Banding*; memilih putusan B yang menuntut pelatihan ulang, ambang keyakinan, dan jalur koreksi. |

### ADIL-003 — Masa Depan yang Ditentukan AI
**Konsep:** otonomi manusia & privasi · **Elemen:** DSI

| TP | Bukti pencapaian di dalam gim |
|---|---|
| Membedakan rekomendasi AI dengan keputusan yang mengikat. | Memindai *Kebijakan Sekolah* dan mengenali perubahan saran menjadi syarat pendaftaran. |
| Mengenali *automation bias* pada diri sendiri. | Memindai *Survei Siswa* tentang daya tekan psikologis keluaran mesin; menolak putusan A yang menuruti AI karena akurasinya. |
| Menjelaskan mengapa data historis dapat membatasi pilihan masa depan. | Memindai *Variabel Model* dan menghubungkannya dengan *Wawancara Sinta* pada tahap Analisis. |

### ADIL-004 — Hakim Algoritma
**Konsep:** pengawasan manusia & tanggung jawab · **Elemen:** DSI, BK

| TP | Bukti pencapaian di dalam gim |
|---|---|
| Menjelaskan arti pengawasan manusia yang bermakna (bukan sekadar tanda tangan). | Memindai *Log Persetujuan* (rata-rata 8 detik) dan mengenali *rubber-stamping*. |
| Mengidentifikasi konteks manusia yang hilang di balik angka. | Memindai *Surat Rumah Sakit* dan menghubungkannya dengan pola keterlambatan pada *Catatan Pelanggaran*. |
| Merumuskan syarat sistem otomatis yang menyangkut hak siswa. | Memilih putusan B yang membatalkan sanksi sekaligus mewajibkan sistem menyediakan ruang konteks. |

## D. Asesmen Terintegrasi

Penilaian melekat pada permainan; tidak ada kuis terpisah di luar alur.

| Komponen | Bobot | Yang diukur | Kaitan dengan TP |
|---|---|---|---|
| Evidence Score | 35 | Ketelitian menemukan bukti relevan di antara enam berkas. | Menunjukkan penguasaan TP pertama tiap sidang — mengenali informasi apa yang ada dan apa yang hilang. |
| Reasoning Score | 25 | Keberanian bertanya dan ketepatan memilih tiga bukti kunci. | Menunjukkan kemampuan merangkai sebab-akibat, inti Berpikir Komputasional. |
| Ethics Score | 40 | Kualitas putusan: menunjuk penyebab, dampak, dan perbaikan. | Menunjukkan penguasaan TP ketiga tiap sidang — merumuskan perbaikan sistem, bukan menyalahkan alat. |

Setiap pilihan putusan memberi umpan balik berbeda yang menjelaskan **mengapa** suatu jawaban lemah,
sehingga kesalahan tetap menjadi peristiwa belajar. Delapan lencana diberikan atas *cara bermain*
— misalnya memindai seluruh berkas termasuk yang tidak relevan — bukan semata atas jawaban benar.

## E. Tingkat Kognitif

Tantangan disusun menaik menurut taksonomi Bloom, sejalan dengan tingkat kesulitan sidang.

| Tahap dalam gim | Tingkat | Alasan |
|---|---|---|
| Briefing | C2 — memahami | Membaca duduk perkara dan dasar keputusan sistem. |
| Papan Bukti | C3 — menerapkan | Memilah berkas relevan dari yang tidak relevan. |
| Interogasi AI | C4 — menganalisis | Menggali informasi yang tidak tampak pada berkas. |
| Analisis | C4–C5 — menganalisis & mengevaluasi | Merangkai tiga bukti menjadi satu rantai sebab-akibat. |
| Putusan | C5–C6 — mengevaluasi & mencipta | Menilai keputusan sistem dan merumuskan perbaikannya. |

## F. Sumber Rumusan

Seluruh tujuan pembelajaran pada dokumen ini bersumber dari `src/data/learning.json`
(`meta.competency` dan `cases[*].objectives`). Berkas itu pula yang dibaca Laman Muka dan halaman
Cara Bermain di dalam gim, sehingga menyunting rumusan di satu tempat akan memperbaruinya di
seluruh tampilan sekaligus.
