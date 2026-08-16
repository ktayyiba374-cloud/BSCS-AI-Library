import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  User, 
  Sliders, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  BookOpen,
  Zap,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const [studentName, setStudentName] = useState('CS Undergraduate');
  const [semester, setSemester] = useState('5');
  const [aiResponseStyle, setAiResponseStyle] = useState<'detailed' | 'concise'>('detailed');
  const [glowIntensity, setGlowIntensity] = useState(80);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all mock library progress to initial defaults?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
          Student Preferences
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Personalize your curriculum semester, reader interface, AI tutor behavior, and dark neon aesthetics.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Student Profile Card */}
        <div className="p-6 rounded-3xl cyber-card space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-sky-500/15">
            <User className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white">Student Academic Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Degree Program</label>
              <input
                type="text"
                defaultValue="Bachelor of Science in Computer Science (BSCS)"
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-white/10 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Current Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">University Email</label>
              <input
                type="email"
                defaultValue="student@bscs-library.ai"
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-white/10 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* AI Tutor Customization */}
        <div className="p-6 rounded-3xl cyber-card space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-sky-500/15">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">AI Library Assistant Preferences</h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300">Explanation Depth</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAiResponseStyle('detailed')}
                className={`p-3.5 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                  aiResponseStyle === 'detailed'
                    ? 'bg-blue-600/20 border-sky-400 text-white font-bold'
                    : 'bg-[#070B14] border-sky-500/15 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="font-bold text-sky-300">Academic & Step-by-Step</p>
                <p className="text-[11px] text-slate-400 mt-1">Full code proofs, time complexity breakdown, and textbook citations.</p>
              </button>

              <button
                type="button"
                onClick={() => setAiResponseStyle('concise')}
                className={`p-3.5 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                  aiResponseStyle === 'concise'
                    ? 'bg-blue-600/20 border-sky-400 text-white font-bold'
                    : 'bg-[#070B14] border-sky-500/15 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="font-bold text-sky-300">Concise & Quick Summary</p>
                <p className="text-[11px] text-slate-400 mt-1">Fast bullet points and rapid syntax cheats.</p>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="neon-glow-btn px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Preferences Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Local Storage Data</span>
          </button>
        </div>

      </form>

    </div>
  );
};
