# ADIL — NASKAH SUARA (VOICE-OVER SCRIPT)
Bahasa: **Indonesia**. Semua baris wajib punya subtitle (sudah otomatis di game).
Konvensi nama file: `assets/audio/characters/<tokoh>/<kunci>.mp3` — 48kHz, mono, −16 LUFS, normalisasi puncak −1 dB.

Game akan **otomatis** memutar file bila ada, dan jatuh ke subtitle-only bila belum ada.
Urutan file untuk dialog berurutan: `line_1`, `line_2`, `line_3`, … sesuai urutan tampil di adegan.

## ARAHAN PENGISI SUARA

| TOKOH | GENDER | USIA | GAYA | TEMPO |
|---|---|---|---|---|
| ARYA | Pria | 25–35 | hangat, tenang, cerdas, seperti mentor yang dipercaya | sedang, artikulasi jelas |
| LUMA | Netral / sintetis | — | objektif, presisi, sedikit robotik, tanpa emosi berlebih | stabil, datar terkendali |
| PROF. NARA | Wanita | 45–60 | bijak, berwibawa, reflektif | lambat, penuh pertimbangan |

---

## ADEGAN 1 — ORIENTASI ADIL ACADEMY
Folder: `assets/audio/characters/<tokoh>/`

| FILE | TOKOH | STATE | KALIMAT |
|---|---|---|---|
| arya/line_1.mp3 | ARYA | talking | "Tahun 2035. AI membantu manusia mengambil keputusan di sekolah, pekerjaan, layanan publik, dan keamanan." |
| arya/line_2.mp3 | ARYA | serious | "Tetapi keputusan yang cepat tidak selalu berarti keputusan yang adil. Karena itulah ADIL Academy dibentuk." |
| prof_nara/line_3.mp3 | PROF. NARA | talking | "Kamu bergabung sebagai AI Justice Analyst. Tugasmu: menemukan bukti, menganalisis keputusan AI, mempertanyakan sistem, lalu mengambil putusan etis." |
| luma/line_4.mp3 | LUMA | idle | "Saya LUMA, asisten penalaran AI. Saya akan menjelaskan bagaimana sistem mencapai sebuah keputusan. Saya bukan lawanmu." |
| arya/line_5.mp3 | ARYA | talking | "Empat sidang menantimu, Analis. Mulai dari yang pertama: sebuah beasiswa yang berat sebelah." |

---

## ADEGAN 2 — BRIEFING KASUS 001 · BEASISWA YANG BERAT SEBELAH

| FILE | TOKOH | KALIMAT |
|---|---|---|
| arya/line_1.mp3 | ARYA | "Selamat datang di ruang investigasi pertamamu, Analis. Kasus ini terlihat sederhana: satu siswa ditolak beasiswa oleh AI." |
| arya/line_2.mp3 | ARYA | "Tapi ingat prinsip ADIL: keputusan cepat belum tentu keputusan adil. Tugasmu bukan menyalahkan AI, melainkan memahami dasar keputusannya." |
| luma/line_3.mp3 | LUMA | "Saya SELEKSI-9, dialihkan ke antarmuka LUMA. Saya siap menjelaskan proses keputusan saya berdasarkan data yang tersedia." |

### Interogasi LUMA — kasus 001 (rekam sebagai `luma/case001_q1.mp3` … `q4`)
1. "Saya memberi peringkat pada pendaftar menggunakan nilai rapor, kehadiran, dan nilai ujian masuk. Andi berada di peringkat ketiga karena selisih nol koma enam poin pada ujian masuk."
2. "Tidak. Informasi ekonomi tidak terdapat dalam dataset saya. Saya tidak dapat memproses variabel yang tidak diberikan kepada saya."
3. "Variabel ditentukan oleh tim pengembang manusia pada tahap desain sistem. Saya tidak memiliki wewenang mengubahnya."
4. "Tingkat keyakinan nol koma tujuh satu. Nilai ini berada di bawah ambang aman nol koma delapan lima yang direkomendasikan untuk keputusan berdampak tinggi."

### Penutup kasus 001 — `prof_nara/case001_closing.mp3`
"Kamu baru saja membuktikan sesuatu yang penting: bias sering lahir bukan dari kode, melainkan dari apa yang lupa kita catat."

---

## ADEGAN 3 — KASUS 002 · SISWA YANG TAK TERLIHAT

| FILE | TOKOH | KALIMAT |
|---|---|---|
| arya/line_1.mp3 | ARYA | "Kasus kedua lebih halus. Sistemnya bekerja — tapi tidak bekerja sama baiknya untuk semua orang." |
| luma/line_2.mp3 | LUMA | "Akurasi keseluruhan sistem sembilan puluh enam koma dua persen. Secara agregat, performa saya dinilai berhasil." |
| arya/line_3.mp3 | ARYA | "Angka rata-rata bisa menyembunyikan siapa yang dirugikan. Pecah datanya per kelompok, Analis." |

