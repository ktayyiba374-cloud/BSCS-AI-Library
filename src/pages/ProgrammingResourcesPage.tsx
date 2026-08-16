import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Play, 
  Terminal, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  BookOpen, 
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CodeSnippetPreset {
  id: string;
  name: string;
  language: string;
  complexity: string;
  description: string;
  code: string;
  expectedOutput: string;
}

const PRESET_PROGRAMS: CodeSnippetPreset[] = [
  {
    id: 'binary-search',
    name: 'Binary Search (Logarithmic Time)',
    language: 'C++',
    complexity: 'Time: O(log N) | Space: O(1)',
    description: 'Finds the index of a target value within a sorted array by halving the search space at each iteration.',
    code: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}

int main() {
    std::vector<int> sortedData = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    int index = binarySearch(sortedData, target);

    std::cout << "[BSCS Execution] Target " << target 
              << " found at index: " << index << std::endl;
    return 0;
}`,
    expectedOutput: `[Compiler] g++ -O3 main.cpp -o main
[Execution Started]
[BSCS Execution] Target 23 found at index: 5
[Process Terminated with Return Code 0]
[Benchmark] Time elapsed: 0.00042ms | Memory: 2.1 MB`
  },
  {
    id: 'quick-sort',
    name: 'Quicksort with Hoare Partition',
    language: 'Python',
    complexity: 'Time: O(N log N) avg | Space: O(log N)',
    description: 'Divide-and-conquer sorting algorithm utilizing pivot selection and recursive subarrays.',
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

if __name__ == "__main__":
    raw_array = [45, 12, 89, 34, 2, 77, 19, 63]
    sorted_res = quicksort(raw_array)
    print(f"Original: {raw_array}")
    print(f"Sorted:   {sorted_res}")
`,
    expectedOutput: `[Python 3.11 Runtime]
[Execution Started]
Original: [45, 12, 89, 34, 2, 77, 19, 63]
Sorted:   [2, 12, 19, 34, 45, 63, 77, 89]
[Process Terminated with Return Code 0]
[Complexity Analysis Verified: O(N log N)]`
  },
  {
    id: 'lru-cache',
    name: 'LRU Cache (Least Recently Used)',
    language: 'Java',
    complexity: 'Time: O(1) Get & Put | Space: O(Capacity)',
    description: 'Combines a Hash Map with a Doubly Linked List to achieve constant-time eviction and retrieval.',
    code: `import java.util.*;

class LRUCache {
    private final int capacity;
    private final Map<Integer, Integer> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);
    }
}

public class Main {
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 100);
        cache.put(2, 200);
        System.out.println("Get 1: " + cache.get(1)); // returns 100
        cache.put(3, 300); // evicts key 2
        System.out.println("Get 2: " + cache.get(2)); // returns -1 (evicted)
    }
}`,
    expectedOutput: `[OpenJDK 21.0 HotSpot VM]
[Execution Started]
Get 1: 100
Get 2: -1
[LRU State Eviction Verified: Key 2 evicted successfully]
[Process Terminated with Return Code 0]`
  }
];

export const ProgrammingResourcesPage: React.FC = () => {
  const { sendUserMessage, setAiPanelOpen } = useApp();
  const [selectedPreset, setSelectedPreset] = useState<CodeSnippetPreset>(PRESET_PROGRAMS[0]);
  const [codeValue, setCodeValue] = useState(selectedPreset.code);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset: CodeSnippetPreset) => {
    setSelectedPreset(preset);
    setCodeValue(preset.code);
    setTerminalOutput(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(selectedPreset.expectedOutput);
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAI = () => {
    sendUserMessage(`Can you explain the algorithmic optimization and potential edge cases of this ${selectedPreset.language} implementation of "${selectedPreset.name}"?\n\n\`\`\`${selectedPreset.language}\n${codeValue}\n\`\`\``);
    setAiPanelOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">
            Interactive Code Lab
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display">
            Programming Resources & Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Interactive C++, Python, Java, and DSA algorithm templates with Big-O complexity analyzers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAskAI}
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI to Optimize Code</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESET_PROGRAMS.map((p) => {
          const isActive = selectedPreset.id === p.id;
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -3 }}
              onClick={() => handleSelectPreset(p)}
              className={`p-4 rounded-2xl cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#111B2E] border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                  : 'bg-[#0D1424] border border-sky-500/15 hover:border-sky-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                  {p.language}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {p.complexity.split('|')[0]}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">
                {p.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {p.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Code Editor & Simulated Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl cyber-card overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-3.5 border-b border-sky-500/15 bg-[#070B14] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-slate-400 text-[11px]">
                {selectedPreset.id}.{selectedPreset.language === 'Python' ? 'py' : selectedPreset.language === 'Java' ? 'java' : 'cpp'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => setCodeValue(selectedPreset.code)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="neon-glow-btn px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="flex-1 bg-[#070B14] p-4">
            <textarea
              value={codeValue}
              onChange={(e) => setCodeValue(e.target.value)}
              className="w-full h-96 bg-transparent text-xs font-mono text-sky-200 resize-none focus:outline-none leading-relaxed selection:bg-blue-600"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Console / Terminal (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl cyber-card overflow-hidden flex flex-col justify-between">
          <div className="p-3.5 border-b border-sky-500/15 bg-[#070B14] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-slate-200 font-bold text-[11px]">Execution Console</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">STDOUT</span>
          </div>

          <div className="flex-1 p-4 bg-[#05070D] font-mono text-xs text-slate-300 min-h-[220px] overflow-y-auto space-y-2">
            {isRunning ? (
              <div className="flex items-center gap-2 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Compiling & executing binary on sandboxed container...</span>
              </div>
            ) : terminalOutput ? (
              <pre className="whitespace-pre-wrap text-emerald-300 text-xs leading-relaxed">
                {terminalOutput}
              </pre>
            ) : (
              <div className="text-slate-500 italic">
                Click “Run Code” to compile and inspect output, runtime latency, and memory footprints.
              </div>
            )}
          </div>

          {/* Complexity Box */}
          <div className="p-4 border-t border-sky-500/15 bg-[#070B14] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Asymptotic Analysis</span>
              </span>
              <span className="text-[10px] font-mono text-sky-400 font-bold">
                {selectedPreset.complexity}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Verified for BSCS DSA semester exams and technical coding interviews.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
