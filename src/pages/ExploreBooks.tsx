import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Star, 
  Bookmark, 
  Layers, 
  SlidersHorizontal, 
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LibraryBook } from '../data/bscsLibraryData';

export const ExploreBooks: React.FC = () => {
  const { 
    books, 
    categories, 
    setSelectedBook, 
    toggleSaveBook, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    addToRecentlyViewed
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'pages' | 'year'>('rating');

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesQuery = 
          book.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
          book.category.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
          book.keyConcepts.some(k => k.toLowerCase().includes(globalSearchQuery.toLowerCase()));

        const matchesCat = selectedCategory === 'All' || book.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesDiff = selectedDifficulty === 'All' || book.difficulty === selectedDifficulty;

        return matchesQuery && matchesCat && matchesDiff;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'pages') return b.pages - a.pages;
        if (sortBy === 'year') return Number(b.year) - Number(a.year);
        return 0;
      });
  }, [books, globalSearchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const handleOpenBook = (book: LibraryBook) => {
    addToRecentlyViewed(book.id);
    setSelectedBook(book);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
            Academic Repository
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Explore 10,000+ Textbooks
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Comprehensive computer science, mathematics, software architecture, and AI literature.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Showing</span>
          <span className="text-sky-400 font-bold">{filteredBooks.length}</span>
          <span>of {books.length} Books</span>
        </div>
      </div>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="p-5 rounded-2xl cyber-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Main Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search by book title, author, keyword, or ISBN..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner (1st - 2nd Sem)</option>
              <option value="Intermediate">Intermediate (3rd - 5th Sem)</option>
              <option value="Advanced">Advanced (6th - 8th Sem)</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
            >
              <option value="rating">Sort by: Highest Rating ⭐</option>
              <option value="title">Sort by: Title (A-Z)</option>
              <option value="pages">Sort by: Length (Pages)</option>
              <option value="year">Sort by: Publication Year</option>
            </select>
          </div>

        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-sky-500/10">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-[#070B14] text-slate-400 hover:text-white border border-sky-500/10'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === c.name.toLowerCase()
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30'
                  : 'bg-[#070B14] text-slate-400 hover:text-white border border-sky-500/10'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* BOOKS GRID */}
      {filteredBooks.length === 0 ? (
        <div className="p-12 text-center rounded-3xl cyber-card space-y-4">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-white">No Books Match Your Criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset category and difficulty filters.
          </p>
          <button
            onClick={() => {
              setGlobalSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -6 }}
              className="rounded-2xl cyber-card overflow-hidden flex flex-col justify-between group"
            >
              {/* Cover */}
              <div 
                className="relative h-48 sm:h-52 bg-[#070B14] overflow-hidden cursor-pointer"
                onClick={() => handleOpenBook(book)}
              >
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent" />
                
                {/* Category & Bookmark */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#070B14]/80 backdrop-blur-md border border-sky-500/30 text-[10px] font-mono text-sky-300">
                  {book.category}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveBook(book.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border transition-all ${
                    book.isSaved 
                      ? 'bg-sky-500/20 text-sky-400 border-sky-400/50' 
                      : 'bg-black/60 text-slate-400 border-white/10 hover:text-white'
                  }`}
                  title="Save book"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${book.isSaved ? 'fill-sky-400' : ''}`} />
                </button>

                {/* Rating */}
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-bold flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>{book.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div 
                  className="space-y-1 cursor-pointer"
                  onClick={() => handleOpenBook(book)}
                >
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
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
                    onClick={() => handleOpenBook(book)}
                    className="px-3 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Preview</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
