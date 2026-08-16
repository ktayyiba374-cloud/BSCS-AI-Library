import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bookmark, 
  BookOpen, 
  CheckCircle2, 
  Heart, 
  Clock, 
  Play, 
  Star, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyLibraryPage: React.FC = () => {
  const { books, setSelectedBook, toggleSaveBook, toggleFavoriteBook, updateBookProgress } = useApp();
  const [tab, setTab] = useState<'reading' | 'saved' | 'favorites' | 'completed'>('reading');

  const currentlyReading = books.filter(b => b.progress > 0 && b.progress < 100);
  const savedBooks = books.filter(b => b.isSaved);
  const favoriteBooks = books.filter(b => b.isFavorite);
  const completedBooks = books.filter(b => b.progress === 100);

  const getActiveList = () => {
    switch (tab) {
      case 'reading': return currentlyReading;
      case 'saved': return savedBooks;
      case 'favorites': return favoriteBooks;
      case 'completed': return completedBooks;
      default: return [];
    }
  };

  const activeList = getActiveList();

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Page Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
          Personal Study Vault
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          My Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Manage your reading queue, favorite academic papers, and completed computer science milestones.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-sky-500/15 pb-2 overflow-x-auto">
        {[
          { id: 'reading', label: 'Currently Reading', count: currentlyReading.length, icon: Play },
          { id: 'saved', label: 'Saved Books', count: savedBooks.length, icon: Bookmark },
          { id: 'favorites', label: 'Favorites', count: favoriteBooks.length, icon: Heart },
          { id: 'completed', label: 'Completed', count: completedBooks.length, icon: CheckCircle2 },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-[#0D1424] text-slate-400 hover:text-white border border-sky-500/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-300'
              }`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Books in this tab */}
      {activeList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl cyber-card space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
          <h3 className="text-base font-bold text-white">No items in this collection yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Browse the 10,000+ book repository to bookmark or start reading books for your semester.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeList.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl cyber-card flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedBook(book)}
            >
              <div className="space-y-3">
                <div className="relative h-48 rounded-xl overflow-hidden bg-[#070B14]">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-sky-300">
                    {book.category}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteBook(book.id);
                      }}
                      className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                        book.isFavorite ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-black/60 text-slate-400'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${book.isFavorite ? 'fill-rose-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    By {book.author}
                  </p>
                </div>

                {/* Progress bar in card */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-sky-400 font-bold">{book.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-sky-400 h-full rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-sky-500/10 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBook(book);
                  }}
                  className="px-3 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-sky-400" />
                  <span>Read</span>
                </button>
                <span className="text-[10px] text-slate-500 font-mono">
                  {book.pages} pgs
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
