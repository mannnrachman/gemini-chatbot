import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import TypingIndicator from './TypingIndicator';
import { Bot, User as UserIcon, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden my-4 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
        <span>{language || 'code'}</span>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '1.25rem', fontSize: '0.875rem', lineHeight: '1.5' }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default function ChatWindow({ messages, isLoading, isDarkMode }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 chat-scrollbar bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {messages.length === 0 && !isLoading && (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
          <Bot size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">Mulai sesi belajar baru</p>
          <p className="text-sm mt-2 text-center max-w-sm">Tanyakan materi yang tidak kamu pahami, EduBot siap membantu!</p>
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
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
              {msg.role === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
            </div>

            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm prose dark:prose-invert prose-sm max-w-none prose-headings:font-bold prose-p:leading-relaxed'}`}>
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap m-0">{msg.text}</p>
              ) : (
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      const value = String(children).replace(/\n$/, '');
                      return !inline && match ? (
                        <CodeBlock language={match[1]} value={value} />
                      ) : (
                        <code className={`${className} bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-medium`} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
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
