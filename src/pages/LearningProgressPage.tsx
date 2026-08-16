import React from 'react';
import { 
  Clock, 
  Flame, 
  Target, 
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';

const WEEKLY_STUDY_DATA = [
  { day: 'Mon', hours: 4.2 },
  { day: 'Tue', hours: 6.5 },
  { day: 'Wed', hours: 5.8 },
  { day: 'Thu', hours: 7.4 },
  { day: 'Fri', hours: 6.0 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 4.1 },
];

const SUBJECT_MASTERY_DATA = [
  { subject: 'DSA', score: 88 },
  { subject: 'AI & ML', score: 76 },
  { subject: 'OS', score: 92 },
  { subject: 'DBMS', score: 84 },
  { subject: 'Networks', score: 68 },
];

export const LearningProgressPage: React.FC = () => {
  const milestones = [
    { title: 'DSA Master', desc: 'Finished 5 benchmark Data Structure chapters', earned: true, icon: '🏆' },
    { title: 'AI Pioneer', desc: 'Explored Machine Learning & Transformer papers', earned: true, icon: '🤖' },
    { title: 'Consistent Scholar', desc: 'Maintained 5-day active study streak', earned: true, icon: '🔥' },
    { title: 'Systems Architect', desc: 'Read 3 Distributed Systems publications', earned: false, icon: '⚡' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
          Performance & Analytics
        </span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
          Learning Progress & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Track weekly study durations, subject mastery levels, syllabus roadmaps, and academic achievement badges.
        </p>
      </div>

      {/* Top Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl cyber-card flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Study Hours</p>
            <h3 className="text-2xl font-extrabold text-white font-display mt-1">42.5 hrs</h3>
            <p className="text-[11px] text-emerald-400 font-mono mt-0.5">+6.2 hrs this week</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-sky-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl cyber-card flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Study Streak</p>
            <h3 className="text-2xl font-extrabold text-white font-display mt-1">5 Days</h3>
            <p className="text-[11px] text-amber-400 font-mono mt-0.5">Top 5% of class</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-amber-400" />
          </div>
        </div>

        <div className="p-5 rounded-2xl cyber-card flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Syllabus Completion</p>
            <h3 className="text-2xl font-extrabold text-white font-display mt-1">68%</h3>
            <p className="text-[11px] text-sky-400 font-mono mt-0.5">Semester 5 Track</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl cyber-card flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">AI Problems Solved</p>
            <h3 className="text-2xl font-extrabold text-white font-display mt-1">38</h3>
            <p className="text-[11px] text-cyan-400 font-mono mt-0.5">100% resolution</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Study Hours Area Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl cyber-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Weekly Study Hours</h3>
              <p className="text-xs text-slate-400">Daily logged reading time (Mon - Sun)</p>
            </div>
            <span className="text-xs font-mono text-sky-400 font-bold">~6.0 hrs/day</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_STUDY_DATA}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="h" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#070B14', borderColor: '#38BDF8', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#38BDF8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Mastery Bar Chart (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl cyber-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Subject Mastery</h3>
              <p className="text-xs text-slate-400">Proficiency by CS discipline (%)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUBJECT_MASTERY_DATA} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" fontSize={11} unit="%" />
                <YAxis dataKey="subject" type="category" stroke="#64748B" fontSize={10} width={75} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#070B14', borderColor: '#22D3EE', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="score" fill="#2563EB" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Achievement Badges */}
      <div className="p-6 rounded-3xl cyber-card space-y-4">
        <h3 className="text-base font-bold text-white font-display">
          Academic Achievement Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-left space-y-2 ${
                m.earned 
                  ? 'bg-[#070B14] border-sky-500/30' 
                  : 'bg-[#05070D]/60 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{m.icon}</span>
                {m.earned ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Unlocked
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                    Locked
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white">{m.title}</h4>
              <p className="text-xs text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