### Interogasi LUMA — kasus 002 (`luma/case002_q1.mp3` … `q4`)
1. "Wajah mereka menghasilkan kemiripan di bawah ambang nol koma enam nol terhadap pola yang saya pelajari. Pola tersebut dibentuk dari distribusi data latih saya."
2. "Tidak. Akurasi saya sembilan puluh delapan koma satu persen pada kelompok mayoritas data latih dan tujuh puluh sembilan koma empat persen pada kelompok minoritas data latih."
3. "Menurut konfigurasi saya, saya tetap menghasilkan keputusan. Saya tidak diprogram untuk meminta verifikasi manusia."
4. "Saya tidak memiliki akses terhadap dampak. Saya hanya menerima gambar dan mengeluarkan label kehadiran."

### Penutup — `prof_nara/case002_closing.mp3`
"Ingat kalimat ini: sebuah sistem yang benar sembilan puluh enam persen dari waktu masih bisa salah sepanjang waktu terhadap orang yang sama."

---

## ADEGAN 4 — KASUS 003 · MASA DEPAN YANG DITENTUKAN AI

| FILE | TOKOH | KALIMAT |
|---|---|---|
| prof_nara/line_1.mp3 | PROF. NARA | "Kasus ini bukan tentang AI yang salah menghitung. Sistemnya boleh jadi akurat. Pertanyaannya lebih dalam: siapa yang berhak menentukan masa depan seorang anak?" |
| luma/line_2.mp3 | LUMA | "Rekomendasi saya memiliki korelasi nol koma tujuh delapan terhadap keberhasilan akademik lulusan sebelumnya. Secara statistik, saran saya efisien." |
| arya/line_3.mp3 | ARYA | "Efisien belum tentu adil, dan akurat belum tentu berhak. Cari tahu bagaimana rekomendasi itu dipakai sekolah." |

### Interogasi LUMA — kasus 003 (`luma/case003_q1.mp3` … `q4`)
1. "Tidak. Saya menghasilkan peringkat kecocokan jalur. Keputusan mengikat dibuat oleh kebijakan sekolah yang memakai keluaran saya."
2. "Tidak. Motivasi, cita-cita, dan ketekunan bukan variabel yang dapat saya ukur. Saya hanya melihat jejak yang terekam."
3. "Dari data lulusan dua belas tahun terakhir sekolah ini. Bila kelompok tertentu jarang masuk kedokteran di masa lalu, kemungkinan yang saya berikan juga lebih rendah."
4. "Rekomendasi saya sebaiknya dipakai sebagai bahan diskusi, bukan syarat pendaftaran. Saya tidak dirancang sebagai otoritas final."

### Penutup — `prof_nara/case003_closing.mp3`
"Sebuah sistem boleh menghitung kemungkinan. Tetapi hanya manusia yang berhak memilih akan menjadi siapa."

---

## ADEGAN 5 — KASUS 004 · HAKIM ALGORITMA (SIDANG AKHIR)

| FILE | TOKOH | KALIMAT |
|---|---|---|
| prof_nara/line_1.mp3 | PROF. NARA | "Ini sidang akhirmu, Analis. Tugas kalian bukan melawan AI. Tugas kalian adalah memahami bagaimana keputusan dibuat dan memastikan keadilan tetap terjaga." |
| luma/line_2.mp3 | LUMA | "Saya menghitung enam pelanggaran keterlambatan. Menurut tabel sanksi, jumlah tersebut setara dengan skors empat belas hari." |
| arya/line_3.mp3 | ARYA | "Angka itu benar. Tapi angka tidak menjelaskan mengapa. Cari konteks di balik enam catatan itu." |

### Interogasi LUMA — kasus 004 (`luma/case004_q1.mp3` … `q4`)
1. "Enam pelanggaran memenuhi ambang kategori berat pada tabel sanksi. Pemetaan bersifat langsung dan konsisten untuk semua siswa."
2. "Tidak. Sistem saya hanya menerima waktu kedatangan. Tidak ada kolom untuk alasan, keterangan, atau kondisi keluarga."
3. "Tidak. Saya mengoptimalkan konsistensi penerapan aturan, bukan hasil jangka panjang bagi siswa."
4. "Saya tidak dapat memikul tanggung jawab. Tanggung jawab berada pada manusia yang merancang, menyetujui, dan menjalankan keputusan."

### Penutup — `prof_nara/case004_closing.mp3`
"Sidang ditutup. Kamu telah memahami inti ADIL: AI dapat membuat keputusan dengan cepat, tetapi manusia harus memastikan keputusan itu tetap adil."

---

## CATATAN PRODUKSI
- LUMA: rekam datar, lalu tambahkan sedikit chorus/formant shift + reverb pendek agar terasa proyeksi hologram. Hindari efek "robot jahat".
- ARYA & NARA: rekam kering, kompresi ringan, tanpa reverb berat agar subtitle mudah diikuti di ruang kelas.
- Selalu sisakan 300 ms senyap di awal & akhir file agar transisi dialog tidak terpotong.
