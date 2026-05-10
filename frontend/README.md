# EduBot Frontend 🎨

Antarmuka pengguna premium untuk EduBot AI Chatbot, dirancang untuk memberikan kontrol penuh kepada pengguna atas perilaku AI melalui kustomisasi prompt yang dinamis.

## 🛠️ Stack Teknologi
- **Core**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) & [Typography Plugin](https://tailwindcss.com/docs/typography-plugin)

## 🌟 Fitur Utama
- **Konfigurasi Prompt Dinamis**: Modal pengaturan yang memungkinkan pengguna mengedit teks instruksi sistem untuk setiap kategori (SD, SMP, Socratic, dll).
- **Manajemen Sesi Lokal**: Banyak sesi chat sekaligus dengan penyimpanan otomatis di `localStorage`.
- **Sidebar & Header Responsif**: Navigasi collapsible dengan hamburger menu untuk pengalaman layar penuh.
- **Interaksi History Lengkap**:
    - **Rename**: Judul chat yang dapat diedit manual.
    - **Delete**: Hapus sesi satu per satu atau sekaligus.
    - **Timestamps**: Label waktu aktivitas terakhir per sesi.
- **Mode Gelap Persisten**: Tema yang tersimpan otomatis sesuai preferensi pengguna.

## 📥 Cara Instalasi
1. Masuk ke folder: `cd frontend`
2. Instal dependensi: `npm install`
3. Jalankan server dev: `npm run dev`

Frontend akan berjalan di `http://localhost:5173` dan berkomunikasi dengan backend di `http://localhost:3000`.
