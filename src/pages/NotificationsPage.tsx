import React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCheck, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  FileText, 
  Trash2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAllNotificationsAsRead, markNotificationAsRead } = useApp();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'recommendation': return Sparkles;
      case 'reminder': return Calendar;
      case 'update': return BookOpen;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-bold font-mono">
            Academic Alerts
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Notifications & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Stay updated with newly indexed textbooks, AI study recommendations, and semester exam alerts.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="px-4 py-2 rounded-xl bg-[#0D1424] hover:bg-[#111B2E] border border-sky-500/20 text-slate-300 hover:text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = getIconForType(n.type);
          return (
            <motion.div
              key={n.id}
              whileHover={{ x: 4 }}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                n.read 
                  ? 'bg-[#0D1424]/60 border-white/5 opacity-75' 
                  : 'bg-[#0D1424] border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  n.type === 'recommendation' ? 'bg-cyan-500/20 text-cyan-400' :
                  n.type === 'reminder' ? 'bg-amber-500/20 text-amber-400' :
                  n.type === 'update' ? 'bg-blue-500/20 text-sky-400' :
                  'bg-indigo-500/20 text-indigo-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {n.message}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono block pt-1">
                    {n.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
