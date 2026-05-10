import { useState, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('edubot_session');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Settings
  const [educationLevel, setEducationLevel] = useState('SMA');
  const [teachingStyle, setTeachingStyle] = useState('Explanatory');

  useEffect(() => {
    localStorage.setItem('edubot_session', JSON.stringify(messages));
  }, [messages]);

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin menghapus riwayat sesi ini?')) {
      setMessages([]);
      localStorage.removeItem('edubot_session');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Send last 10 messages for context window
          conversation: newMessages.slice(-10),
          educationLevel,
          teachingStyle
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error');
      }

      setMessages(prev => [...prev, { role: 'model', text: data.result }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan atau koneksi terputus. Silakan coba lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        educationLevel={educationLevel} 
        setEducationLevel={setEducationLevel}
        teachingStyle={teachingStyle}
        setTeachingStyle={setTeachingStyle}
        onResetSession={handleReset}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow messages={messages} isLoading={isLoading} />
        
        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan materi yang ingin kamu pelajari..."
              disabled={isLoading}
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <SendHorizontal size={20} />
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-3">
            EduBot dapat melakukan kesalahan. Harap periksa kembali informasi penting.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
