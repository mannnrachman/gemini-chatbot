# EduBot AI - Smart Educational Assistant

EduBot AI adalah asisten pendidikan cerdas yang ditenagai oleh Google Gemini API (model `gemini-2.5-flash`). Aplikasi ini dirancang untuk membantu proses belajar dengan berbagai tingkat pendidikan dan gaya mengajar yang dapat dikustomisasi.

## 🚀 Fitur Unggulan

- **Real-time Streaming**: Respons bot ditampilkan secara instan saat dihasilkan, memberikan pengalaman chat yang sangat responsif.
- **Manajemen Data (Backup & Restore)**:
  - Ekspor seluruh riwayat chat dan pengaturan ke file JSON.
  - Ekspor percakapan tunggal (satuan) langsung dari sidebar.
  - Fitur *Smart Merge* saat mengimpor data agar tidak kehilangan riwayat yang ada.
- **Tipografi Modern & Premium**: Menggunakan font **Outfit** untuk judul dan **Inter** untuk teks isi, memberikan kesan profesional dan bersih.
- **Visual & UX**:
  - **Syntax Highlighting**: Blok kode pemrograman ditampilkan dengan pewarnaan yang cantik.
  - **Copy to Clipboard**: Salin kode atau pesan bot dengan satu klik.
  - **Dark Mode**: Dukungan penuh mode gelap yang nyaman di mata.
- **Socratic Method**: Bot dapat diatur untuk mengajar menggunakan metode Socratik (bertanya kembali untuk memancing pemikiran kritis).

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: Node.js (Express), SDK `@google/genai` (V2), Zod (Validation), Express Rate Limit.

## 📖 Cara Menjalankan

1. **Persiapan API Key**: Dapatkan API Key Gemini dari [Google AI Studio](https://aistudio.google.com/).
2. **Setup Backend**:
   - Masuk ke folder `backend`.
   - Buat file `.env` dan tambahkan `GEMINI_API_KEY=your_key_here`.
   - Jalankan `npm install` lalu `node index.js`.
3. **Setup Frontend**:
   - Masuk ke folder `frontend`.
   - Jalankan `npm install` lalu `npm run dev`.
   - Buka `http://localhost:5173` di browser Anda.

---
Dikembangkan dengan ❤️ untuk pendidikan yang lebih baik.
