import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  BookOpen, 
  Bookmark, 
  Star, 
  Sparkles, 
  Check, 
  Share2, 
  Download, 
  Clock, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Code2, 
  Printer, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Copy,
  GraduationCap,
  HelpCircle,
  Award,
  BookMarked,
  Cpu,
  Flame,
  ArrowDownToLine,
  Send,
  Sliders,
  Palette,
  FileCode,
  ListOrdered
} from 'lucide-react';
import { LibraryBook } from '../data/bscsLibraryData';
import { useApp } from '../context/AppContext';

interface BookDetailModalProps {
  book: LibraryBook | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const { 
    toggleSaveBook, 
    toggleFavoriteBook, 
    updateBookProgress, 
    sendUserMessage, 
    setAiPanelOpen,
    addToRecentlyViewed
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'toc' | 'reader' | 'downloads' | 'quiz'>('overview');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [readerFontSize, setReaderFontSize] = useState(15);
  const [readerTheme, setReaderTheme] = useState<'cyber' | 'oled' | 'sepia' | 'slate'>('cyber');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [userReviewText, setUserReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // Audio Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Audio cleanup on unmount or tab change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update selected book in recently viewed
  useEffect(() => {
    if (book) {
      addToRecentlyViewed(book.id);
      setSelectedChapterIndex(0);
      setQuizAnswers({});
      setQuizSubmitted(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [book?.id]);

  if (!book) return null;

  const activeChapter = book.tableOfContents[selectedChapterIndex] || book.tableOfContents[0] || {
    chapter: 1,
    title: 'Core Fundamentals',
    pages: '1-30',
    summary: book.description
  };

  const handleProgressChange = (newProg: number) => {
    updateBookProgress(book.id, newProg);
  };

  const handleAskAIAboutBook = () => {
    sendUserMessage(`Can you explain the key insights and recommended reading strategy for "${book.title}" by ${book.author}?`);
    setAiPanelOpen(true);
    onClose();
  };

  const handleAskAIChapter = () => {
    sendUserMessage(`Can you provide a comprehensive breakdown, practice exam questions, and step-by-step code analysis for Chapter ${activeChapter.chapter}: "${activeChapter.title}" from "${book.title}"?`);
    setAiPanelOpen(true);
    onClose();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setIsCodeCopied(true);
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  // Text-To-Speech Handlers
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${book.title}. Chapter ${activeChapter.chapter}: ${activeChapter.title}. ${activeChapter.summary}. Key principles: In computer science and software systems, mathematical rigor and architectural clarity enable scalable solutions.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackSpeed;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // DOWNLOAD GENERATORS
  const downloadFullNotes = () => {
    const textContent = `# ${book.title}
Author: ${book.author}
Category: ${book.category} | Difficulty: ${book.difficulty}
Publisher: ${book.publisher} (${book.year}) | ISBN: ${book.isbn}
Rating: ${book.rating}/5.0 | Pages: ${book.pages}

==================================================
ACADEMIC OVERVIEW & DESCRIPTION
==================================================
${book.description}

Key Concepts:
${book.keyConcepts.map(kc => `- ${kc}`).join('\n')}

==================================================
COMPLETE TABLE OF CONTENTS & CHAPTER BREAKDOWNS
==================================================
${book.tableOfContents.map(ch => `
--------------------------------------------------
CHAPTER ${ch.chapter}: ${ch.title.toUpperCase()} (Pages: ${ch.pages})
--------------------------------------------------
${ch.summary}
${ch.codeSnippet ? `\nCode Implementation (${ch.codeLanguage || 'C++'}):\n` + ch.codeSnippet : ''}
${ch.keyTakeaways ? `\nKey Takeaways:\n` + ch.keyTakeaways.map(t => `* ${t}`).join('\n') : ''}
`).join('\n')}

==================================================
Generated by BSCS Library AI - Computer Science Study Vault
`;

    const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadCodeSnippets = () => {
    const codeContent = `/*
 * BSCS Library AI - Code Repository
 * Textbook: ${book.title} (${book.author})
 * Extracted Algorithms & Code Examples
 */

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

${book.tableOfContents.map(ch => `
// ==========================================
// Chapter ${ch.chapter}: ${ch.title}
// ==========================================
${ch.codeSnippet || `// Implementation details for Chapter ${ch.chapter}\nvoid run_chapter_${ch.chapter}() {\n    std::cout << "Executing Chapter ${ch.chapter}: ${ch.title}" << std::endl;\n}`}
`).join('\n\n')}

int main() {
    std::cout << "=== Running Algorithms from ${book.title} ===" << std::endl;
    return 0;
}
`;

    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_Algorithms.cpp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadFlashcardsCSV = () => {
    let csv = `Front,Back,Category,Tags\n`;
    book.keyConcepts.forEach((kc, i) => {
      csv += `"${kc} - What is the core definition according to ${book.title}?","Core concept in ${book.category} addressing computational efficiency, correctness, and system design.","${book.category}","${book.title}"\n`;
    });
    book.tableOfContents.forEach(ch => {
      csv += `"What are the key principles of Chapter ${ch.chapter}: ${ch.title}?","${ch.summary.replace(/"/g, '""')}","${book.category}","Chapter_${ch.chapter}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}_Anki_Flashcards.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Chapter default code snippet if none provided
  const chapterCode = activeChapter.codeSnippet || `// Chapter ${activeChapter.chapter} Code Example
// Demonstrating ${activeChapter.title} in C++
#include <iostream>
#include <vector>

template <typename T>
void executeAlgorithm(const std::vector<T>& data) {
    std::cout << "Processing " << data.size() << " elements for ${activeChapter.title}..." << std::endl;
    for (size_t i = 0; i < data.size(); ++i) {
        // Optimized computational pass
    }
}

int main() {
    std::vector<int> dataset = {64, 34, 25, 12, 22, 11, 90};
    executeAlgorithm(dataset);
    return 0;
}`;

  // Default Chapter Quiz Questions
  const defaultQuiz = [
    {
      question: `What is the primary computational objective of Chapter ${activeChapter.chapter} (${activeChapter.title})?`,
      options: [
        `Minimizing time complexity and managing asymptotic bounds`,
        `Ignoring hardware constraints to maximize memory leaks`,
        `Rewriting procedural loops without invariant checks`,
        `Disabling compiler optimization flags`
      ],
      answerIndex: 0,
      explanation: `In standard computer science textbooks, algorithm analysis focuses on minimizing asymptotic time and space complexity while maintaining correctness.`
    },
    {
      question: `Which data structure or paradigm is central to "${activeChapter.title}"?`,
      options: [
        `Optimal substructure with recursive decomposition or divide-and-conquer`,
        `Linear search on unsorted disk pages without indexing`,
        `Manual pointer arithmetic on unallocated heaps`,
        `Synchronous blocking loops without thread synchronization`
      ],
      answerIndex: 0,
      explanation: `Modern algorithmic theory relies on dividing problems into optimal substructures and applying memoization or divide-and-conquer.`
    },
    {
      question: `How does "${book.title}" recommend validating boundary conditions for this topic?`,
      options: [
        `Through formal loop invariants and base case induction proofs`,
        `By skipping base case checks on empty lists`,
        `By assuming all input distributions are uniform`,
        `By running single manual tests without automated assertion suites`
      ],
      answerIndex: 0,
      explanation: `Rigorous academic verification requires proving loop invariants (Initialization, Maintenance, Termination) and inductive base conditions.`
    }
  ];

  const currentQuiz = activeChapter.quiz || defaultQuiz;

  // Reader Theme styling class helper
  const getReaderThemeStyles = () => {
    switch (readerTheme) {
      case 'oled':
        return 'bg-black text-slate-100 border-zinc-800';
      case 'sepia':
        return 'bg-[#211B14] text-[#F3EADB] border-[#5A452C]';
      case 'slate':
        return 'bg-[#0F172A] text-slate-200 border-slate-700';
      case 'cyber':
      default:
        return 'bg-[#070B14] text-slate-200 border-sky-500/20';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full my-4 rounded-3xl bg-[#0D1424] border border-sky-400/30 shadow-[0_0_70px_rgba(56,189,248,0.25)] text-left overflow-hidden flex flex-col transition-all duration-300 ${
            isFullscreen ? 'fixed inset-2 my-0 max-w-none max-h-none h-[calc(100vh-16px)]' : 'max-w-5xl max-h-[92vh]'
          }`}
        >
          {/* TOP HEADER BAR */}
          <div className="p-4 sm:p-5 border-b border-sky-500/15 bg-[#070B14] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold font-mono">
                {book.category}
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">
                ISBN: {book.isbn} • {book.year}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[11px] text-sky-300 font-mono hidden sm:inline">
                {book.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* TTS Live Speech Button */}
              <button
                onClick={handleToggleSpeech}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
                title={isSpeaking ? (isPaused ? 'Resume Audio' : 'Pause Audio') : 'Listen to Chapter (Audio Read-Aloud)'}
              >
                {isSpeaking ? (
                  isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span className="hidden sm:inline">{isSpeaking ? (isPaused ? 'Resume' : 'Playing') : 'Listen'}</span>
              </button>

              {isSpeaking && (
                <button
                  onClick={handleStopSpeech}
                  className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors cursor-pointer"
                  title="Stop Audio"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                title="Share link"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Bookmark */}
              <button
                onClick={() => toggleSaveBook(book.id)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  book.isSaved 
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' 
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
                title="Save to My Library"
              >
                <Bookmark className={`w-4 h-4 ${book.isSaved ? 'fill-sky-400' : ''}`} />
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={() => setIsFullscreen(f => !f)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer hidden sm:flex"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reader'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Modal */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MAIN TABS SELECTOR */}
          <div className="px-6 border-b border-sky-500/15 bg-[#070B14]/60 flex items-center gap-4 overflow-x-auto scrollbar-none">
            {[
              { id: 'overview', label: 'Overview & Syllabus', icon: FileText },
              { id: 'toc', label: `Table of Contents (${book.tableOfContents.length})`, icon: ListOrdered },
              { id: 'reader', label: 'Interactive Digital Reader', icon: BookOpen },
              { id: 'downloads', label: `Downloads Hub (${book.downloadSizeMb} MB)`, icon: ArrowDownToLine },
              { id: 'quiz', label: 'Chapter Practice Quiz', icon: HelpCircle }
            ].map(tabItem => {
              const Icon = tabItem.icon;
              const isActive = activeTab === tabItem.id;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setActiveTab(tabItem.id as any)}
                  className={`py-3.5 text-xs font-bold transition-all relative flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tabItem.label}</span>
                  {isActive && (
                    <motion.div layoutId="modal-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_10px_#38BDF8]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* MODAL BODY WITH SCROLL */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
            
            {/* TAB 1: OVERVIEW & SYLLABUS */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Top Book Banner */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Cover Card */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className="w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30 bg-[#070B14] relative group">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-sky-300 font-mono">
                        {book.publisher}
                      </div>
                    </div>

                    {/* Reading Progress Stepper */}
                    <div className="w-full max-w-xs mt-4 p-3.5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-2.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Your Reading Status</span>
                        <span className="text-sky-400 font-mono font-bold">{book.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 h-full rounded-full transition-all duration-300"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between gap-1 pt-1">
                        {[0, 25, 50, 75, 100].map(val => (
                          <button
                            key={val}
                            onClick={() => handleProgressChange(val)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                              book.progress === val
                                ? 'bg-sky-500 text-black font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                                : 'text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700'
                            }`}
                          >
                            {val}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-display">
                        {book.title}
                      </h2>
                      <p className="text-sm text-sky-300 mt-1 font-medium">
                        By <span className="text-white font-semibold">{book.author}</span>
                      </p>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <div className="flex items-center gap-1 text-amber-400 font-bold px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{book.rating}</span>
                        <span className="text-slate-400 font-normal">({book.reviewsCount} student reviews)</span>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sky-300 font-medium">
                        {book.pages} Pages
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                        {book.difficulty}
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 font-mono">
                        ⏱️ ~{book.readTimeHours}h Total Read Time
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {book.description}
                    </p>

                    {/* Key Topics Tags */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs uppercase tracking-wider text-sky-400 font-bold font-mono">
                        Key Architectural Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {book.keyConcepts.map((kc, i) => (
                          <span key={i} className="px-3 py-1 rounded-xl bg-[#070B14] border border-sky-500/25 text-xs text-sky-200">
                            • {kc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-3">
                      <button
                        onClick={() => setActiveTab('reader')}
                        className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Open Interactive Reader</span>
                      </button>

                      <button
                        onClick={handleAskAIAboutBook}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/40 hover:to-blue-600/40 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Ask AI About This Book</span>
                      </button>

                      <button
                        onClick={downloadFullNotes}
                        className="px-4 py-2.5 rounded-xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/20 text-xs font-semibold text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-sky-400" />
                        <span>Download Full Notes ({book.downloadSizeMb} MB)</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Academic Alignment Card */}
                <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-400" />
                    <h3 className="text-sm font-bold text-white">Higher Education Commission (HEC) & ACM/IEEE Curriculum Alignment</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prescribed core reference for undergraduate degree programs across BSCS, BS Software Engineering, and BS Artificial Intelligence. Designed to prepare students for core university examinations, graduate entrance tests (GRE CS/GAT), and competitive technical interviews.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#0D1424] border border-sky-500/10 text-xs space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Recommended Semester</span>
                      <p className="text-sky-300 font-bold">Semester 2 - 6 (Core Curriculum)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0D1424] border border-sky-500/10 text-xs space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Prerequisites</span>
                      <p className="text-slate-200 font-medium">Programming Fundamentals, Logic</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0D1424] border border-sky-500/10 text-xs space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Target Career Domain</span>
                      <p className="text-emerald-400 font-bold">Systems, AI & Software Architecture</p>
                    </div>
                  </div>
                </div>

                {/* User Star Review Submitter */}
                <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rate this Textbook & Leave Academic Feedback</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star className={`w-5 h-5 ${
                          (userRating || 0) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`} />
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-2">
                      {userRating ? `${userRating} of 5 stars` : 'Select star rating'}
                    </span>
                  </div>

                  {!reviewSubmitted ? (
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={userReviewText}
                        onChange={(e) => setUserReviewText(e.target.value)}
                        placeholder="Write a quick student review or chapter recommendation..."
                        className="flex-1 px-3 py-2 rounded-xl bg-[#0D1424] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                      />
                      <button
                        onClick={() => {
                          if (userRating || userReviewText) {
                            setReviewSubmitted(true);
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Thank you! Your academic review has been saved to your student profile.</span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* TAB 2: TABLE OF CONTENTS */}
            {activeTab === 'toc' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Chapters List Column */}
                  <div className="md:col-span-5 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-1 block">
                      Chapters List ({book.tableOfContents.length})
                    </span>
                    {book.tableOfContents.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedChapterIndex(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                          selectedChapterIndex === idx
                            ? 'bg-blue-600/30 border border-sky-400/40 text-white font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                            : 'bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/10 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-mono font-bold">
                            {ch.chapter}
                          </span>
                          <div className="space-y-0.5">
                            <span className="line-clamp-1 block">{ch.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono block">Pages {ch.pages}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-sky-400 opacity-60" />
                      </button>
                    ))}
                  </div>

                  {/* Active Chapter Details Column */}
                  <div className="md:col-span-7 p-5 rounded-2xl bg-[#070B14] border border-sky-500/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-sky-500/10 pb-3">
                      <div>
                        <span className="text-[10px] text-sky-400 font-mono uppercase font-bold">
                          Chapter {activeChapter.chapter}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">
                          {activeChapter.title}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400 font-mono bg-[#0D1424] px-2.5 py-1 rounded-lg border border-sky-500/15">
                        Pages: {activeChapter.pages}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeChapter.summary}
                    </p>

                    {/* Key takeaways */}
                    <div className="p-3.5 rounded-xl bg-[#0D1424] border border-sky-500/15 space-y-2">
                      <span className="text-[11px] font-bold text-sky-300 font-mono uppercase">
                        🎯 Chapter Learning Objectives
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Master asymptotic bounds and algorithm correctness loop invariants.</li>
                        <li>Understand real-world implementation constraints and memory caching models.</li>
                        <li>Construct mathematical proofs and analyze edge-case state transitions.</li>
                      </ul>
                    </div>

                    {/* Quick Chapter Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        onClick={() => setActiveTab('reader')}
                        className="px-4 py-2 rounded-xl bg-sky-500 text-black font-bold text-xs flex items-center gap-1.5 transition-all hover:bg-sky-400 cursor-pointer shadow-md"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Chapter {activeChapter.chapter}</span>
                      </button>

                      <button
                        onClick={handleAskAIChapter}
                        className="px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Explain with AI</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('quiz')}
                        className="px-3.5 py-2 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Take Chapter Quiz</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: DIGITAL INTERACTIVE READER */}
            {activeTab === 'reader' && (
              <div className="space-y-4">
                
                {/* Reader Top Controls Toolbar */}
                <div className="p-3.5 rounded-2xl bg-[#070B14] border border-sky-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Chapter Selector Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedChapterIndex(i => Math.max(0, i - 1))}
                      disabled={selectedChapterIndex === 0}
                      className="p-1.5 rounded-lg bg-[#0D1424] hover:bg-slate-800 disabled:opacity-30 text-slate-300 cursor-pointer"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <select
                      value={selectedChapterIndex}
                      onChange={(e) => setSelectedChapterIndex(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-xl bg-[#0D1424] border border-sky-500/25 text-xs text-sky-300 font-bold focus:outline-none focus:border-sky-400 cursor-pointer"
                    >
                      {book.tableOfContents.map((c, idx) => (
                        <option key={idx} value={idx}>
                          Chapter {c.chapter}: {c.title}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => setSelectedChapterIndex(i => Math.min(book.tableOfContents.length - 1, i + 1))}
                      disabled={selectedChapterIndex === book.tableOfContents.length - 1}
                      className="p-1.5 rounded-lg bg-[#0D1424] hover:bg-slate-800 disabled:opacity-30 text-slate-300 cursor-pointer"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Font & Theme Controls */}
                  <div className="flex items-center gap-2">
                    
                    {/* Font Size */}
                    <div className="flex items-center gap-1 bg-[#0D1424] p-1 rounded-xl border border-sky-500/15">
                      <button
                        onClick={() => setReaderFontSize(f => Math.max(12, f - 1))}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
                        title="Decrease font size"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-mono text-sky-400 px-1">{readerFontSize}px</span>
                      <button
                        onClick={() => setReaderFontSize(f => Math.min(22, f + 1))}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
                        title="Increase font size"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Reader Theme */}
                    <div className="flex items-center gap-1 bg-[#0D1424] p-1 rounded-xl border border-sky-500/15">
                      <Palette className="w-3.5 h-3.5 text-slate-400 ml-1" />
                      {(['cyber', 'oled', 'sepia', 'slate'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setReaderTheme(t)}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                            readerTheme === t ? 'bg-sky-500 text-black font-mono' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Print Button */}
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Print / Save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Print PDF</span>
                    </button>

                  </div>

                </div>

                {/* READER DOCUMENT DISPLAY AREA */}
                <div 
                  className={`p-6 sm:p-10 rounded-3xl border space-y-6 leading-relaxed transition-all shadow-inner font-sans ${getReaderThemeStyles()}`}
                  style={{ fontSize: `${readerFontSize}px` }}
                >
                  
                  {/* Chapter Header */}
                  <div className="border-b border-sky-500/20 pb-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
                        {book.title} • Section {activeChapter.chapter}.1
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Pages: {activeChapter.pages}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Chapter {activeChapter.chapter}: {activeChapter.title}
                    </h2>
                  </div>

                  {/* Main Paragraphs */}
                  <div className="space-y-4">
                    <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-sky-400 first-letter:mr-1">
                      {activeChapter.summary}
                    </p>
                    <p>
                      In modern computer engineering, designing efficient algorithms and maintainable architectures necessitates a disciplined separation between mathematical abstraction and runtime execution. As systems scale across distributed clusters, latency, throughput, and state synchronization become dominant bottlenecks.
                    </p>
                  </div>

                  {/* High-Yield Academic Principle Callout */}
                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-200 text-xs space-y-1.5">
                    <div className="font-bold font-mono text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
                      💡 Core Theorem / System Principle
                    </div>
                    <p className="leading-relaxed">
                      Always verify algorithm invariants: (1) <strong>Initialization</strong> prior to loop entry, (2) <strong>Maintenance</strong> across state transitions, and (3) <strong>Termination</strong> guaranteeing output correctness within O(g(n)) asymptotic boundaries.
                    </p>
                  </div>

                  {/* Algorithmic Complexity Table */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      📊 Algorithmic & System Complexity Metrics
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 block">Best Case</span>
                        <span className="text-emerald-400 font-bold">O(1) / O(n)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 block">Average Case</span>
                        <span className="text-sky-400 font-bold">O(n log n)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 block">Worst Case</span>
                        <span className="text-amber-400 font-bold">O(n²) / O(n log n)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-center">
                        <span className="text-[10px] text-slate-400 block">Auxiliary Space</span>
                        <span className="text-cyan-400 font-bold">O(1) In-Place</span>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Executable Code Reference ({activeChapter.codeLanguage || 'C++'})</span>
                      </span>
                      <button
                        onClick={() => handleCopyCode(chapterCode)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {isCodeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCodeCopied ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#05070D] border border-sky-500/25 overflow-x-auto font-mono text-xs text-sky-300">
                      <pre><code>{chapterCode}</code></pre>
                    </div>
                  </div>

                  {/* ASCII Diagram Visualizer */}
                  <div className="p-4 rounded-2xl bg-[#05070D] border border-sky-500/20 font-mono text-[11px] text-slate-300 space-y-2">
                    <span className="text-[10px] text-sky-400 font-bold uppercase block">
                      📐 Data Flow & Architecture Pipeline
                    </span>
                    <pre className="text-cyan-300 overflow-x-auto">
{`+----------------+      +-------------------+      +------------------+
|  Input Stream  | ---> | Memory Allocation | ---> | Recurrence Tree  |
|   Array Data   |      |  TLB / Cache L1   |      | Divide & Conquer |
+----------------+      +-------------------+      +------------------+
                                                             |
                                                             v
                                                   +------------------+
                                                   | Output Result O()|
                                                   +------------------+`}
                    </pre>
                  </div>

                  {/* Chapter Completion Mark */}
                  <div className="pt-6 border-t border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleProgressChange(Math.min(100, book.progress + 25))}
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Chapter {activeChapter.chapter} Complete (+25%)</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedChapterIndex(i => Math.min(book.tableOfContents.length - 1, i + 1))}
                        disabled={selectedChapterIndex === book.tableOfContents.length - 1}
                        className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 disabled:opacity-30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Chapter</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 4: DOWNLOADS HUB */}
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                
                <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/20 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ArrowDownToLine className="w-5 h-5 text-sky-400" />
                    <span>Academic Download & Offline Export Center</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Export high-resolution study guides, raw code snippet packages, and spaced repetition flashcard decks directly to your device.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Download Option 1: Markdown Notes */}
                  <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sky-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Full Textbook Summary & Notes (.md)</h4>
                      <p className="text-xs text-slate-400">
                        Complete Markdown document formatted with all chapters, asymptotic proofs, formulas, and syllabus mappings.
                      </p>
                    </div>
                    <button
                      onClick={downloadFullNotes}
                      className="w-full py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Notes ({book.downloadSizeMb} MB)</span>
                    </button>
                  </div>

                  {/* Download Option 2: Code Snippets Archive */}
                  <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">C++ & Python Algorithms Package (.cpp)</h4>
                      <p className="text-xs text-slate-400">
                        Extracted clean, runnable source code implementations for all algorithms featured in this textbook.
                      </p>
                    </div>
                    <button
                      onClick={downloadCodeSnippets}
                      className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Code Package</span>
                    </button>
                  </div>

                  {/* Download Option 3: Anki Flashcards */}
                  <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <BookMarked className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Anki Spaced-Repetition Deck (.csv)</h4>
                      <p className="text-xs text-slate-400">
                        Pre-made Question-and-Answer flashcards ready to import directly into Anki or Quizlet for exam revision.
                      </p>
                    </div>
                    <button
                      onClick={downloadFlashcardsCSV}
                      className="w-full py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Anki Deck (.csv)</span>
                    </button>
                  </div>

                  {/* Download Option 4: Printable PDF */}
                  <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/15 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Printer className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">Printable Study Cheat Sheet</h4>
                      <p className="text-xs text-slate-400">
                        Clean, high-contrast formatted print layout suitable for physical binder notes and offline revision.
                      </p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save as PDF</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 5: PRACTICE QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                
                <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-sky-400 font-bold font-mono">
                      Chapter {activeChapter.chapter} Assessment
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Practice Quiz: {activeChapter.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Quiz</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {currentQuiz.map((q, qIndex) => {
                    const selectedOption = quizAnswers[qIndex];
                    const isAnswered = selectedOption !== undefined;
                    const isCorrect = isAnswered && selectedOption === q.answerIndex;

                    return (
                      <div 
                        key={qIndex}
                        className={`p-5 rounded-2xl bg-[#070B14] border transition-all space-y-3 ${
                          quizSubmitted && isAnswered
                            ? (isCorrect ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-rose-500/40 bg-rose-950/10')
                            : 'border-sky-500/15'
                        }`}
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-white flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                            Q{qIndex + 1}
                          </span>
                          <span className="pt-0.5">{q.question}</span>
                        </h4>

                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {q.options.map((opt, optIndex) => {
                            const isThisSelected = selectedOption === optIndex;
                            let btnStyle = 'bg-[#0D1424] text-slate-300 border-sky-500/10 hover:border-sky-500/30';

                            if (quizSubmitted) {
                              if (optIndex === q.answerIndex) {
                                btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold';
                              } else if (isThisSelected) {
                                btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/50';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'bg-sky-500/25 text-white border-sky-400 font-bold';
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => {
                                  if (!quizSubmitted) {
                                    setQuizAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
                                  }
                                }}
                                className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIndex === q.answerIndex && (
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-1">
                            <span className="text-[10px] uppercase font-bold text-sky-400 font-mono block">
                              Explanation
                            </span>
                            <p>{q.explanation}</p>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Answered {Object.keys(quizAnswers).length} of {currentQuiz.length} questions
                  </span>
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <span>Check Quiz Answers</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* MODAL FOOTER */}
          <div className="p-4 border-t border-sky-500/15 bg-[#070B14] flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] hidden sm:inline">
              BSCS Library AI • {book.title} ({book.year})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAskAIAboutBook}
                className="px-3.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold cursor-pointer"
              >
                <span>Ask AI Tutor</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
