import { Settings, BookOpen, User, RefreshCcw } from 'lucide-react';

export default function Sidebar({ educationLevel, setEducationLevel, teachingStyle, setTeachingStyle, onResetSession }) {
  return (
    <div className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col p-5 shadow-sm hidden md:flex shrink-0">
      <div className="flex items-center gap-3 mb-8 text-blue-600">
        <div className="p-2 bg-blue-50 rounded-lg">
          <BookOpen size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-800">EduBot AI</h1>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <User size={16} /> Tingkat Pendidikan
          </label>
          <select 
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="SD">Sekolah Dasar (SD)</option>
            <option value="SMP">Sekolah Menengah (SMP)</option>
            <option value="SMA">Sekolah Menengah Atas (SMA)</option>
            <option value="Mahasiswa">Perguruan Tinggi</option>
            <option value="Umum">Umum / Profesional</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
            <Settings size={16} /> Gaya Mengajar
          </label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="radio" 
                name="style" 
                value="Socratic" 
                checked={teachingStyle === 'Socratic'}
                onChange={(e) => setTeachingStyle(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="ml-3 text-sm text-slate-700">Socratic (Pancingan)</span>
            </label>
            <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="radio" 
                name="style" 
                value="Explanatory" 
                checked={teachingStyle === 'Explanatory'}
                onChange={(e) => setTeachingStyle(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="ml-3 text-sm text-slate-700">Penjelasan Detail</span>
            </label>
            <label className="flex items-center p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <input 
                type="radio" 
                name="style" 
                value="Summary" 
                checked={teachingStyle === 'Summary'}
                onChange={(e) => setTeachingStyle(e.target.value)}
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="ml-3 text-sm text-slate-700">Ringkasan Cepat</span>
            </label>
          </div>
        </div>
      </div>

      <button 
        onClick={onResetSession}
        className="mt-auto flex items-center justify-center gap-2 w-full p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors text-sm"
      >
        <RefreshCcw size={16} /> Reset Sesi
      </button>
    </div>
  );
}
