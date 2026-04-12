# BelajarKu – Latihan Soal PWA

Aplikasi latihan soal interaktif berbasis PWA (Progressive Web App), bisa di-install di iPhone dan Android.

## 📁 Struktur File

```
📦 repository/
├── index.html        ← Aplikasi utama
├── manifest.json     ← PWA manifest
├── sw.js             ← Service Worker (offline support)
├── soal.json         ← DATABASE SOAL (edit file ini!)
└── icons/
    ├── icon-192.png  ← Icon app 192×192px
    └── icon-512.png  ← Icon app 512×512px
```

## ✏️ Cara Menambah/Edit Soal

Edit file `soal.json`. Setiap soal mengikuti format berikut:

```json
[
  {
    "pertanyaan": "Tulis pertanyaan di sini?",
    "options": ["Jawaban A", "Jawaban B", "Jawaban C", "Jawaban D"],
    "correctAnswer": "Jawaban A",
    "tipe": "Nama Kategori",
    "referensi": "Nama Buku Referensi",
    "halaman": "10",
    "penjelasan": "Penjelasan mengapa jawaban ini benar."
  }
]
```

> ⚠️ **Penting:** `correctAnswer` harus **persis sama** dengan salah satu teks di `options`.

| Field | Wajib | Keterangan |
|-------|-------|------------|
| `pertanyaan` | ✅ | Teks soal |
| `options` | ✅ | Array jawaban (min. 2, maks. 5) |
| `correctAnswer` | ✅ | Jawaban benar (harus sama dengan salah satu option) |
| `tipe` | — | Kategori/materi soal |
| `referensi` | — | Sumber referensi |
| `halaman` | — | Halaman referensi |
| `penjelasan` | — | Pembahasan jawaban |

## 🚀 Deploy ke GitHub Pages

1. Upload semua file ke repository GitHub
2. Buat folder `icons/` dan tambahkan icon PNG
3. Masuk ke **Settings → Pages → Branch: main → Save**
4. Akses via `https://username.github.io/nama-repo/`

## 📱 Install di iPhone (Add to Home Screen)

1. Buka URL di **Safari** (wajib Safari, bukan Chrome/Firefox)
2. Tap tombol **Share** (ikon kotak + panah atas)
3. Pilih **"Add to Home Screen"**
4. Tap **"Add"**
5. App akan muncul di Home Screen seperti aplikasi biasa!

## 🔄 Update Soal

Setiap kali update `soal.json`, naikan versi cache di `sw.js`:
```js
const CACHE_NAME = 'belajarku-v2'; // ganti angkanya
```

## 🎮 Fitur Aplikasi

- **Mode Belajar** – Belajar per kategori, lihat pembahasan tiap soal
- **Mode Ujian** – 10 soal acak, timer 60 menit, sistem bendera soal
- **Offline** – Bisa diakses tanpa internet setelah pertama dibuka
- **PWA** – Install di Home Screen iPhone/Android
