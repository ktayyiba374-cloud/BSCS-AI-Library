import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Zap, Crown, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleActivate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full p-8 rounded-3xl bg-[#0D1424] border border-sky-400/30 shadow-[0_0_50px_rgba(56,189,248,0.25)] text-left overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-500 to-cyan-400 p-[2px] shadow-lg">
              <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center text-amber-400">
                <Crown className="w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-sky-400 font-bold">BSCS Scholar Pro</span>
              <h3 className="text-xl font-bold text-white">Upgrade Your Learning Experience</h3>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Unlock advanced AI study roadmaps, unlimited instant book summaries, high-speed PDF export, and personalized code reviews.
          </p>

          {/* Benefits list */}
          <div className="space-y-3 mb-8">
            {[
              'Unlimited queries with AI Library Assistant',
              'Full access to 500+ Solved Midterm & Terminal calculation sheets',
              'Interactive C++/Python/Java live code compiler sandbox',
              'Offline reading bookmarks and automatic sync across devices',
              'Personalized weekly study roadmap based on your semester'
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleActivate}
              className="flex-1 neon-glow-btn py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Activate Pro Access (Free Demo)</span>
            </motion.button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/20 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
