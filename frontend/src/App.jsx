import { useState, useEffect } from 'react';
import { SendHorizontal, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('edubot_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error parsing sessions", e);
      }
    }
    return [{ 
      id: Date.now().toString(), 
      title: 'Percakapan Baru', 
      messages: [], 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
  });
  
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const savedActiveId = localStorage.getItem('edubot_active_session_id');
    if (savedActiveId && sessions.some(s => s.id === savedActiveId)) {
      return savedActiveId;
    }
    return sessions[0].id;
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('edubot_theme') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Settings
  const [educationLevel, setEducationLevel] = useState('SMA');
  const [teachingStyle, setTeachingStyle] = useState('Explanatory');

  useEffect(() => {
    localStorage.setItem('edubot_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('edubot_active_session_id', activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edubot_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edubot_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = activeSession.messages;

  const handleNewChat = () => {
    const now = new Date().toISOString();
    const newId = Date.now().toString();
    const newSession = { 
      id: newId, 
      title: 'Percakapan Baru', 
      messages: [], 
      createdAt: now,
      updatedAt: now
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleSwitchSession = (id) => {
    setActiveSessionId(id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin menghapus SELURUH riwayat percakapan?')) {
      const now = new Date().toISOString();
      const defaultId = Date.now().toString();
      const defaultSession = [{ id: defaultId, title: 'Percakapan Baru', messages: [], createdAt: now, updatedAt: now }];
      setSessions(defaultSession);
      setActiveSessionId(defaultId);
      localStorage.removeItem('edubot_sessions');
      localStorage.removeItem('edubot_active_session_id');
    }
  };

  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    if (sessions.length === 1) { handleReset(); return; }
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (activeSessionId === id) setActiveSessionId(filtered[0].id);
  };

  const handleRenameSession = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, title: newTitle.trim(), updatedAt: new Date().toISOString() } : s));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const now = new Date().toISOString();
    const updatedMessages = [...messages, { role: 'user', text: userText }];
    const newTitle = messages.length === 0 ? (userText.length > 25 ? userText.substring(0, 25) + '...' : userText) : activeSession.title;

    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: updatedMessages, title: newTitle, updatedAt: now } : s));
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: updatedMessages.slice(-10), educationLevel, teachingStyle })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server error');

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) return { ...s, messages: [...updatedMessages, { role: 'model', text: data.result }], updatedAt: new Date().toISOString() };
        return s;
      }));
    } catch (error) {
      console.error(error);
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) return { ...s, messages: [...updatedMessages, { role: 'model', text: 'Maaf, terjadi kesalahan atau koneksi terputus. Silakan coba lagi.' }], updatedAt: new Date().toISOString() };
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 shrink-0" >
              <Sidebar 
                educationLevel={educationLevel} setEducationLevel={setEducationLevel}
                teachingStyle={teachingStyle} setTeachingStyle={setTeachingStyle}
                onResetSession={handleReset}
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSwitchSession={handleSwitchSession}
                onNewChat={handleNewChat}
                onDeleteSession={handleDeleteSession}
                onRenameSession={handleRenameSession}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                onClose={() => setIsSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        <header className="h-16 flex items-center px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 shrink-0">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 transition-all mr-3">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300 truncate">{activeSession.title}</h2>
          </div>
        </header>

        <ChatWindow messages={messages} isLoading={isLoading} isDarkMode={isDarkMode} />
        
        <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-center">
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan materi yang ingin kamu pelajari..."
              disabled={isLoading}
              className="w-full pl-6 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 disabled:opacity-50"
            />
            <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-colors">
              <SendHorizontal size={20} />
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-3">EduBot dapat melakukan kesalahan. Harap periksa kembali informasi penting.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
