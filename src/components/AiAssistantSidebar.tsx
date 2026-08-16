import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Copy, 
  Check, 
  BookOpen, 
  Terminal, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiAssistantSidebar: React.FC = () => {
  const { 
    chatMessages, 
    isAiTyping, 
    sendUserMessage, 
    clearChatHistory, 
    aiPanelOpen, 
    setAiPanelOpen 
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (aiPanelOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isAiTyping, aiPanelOpen]);

  const handleSend = (text?: string) => {
    const toSend = text || inputVal;
    if (!toSend.trim()) return;
    sendUserMessage(toSend);
    setInputVal('');
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const suggestedPrompts = [
    'Recommend a programming book',
    'Find AI research papers',
    'Explain Data Structures',
    'Help me prepare for exams'
  ];

  return (
    <>
      {/* Floating Toggle Button when closed */}
      {!aiPanelOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setAiPanelOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center gap-2.5 font-bold text-xs cursor-pointer border border-cyan-300/30"
          title="Open AI Library Assistant"
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <span className="hidden sm:inline">Ask AI Assistant</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </motion.button>
      )}

      {/* Persistent Right Panel */}
      <AnimatePresence>
        {aiPanelOpen && (
          <motion.aside
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-16 right-0 bottom-0 w-80 sm:w-96 bg-[#070B14] border-l border-sky-500/15 shadow-2xl z-30 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-sky-500/15 bg-[#0D1424]/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-sm">
                  <div className="w-full h-full bg-[#070B14] rounded-xl flex items-center justify-center text-cyan-300">
                    <Bot className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                    <span>AI Library Assistant</span>
                  </h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online & Ready</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={clearChatHistory}
                  className="p-1.5 rounded-lg hover:bg-white/5 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setAiPanelOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-slate-400 font-mono">
                    {msg.sender === 'user' ? (
                      <span>Student</span>
                    ) : (
                      <span className="text-cyan-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        BSCS AI Tutor
                      </span>
                    )}
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[92%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-br-none shadow-md'
                        : 'bg-[#0D1424] border border-sky-500/20 text-slate-200 rounded-bl-none shadow-md whitespace-pre-line'
                    }`}
                  >
                    {msg.text}

                    {/* Optional Code Snippet in message */}
                    {msg.codeSnippet && (
                      <div className="mt-3 rounded-xl bg-[#05070D] border border-sky-500/25 p-2.5 font-mono text-[11px] text-sky-300 relative group overflow-x-auto">
                        <div className="flex justify-between items-center pb-1 mb-1 border-b border-white/5 text-[10px] text-slate-400 uppercase">
                          <span>{msg.codeSnippet.language}</span>
                          <button
                            onClick={() => handleCopyCode(msg.codeSnippet!.code, msg.id)}
                            className="flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors"
                          >
                            {copiedCodeId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre>{msg.codeSnippet.code}</pre>
                      </div>
                    )}

                    {/* Suggested Actions if any */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(act)}
                            className="px-2 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-[10px] text-sky-300 transition-colors cursor-pointer text-left"
                          >
                            → {act}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing state */}
              {isAiTyping && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#0D1424] border border-sky-500/20 max-w-[120px] text-sky-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <span className="text-[10px] text-slate-400 ml-1">Analyzing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Bar */}
            <div className="px-4 py-2 border-t border-sky-500/10 bg-[#0D1424]/60">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="px-2.5 py-1 rounded-full bg-[#070B14] hover:bg-[#111B2E] border border-sky-500/20 text-[10px] text-sky-300 whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    + {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Field */}
            <div className="p-3 border-t border-sky-500/15 bg-[#070B14]">
              <div className="flex items-center gap-2 bg-[#0D1424] rounded-2xl border border-sky-500/25 p-1.5 focus-within:border-sky-400 focus-within:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your BSCS AI Tutor anything..."
                  className="flex-1 px-3 py-1.5 text-xs text-white placeholder-slate-500 bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim()}
                  className={`p-2 rounded-xl text-white transition-all cursor-pointer ${
                    inputVal.trim()
                      ? 'bg-gradient-to-r from-blue-600 to-sky-400 shadow-md shadow-sky-500/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex justify-between items-center px-1 pt-1.5 text-[10px] text-slate-500 font-mono">
                <span>BSCS AI v3.0</span>
                <span>Powered by Academic Knowledge</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
