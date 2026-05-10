import { useState, useEffect } from 'react';
import { SendHorizontal, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import SettingsModal from './components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_PROMPTS = {
  levels: {
    SD: "Tingkat audiens/pendidikan pengguna adalah Sekolah Dasar (SD). Gunakan bahasa yang sangat sederhana, analogi dunia nyata yang mudah dipahami anak-anak, dan hindari istilah teknis yang rumit. Bersikaplah sangat sabar dan ceria.",
    SMP: "Tingkat audiens/pendidikan pengguna adalah Sekolah Menengah Pertama (SMP). Gunakan bahasa yang semi-formal, penjelasan yang logis namun tetap ringan, dan berikan contoh yang relevan dengan kehidupan remaja.",
    SMA: "Tingkat audiens/pendidikan pengguna adalah Sekolah Menengah Atas (SMA). Gunakan bahasa formal, penjelasan yang mendalam, dan hubungkan materi dengan konsep akademis yang lebih luas untuk persiapan kuliah.",
    Mahasiswa: "Tingkat audiens/pendidikan pengguna adalah Mahasiswa Perguruan Tinggi. Gunakan bahasa akademis, berikan referensi teoretis, dan tantang pengguna dengan pemikiran kritis serta analisis mendalam.",
    Umum: "Tingkat audiens/pendidikan pengguna adalah Umum / Profesional. Gunakan bahasa yang efisien, praktis, dan berorientasi pada penerapan di dunia nyata atau pekerjaan."
  },
  styles: {
    Socratic: "Gaya mengajar Anda adalah Socratic Method: Dilarang keras memberikan jawaban langsung di awal. Ajukan 1-2 pertanyaan pancingan atau petunjuk ringan agar pengguna bisa menganalisis dan menemukan jawabannya sendiri secara bertahap.",
    Explanatory: "Gaya mengajar Anda adalah Explanatory: Berikan penjelasan yang komprehensif, logis, terstruktur dengan baik (gunakan poin-poin/list), berikan contoh konkret, dan mudah dipahami.",
    Summary: "Anda dalam mode Summary: Berikan ringkasan materi yang sangat padat, singkat, jelas, dan berisi poin-poin utama saja tanpa basa-basi panjang."
  }
};

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
    const now = new Date().toISOString();
    return [{ 
      id: Date.now().toString(), 
      title: 'Percakapan Baru', 
      messages: [], 
      createdAt: now,
      updatedAt: now
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Settings
  const [educationLevel, setEducationLevel] = useState('SMA');
  const [teachingStyle, setTeachingStyle] = useState('Explanatory');
  const [prompts, setPrompts] = useState(() => {
    const saved = localStorage.getItem('edubot_custom_prompts');
    return saved ? JSON.parse(saved) : DEFAULT_PROMPTS;
  });

  useEffect(() => {
    localStorage.setItem('edubot_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('edubot_active_session_id', activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    localStorage.setItem('edubot_custom_prompts', JSON.stringify(prompts));
  }, [prompts]);

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
    const newSession = { id: newId, title: 'Percakapan Baru', messages: [], createdAt: now, updatedAt: now };
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

  const handleResetPrompts = () => {
    if (confirm('Reset semua instruksi prompt ke pengaturan pabrik?')) {
      setPrompts(DEFAULT_PROMPTS);
    }
  };

  const handleExportData = () => {
    const backupData = {
      app: 'EduBot AI',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      payload: {
        sessions: sessions,
        prompts: prompts,
        theme: isDarkMode ? 'dark' : 'light'
      }
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edubot-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportSession = (id) => {
    const session = sessions.find(s => s.id === id);
    if (!session) return;

    const backupData = {
      app: 'EduBot AI',
      version: '1.0',
      type: 'single-session',
      exportedAt: new Date().toISOString(),
      payload: { session }
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = session.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    a.download = `edubot-chat-${safeTitle}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (jsonData) => {
    try {
      const backup = JSON.parse(jsonData);
      if (backup.app !== 'EduBot AI') throw new Error('File ini bukan backup EduBot AI yang valid.');

      if (backup.type === 'single-session') {
        const session = backup.payload.session;
        if (confirm(`Impor percakapan "${session.title}" sebagai percakapan baru?`)) {
          const newSession = {
            ...session,
            id: Date.now().toString() // New ID to avoid conflict
          };
          setSessions([newSession, ...sessions]);
          setActiveSessionId(newSession.id);
          alert('Percakapan berhasil diimpor!');
        }
        return;
      }

      const { sessions: backupSessions, prompts: backupPrompts } = backup.payload;
      
      // Merge Strategy for Sessions
      const existingIds = new Set(sessions.map(s => s.id));
      const newSessions = backupSessions.filter(s => !existingIds.has(s.id));
      
      if (newSessions.length === 0 && confirm('Semua percakapan dalam backup sudah ada di riwayat. Apakah Anda ingin mengimpor ulang sebagai salinan baru?')) {
          const duplicatedSessions = backupSessions.map(s => ({
            ...s,
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            title: `${s.title} (Copy)`
          }));
          setSessions([...duplicatedSessions, ...sessions]);
      } else if (newSessions.length > 0) {
          if (confirm(`Ditemukan ${newSessions.length} percakapan baru. Gabungkan ke riwayat saat ini?`)) {
            setSessions([...newSessions, ...sessions]);
          }
      }

      // Prompt Merge
      if (confirm('Apakah Anda ingin menerapkan pengaturan prompt dari file backup ini?')) {
        setPrompts(backupPrompts);
      }

      alert('Data berhasil diimpor!');
    } catch (e) {
      console.error(e);
      alert('Gagal mengimpor data: ' + e.message);
    }
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

    // Combine custom prompts
    const customSystemInstruction = `Anda adalah EduBot, asisten pendidikan cerdas yang menggunakan bahasa Indonesia. ${prompts.levels[educationLevel]} ${prompts.styles[teachingStyle]}`;

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          conversation: updatedMessages.slice(-10),
          customSystemInstruction
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Server error');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      // Tambahkan bubble kosong untuk model
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) return { ...s, messages: [...updatedMessages, { role: 'model', text: '' }] };
        return s;
      }));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        
        setSessions(prev => prev.map(s => {
          if (s.id === activeSessionId) {
            const lastMsgIdx = s.messages.length;
            const newMessages = [...s.messages];
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
            }
            return { ...s, messages: newMessages, updatedAt: new Date().toISOString() };
          }
          return s;
        }));
      }
    } catch (error) {
      console.error(error);
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          const newMessages = s.messages.filter(m => m.text !== ''); // Clean up empty bot message if error occurred early
          return { ...s, messages: [...newMessages, { role: 'model', text: 'Maaf, terjadi kesalahan atau koneksi terputus. Silakan coba lagi.' }], updatedAt: new Date().toISOString() };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        educationLevel={educationLevel}
        setEducationLevel={setEducationLevel}
        teachingStyle={teachingStyle}
        setTeachingStyle={setTeachingStyle}
        prompts={prompts}
        setPrompts={setPrompts}
        onResetPrompts={handleResetPrompts}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 shrink-0" >
              <Sidebar 
                onResetSession={handleReset}
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSwitchSession={handleSwitchSession}
                onNewChat={handleNewChat}
                onDeleteSession={handleDeleteSession}
                onRenameSession={handleRenameSession}
                onExportSession={handleExportSession}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                onClose={() => setIsSidebarOpen(false)}
                onOpenSettings={() => setIsSettingsOpen(true)}
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
            <h2 className="text-sm font-bold text-slate-600 dark:text-slate-300 truncate font-display tracking-tight">{activeSession.title}</h2>
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
