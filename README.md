# EduBot AI - Smart Educational Assistant

EduBot AI adalah asisten pendidikan yang menggunakan Google Gemini API (model `gemini-2.5-flash`). Proyek ini dirancang untuk membantu proses belajar melalui interaksi chat yang dapat disesuaikan dengan tingkat pendidikan dan gaya mengajar.

![Chat Interface](images/chat.png)

## Fitur Utama

- **Real-time Streaming**: Respons bot ditampilkan secara instan saat data diterima dari server.
- **Manajemen Data**: Mendukung ekspor/impor seluruh data atau percakapan tunggal dalam format JSON.
- **Kustomisasi Prompt**: Pengguna dapat mengubah instruksi sistem untuk setiap tingkat pendidikan dan gaya mengajar.
- **Mode Gelap**: Antarmuka mendukung tema terang dan gelap secara persisten.
- **Syntax Highlighting**: Penampilan blok kode pemrograman yang rapi dan mudah dibaca.

![Settings Modal](images/pengaturan.png)

## Struktur Proyek

- **`backend/`**: Server Node.js + Express. Menangani komunikasi dengan Gemini API dan validasi data.
- **`frontend/`**: Aplikasi React + Vite. Antarmuka pengguna dengan Tailwind CSS v4 dan Framer Motion.

## Cara Menjalankan

### Backend
1. Masuk ke folder `backend`.
2. Buat file `.env` dan tambahkan `GEMINI_API_KEY=your_key_here`.
3. Jalankan `npm install` kemudian `node index.js`.

### Frontend
1. Masuk ke folder `frontend`.
2. Jalankan `npm install` kemudian `npm run dev`.
3. Akses aplikasi melalui `http://localhost:5173`.

---
Dibuat untuk mendukung personalisasi dalam proses belajar mengajar.
