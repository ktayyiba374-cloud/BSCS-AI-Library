import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Clock, 
  Bookmark, 
  TrendingUp, 
  ArrowRight, 
  Play, 
  Star, 
  Layers, 
  FileText, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Zap, 
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    books, 
    setSelectedBook, 
    activeReadingBook, 
    setActiveReadingBook,
    globalSearchQuery, 
    setGlobalSearchQuery,
    setAiPanelOpen,
    sendUserMessage,
    setIsUpgradeModalOpen
  } = useApp();

  // Find currently reading books (progress > 0 && progress < 100)
  const currentlyReading = books.filter(b => b.progress > 0 && b.progress < 100);
  const activeBook = activeReadingBook || currentlyReading[0] || books[0];

  // Recommended books for semester 5
  const recommendedBooks = books.filter(b => b.rating >= 4.7).slice(0, 4);

  const stats = [
    { label: 'Books Explored', value: '18', sub: '+3 this week', icon: BookOpen, color: 'from-blue-600 to-sky-400' },
    { label: 'Study Hours Logged', value: '42.5h', sub: 'Top 5% of class', icon: Clock, color: 'from-sky-500 to-cyan-400' },
    { label: 'Active Bookmarks', value: '12', sub: 'Saved across topics', icon: Bookmark, color: 'from-cyan-400 to-emerald-400' },
    { label: 'AI Solved Queries', value: '38', sub: '100% resolution', icon: Sparkles, color: 'from-indigo-500 to-blue-500' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* TOP WELCOME BANNER WITH DYNAMIC GLOW */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B1F3A] via-[#0D1424] to-[#070B14] border border-sky-500/25 shadow-[0_0_40px_rgba(37,99,235,0.2)] overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>5-Day Study Streak Active</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">BSCS Library AI</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Continue your academic journey across 10,000+ textbooks, research publications, and AI-guided study blueprints.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/books')}
              className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Catalog</span>
            </button>

            <button
              onClick={() => {
                setAiPanelOpen(true);
                sendUserMessage("What are the best study topics for BSCS Semester 5?");
              }}
              className="px-4 py-2.5 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Tutor</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4 STATISTICS METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl cyber-card text-left flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium">{st.label}</p>
                <h3 className="text-2xl font-extrabold text-white font-display tracking-tight">
                  {st.value}
                </h3>
                <p className="text-[11px] text-emerald-400 font-mono font-semibold">
                  {st.sub}
                </p>
              </div>

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${st.color} p-[1.5px] shadow-md`}>
                <div className="w-full h-full bg-[#070B14] rounded-xl flex items-center justify-center text-sky-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CURRENTLY READING & QUICK ACCESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CURRENTLY READING (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 p-6 rounded-3xl cyber-card text-left space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-base font-bold text-white font-display">
                Currently Reading
              </h2>
            </div>
            <button
              onClick={() => navigate('/my-library')}
              className="text-xs font-semibold text-sky-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View My Library</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeBook && (
            <div className="p-4 rounded-2xl bg-[#070B14] border border-sky-500/20 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div className="w-28 sm:w-32 h-40 rounded-xl overflow-hidden shadow-lg border border-sky-500/25 shrink-0 bg-[#0D1424]">
                <img 
                  src={activeBook.coverUrl} 
                  alt={activeBook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 w-full text-left">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                    {activeBook.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-snug">
                    {activeBook.title}
                  </h3>
                  <p className="text-xs text-slate-400">By {activeBook.author}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Chapter {Math.max(1, Math.ceil((activeBook.progress / 100) * activeBook.tableOfContents.length))} of {activeBook.tableOfContents.length}</span>
                    <span className="text-sky-400 font-bold">{activeBook.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 h-full rounded-full"
                      style={{ width: `${Math.max(activeBook.progress, 15)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedBook(activeBook)}
                    className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Reading</span>
                  </button>

                  <button
                    onClick={() => {
                      sendUserMessage(`Can you give me a summary of Chapter ${Math.max(1, Math.ceil((activeBook.progress / 100) * activeBook.tableOfContents.length))} for "${activeBook.title}"?`);
                      setAiPanelOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Summarize</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* QUICK SHORTCUTS & ACADEMIC HUBS (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 p-6 rounded-3xl cyber-card text-left space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-display">
              Academic Resource Hubs
            </h2>
            <span className="text-xs text-sky-400 font-mono">Curated</span>
          </div>

          <div className="space-y-2.5">
            <div 
              onClick={() => navigate('/research')}
              className="p-3.5 rounded-2xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/15 flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Research Papers Repository
                  </h4>
                  <p className="text-[11px] text-slate-400">Transformers, Spanner, Raft & AI</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div 
              onClick={() => navigate('/study-materials')}
              className="p-3.5 rounded-2xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/15 flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-sky-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                    Past Solved Exams & Notes
                  </h4>
                  <p className="text-[11px] text-slate-400">Midterm, Finals & Lab Cheat Sheets</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div 
              onClick={() => navigate('/programming')}
              className="p-3.5 rounded-2xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/15 flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Interactive Code Sandboxes
                  </h4>
                  <p className="text-[11px] text-slate-400">C++, Python, Java & Big-O Visualizer</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* AI SMART RECOMMENDATIONS */}
      <div className="space-y-4 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-display">
                AI Smart Recommendations
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hand-picked based on your BS Computer Science Semester 5 Curriculum
            </p>
          </div>

          <button
            onClick={() => navigate('/books')}
            className="text-xs font-bold text-sky-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All Textbooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendedBooks.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedBook(book)}
              className="p-4 rounded-2xl cyber-card group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-[#070B14]">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-sky-300 font-mono">
                    {book.category}
                  </div>
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-bold flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    By {book.author}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-sky-500/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">{book.pages} pgs</span>
                <span className="text-sky-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Preview <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
