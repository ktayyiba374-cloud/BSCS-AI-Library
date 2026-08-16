import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Download, 
  Sparkles
} from 'lucide-react';
import { STUDY_MATERIALS, StudyMaterial } from '../data/bscsLibraryData';
import { useApp } from '../context/AppContext';

export const StudyMaterialsPage: React.FC = () => {
  const { sendUserMessage, setAiPanelOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredMaterials = STUDY_MATERIALS.filter(mat => {
    const matchesSearch = 
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSem = selectedSemester === 'All' || mat.semester.toString() === selectedSemester;
    const matchesType = selectedType === 'All' || mat.type === selectedType;

    return matchesSearch && matchesSem && matchesType;
  });

  const handleDownload = (material: StudyMaterial) => {
    const textContent = `# ${material.title}\nCourse: ${material.course} (Semester ${material.semester})\nType: ${material.type}\nAuthor: ${material.author}\n\nTags:\n${material.tags.map(t => `- ${t}`).join('\n')}\n\n## Description:\n${material.description}`;
    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${material.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleAskAIAboutMaterial = (material: StudyMaterial) => {
    sendUserMessage(`Can you explain the key problem sets and formulas covered in "${material.title}" for ${material.course}?`);
    setAiPanelOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
            Academic Vault
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Study Materials & Solved Exams
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Handpicked university lecture slides, solved midterm & terminal question papers, and cheat sheets.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span>Total Materials:</span>
          <span className="text-sky-400 font-bold">{STUDY_MATERIALS.length} Resources</span>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 rounded-2xl cyber-card grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials by course, topic, or title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>

        {/* Semester Filter */}
        <div>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
          >
            <option value="All">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>

        {/* Material Type */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#070B14] border border-sky-500/20 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
          >
            <option value="All">All Resource Types</option>
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Exam Preparation">Exam Preparation / Cheat Sheet</option>
            <option value="Assignments">Assignments & Labs</option>
            <option value="Tutorials">Tutorials</option>
          </select>
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => (
          <motion.div
            key={mat.id}
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl cyber-card flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-[10px] font-bold font-mono text-sky-300">
                  Sem {mat.semester} • {mat.type}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {mat.fileFormat}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Course: <span className="text-slate-300 font-semibold">{mat.course}</span>
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Key Content
                </span>
                <div className="flex flex-wrap gap-1">
                  {mat.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-[#070B14] border border-sky-500/10 text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>By {mat.author}</span>
                <span>{mat.downloadsCount.toLocaleString()} Downloads</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-sky-500/10 flex items-center justify-between gap-2">
              <button
                onClick={() => handleAskAIAboutMaterial(mat)}
                className="px-3 py-1.5 rounded-lg bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/20 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explain</span>
              </button>

              <button
                onClick={() => handleDownload(mat)}
                className="neon-glow-btn px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
