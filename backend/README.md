# EduBot Backend 🛠️

Backend server yang efisien untuk mengelola komunikasi antara frontend dan Google Gemini AI.

## 🚀 Fitur Utama
- **Streaming Response**: Implementasi `sendMessageStream` untuk pengiriman data real-time ke pengguna.
- **Zod Validation**: Validasi data request yang ketat untuk memastikan integritas input.
- **Rate Limiting**: Keamanan terhadap penyalahgunaan API dengan batasan 20 request per menit.
- **Native Context Management**: Menggunakan fitur `ChatSession` dari Google GenAI SDK untuk pengelolaan riwayat yang lebih stabil dan akurat.
- **Dynamic Prompt Support**: Mendukung override instruksi sistem langsung dari frontend untuk kustomisasi bot yang maksimal.

## ⚙️ Konfigurasi
Gunakan file `.env` di direktori ini:
```env
GEMINI_API_KEY=your_google_api_key
```

## 📥 Instalasi & Menjalankan
```bash
npm install
node index.js
```
Server berjalan di `http://localhost:3000`.
