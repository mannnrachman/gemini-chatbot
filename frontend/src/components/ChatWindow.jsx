import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';
import { Bot, User as UserIcon } from 'lucide-react';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 chat-scrollbar">
      {messages.length === 0 && !isLoading && (
        <div className="h-full flex flex-col items-center justify-center text-slate-400">
          <Bot size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium text-slate-500">Mulai sesi belajar baru</p>
          <p className="text-sm mt-2 text-center max-w-sm">Tanyakan materi yang tidak kamu pahami, EduBot siap membantu dengan penjelasan yang sesuai dengan levelmu!</p>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={idx} 
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-green-100 text-green-700'}`}>
              {msg.role === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm prose prose-sm max-w-none'}`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap m-0">{msg.text}</p>
              ) : (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-700">
              <Bot size={20} />
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
