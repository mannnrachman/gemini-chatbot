import { X, Save, RotateCcw, User, Settings as SettingsIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ 
  isOpen, onClose, 
  educationLevel, setEducationLevel, 
  teachingStyle, setTeachingStyle,
  prompts, setPrompts,
  onResetPrompts
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3 text-slate-800 dark:text-white font-bold">
              <SettingsIcon className="text-blue-600" size={20} />
              Konfigurasi Prompt EduBot
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto chat-scrollbar">
            {/* Tingkat Pendidikan Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <User size={18} className="text-blue-500" /> Tingkat Pendidikan
                </label>
                <select 
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-slate-200"
                >
                  {Object.keys(prompts.levels).map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <textarea 
                  value={prompts.levels[educationLevel]}
                  onChange={(e) => setPrompts({
                    ...prompts,
                    levels: { ...prompts.levels, [educationLevel]: e.target.value }
                  })}
                  placeholder="Masukkan instruksi khusus untuk tingkat pendidikan ini..."
                  className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono"
                />
                <div className="absolute bottom-3 right-4 text-[10px] text-slate-400 uppercase font-bold tracking-widest pointer-events-none">
                  Instruction Level
                </div>
              </div>
            </div>

            {/* Gaya Mengajar Section */}
            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                  <SettingsIcon size={18} className="text-green-500" /> Gaya Mengajar
                </label>
                <select 
                  value={teachingStyle}
                  onChange={(e) => setTeachingStyle(e.target.value)}
                  className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-slate-200"
                >
                  {Object.keys(prompts.styles).map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <textarea 
                  value={prompts.styles[teachingStyle]}
                  onChange={(e) => setPrompts({
                    ...prompts,
                    styles: { ...prompts.styles, [teachingStyle]: e.target.value }
                  })}
                  placeholder="Masukkan instruksi khusus untuk gaya mengajar ini..."
                  className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono"
                />
                <div className="absolute bottom-3 right-4 text-[10px] text-slate-400 uppercase font-bold tracking-widest pointer-events-none">
                  Instruction Style
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={onResetPrompts}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
            >
              <RotateCcw size={16} /> Reset Default
            </button>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Save size={18} /> Simpan Perubahan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
