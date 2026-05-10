# EduBot Backend 🛠️

Backend EduBot yang fleksibel, mendukung instruksi sistem dinamis untuk kustomisasi AI yang maksimal.

## 🛠️ Stack Teknologi
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Engine**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **Security**: [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)

## 🧠 Fitur API
Backend ini mendukung dua mode instruksi sistem:
1.  **Custom Override**: Menerima `customSystemInstruction` langsung dari frontend untuk kontrol penuh atas perilaku AI.
2.  **Dynamic Fallback**: Secara otomatis menyusun instruksi berdasarkan `educationLevel` dan `teachingStyle` jika instruksi kustom tidak disediakan.

## 🔌 API Endpoints
### `POST /api/chat`
Endpoint utama untuk komunikasi AI.
**Request Body:**
```json
{
  "conversation": [{"role": "user", "text": "..."}, ...],
  "customSystemInstruction": "Teks instruksi kustom Anda di sini...",
  "educationLevel": "SMA", // Optional jika customSystemInstruction ada
  "teachingStyle": "Explanatory" // Optional jika customSystemInstruction ada
}
```

## 📥 Cara Instalasi
1. Masuk ke folder: `cd backend`
2. Instal dependensi: `npm install`
3. Isi file `.env` dengan `GEMINI_API_KEY`.
4. Jalankan: `node index.js`
