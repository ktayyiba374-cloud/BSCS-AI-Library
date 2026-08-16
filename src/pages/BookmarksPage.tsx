import React from 'react';
import { motion } from 'motion/react';
import { BookmarkCheck, BookOpen, Star, Play, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookmarksPage: React.FC = () => {
  const { books, setSelectedBook, toggleSaveBook } = useApp();

  const savedBooks = books.filter(b => b.isSaved);
  const displayBooks = savedBooks.length > 0 ? savedBooks : books.slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
          Saved Resources
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Bookmarks & Pinned Textbooks
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Your bookmarked literature, reference algorithms, and saved research publications.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayBooks.map((book) => (
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveBook(book.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/40"
                  title="Remove bookmark"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 fill-sky-400" />
                </button>
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

            <div className="pt-3 mt-3 border-t border-sky-500/10 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBook(book);
                }}
                className="px-3 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-sky-400" />
                <span>Open Reader</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">
                {book.pages} pgs
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
