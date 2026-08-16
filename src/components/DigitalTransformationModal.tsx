import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Cpu, GraduationCap, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DigitalTransformationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const DigitalTransformationModal: React.FC<DigitalTransformationModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setProgress(10);
      return;
    }

    const t1 = setTimeout(() => {
      setStep(2);
      setProgress(35);
    }, 400);

    const t2 = setTimeout(() => {
      setStep(3);
      setProgress(65);
    }, 900);

    const t3 = setTimeout(() => {
      setStep(4);
      setProgress(95);
    }, 1400);

    const t4 = setTimeout(() => {
      setProgress(100);
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070D]/95 backdrop-blur-2xl overflow-hidden"
      >
        {/* Animated Cyber Particles & Circuit Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          
          {/* Neon Grid Laser Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Animated beam rays */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-32 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          />
        </div>

        {/* Center Loading Core Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.08, opacity: 0 }}
          className="relative z-10 max-w-md w-full mx-4 p-8 rounded-3xl bg-[#0D1424]/90 border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.25)] text-center flex flex-col items-center"
        >
          {/* Holographic Logo Transformation */}
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-sky-400/40"
            />
            
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 p-[2px] shadow-[0_0_30px_rgba(56,189,248,0.6)] flex items-center justify-center"
            >
              <div className="w-full h-full bg-[#070B14] rounded-2xl flex items-center justify-center relative overflow-hidden">
                {step < 3 ? (
                  <BookOpen className="w-9 h-9 text-sky-400 animate-pulse" />
                ) : (
                  <Sparkles className="w-9 h-9 text-cyan-300 animate-spin-slow" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-bold shadow-lg"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
            </motion.div>
          </div>

          {/* Title & Status */}
          <h3 className="text-xl font-bold text-white tracking-wide mb-1 flex items-center gap-2">
            BSCS Library AI
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
              v3.0 Core
            </span>
          </h3>
          <p className="text-xs text-sky-300/80 mb-6 font-medium">
            Discover. Learn. Innovate.
          </p>

          {/* Animated Status Text */}
          <div className="h-10 flex items-center justify-center mb-4">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm font-semibold text-slate-200 flex items-center gap-2"
            >
              {step === 1 && (
                <>
                  <Cpu className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>Connecting to Academic Knowledge Base...</span>
                </>
              )}
              {step === 2 && (
                <>
                  <BookOpen className="w-4 h-4 text-cyan-400 animate-bounce" />
                  <span>Indexing 10,000+ Computer Science Textbooks...</span>
                </>
              )}
              {step === 3 && (
                <>
                  <Sparkles className="w-4 h-4 text-sky-400 animate-spin" />
                  <span>Initializing AI Assistant Neural Engine...</span>
                </>
              )}
              {step >= 4 && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Digital Library Ready. Opening Workspace...</span>
                </>
              )}
            </motion.div>
          </div>

          {/* Glowing Progress Bar */}
          <div className="w-full bg-[#070B14] rounded-full h-2.5 overflow-hidden p-0.5 border border-sky-500/20 mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              initial={{ width: '10%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs text-slate-400 font-mono">
            <span>TRANSFORMING DATA</span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
