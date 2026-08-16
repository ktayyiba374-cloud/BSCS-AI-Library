import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bookmark, 
  Check, 
  Copy, 
  X,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/bscsLibraryData';

export const ResearchPapersPage: React.FC = () => {
  const { sendUserMessage, setAiPanelOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [activePaperModal, setActivePaperModal] = useState<ResearchPaper | null>(null);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [savedPapers, setSavedPapers] = useState<string[]>([]);

  const filteredPapers = RESEARCH_PAPERS.filter(paper => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTopic = selectedTopic === 'All' || paper.topic.toLowerCase().includes(selectedTopic.toLowerCase());

    return matchesSearch && matchesTopic;
  });

  const handleToggleSave = (id: string) => {
    setSavedPapers(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleCopyBibtex = (paper: ResearchPaper) => {
    const bibtex = `@article{${paper.id},\n  title={${paper.title}},\n  author={${paper.authors.join(' and ')}},\n  journal={${paper.journal}},\n  year={${paper.publicationDate}},\n  doi={${paper.doi}}\n}`;
    navigator.clipboard?.writeText(bibtex);
    setCopiedDoi(paper.id);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const handleAskAIAboutPaper = (paper: ResearchPaper) => {
    sendUserMessage(`Can you break down the research methodology and revolutionary impact of the paper "${paper.title}" (${paper.journal}, ${paper.publicationDate})?`);
    setAiPanelOpen(true);
    setActivePaperModal(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold font-mono">
            Peer-Reviewed Literature
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Research Papers Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Landmark publications in Artificial Intelligence, Distributed Systems, Cryptography, and Computer Architecture.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Indexed Publications:</span>
          <span className="text-cyan-400 font-bold">{RESEARCH_PAPERS.length} Papers</span>
        </div>
      </div>

      {/* Search & Topic Filter */}
      <div className="p-4 rounded-2xl cyber-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by keyword, author, or conference..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {['All', 'Artificial Intelligence', 'Databases', 'Machine Learning', 'Cybersecurity'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedTopic(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTopic === c
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md'
                  : 'bg-[#070B14] text-slate-400 hover:text-white border border-sky-500/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Papers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => {
          const isSaved = savedPapers.includes(paper.id);
          return (
            <motion.div
              key={paper.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl cyber-card flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-3">
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[10px] font-bold font-mono">
                      {paper.topic}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {paper.publicationDate} • {paper.journal}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleSave(paper.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSaved ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-sky-400' : ''}`} />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3 
                    onClick={() => setActivePaperModal(paper)}
                    className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
                  >
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {paper.authors.join(', ')}
                  </p>
                </div>

                {/* Abstract Preview */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {paper.abstract}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Key Highlights
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.keyFindings.slice(0, 2).map((k, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#070B14] border border-sky-500/15 text-[10px] text-sky-200">
                        • {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-sky-500/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                  {paper.citations.toLocaleString()} Citations
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyBibtex(paper)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#070B14] hover:bg-slate-800 border border-sky-500/20 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy BibTeX Citation"
                  >
                    {copiedDoi === paper.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>BibTeX</span>
                  </button>

                  <button
                    onClick={() => setActivePaperModal(paper)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Abstract</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* PAPER ABSTRACT FULL MODAL */}
      <AnimatePresence>
        {activePaperModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActivePaperModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-[#0D1424] border border-sky-400/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] text-left space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActivePaperModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                  {activePaperModal.journal} • {activePaperModal.publicationDate}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {activePaperModal.title}
                </h2>
                <p className="text-xs text-sky-300 font-medium">
                  {activePaperModal.authors.join(', ')}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  DOI: {activePaperModal.doi} • {activePaperModal.citations.toLocaleString()} Citations
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#070B14] border border-sky-500/20 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Executive Abstract
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activePaperModal.abstract}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                  Core Scientific Contributions
                </h4>
                <div className="space-y-1.5">
                  {activePaperModal.keyFindings.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-sky-500/15 flex flex-wrap gap-3">
                <button
                  onClick={() => handleAskAIAboutPaper(activePaperModal)}
                  className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Explain Paper with AI Tutor</span>
                </button>

                <button
                  onClick={() => handleCopyBibtex(activePaperModal)}
                  className="px-4 py-2.5 rounded-xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/20 text-xs font-semibold text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy BibTeX</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
