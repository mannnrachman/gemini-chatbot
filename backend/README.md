# EduBot AI Backend API

Backend servis untuk EduBot AI menggunakan Node.js dan Express.

## 🌟 Fitur Backend

- **Streaming Output**: Menggunakan `generateContentStream` dan `sendMessageStream` untuk pengiriman data real-time.
- **Native History Management**: Menggunakan fitur `ChatSession` dari Google GenAI SDK untuk pengelolaan konteks yang lebih stabil.
- **Zod Validation**: Validasi skema request yang ketat untuk memastikan integritas data.
- **Rate Limiting**: Keamanan terhadap spamming API (20 request per menit per IP).
- **ES Modules**: Menggunakan arsitektur JavaScript modern (ESM).

## 📦 Dependencies Utama

- `@google/genai`: SDK resmi terbaru untuk Google Gemini.
- `zod`: Library validasi skema data.
- `express-rate-limit`: Proteksi terhadap penyalahgunaan endpoint.

## ⚙️ Environment Variables

Buat file `.env` di folder ini:
```env
GEMINI_API_KEY=your_google_ai_studio_api_key
```

## 🚀 Menjalankan Server

```bash
npm install
node index.js
```
Server akan berjalan di `http://localhost:3000`.
