# ADIL — PANDUAN GURU

## Tentang permainan ini
ADIL — The AI Trial adalah simulasi investigasi etika AI. Siswa berperan sebagai
**AI Justice Analyst** dan memeriksa apakah sebuah keputusan AI di lingkungan sekolah sudah adil.
Ini bukan kuis: siswa harus mencari bukti, menginterogasi sistem, merangkai kesimpulan, lalu memutus.

**Pesan inti:** AI dapat membantu manusia, tetapi setiap keputusan AI wajib dievaluasi secara
bertanggung jawab. AI tidak digambarkan sebagai musuh.

## Menyiapkan kelas
**Internet tidak stabil?** ADIL bisa dipasang seperti aplikasi dan dimainkan sepenuhnya offline.
Di tiap perangkat, buka situsnya sekali ketika masih ada internet lalu pilih **Install/Pasang**
di browser. Setelah itu satu sidang penuh bisa diselesaikan tanpa koneksi. Agar musik dan suara
tokoh ikut tersimpan, mainkan sekali dulu selagi online — tanpa itu pun permainan tetap jalan
karena seluruh dialog selalu bersubtitle.

**Satu laptop dipakai bergantian.** Progres tersimpan per perangkat, bukan per siswa. Sebelum
kelompok berikutnya mulai, buka **⚙ Pengaturan → Reset seluruh progres** (perlu konfirmasi,
jadi tidak akan terhapus karena salah pencet). Tanpa direset, kelompok berikutnya akan melanjutkan
skor kelompok sebelumnya.

**Kelas tanpa headphone.** Di ⚙ Pengaturan, *Narasi suara* bisa dimatikan terpisah dari efek
suara. Subtitle tetap tampil penuh, jadi tidak ada materi yang hilang.

**Siswa yang terganggu oleh gerakan.** Nyalakan *Kurangi animasi* di ⚙ Pengaturan untuk
mematikan seluruh efek gerak. Permainan bisa pula dijalankan sepenuhnya dengan keyboard
(`Tab` berpindah, `Enter` memilih, `Esc` menutup).

**Bila tampilan tampak berbeda dari yang Bapak/Ibu siapkan,** muat ulang halaman sekali —
versi baru sengaja menunggu sampai pengguna menekan tombol MUAT ULANG agar tidak berganti
di tengah sidang.

## Sasaran & durasi
- Jenjang: SMP kelas VII–IX
- Mapel: Informatika — Dampak Sosial Informatika & Berpikir Komputasional
- Durasi: 4 × 40 menit (1 kasus per pertemuan) atau 2 × 80 menit
- Perangkat: laptop/tablet/proyektor. Bisa dimainkan berkelompok 3–4 siswa.

## Empat sidang
| KASUS | TOPIK | PRINSIP | DURASI |
|---|---|---|---|
| ADIL-001 Beasiswa yang Berat Sebelah | Data Bias | bias data, transparansi | 40 menit |
| ADIL-002 Siswa yang Tak Terlihat | Algorithmic Bias | bias algoritma, akuntabilitas | 40 menit |
| ADIL-003 Masa Depan yang Ditentukan AI | Human Autonomy | otonomi, privasi | 40 menit |
| ADIL-004 Hakim Algoritma | Human Oversight | pengawasan manusia | 40 menit |

## Alur satu pertemuan (40 menit)
| WAKTU | KEGIATAN |
|---|---|
| 5' | Pemantik: "Pernahkah kamu dinilai oleh sistem otomatis?" |
| 20' | Siswa memainkan satu sidang (briefing → bukti → interogasi → analisis → putusan) |
| 10' | Diskusi kelas memakai **Mode Guru** yang muncul setelah putusan |
| 5' | Tugas refleksi tertulis |

## Mode Guru
Setelah putusan, aktifkan **MODE GURU** (kotak centang di layar hasil) atau buka menu **GURU**
di bagian atas. Isinya: isu kasus, tujuan pembelajaran, prinsip etika AI, ringkasan penalaran
siswa pada sesi itu, pertanyaan refleksi, aktivitas diskusi, tugas, dan miskonsepsi yang sering muncul.
Halaman **Panduan Guru** dapat dicetak sebagai lembar persiapan.

## Membaca hasil siswa
| ANGKA | ARTINYA |
|---|---|
| Evidence Score | ketelitian mengumpulkan bukti yang relevan |
| Reasoning Score | keberanian bertanya + ketepatan memilih bukti kunci |
| Ethics Score | kualitas putusan: memperbaiki sistem, bukan sekadar menyalahkan |
| Profil Analis | gaya berpikir dominan siswa (bukan peringkat benar/salah) |

Skor rendah pada Ethics biasanya berarti siswa memilih jalan pintas ("hapus AI-nya" atau
"AI sengaja jahat"). Ini justru bahan diskusi terbaik — tanyakan alasannya sebelum mengoreksi.

## Saran penilaian kelas
- 40% proses bermain (Evidence + Reasoning)
- 30% kualitas putusan dan alasan lisan
- 30% tugas refleksi tertulis

## Catatan penting
Jangan menghadirkan AI sebagai penjahat. Setiap kasus memuat bagian **manfaat sistem** —
tekankan bahwa tugas siswa adalah menilai, bukan menolak teknologi.

Seluruh isi panduan ini bersumber dari `src/data/learning.json` dan dapat disunting
tanpa menyentuh kode program.

## Catatan teknis singkat
Progres di **tengah** sidang tidak tersimpan: bila halaman dimuat ulang saat siswa sedang
memindai bukti, sidang itu mulai dari awal. Skor sidang yang sudah selesai tidak terpengaruh.
Ingatkan siswa untuk tidak menutup tab sebelum putusan dijatuhkan.
