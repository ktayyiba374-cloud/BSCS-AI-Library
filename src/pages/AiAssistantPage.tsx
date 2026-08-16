import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Trash2, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Terminal, 
  BookOpen, 
  Lightbulb, 
  Zap, 
  Cpu, 
  HelpCircle, 
  Code2, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiAssistantPage: React.FC = () => {
  const { 
    chatMessages, 
    isAiTyping, 
    sendUserMessage, 
    clearChatHistory, 
    setSelectedBook,
    books
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

  const handleSend = (text?: string) => {
    const toSend = text || inputVal;
    if (!toSend.trim()) return;
    sendUserMessage(toSend);
    setInputVal('');
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const promptBlueprints = [
    {
      title: 'Explain Algorithm & Big-O',
      icon: Terminal,
      prompt: 'Explain the working and Big-O time/space complexity of Dijkstra’s Shortest Path Algorithm with a step-by-step example in C++.'
    },
    {
      title: 'Midterm Exam Preparation',
      icon: Lightbulb,
      prompt: 'Help me prepare for my Operating Systems midterm: what are the key deadlock conditions and how does Banker’s algorithm prevent them?'
    },
    {
      title: 'Recommend AI / ML Books',
      icon: BookOpen,
      prompt: 'Recommend the top 3 textbooks for an undergraduate starting Deep Learning and Neural Networks.'
    },
    {
      title: 'Database Normalization Guide',
      icon: Zap,
      prompt: 'Explain the difference between 3NF (Third Normal Form) and BCNF (Boyce-Codd Normal Form) with real table examples.'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-left h-[calc(100vh-7.5rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-sm">
              <div className="w-full h-full bg-[#070B14] rounded-xl flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white font-display">
              AI Library Assistant & Academic Tutor
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            24/7 intelligent companion for computer science textbook insights, solved proofs, and curriculum guidance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChatHistory}
            className="px-3 py-1.5 rounded-xl bg-[#0D1424] hover:bg-slate-800 border border-sky-500/20 text-slate-300 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Blueprint Cards when few messages */}
      {chatMessages.length <= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
          {promptBlueprints.map((bp, i) => {
            const Icon = bp.icon;
            return (
              <motion.button
                key={i}
                whileHover={{ y: -3 }}
                onClick={() => handleSend(bp.prompt)}
                className="p-3 rounded-2xl cyber-card text-left flex flex-col justify-between space-y-2 group cursor-pointer hover:border-sky-400/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-300 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {bp.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {bp.prompt}
                </p>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Main Conversation Scroll Box */}
      <div className="flex-1 rounded-3xl cyber-card p-4 sm:p-6 overflow-y-auto space-y-6 scrollbar-thin">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-400 font-mono">
              {msg.sender === 'user' ? (
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  You
                </span>
              ) : (
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  BSCS AI Academic Assistant
                </span>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[90%] sm:max-w-[85%] p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-br-none shadow-md'
                  : 'bg-[#070B14] border border-sky-500/25 text-slate-200 rounded-bl-none shadow-lg whitespace-pre-line'
              }`}
            >
              {msg.text}

              {/* Code Snippet in AI Response */}
              {msg.codeSnippet && (
                <div className="mt-4 rounded-xl bg-[#05070D] border border-sky-500/30 p-3 font-mono text-xs text-sky-300 relative group overflow-x-auto">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-sky-500/15 text-[11px] text-slate-400 uppercase font-sans">
                    <span className="text-cyan-400 font-bold">{msg.codeSnippet.language} Code Solution</span>
                    <button
                      onClick={() => handleCopy(msg.codeSnippet!.code, msg.id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs leading-relaxed">{msg.codeSnippet.code}</pre>
                </div>
              )}

              {/* Follow-up actions */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="mt-4 pt-3 border-t border-sky-500/15 flex flex-wrap gap-2">
                  {msg.suggestedActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(act)}
                      className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/25 border border-sky-500/30 text-xs text-sky-300 transition-colors cursor-pointer text-left"
                    >
                      → {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#070B14] border border-sky-500/20 max-w-[150px] text-sky-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
            <span className="text-xs text-slate-400 ml-1">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="shrink-0 p-2 rounded-2xl bg-[#070B14] border border-sky-500/25 flex items-center gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask any computer science question or request code explanations..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 bg-transparent focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            inputVal.trim()
              ? 'neon-glow-btn shadow-md'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
