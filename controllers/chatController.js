import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash";

export const generateChatResponse = async (req, res) => {
    const { conversation } = req.body;
    try {
        if (!Array.isArray(conversation)) {
            return res.status(400).json({ error: 'Messages must be an array!' });
        }

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.9,
                systemInstruction: "Jawab hanya menggunakan bahasa Indonesia.",
            },
        });
        
        res.status(200).json({ result: response.text });
    } catch (e) {
        // Best Practice: Log error asli untuk keperluan debugging di backend
        console.error('API Error:', e.message); 
        // Best Practice: Sembunyikan e.message dari user
        res.status(500).json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' }); 
    }
};
