# EduBot Backend 🛠️

Mesin utama EduBot yang menangani pemrosesan bahasa alami menggunakan model Google Gemini AI dan mengelola instruksi sistem pendidikan secara dinamis.

## 🛠️ Stack Teknologi
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Engine**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **Security**: [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) (Melindungi kuota API dari penyalahgunaan)
- **CORS**: Mengizinkan akses lintas domain dari frontend.

## 🧠 Logika Instruksi Sistem
Backend secara dinamis menyusun *System Instruction* berdasarkan parameter yang dikirim frontend:
- **Tingkat Pendidikan**: Menentukan kompleksitas bahasa dan kedalaman penjelasan.
- **Gaya Mengajar**: 
    - `Socratic`: Bertanya balik untuk memancing pemikiran kritis.
    - `Explanatory`: Memberikan penjelasan langkah-demi-langkah yang detail.
    - `Summary`: Fokus pada poin-poin inti dan kesimpulan cepat.

## 🔌 API Endpoints
### `POST /api/chat`
Endpoint utama untuk mendapatkan respon AI.
**Request Body:**
```json
{
  "conversation": [{"role": "user", "text": "..."}, ...],
  "educationLevel": "SMA",
  "teachingStyle": "Explanatory"
}
```

## 📥 Cara Instalasi
1. Masuk ke folder: `cd backend`
2. Instal dependensi: `npm install`
3. Buat file `.env` dan isi: `GEMINI_API_KEY=your_api_key_here`
4. Jalankan server: `node index.js`
