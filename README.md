# EduBot AI Chatbot 🎓

EduBot adalah chatbot berbasis AI cerdas yang dirancang sebagai asisten pendidikan interaktif. Menggunakan model **Google Gemini API**, bot ini dapat menyesuaikan gaya mengajar dan tingkat pendidikan pengguna secara dinamis.

## 📁 Struktur Proyek

Proyek ini memiliki arsitektur yang terpisah antara Frontend dan Backend:

*   **`backend/`**: Node.js + Express Server. Menangani logika API Gemini, instruksi sistem dinamis, dan perlindungan rate limiting.
*   **`frontend/`**: React.js + Vite + Tailwind CSS. Antarmuka modern dengan fitur markdown, animasi, dan manajemen sesi.

## ✨ Fitur Utama

- **Creative Parameters**: Sesuaikan gaya bahasa berdasarkan tingkat pendidikan (SD, SMP, SMA, Kuliah) dan metode mengajar (Socratic, Explanatory, Summary).
- **Contextual Memory**: Riwayat percakapan tersimpan secara otomatis menggunakan `localStorage`.
- **Modern UI/UX**: Desain bersih menggunakan Tailwind CSS, ikon dari Lucide React, dan animasi dari Framer Motion.
- **Markdown Support**: Bot memberikan jawaban yang terstruktur dengan format teks yang kaya.
- **Security**: Implementasi rate limiting di backend untuk mencegah penyalahgunaan API.

## 🚀 Cara Menjalankan Proyek

### 1. Persiapan API Key
Dapatkan API Key Gemini Anda di [Google AI Studio](https://aistudio.google.com/).

### 2. Konfigurasi Backend
```bash
cd backend
npm install
# Buat file .env dan tambahkan key Anda:
# GEMINI_API_KEY=AIzaSy...
node index.js
```

### 3. Konfigurasi Frontend
Buka terminal baru:
```bash
cd frontend
npm install
npm run dev
```

Akses EduBot di browser melalui: `http://localhost:5173`

---
*Dibuat untuk tugas chatbot AI dengan fokus pada interaktivitas dan parameter kreatif.*
