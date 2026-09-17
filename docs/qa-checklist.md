# ADIL — DAFTAR UJI SEBELUM RILIS

## Gameplay
- [ ] Alur satu kasus utuh: briefing → bukti → interogasi → analisis → putusan → hasil
- [ ] Bukti terbuka hanya setelah dipindai; temuan muncul dengan umpan balik
- [ ] Fase Analisis terkunci sebelum 3 berkas dipindai
- [ ] Fase Putusan terkunci sebelum analisis dikunci
- [ ] Skor = Evidence + Reasoning + Ethics, tidak pernah melebihi 100
- [ ] Setiap opsi putusan memberi umpan balik yang berbeda
- [ ] Lencana terbuka sesuai syarat di `endings.json` dan tidak dobel
- [ ] Profil analis berubah mengikuti cara bermain
- [ ] Ending akhir muncul setelah keempat sidang selesai
- [ ] Kasus terkunci berurutan; membuka ulang kasus tidak menurunkan skor tersimpan

## Konten
- [ ] `validateContent()` tidak melaporkan masalah di console
- [ ] Setiap kasus punya entri `learning.json` lengkap
- [ ] Tidak ada teks kasus yang ditulis langsung di file .tsx
- [ ] Tidak ada kasus yang menggambarkan AI sebagai penjahat tanpa konteks manfaat

## Teknis
- [ ] Tidak ada error di console
- [ ] Save/load bertahan setelah refresh
- [ ] Reset dosir mengosongkan skor, lencana, dan progres
- [ ] Tidak ada state rusak saat refresh di tengah kasus
- [ ] Game berjalan tanpa satu pun file aset (mode kerangka)
- [ ] `npm run build` sukses tanpa error TypeScript

## Responsif
- [ ] 1920×1080
- [ ] 1366×768
- [ ] 1280×720
- [ ] Tablet landscape (1024×768)
- [ ] Teks minimal 12 px; area klik minimal 44 px

## Audio
- [ ] Suara tokoh tidak pernah bertumpuk
- [ ] Tombol AUDIO mematikan musik, suara, dan efek
- [ ] Musik hanya mulai setelah interaksi pertama (kebijakan autoplay)
- [ ] Subtitle tetap tampil meski audio mati
