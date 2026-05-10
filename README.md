# EduBot AI Chatbot 🎓

EduBot adalah chatbot berbasis AI cerdas yang dirancang sebagai asisten pendidikan interaktif tingkat lanjut. Menggunakan model **Google Gemini API**, bot ini menawarkan fleksibilitas total di mana pengguna dapat mengontrol "jiwa" dan cara berpikir AI melalui antarmuka yang dinamis.

## 📁 Struktur Proyek

Proyek ini menggunakan arsitektur modular yang memisahkan Frontend dan Backend secara bersih:

*   **`backend/`**: Server Node.js + Express. Menangani logika komunikasi API Gemini dan mendukung instruksi sistem kustom dari frontend.
*   **`frontend/`**: Aplikasi Single Page (SPA) berbasis React.js + Vite + Tailwind CSS v4. Menawarkan antarmuka modern dengan fitur kustomisasi prompt yang mendalam.

## ✨ Fitur Unggulan Terbaru

- **Customizable System Prompts**: Kontrol penuh atas instruksi sistem. Edit teks prompt untuk setiap tingkat pendidikan dan gaya mengajar langsung melalui UI.
- **Advanced Settings Modal**: Antarmuka khusus untuk mengonfigurasi parameter AI tanpa mengganggu alur percakapan.
- **Multi-Session Chat History**: Simpan banyak percakapan sekaligus dengan riwayat mandiri di `localStorage`.
- **Persistent Dark Mode**: Dukungan penuh mode gelap yang elegan dan tersimpan otomatis.
- **Responsive Navigation**: Sidebar collapsible dengan animasi smooth dan hamburger menu untuk produktivitas maksimal.
- **Session Management**: Fitur rename judul chat, hapus sesi individu, dan pembersihan riwayat global.
- **Activity Timestamps**: Informasi tanggal dan jam interaksi terakhir untuk setiap riwayat chat.
- **Markdown & Code Highlight**: Jawaban bot terstruktur rapi dengan dukungan format teks kaya dan blok kode.

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
*Dibuat dengan fokus pada kebebasan kustomisasi, estetika premium, dan fungsionalitas asisten AI modern.*
