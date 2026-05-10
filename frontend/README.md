# EduBot Frontend 🎨

Antarmuka pengguna premium untuk EduBot AI Chatbot yang dibangun dengan teknologi web modern untuk memberikan pengalaman belajar yang interaktif dan nyaman.

## 🛠️ Stack Teknologi
- **Core**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern, Utility-first)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth transitions & Sidebar effects)
- **Icons**: [Lucide React](https://lucide.dev/) (Clean & Minimalist icons)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) & [Typography Plugin](https://tailwindcss.com/docs/typography-plugin)

## 🌟 Fitur Unggulan
- **Manajemen Sesi Lokal**: Riwayat chat tersimpan di `localStorage` dengan dukungan banyak sesi sekaligus.
- **Sidebar Dinamis**: Navigasi yang responsif, dapat disembunyikan, dan mendukung tampilan mobile (overlay).
- **Mode Gelap & Terang**: Perpindahan tema yang mulus dengan persistensi status.
- **Fitur Interaktif History**:
    - **Rename**: Ubah nama judul chat sesuai keinginan.
    - **Delete**: Hapus sesi chat tertentu atau bersihkan seluruh riwayat.
    - **Timestamps**: Info jam dan tanggal pada setiap riwayat chat.
- **Typing Indicator**: Animasi saat bot sedang memproses jawaban.

## 📥 Cara Instalasi
1. Masuk ke folder: `cd frontend`
2. Instal dependensi: `npm install`
3. Jalankan server dev: `npm run dev`

Pastikan backend berjalan di `http://localhost:3000` agar frontend dapat berkomunikasi dengan API.
