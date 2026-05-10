# Changelog

Semua perubahan penting pada proyek **EduBot AI** akan dicatat di file ini.

## [1.1.0] - 2026-05-10

### 🚀 Added
- **Real-time Streaming**: Respons bot kini muncul secara bertahap (streaming), menghilangkan jeda tunggu bagi pengguna.
- **Data Management Hub**:
  - Fitur **Export All** untuk mencadangkan seluruh riwayat dan pengaturan ke file JSON.
  - Fitur **Import Restore** dengan teknologi *Smart Merge* untuk menggabungkan data tanpa menghapus chat yang ada.
  - Fitur **Individual Export**: Tombol unduh langsung pada tiap sesi percakapan di sidebar.
- **Premium Typography**: Integrasi Google Fonts (**Outfit** & **Inter**) untuk tampilan yang lebih modern dan profesional.
- **Dev Experience Enhancements**:
  - **Syntax Highlighting**: Blok kode di dalam chat kini memiliki pewarnaan sintaks.
  - **Copy to Clipboard**: Tombol salin instan pada pesan bot dan blok kode.
- **Backend Robustness**:
  - Validasi request menggunakan **Zod**.
  - Pengelolaan riwayat percakapan menggunakan **Native ChatSession** dari Gemini SDK.

### 💅 Changed
- Pembaruan tema Dark Mode agar lebih konsisten dan kontras.
- Optimasi komponen `ChatWindow` untuk menangani perenderan Markdown yang lebih kompleks (tabel, list, dll).
- Sinkronisasi seluruh dokumentasi README di root, backend, dan frontend.

### 🛠️ Fixed
- Perbaikan masalah import ikon pada Sidebar.
- Perbaikan pengelolaan state saat melakukan pergantian sesi chat yang cepat.

---
*Release v1.1.0 - "The Educational Stream Release"*
