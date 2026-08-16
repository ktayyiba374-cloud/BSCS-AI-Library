import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Binary, 
  ShieldCheck, 
  Database, 
  Share2, 
  Globe, 
  Code, 
  GraduationCap, 
  FileText, 
  Activity, 
  Bookmark, 
  Star, 
  CheckCircle2, 
  Play, 
  MessageSquare, 
  Send,
  Zap,
  Terminal,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_DATA } from '../data/bscsLibraryData';
import { DigitalTransformationModal } from '../components/DigitalTransformationModal';
import { BookDetailModal } from '../components/BookDetailModal';

export const HeroLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    books, 
    categories, 
    selectedBook,
    setSelectedBook,
    triggerDashboardTransition,
    isEnteringDashboard,
    setActiveReadingBook
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');
  const [previewBook, setPreviewBook] = useState<any | null>(null);
  const [interactiveChatInput, setInteractiveChatInput] = useState('');
  const [interactiveChatMessages, setInteractiveChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'user', text: 'Recommend beginner books for Machine Learning.' },
    { sender: 'ai', text: 'Here are 3 top-rated beginner Machine Learning books based on your curriculum: 📚✨\n\n1. **Hands-On Machine Learning with Scikit-Learn & PyTorch** (Aurélien Géron)\n2. **Artificial Intelligence: A Modern Approach** (Russell & Norvig)\n3. **Pattern Recognition & ML** (Bishop)' }
  ]);
  const [isAiTypingDemo, setIsAiTypingDemo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterDashboard = () => {
    triggerDashboardTransition(() => {
      navigate('/dashboard');
    });
  };

  const handleDemoSendMessage = (promptText?: string) => {
    const textToSend = promptText || interactiveChatInput;
    if (!textToSend.trim()) return;

    setInteractiveChatMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInteractiveChatInput('');
    setIsAiTypingDemo(true);

    setTimeout(() => {
      let reply = '';
      const lower = textToSend.toLowerCase();
      if (lower.includes('data structure') || lower.includes('dsa') || lower.includes('algorithm')) {
        reply = "For Data Structures, start with **Introduction to Algorithms (CLRS)**. Key topics to master first: Big-O analysis, Hash Tables (O(1) lookups), AVL self-balancing trees, and BFS/DFS graph traversals. 🚀";
      } else if (lower.includes('exam') || lower.includes('prepare')) {
        reply = "To prepare for BSCS exams: 1) Download the **Solved Midterm Papers (2020-2024)** in Study Materials, 2) Practice Banker's Algorithm & Round Robin calculations, 3) Review Big-O recurrence sheets!";
      } else if (lower.includes('paper') || lower.includes('research')) {
        reply = "I found landmark papers for you: **'Attention Is All You Need'** (Transformer paper with 118K citations) and **'Spanner: Google's Globally Distributed Database'**. You can read full abstracts in the Research Hub!";
      } else {
        reply = `Great inquiry! In BSCS Library AI, you have instant access to 10,000+ textbooks, solved papers, interactive code playgrounds, and 24/7 AI tutor guidance. Click 'Explore the Library' to open your full dashboard! 🎓`;
      }

      setInteractiveChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsAiTypingDemo(false);
    }, 600);
  };

  const filteredFeaturedBooks = selectedCategoryTab === 'All'
    ? books.slice(0, 6)
    : books.filter(b => b.category.toLowerCase().includes(selectedCategoryTab.toLowerCase())).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F8FAFC] selection:bg-[#2563EB] selection:text-white font-sans relative overflow-x-hidden">
      
      {/* 6-STEP DIGITAL TRANSFORMATION MODAL */}
      <DigitalTransformationModal
        isOpen={isEnteringDashboard}
        onComplete={() => navigate('/dashboard')}
      />

      {/* INTERACTIVE BOOK DETAIL / READER MODAL */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* AMBIENT CYBER BACKGROUND GLOWS & GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#0B1F3A]/40 rounded-full blur-[120px] animate-pulse-neon" />
        <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-sky-900/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[130px]" />
        
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-70" />
      </div>

      {/* FUTURISTIC HERO NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#070B14]/90 backdrop-blur-xl border-b border-sky-500/15 py-3.5 shadow-2xl shadow-black/50' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-[0_0_18px_rgba(56,189,248,0.4)]">
              <div className="w-full h-full bg-[#070B14] rounded-xl flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 font-display">
                BSCS Library <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">AI</span>
              </span>
              <p className="text-[10px] tracking-wider text-slate-400 font-medium -mt-1 hidden sm:block">
                Discover. Learn. Innovate.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Home</a>
            <a href="#featured-books" className="hover:text-sky-400 transition-colors">Explore Books</a>
            <a href="#categories" className="hover:text-sky-400 transition-colors">Categories</a>
            <a href="#ai-assistant" className="hover:text-sky-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              AI Assistant
            </a>
            <a href="#how-it-works" className="hover:text-sky-400 transition-colors">How It Works</a>
            <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleEnterDashboard}
              className="p-2.5 rounded-xl bg-[#0D1424] border border-sky-500/20 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-all cursor-pointer hidden sm:flex"
              title="Quick Search Books"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={handleEnterDashboard}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEnterDashboard}
              className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer relative overflow-hidden group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MAIN HERO SPLIT SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT SIDE HERO CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-7 text-left"
            >
              {/* Glowing Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1F3A]/80 border border-sky-400/30 text-sky-300 text-xs font-semibold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
                <span>✨ AI-Powered Digital Learning Platform</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
                  Your Library. <br />
                  Your Knowledge. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 neon-text-glow">
                    Your Future.
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                Discover thousands of books, research materials, programming resources, academic publications, and AI-powered learning tools — all in one intelligent digital library.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* Primary CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnterDashboard}
                  className="neon-glow-btn px-7 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(56,189,248,0.4)] group"
                >
                  <span className="text-base">🚀 Explore the Library</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Secondary CTA */}
                <a
                  href="#how-it-works"
                  className="px-6 py-4 rounded-2xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-slate-200 hover:text-sky-300 text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                  <span>▶ Discover How It Works</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-sky-500/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>10,000+ Verified CS Textbooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Instant PDF Reader & Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>24/7 AI Tutor Guidance</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE HERO MODEL & 4 FLOATING GLASS CARDS */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] sm:min-h-[540px]"
            >
              {/* Glowing Navy & Cyan Rings behind Model */}
              <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-blue-600/30 via-sky-500/20 to-transparent blur-2xl animate-pulse" />
              <div className="absolute w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full border border-sky-500/20 animate-spin-slow" />
              <div className="absolute w-60 sm:w-72 h-60 sm:h-72 rounded-full border border-dashed border-cyan-400/25" />

              {/* Student Model Image Container */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-72 sm:w-88 rounded-3xl overflow-hidden border border-sky-500/30 shadow-[0_0_50px_rgba(37,99,235,0.35)] bg-[#070B14]"
              >
                <img 
                  src="/src/assets/images/hero_student_model_1786922418241.jpg" 
                  alt="BSCS Student in futuristic digital library" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Holographic Cyan Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-sky-500/10 pointer-events-none" />
                
                {/* Interactive Status Tag on Model */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#0D1424]/90 backdrop-blur-md border border-sky-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold text-white">Active Session</span>
                  </div>
                  <span className="text-[11px] text-sky-300 font-mono">BSCS-AI v3.0</span>
                </div>
              </motion.div>

              {/* FLOATING CARD 1 — DIGITAL COLLECTION (Top Left) */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 z-20 p-3.5 rounded-2xl glass-panel shadow-[0_0_25px_rgba(56,189,248,0.2)] max-w-[190px] text-left border border-sky-400/30"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-sky-300">
                    📚
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">10,000+ Books</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold">Indexed</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Academic & Technical Resources
                </p>
              </motion.div>

              {/* FLOATING CARD 2 — AI SEARCH (Top Right) */}
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-6 -right-4 sm:-right-6 z-20 p-3.5 rounded-2xl glass-panel shadow-[0_0_25px_rgba(34,211,238,0.2)] max-w-[190px] text-left border border-cyan-400/30"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    🤖
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">AI Smart Search</h4>
                    <span className="text-[10px] text-cyan-400 font-semibold">Instant Neural</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Find exactly what you need.
                </p>
              </motion.div>

              {/* FLOATING CARD 3 — STUDY MATERIAL (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 12, 0], x: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 z-20 p-3.5 rounded-2xl glass-panel shadow-[0_0_25px_rgba(56,189,248,0.2)] max-w-[190px] text-left border border-sky-400/30"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-600/30 border border-sky-500/40 flex items-center justify-center text-sky-300">
                    📖
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">500+ Resources</h4>
                    <span className="text-[10px] text-sky-400 font-semibold">Updated 2025</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Notes, research & guides.
                </p>
              </motion.div>

              {/* FLOATING CARD 4 — ACTIVE STUDENTS (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, -4, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-4 -right-4 sm:-right-8 z-20 p-3.5 rounded-2xl glass-panel shadow-[0_0_25px_rgba(37,99,235,0.25)] max-w-[190px] text-left border border-blue-400/30"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                    🎓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">2,500+ Learners</h4>
                    <span className="text-[10px] text-emerald-400 font-semibold">Active Now</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Learning and growing daily.
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRUST / STATISTICS SECTION */}
      <section className="relative py-14 border-y border-sky-500/15 bg-[#080D1A]/90 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            {/* STAT 1 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl cyber-card text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                10K+
              </h3>
              <p className="text-xs sm:text-sm text-sky-300 font-medium mt-1">Digital Books</p>
            </motion.div>

            {/* STAT 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl cyber-card text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                500+
              </h3>
              <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">Research Papers</p>
            </motion.div>

            {/* STAT 3 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl cyber-card text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                50+
              </h3>
              <p className="text-xs sm:text-sm text-sky-300 font-medium mt-1">Academic Categories</p>
            </motion.div>

            {/* STAT 4 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl cyber-card text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                2.5K+
              </h3>
              <p className="text-xs sm:text-sm text-indigo-300 font-medium mt-1">Active Students</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION: Everything You Need to Learn Smarter */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Everything You Need to Learn Smarter
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Designed specifically for Computer Science undergraduates, researchers, and self-directed learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* FEATURE 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>📚 Smart Book Discovery</span>
                <ChevronRight className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Find books instantly with intelligent search, difficulty levels, and comprehensive curriculum tagging.
              </p>
            </motion.div>

            {/* FEATURE 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>🤖 AI Library Assistant</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ask questions, generate code breakdowns, decode algorithms, and receive personalized academic guidance.
              </p>
            </motion.div>

            {/* FEATURE 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>🔍 Advanced Search</span>
                <ChevronRight className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Search by title, author, subject, ISBN, semester level, or specific computer science category.
              </p>
            </motion.div>

            {/* FEATURE 4 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>📑 Research Hub</span>
                <ChevronRight className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explore foundational research papers (NeurIPS, CVPR, OSDI) with DOI lookups and executive abstracts.
              </p>
            </motion.div>

            {/* FEATURE 5 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Binary className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>💾 Digital Resources</span>
                <ChevronRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Access lecture notes, past exams, programming syntax sheets, lab manuals, and study guides in one hub.
              </p>
            </motion.div>

            {/* FEATURE 6 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-7 rounded-2xl cyber-card group cursor-pointer"
              onClick={handleEnterDashboard}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>📊 Learning Dashboard</span>
                <ChevronRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Track reading milestones, weekly study hours, learning streaks, and customized roadmap completion.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* FEATURED BOOKS SECTION */}
      <section id="featured-books" className="py-24 bg-[#080D1A]/80 border-t border-sky-500/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Curated Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Explore Featured Books
              </h2>
              <p className="text-sm text-slate-300">
                Peer-reviewed benchmark computer science textbooks with full reading outlines.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnterDashboard}
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Explore All Books</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Artificial Intelligence', 'Programming', 'Data Structures', 'Databases', 'Computer Networks', 'Software Engineering'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategoryTab === cat
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'bg-[#0D1424] text-slate-300 hover:bg-[#111B2E] border border-sky-500/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeaturedBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedBook(book)}
                className="rounded-2xl cyber-card overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                {/* Book Cover Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#070B14]">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#070B14]/80 backdrop-blur-md border border-sky-500/30 text-[11px] font-semibold text-sky-300">
                    {book.category}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-[#070B14]/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                {/* Book Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      By {book.author}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                      {book.description}
                    </p>
                  </div>

                  {/* Footer Stats & Read Action */}
                  <div className="pt-3 border-t border-sky-500/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {book.pages} Pages • {book.difficulty}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBook(book);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Read Preview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEnterDashboard}
              className="neon-glow-btn px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore All 10,000+ Books in Library</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION (3 Futuristic Steps with Connected Glowing Lines) */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Simple Academic Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Three seamless steps to transform the way you study, retain, and innovate in Computer Science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Connecting Neon Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 -translate-y-8 z-0 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />

            {/* STEP 01 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative z-10 p-8 rounded-2xl cyber-card text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-[1.5px] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center font-mono text-xl font-bold text-sky-400">
                  01
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Search & Discover</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Find textbooks, verified university notes, research publications, and programming syntax sheets instantly.
              </p>
            </motion.div>

            {/* STEP 02 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative z-10 p-8 rounded-2xl cyber-card text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center font-mono text-xl font-bold text-cyan-400">
                  02
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Learn with AI</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ask your personal AI Library Assistant for concept analogies, code explanations, and tailored book recommendations.
              </p>
            </motion.div>

            {/* STEP 03 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative z-10 p-8 rounded-2xl cyber-card text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400 p-[1.5px] shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center font-mono text-xl font-bold text-emerald-400">
                  03
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Track Your Progress</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Save favorites, curate custom roadmaps, track weekly learning hours, and test yourself on solved exam questions.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* AI LIBRARY ASSISTANT PROMO SECTION */}
      <section id="ai-assistant" className="py-24 bg-[#080D1A]/90 border-y border-sky-500/15 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Holographic AI Visual / Librarian */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="w-72 sm:w-80 rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.3)] bg-[#070B14]">
                <img 
                  src="/src/assets/images/ai_librarian_holo_1786922431173.jpg" 
                  alt="Holographic AI Librarian" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* RIGHT: Assistant Description & Simulated Chat Demo */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Intelligent Academic Tutor</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                  Meet Your AI Library Assistant
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  “Ask questions, discover resources, get book recommendations, understand complex concepts, and learn smarter with your personal AI-powered academic assistant.”
                </p>
              </div>

              {/* Simulated Interactive Chat Preview */}
              <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/25 space-y-4 shadow-xl">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-sky-500/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white">AI Assistant Terminal</span>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono">Simulated Live Engine</span>
                </div>

                {/* Messages List */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {interactiveChatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-[#0D1424] border border-sky-500/20 text-slate-200 rounded-bl-none whitespace-pre-line'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiTypingDemo && (
                    <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#0D1424] border border-sky-500/20 max-w-[120px] text-sky-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  )}
                </div>

                {/* Quick Prompts */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Recommend beginner books for Machine Learning',
                    'Explain Data Structures',
                    'Find AI research papers',
                    'Help me prepare for exams'
                  ].map((p) => (
                    <button
                      key={p}
                      onClick={() => handleDemoSendMessage(p)}
                      className="px-2.5 py-1 rounded-lg bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-[11px] text-sky-300 transition-colors cursor-pointer text-left"
                    >
                      + {p}
                    </button>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={interactiveChatInput}
                    onChange={(e) => setInteractiveChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDemoSendMessage()}
                    placeholder="Ask any CS question (e.g. Explain Dijkstra's algorithm)..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D1424] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                  <button
                    onClick={() => handleDemoSendMessage()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Try AI Assistant Button */}
              <div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnterDashboard}
                  className="neon-glow-btn px-6 py-3 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Try Full AI Assistant on Dashboard →</span>
                </motion.button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES PREVIEW SECTION */}
      <section id="categories" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">Academic Domains</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Browse by Discipline
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Structured repositories covering all 8 semesters of the BS Computer Science degree.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES_DATA.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -5 }}
                onClick={handleEnterDashboard}
                className="p-5 rounded-2xl cyber-card text-left group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-sky-500/30 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-sky-500/10 flex items-center justify-between text-[11px] text-sky-400 font-medium">
                  <span>{cat.booksCount} Books</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION SECTION */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#0B1F3A] to-[#070B14] border border-sky-400/30 shadow-[0_0_60px_rgba(37,99,235,0.3)] text-center space-y-6 overflow-hidden">
            
            {/* Glowing Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join 2,500+ Active Students Today</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
                Ready to Explore Knowledge Without Limits?
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-normal">
                “Your next book, idea, and discovery is waiting.”
              </p>

              <div className="pt-4 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleEnterDashboard}
                  className="neon-glow-btn px-9 py-4 rounded-2xl text-base font-bold flex items-center gap-3 cursor-pointer shadow-[0_0_40px_rgba(56,189,248,0.5)] group"
                >
                  <span>🚀 Enter BSCS Library</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="border-t border-sky-500/15 bg-[#070B14] py-14 relative z-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-bold text-white font-display">
                  BSCS Library <span className="text-sky-400">AI</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Discover. Learn. Innovate. Your smart digital gateway to computer science textbooks, research publications, solved past papers, and interactive AI learning companions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Dashboard</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Explore Books</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Research Hub</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Study Materials</button></li>
              </ul>
            </div>

            {/* Academic Resources */}
            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-2">
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">DSA Roadmaps</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Past Solved Exams</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Big-O Cheat Sheets</button></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">AI Knowledge Base</button></li>
              </ul>
            </div>

            {/* Help & Terms */}
            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-sky-400 transition-colors">Home Portal</a></li>
                <li><button onClick={handleEnterDashboard} className="hover:text-sky-400 transition-colors">Student Settings</button></li>
                <li><span className="text-slate-500">Privacy Policy</span></li>
                <li><span className="text-slate-500">Terms of Use</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-slate-500">
              © BSCS Library AI — Empowering Students Through Knowledge.
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <span>Frontend Academic Prototype</span>
              <span>•</span>
              <span className="text-sky-400 font-mono">v3.0.0 Cyber Navy</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
