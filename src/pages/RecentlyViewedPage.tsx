import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Star, Play, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LibraryBook } from '../data/bscsLibraryData';

export const RecentlyViewedPage: React.FC = () => {
  const { books, recentlyViewedBookIds, setSelectedBook } = useApp();

  const recentBooks = recentlyViewedBookIds
    .map(id => books.find(b => b.id === id))
    .filter((b): b is LibraryBook => Boolean(b));

  const displayBooks: LibraryBook[] = recentBooks.length > 0 ? recentBooks : books.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
          Activity History
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Recently Viewed Books
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Jump right back into the textbooks, chapters, and research materials you explored earlier.
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
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-amber-300 font-bold flex items-center gap-1">
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

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Chapter {Math.max(1, Math.ceil((book.progress / 100) * book.tableOfContents.length))}</span>
                  <span className="text-sky-400 font-bold">{book.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-sky-400 h-full rounded-full"
                    style={{ width: `${Math.max(book.progress, 10)}%` }}
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
                className="neon-glow-btn px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Resume Reading</span>
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
