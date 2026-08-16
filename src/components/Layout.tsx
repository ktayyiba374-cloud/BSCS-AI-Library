import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Bookmark, 
  Layers, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  Code2, 
  ListOrdered, 
  Clock, 
  BookmarkCheck, 
  TrendingUp, 
  Bell, 
  Settings, 
  Search, 
  Menu, 
  X, 
  Lightbulb, 
  Crown, 
  Zap, 
  Home, 
  Bot, 
  User, 
  ChevronRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AiAssistantSidebar } from './AiAssistantSidebar';
import { BookDetailModal } from './BookDetailModal';
import { UpgradeModal } from './UpgradeModal';
import { MOCK_ACADEMIC_QUOTES } from '../data/bscsLibraryData';

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    selectedBook, 
    setSelectedBook, 
    notifications, 
    globalSearchQuery, 
    setGlobalSearchQuery,
    isUpgradeModalOpen,
    setIsUpgradeModalOpen,
    aiPanelOpen,
    setAiPanelOpen,
    toggleAiPanel
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Explore Books', path: '/books', icon: BookOpen },
    { label: 'My Library', path: '/my-library', icon: Bookmark },
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'AI Library Assistant', path: '/ai-assistant', icon: Sparkles },
    { label: 'Research Papers', path: '/research', icon: FileText },
    { label: 'Study Materials', path: '/study-materials', icon: GraduationCap },
    { label: 'Programming Resources', path: '/programming', icon: Code2 },
    { label: 'Reading Lists', path: '/reading-lists', icon: ListOrdered },
    { label: 'Recently Viewed', path: '/recent', icon: Clock },
    { label: 'Bookmarks', path: '/bookmarks', icon: BookmarkCheck },
    { label: 'Learning Progress', path: '/progress', icon: TrendingUp },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: unreadNotifsCount > 0 ? unreadNotifsCount : undefined },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const dailyQuote = MOCK_ACADEMIC_QUOTES[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== '/books') {
      navigate('/books');
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-[#F8FAFC] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#2563EB] selection:text-white">
      
      {/* UPGRADE PRO MODAL */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      {/* BOOK DETAILS / READER MODAL */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-40 h-16 bg-[#070B14]/90 backdrop-blur-xl border-b border-sky-500/15 px-4 md:px-6 flex items-center justify-between shadow-md">
        
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl bg-[#0D1424] hover:bg-slate-800 text-slate-300 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(56,189,248,0.35)]">
              <div className="w-full h-full bg-[#070B14] rounded-xl flex items-center justify-center text-sky-400">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight flex items-center gap-1 font-display">
                BSCS Library <span className="text-sky-400">AI</span>
              </span>
            </div>
          </Link>

          {/* Quick Return to Hero Landing Portal */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-xs font-semibold text-sky-300 transition-colors ml-4"
            title="Return to Hero Landing View"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Hero Landing</span>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden sm:block flex-1 max-w-md mx-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search books, authors, topics, research papers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D1424] border border-sky-500/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all"
            />
          </form>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Bell */}
          <Link
            to="/notifications"
            className="relative p-2.5 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-slate-300 hover:text-sky-300 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadNotifsCount}
              </span>
            )}
          </Link>

          {/* AI Panel Toggle Icon */}
          <button
            onClick={toggleAiPanel}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-bold ${
              aiPanelOpen 
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]' 
                : 'bg-[#0D1424] text-slate-300 border-sky-500/20 hover:text-white'
            }`}
            title="Toggle AI Assistant Sidebar"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>AI Tutor</span>
          </button>

          {/* Student Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(p => !p)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-xs">
                BS
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">Student</p>
                <p className="text-[10px] text-sky-400 font-mono leading-tight">Semester 5</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-[#0D1424] border border-sky-500/30 shadow-2xl z-50 text-xs">
                <div className="p-3 border-b border-sky-500/10 mb-1">
                  <p className="font-bold text-white">CS Undergraduate</p>
                  <p className="text-slate-400 text-[11px]">student@bscs-library.ai</p>
                </div>
                <Link
                  to="/progress"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 text-slate-300 transition-colors"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                  <span>My Learning Progress</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 text-slate-300 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-sky-400" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    setIsUpgradeModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-sky-500/10 text-sky-300 font-bold transition-colors text-left"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Upgrade to Pro</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* THREE-COLUMN WORKSPACE: LEFT SIDEBAR | MAIN CONTENT | RIGHT AI PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR (Desktop Fixed & Mobile Drawer) */}
        <aside className={`fixed md:sticky top-16 bottom-0 left-0 w-64 md:w-64 bg-[#070B14] border-r border-sky-500/15 z-30 flex flex-col justify-between overflow-y-auto scrollbar-thin transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          
          {/* Nav items list */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Library Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-[#0D1424]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-sky-500/20 text-sky-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* SIDEBAR BOTTOM: Upgrade card + Daily quote */}
          <div className="p-3 space-y-3 border-t border-sky-500/15 bg-[#05070D]">
            
            {/* Upgrade Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#0D1424] border border-sky-500/30 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white">Upgrade Your Learning</h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Unlock advanced AI recommendations and premium resources.
              </p>
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20"
              >
                <span>Explore Premium</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Daily Knowledge Quote */}
            <div className="p-3 rounded-xl bg-[#070B14] border border-sky-500/15 text-left space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-400 uppercase">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Daily Knowledge</span>
              </div>
              <p className="text-[11px] text-slate-300 italic leading-snug">
                “{dailyQuote.quote}”
              </p>
              <p className="text-[10px] text-slate-500 text-right font-medium">
                — {dailyQuote.author}
              </p>
            </div>

          </div>

        </aside>

        {/* MAIN DASHBOARD CONTENT ROUTE */}
        <main className={`flex-1 min-w-0 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
          aiPanelOpen ? 'md:mr-80 sm:mr-96' : ''
        }`}>
          <Outlet />
        </main>

        {/* RIGHT PERSISTENT AI ASSISTANT SIDEBAR */}
        <AiAssistantSidebar />

      </div>

    </div>
  );
};
