import { useState } from 'react';
import { Settings, BookOpen, User, RefreshCcw, Plus, MessageSquare, Trash2, Sun, Moon, Edit2, X, Clock } from 'lucide-react';

export default function Sidebar({ 
  educationLevel, setEducationLevel, 
  teachingStyle, setTeachingStyle, 
  onResetSession,
  sessions, activeSessionId, onSwitchSession, onNewChat, onDeleteSession, onRenameSession,
  isDarkMode, onToggleDarkMode,
  onClose
}) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }).replace(',', '');
    } catch (e) {
      return '';
    }
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      onRenameSession(id, editTitle);
      setEditingId(null);
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      setEditingId(null);
    }
  };

  const handleEditBlur = (id) => {
    onRenameSession(id, editTitle);
    setEditingId(null);
  };

  return (
    <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col p-5 shadow-sm shrink-0 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-blue-600">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">EduBot AI</h1>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onToggleDarkMode} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-all">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 transition-all lg:hidden">
            <X size={20} />
          </button>
        </div>
      </div>

      <button onClick={onNewChat} className="flex items-center justify-center gap-2 w-full p-3 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-md active:scale-95">
        <Plus size={18} /> Chat Baru
      </button>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 chat-scrollbar">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Riwayat Percakapan</label>
          <div className="space-y-1">
            {sessions.map(s => (
              <div 
                key={s.id}
                onClick={() => { if (editingId !== s.id) onSwitchSession(s.id); }}
                className={`group flex flex-col gap-1 p-3 rounded-xl cursor-pointer transition-all ${s.id === activeSessionId ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <MessageSquare size={16} className={`shrink-0 ${s.id === activeSessionId ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  
                  {editingId === s.id ? (
                    <input autoFocus value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => handleEditKeyDown(e, s.id)} onBlur={() => handleEditBlur(s.id)} className="flex-1 bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-600 rounded px-2 py-0.5 text-sm outline-none w-full text-slate-800 dark:text-slate-200" />
                  ) : (
                    <span className={`flex-1 text-sm font-medium truncate ${s.id === activeSessionId ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400'}`} title={s.title}>{s.title}</span>
                  )}

                  {editingId !== s.id && (
                    <div className="opacity-0 group-hover:opacity-100 flex items-center shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); setEditingId(s.id); setEditTitle(s.title); }} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-blue-500 transition-all"><Edit2 size={13} /></button>
                      <button onClick={(e) => onDeleteSession(s.id, e)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-red-500 transition-all"><Trash2 size={13} /></button>
                    </div>
                  )}
                </div>
                
                {/* Date and Time Info */}
                <div className="flex items-center gap-1.5 ml-7 text-[10px] text-slate-400 font-medium">
                  <Clock size={10} />
                  <span>{formatDate(s.updatedAt || s.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Pengaturan Sesi</label>
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><User size={16} className="text-slate-400" /> Tingkat Pendidikan</label>
              <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-slate-200">
                <option value="SD">Sekolah Dasar (SD)</option>
                <option value="SMP">Sekolah Menengah (SMP)</option>
                <option value="SMA">Sekolah Menengah Atas (SMA)</option>
                <option value="Mahasiswa">Perguruan Tinggi</option>
                <option value="Umum">Umum / Profesional</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"><Settings size={16} className="text-slate-400" /> Gaya Mengajar</label>
              <div className="space-y-2">
                {['Socratic', 'Explanatory', 'Summary'].map(style => (
                  <label key={style} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${teachingStyle === style ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <input type="radio" name="style" value={style} checked={teachingStyle === style} onChange={(e) => setTeachingStyle(e.target.value)} className="text-blue-600 focus:ring-blue-500 w-4 h-4" />
                    <span className={`ml-3 text-sm font-medium ${teachingStyle === style ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>{style === 'Socratic' ? 'Socratic (Pancingan)' : style === 'Explanatory' ? 'Penjelasan Detail' : 'Ringkasan Cepat'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onResetSession} className="mt-4 flex items-center justify-center gap-2 w-full p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-all text-xs border border-transparent hover:border-red-100 dark:hover:border-red-900/50">
        <RefreshCcw size={14} /> Hapus Semua Riwayat
      </button>
    </div>
  );
}
