import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Cpu, 
  Binary, 
  Database, 
  Globe, 
  ShieldCheck, 
  Code2, 
  ArrowRight, 
  Share2, 
  Sigma,
  BookOpen,
  Star,
  Download,
  Bookmark,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/bscsLibraryData';
import { useApp } from '../context/AppContext';

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { books, setSelectedBook, toggleSaveBook, addToRecentlyViewed } = useApp();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const getIconForCategory = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Binary': return Binary;
      case 'Code': return Code2;
      case 'Database': return Database;
      case 'Share2': return Share2;
      case 'Globe': return Globe;
      case 'ShieldCheck': return ShieldCheck;
      case 'Layers': return Layers;
      case 'Sigma': return Sigma;
      default: return Layers;
    }
  };

  const activeCategoryBooks = selectedCategoryName
    ? books.filter(b => b.category.toLowerCase().includes(selectedCategoryName.toLowerCase()))
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
          Curriculum Classification
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Academic Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Curated disciplines structured across the entire 4-year Computer Science degree curriculum. Click any category to open and read its textbooks.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_DATA.map((cat, idx) => {
          const Icon = getIconForCategory(cat.iconName);
          const isSelected = selectedCategoryName === cat.name;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl cyber-card flex flex-col justify-between space-y-4 group cursor-pointer transition-all ${
                isSelected ? 'border-sky-400 bg-[#0B1F3A]/40 shadow-[0_0_25px_rgba(56,189,248,0.25)]' : ''
              }`}
              onClick={() => setSelectedCategoryName(isSelected ? null : cat.name)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-sky-500/30 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#070B14] border border-sky-500/20 text-xs font-mono text-sky-400">
                    {cat.booksCount} Textbooks
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Indexed Materials
                  </span>
                  <div className="mt-1 text-xs font-mono text-slate-300">
                    {cat.resourcesCount} Solved Papers & Guides
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/10 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>{isSelected ? 'Viewing Books Below' : `Browse ${cat.name} Books`}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-300' : 'group-hover:translate-x-1'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Category Books Section */}
      {selectedCategoryName && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-6 border-t border-sky-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold">
                Category Books
              </span>
              <h2 className="text-2xl font-bold text-white font-display">
                {selectedCategoryName} Books ({activeCategoryBooks.length})
              </h2>
            </div>
            <button
              onClick={() => setSelectedCategoryName(null)}
              className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear Category Filter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeCategoryBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -5 }}
                className="rounded-2xl cyber-card overflow-hidden flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  addToRecentlyViewed(book.id);
                  setSelectedBook(book);
                }}
              >
                <div className="relative h-48 bg-[#070B14] overflow-hidden">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-sky-300">
                    {book.category}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-amber-300 font-bold flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      By {book.author}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pt-1">
                      {book.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-sky-500/10 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {book.pages} pgs • {book.difficulty}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToRecentlyViewed(book.id);
                        setSelectedBook(book);
                      }}
                      className="px-3 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
};
