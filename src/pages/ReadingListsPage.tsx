import React, { useState } from 'react';
import { 
  Plus, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_READING_LISTS, ReadingList } from '../data/bscsLibraryData';

export const ReadingListsPage: React.FC = () => {
  const { books, setSelectedBook, sendUserMessage, setAiPanelOpen } = useApp();
  const [lists, setLists] = useState<ReadingList[]>(INITIAL_READING_LISTS);
  const [activeListId, setActiveListId] = useState<string>(INITIAL_READING_LISTS[0].id);
  const [newListName, setNewListName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeList = lists.find(l => l.id === activeListId) || lists[0];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList: ReadingList = {
      id: `list-${Date.now()}`,
      title: newListName,
      description: 'Custom curated student learning track.',
      bookIds: ['book-1', 'book-2'],
      category: 'General CS',
      color: '#38BDF8',
      createdAt: 'Just now'
    };

    setLists(prev => [newList, ...prev]);
    setActiveListId(newList.id);
    setNewListName('');
    setShowCreateModal(false);
  };

  const handleAskAIAboutList = (list: ReadingList) => {
    sendUserMessage(`Can you create a structured 4-week study schedule and weekly milestones for the reading list "${list.title}"?`);
    setAiPanelOpen(true);
  };

  const listBooks = books.filter(b => activeList.bookIds.includes(b.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
            Structured Roadmaps
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Curated Reading Lists
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Semester study sequences, career tracks (AI Engineer, Full Stack, Systems Architect), and custom personal roadmaps.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom List</span>
        </button>
      </div>

      {/* Main Grid: Left Lists Sidebar | Right List Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lists Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider px-1">
            Available Study Roadmaps
          </h3>

          <div className="space-y-2.5">
            {lists.map((l) => {
              const isActive = l.id === activeListId;
              return (
                <div
                  key={l.id}
                  onClick={() => setActiveListId(l.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#111B2E] border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                      : 'bg-[#0D1424] border border-sky-500/15 hover:border-sky-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                      {l.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {l.bookIds.length} Books
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {l.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {l.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* List Detail View (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl cyber-card space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sky-500/15 pb-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-mono font-bold">
                  Track: {activeList.category}
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  ★ Verified Curriculum
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white font-display">
                {activeList.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeList.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAskAIAboutList(activeList)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Study Plan</span>
              </button>
            </div>
          </div>

          {/* Books in this sequence */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Recommended Reading Sequence ({listBooks.length} Textbooks)
            </h3>

            <div className="space-y-3">
              {listBooks.map((book, idx) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="p-4 rounded-2xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/15 flex items-center justify-between gap-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>

                    <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-sky-500/20 bg-[#0D1424]">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-400">By {book.author}</p>
                      <span className="text-[10px] text-sky-400 font-mono">{book.pages} Pages • {book.difficulty}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#0D1424] border border-sky-500/30 text-left space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Reading Roadmap</h3>
            <p className="text-xs text-slate-300">
              Enter a name for your custom collection (e.g., “Final Year Project Prep”, “Mastering Compilers”).
            </p>
            <form onSubmit={handleCreateList} className="space-y-4">
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Reading List Title..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Create Roadmap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
