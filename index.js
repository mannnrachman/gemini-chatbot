import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Implementasi Best Practice: Rate Limiting
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 20, // maksimal 20 request per IP setiap 1 menit
    message: { error: 'Terlalu banyak permintaan, silakan coba lagi nanti.' }
});

// Gunakan routes dan rate limiter
app.use('/api/chat', apiLimiter, chatRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
