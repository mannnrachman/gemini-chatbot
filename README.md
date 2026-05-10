# EduBot AI Chatbot 🎓

EduBot adalah chatbot berbasis AI cerdas yang dirancang sebagai asisten pendidikan interaktif tingkat lanjut. Menggunakan model **Google Gemini API**, bot ini mampu menyesuaikan gaya mengajar, tingkat kesulitan materi, dan preferensi visual pengguna secara dinamis.

## 📁 Struktur Proyek

Proyek ini menggunakan arsitektur modular yang memisahkan Frontend dan Backend secara bersih:

*   **`backend/`**: Server Node.js + Express. Menangani logika komunikasi API Gemini, penyusunan instruksi sistem dinamis, dan keamanan melalui rate limiting.
*   **`frontend/`**: Aplikasi Single Page (SPA) berbasis React.js + Vite + Tailwind CSS v4. Menawarkan antarmuka modern yang responsif dengan fitur manajemen sesi yang lengkap.

## ✨ Fitur Utama yang Ditingkatkan

- **Multi-Session Chat History**: Simpan banyak percakapan sekaligus. Setiap sesi memiliki riwayat mandiri yang tersimpan di `localStorage`.
- **Persistent Dark Mode**: Dukungan penuh mode gelap yang elegan, tersimpan secara otomatis berdasarkan pilihan pengguna.
- **Responsive Sidebar & Navigation**: Sidebar yang dapat disembunyikan (collapsible) dengan animasi smooth menggunakan Framer Motion.
- **Session Management**: Fitur untuk membuat chat baru, menghapus sesi tertentu, hingga mengubah nama (*rename*) judul percakapan.
- **Activity Timestamps**: Setiap riwayat chat dilengkapi dengan informasi tanggal dan waktu interaksi terakhir.
- **Creative Parameters**: Penyesuaian materi berdasarkan:
    - **Tingkat Pendidikan**: SD, SMP, SMA, Mahasiswa, hingga Umum.
    - **Metode Mengajar**: Socratic (Pancingan), Explanatory (Detail), dan Summary (Ringkasan).
- **Markdown & Code Highlight**: Jawaban bot ditampilkan dengan format teks kaya (bold, list, table) dan blok kode yang rapi.

## 🚀 Cara Menjalankan Proyek

### 1. Persiapan API Key
Dapatkan API Key Gemini Anda secara gratis di [Google AI Studio](https://aistudio.google.com/).

### 2. Konfigurasi Backend
```bash
cd backend
npm install
# Buat file .env dan tambahkan key Anda:
# GEMINI_API_KEY=MASUKKAN_KEY_ANDA_DISINI
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
*Dibuat dengan fokus pada pengalaman belajar yang personal, estetika premium, dan fungsionalitas asisten AI modern.*
