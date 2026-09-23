# ADIL — DAFTAR UJI SEBELUM RILIS

Butir bertanda [x] sudah terverifikasi. Sebagian besar dijaga otomatis oleh `npm test`
(17 tes, lihat `tests/`), sisanya diperiksa manual pada 2026-09-23. Butir yang masih
kosong belum pernah diuji.

## Gameplay
- [x] Alur satu kasus utuh: briefing → bukti → interogasi → analisis → putusan → hasil
- [x] Bukti terbuka hanya setelah dipindai; temuan muncul dengan umpan balik
- [x] Fase Analisis terkunci sebelum 3 berkas dipindai
- [x] Fase Putusan terkunci sebelum analisis dikunci
- [x] Skor = Evidence + Reasoning + Ethics, tidak pernah melebihi 100
- [x] Setiap opsi putusan memberi umpan balik yang berbeda
- [x] Lencana terbuka sesuai syarat di `endings.json` dan tidak dobel
- [ ] Profil analis berubah mengikuti cara bermain
- [x] Ending akhir muncul setelah keempat sidang selesai
- [x] Kasus terkunci berurutan; membuka ulang kasus tidak menurunkan skor tersimpan

## Konten
- [x] `validateContent()` tidak melaporkan masalah di console
- [x] Setiap kasus punya entri `learning.json` lengkap
- [x] Tidak ada teks kasus yang ditulis langsung di file .tsx
- [x] Tidak ada kasus yang menggambarkan AI sebagai penjahat tanpa konteks manfaat

## Teknis
- [x] Tidak ada error di console
- [x] Save/load bertahan setelah refresh
- [x] Reset dosir mengosongkan skor, lencana, dan progres
- [x] Tidak ada state rusak saat refresh di tengah kasus
      > Catatan: progres di tengah sidang memang tidak disimpan — sidang mulai ulang
      > dari briefing, tanpa error, dan skor sidang yang sudah selesai tetap aman.
- [x] Game berjalan tanpa satu pun file aset (mode kerangka)
- [x] `npm run build` sukses tanpa error TypeScript

## Responsif
- [x] 1920×1080
- [x] 1366×768
- [x] 1280×720
- [x] Tablet landscape (1024×768)
- [x] Teks minimal 12 px; area klik minimal 44 px

## Audio
> Dicek manual di perangkat ber-suara; browser headless selalu bisu sehingga tidak bisa
> dijamin oleh tes otomatis.

- [ ] Suara tokoh tidak pernah bertumpuk
- [ ] Tombol AUDIO mematikan musik, suara, dan efek
- [ ] Musik hanya mulai setelah interaksi pertama (kebijakan autoplay)
- [x] Subtitle tetap tampil meski audio mati
