# EduBot Backend 🛠️

Bagian ini menangani seluruh logika komunikasi dengan Google Gemini API.

## Teknologi
- Node.js & Express
- @google/genai SDK
- dotenv (Environment Variables)
- express-rate-limit (Security)

## Endpoints
- `POST /api/chat`: Menerima riwayat percakapan dan parameter kreatif (educationLevel, teachingStyle).

## Cara Menjalankan
1. `npm install`
2. Pastikan file `.env` sudah terisi dengan `GEMINI_API_KEY`.
3. `node index.js`
