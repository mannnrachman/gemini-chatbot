import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash";

export const generateChatResponse = async (req, res) => {
    const { conversation, educationLevel, teachingStyle, customSystemInstruction } = req.body;
    try {
        if (!Array.isArray(conversation)) {
            return res.status(400).json({ error: 'Messages must be an array!' });
        }

        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        let sysInstruction = "";
        
        if (customSystemInstruction) {
            sysInstruction = customSystemInstruction;
        } else {
            // Fallback to default dynamic logic
            sysInstruction = "Anda adalah EduBot, asisten pendidikan cerdas yang menggunakan bahasa Indonesia.";
            
            if (educationLevel) {
                sysInstruction += ` Tingkat audiens/pendidikan pengguna adalah ${educationLevel}. Sesuaikan analogi, kompleksitas materi, dan kosa kata dengan level ini secara alami.`;
            }
            
            if (teachingStyle === 'Socratic') {
                sysInstruction += ` Gaya mengajar Anda adalah Socratic Method: Dilarang keras memberikan jawaban langsung di awal. Ajukan 1-2 pertanyaan pancingan atau petunjuk ringan agar pengguna bisa menganalisis dan menemukan jawabannya sendiri secara bertahap.`;
            } else if (teachingStyle === 'Explanatory') {
                sysInstruction += ` Gaya mengajar Anda adalah Explanatory: Berikan penjelasan yang komprehensif, logis, terstruktur dengan baik (gunakan poin-poin/list), berikan contoh konkret, dan mudah dipahami.`;
            } else if (teachingStyle === 'Summary') {
                sysInstruction += ` Anda dalam mode Summary: Berikan ringkasan materi yang sangat padat, singkat, jelas, dan berisi poin-poin utama saja tanpa basa-basi panjang.`;
            } else {
                sysInstruction += ` Berikan respons yang informatif, ramah, dan membantu.`;
            }
        }

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                temperature: 0.9,
                systemInstruction: sysInstruction,
            },
        });
        
        res.status(200).json({ result: response.text });
    } catch (e) {
        console.error('API Error:', e.message); 
        res.status(500).json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' }); 
    }
};
