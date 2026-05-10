import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash";

const ChatSchema = z.object({
    conversation: z.array(z.object({
        role: z.enum(['user', 'model']),
        text: z.string()
    })),
    educationLevel: z.string().optional(),
    teachingStyle: z.string().optional(),
    customSystemInstruction: z.string().optional()
});

export const generateChatResponse = async (req, res) => {
    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
        const validation = ChatSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: 'Data tidak valid!', details: validation.error.format() });
        }

        const { conversation, educationLevel, teachingStyle, customSystemInstruction } = validation.data;

        let sysInstruction = "";
        
        if (customSystemInstruction) {
            sysInstruction = customSystemInstruction;
        } else {
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

        // Native History Management
        const history = conversation.slice(0, -1).map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));
        const lastMessage = conversation[conversation.length - 1].text;

        const chat = ai.chats.create({
            model: GEMINI_MODEL,
            config: {
                systemInstruction: sysInstruction,
                temperature: 0.9,
            },
            history: history
        });

        const stream = await chat.sendMessageStream({ message: lastMessage });
        
        for await (const chunk of stream) {
            if (chunk.text) {
                res.write(chunk.text);
            }
        }
        
        res.end();
    } catch (e) {
        console.error('API Error:', e.message); 
        if (!res.headersSent) {
            res.status(500).json({ error: 'Terjadi kesalahan pada server. Silakan coba lagi.' });
        } else {
            res.write('\n\n[ERROR: Terjadi kesalahan pada server]');
            res.end();
        }
    }
};
