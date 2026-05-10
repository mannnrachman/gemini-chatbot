# EduBot Backend

API server untuk EduBot yang menangani pemrosesan pesan melalui Google Gemini AI.

## Fitur Backend
- **Streaming Response**: Menggunakan `sendMessageStream` untuk pengiriman data real-time ke frontend.
- **Zod Validation**: Validasi skema input untuk menjamin keamanan data.
- **Rate Limiting**: Pembatasan jumlah request untuk menjaga kestabilan penggunaan API.
- **Native History**: Manajemen riwayat percakapan menggunakan fitur bawaan Google GenAI SDK.

## Konfigurasi
Gunakan file `.env` di direktori ini:
```env
GEMINI_API_KEY=your_api_key_here
```

## Instalasi & Menjalankan
```bash
npm install
node index.js
```
Server akan berjalan di `http://localhost:3000`.
