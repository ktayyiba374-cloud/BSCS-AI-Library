import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LibraryBook, 
  ResearchPaper, 
  StudyMaterial, 
  ProgrammingResource, 
  ReadingList, 
  NotificationItem, 
  CategoryInfo,
  INITIAL_BOOKS,
  RESEARCH_PAPERS,
  STUDY_MATERIALS,
  PROGRAMMING_RESOURCES,
  INITIAL_READING_LISTS,
  INITIAL_NOTIFICATIONS,
  CATEGORIES_DATA,
  AI_KNOWLEDGE_BASE
} from '../data/bscsLibraryData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  codeSnippet?: { language: string; code: string };
  category?: string;
}

export interface UserPreferences {
  themeIntensity: 'futuristic-dark' | 'deep-navy' | 'cyber-neon';
  animationSpeed: 'normal' | 'fast' | 'smooth';
  aiPersonality: 'Academic Tutor' | 'Concise Explainer' | 'Code Specialist';
  autoPlayAudio: boolean;
  emailNotifications: boolean;
  weeklyTargetHours: number;
}

interface AppContextType {
  // Books & Library State
  books: LibraryBook[];
  selectedBook: LibraryBook | null;
  setSelectedBook: (book: LibraryBook | null) => void;
  researchPapers: ResearchPaper[];
  studyMaterials: StudyMaterial[];
  programmingResources: ProgrammingResource[];
  readingLists: ReadingList[];
  notifications: NotificationItem[];
  categories: CategoryInfo[];
  
  // User Actions
  toggleSaveBook: (bookId: string) => void;
  toggleFavoriteBook: (bookId: string) => void;
  updateBookProgress: (bookId: string, progress: number) => void;
  markBookCompleted: (bookId: string) => void;
  createReadingList: (title: string, description: string, category: string, bookIds: string[]) => void;
  deleteReadingList: (listId: string) => void;
  addBookToReadingList: (listId: string, bookId: string) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Bookmarks & Recents
  recentlyViewedBookIds: string[];
  addToRecentlyViewed: (bookId: string) => void;
  clearRecentlyViewed: () => void;
  
  // AI Assistant Chat
  chatMessages: ChatMessage[];
  isAiTyping: boolean;
  sendUserMessage: (text: string) => void;
  clearChatHistory: () => void;
  aiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
  toggleAiPanel: () => void;
  
  // Preferences & User
  userPreferences: UserPreferences;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => void;
  
  // Search
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  // Transition / Hero State
  isEnteringDashboard: boolean;
  triggerDashboardTransition: (onComplete?: () => void) => void;
  
  // Quick Reader Modal
  activeReadingBook: LibraryBook | null;
  setActiveReadingBook: (book: LibraryBook | null) => void;

  // Upgrade Modal
  isUpgradeModalOpen: boolean;
  setIsUpgradeModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bscs_library_ai_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<LibraryBook[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_books`);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(STUDY_MATERIALS);
  const [programmingResources, setProgrammingResources] = useState<ProgrammingResource[]>(PROGRAMMING_RESOURCES);
  
  const [readingLists, setReadingLists] = useState<ReadingList[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reading_lists`);
      return saved ? JSON.parse(saved) : INITIAL_READING_LISTS;
    } catch {
      return INITIAL_READING_LISTS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifs`);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [recentlyViewedBookIds, setRecentlyViewedBookIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_recent`);
      return saved ? JSON.parse(saved) : ['book-1', 'book-2', 'book-4', 'book-8'];
    } catch {
      return ['book-1', 'book-2', 'book-4', 'book-8'];
    }
  });

  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [activeReadingBook, setActiveReadingBook] = useState<LibraryBook | null>(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [isEnteringDashboard, setIsEnteringDashboard] = useState(false);

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_prefs`);
      return saved ? JSON.parse(saved) : {
        themeIntensity: 'futuristic-dark',
        animationSpeed: 'smooth',
        aiPersonality: 'Academic Tutor',
        autoPlayAudio: false,
        emailNotifications: true,
        weeklyTargetHours: 8
      };
    } catch {
      return {
        themeIntensity: 'futuristic-dark',
        animationSpeed: 'smooth',
        aiPersonality: 'Academic Tutor',
        autoPlayAudio: false,
        emailNotifications: true,
        weeklyTargetHours: 8
      };
    }
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! 👋 I’m your **BSCS Library AI Assistant**.\n\nWhat would you like to explore or learn today? Ask me about data structures, operating systems, machine learning roadmaps, or research papers!',
      timestamp: 'Just now',
      suggestedActions: [
        'Recommend a programming book',
        'Find AI research papers',
        'Explain Data Structures',
        'Help me prepare for exams'
      ]
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_books`, JSON.stringify(books));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_reading_lists`, JSON.stringify(readingLists));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [readingLists]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifs`, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_recent`, JSON.stringify(recentlyViewedBookIds));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [recentlyViewedBookIds]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_prefs`, JSON.stringify(userPreferences));
    } catch (e) {
      console.warn('Storage sync failed:', e);
    }
  }, [userPreferences]);

  // Actions
  const toggleSaveBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, isSaved: !b.isSaved } : b));
  };

  const toggleFavoriteBook = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, isFavorite: !b.isFavorite } : b));
  };

  const updateBookProgress = (bookId: string, progress: number) => {
    const validProgress = Math.min(100, Math.max(0, progress));
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          progress: validProgress,
          isCompleted: validProgress === 100,
          isCurrentlyReading: validProgress > 0 && validProgress < 100
        };
      }
      return b;
    }));
  };

  const markBookCompleted = (bookId: string) => {
    updateBookProgress(bookId, 100);
  };

  const createReadingList = (title: string, description: string, category: string, bookIds: string[]) => {
    const newList: ReadingList = {
      id: `list-${Date.now()}`,
      title,
      description,
      bookIds,
      category,
      createdAt: new Date().toISOString().split('T')[0],
      color: '#38BDF8'
    };
    setReadingLists(prev => [newList, ...prev]);
  };

  const deleteReadingList = (listId: string) => {
    setReadingLists(prev => prev.filter(l => l.id !== listId));
  };

  const addBookToReadingList = (listId: string, bookId: string) => {
    setReadingLists(prev => prev.map(l => {
      if (l.id === listId && !l.bookIds.includes(bookId)) {
        return { ...l, bookIds: [...l.bookIds, bookId] };
      }
      return l;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const addToRecentlyViewed = (bookId: string) => {
    setRecentlyViewedBookIds(prev => {
      const filtered = prev.filter(id => id !== bookId);
      return [bookId, ...filtered].slice(0, 15);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedBookIds([]);
  };

  const toggleAiPanel = () => {
    setAiPanelOpen(prev => !prev);
  };

  const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  // Mock AI Generator that feels responsive, brilliant, and academic
  const sendUserMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let suggestedActions: string[] | undefined = undefined;
      let codeSnippet: { language: string; code: string } | undefined = undefined;

      if (lower.includes('machine learning') || lower.includes('ml') || lower.includes('ai book')) {
        replyText = AI_KNOWLEDGE_BASE.machine_learning;
        suggestedActions = ['Explore ML Books', 'Read Attention Paper', 'PyTorch Tutorial'];
      } else if (lower.includes('data structure') || lower.includes('dsa') || lower.includes('algorithm') || lower.includes('clrs') || lower.includes('trees') || lower.includes('graph')) {
        replyText = AI_KNOWLEDGE_BASE.data_structures;
        suggestedActions = ['Open CLRS Book', 'View Dijkstra Snippet', 'Download Big-O Sheet'];
        codeSnippet = {
          language: 'cpp',
          code: `// Quick Dijkstra Shortest Path in C++
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> pii; // {weight, node}

vector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    vector<int> dist(V, 1e9);
    
    dist[src] = 0;
    pq.push({0, src});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        
        for (auto& [weight, v] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`
        };
      } else if (lower.includes('os') || lower.includes('operating system') || lower.includes('page') || lower.includes('deadlock') || lower.includes('thread')) {
        replyText = AI_KNOWLEDGE_BASE.operating_systems;
        suggestedActions = ['Read OSTEP Book', 'OS Exam Solved Papers', 'Virtual Memory Notes'];
      } else if (lower.includes('paper') || lower.includes('research') || lower.includes('attention') || lower.includes('transformer') || lower.includes('resnet')) {
        replyText = `### 📑 Top Computer Science Research Papers in Library

Here are 3 landmark papers available for full reading in our Research Hub:

1. **Attention Is All You Need** (Vaswani et al.) — NeurIPS 2017
   - 118,000+ Citations. Replaced recurrent networks with self-attention.
2. **Deep Residual Learning for Image Recognition (ResNet)** (He et al.) — CVPR 2016
   - 210,000+ Citations. Enabled 152+ layer training with residual skip connections.
3. **In Search of an Understandable Consensus Algorithm (Raft)** (Ongaro & Ousterhout)
   - The bedrock of modern Kubernetes (etcd) and distributed databases.`;
        suggestedActions = ['Open Research Papers Hub', 'Download Transformer Paper PDF', 'Ask for Paper Summary'];
      } else if (lower.includes('exam') || lower.includes('prep') || lower.includes('study material') || lower.includes('past paper')) {
        replyText = `### 🎓 Exam Preparation Toolkit

I've assembled your recommended revision pack:

- **CS-201 (DSA)**: Review Master Method for recurrences ($T(n) = aT(n/b) + f(n)$) and AVL Tree rotations.
- **CS-301 (OS)**: Practice Banker's Algorithm safety state matrices and TLB hit ratio effective memory access time calculations.
- **CS-204 (DBMS)**: Confirm functional dependency closures and check 3NF vs BCNF normal forms.

Check the **Study Materials** tab for solved midterm calculation sheets!`;
        suggestedActions = ['Open Study Materials', 'View Cheat Sheets', 'Solved Exams 2024'];
      } else {
        replyText = `I analyzed your query: *"**${text}**"*\n\nBased on the BSCS academic curriculum, here is key guidance:\n\n1. **Core Concept**: To master this topic, focus on theoretical foundations first, followed by concrete coding implementations.\n2. **Suggested Textbook**: Check out our **Explore Books** section where you can find full textbook notes, chapter breakdowns, and instant PDF readers.\n3. **Quick Practice**: Test yourself with past examination questions and lab workbooks in the **Study Materials** hub.`;
        suggestedActions = [
          'Recommend top 3 books',
          'Show code example',
          'Search Research Hub',
          'Explore Categories'
        ];
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'Just now',
        suggestedActions,
        codeSnippet
      };

      setChatMessages(prev => [...prev, assistantMsg]);
      setIsAiTyping(false);
    }, 650);
  };

  const clearChatHistory = () => {
    setChatMessages([
      {
        id: 'welcome-fresh',
        sender: 'assistant',
        text: 'Chat history cleared. How can I assist your studies right now?',
        timestamp: 'Just now',
        suggestedActions: [
          'Recommend a programming book',
          'Find AI research papers',
          'Explain Data Structures',
          'Help me prepare for exams'
        ]
      }
    ]);
  };

  const triggerDashboardTransition = (onComplete?: () => void) => {
    setIsEnteringDashboard(true);
    // Smooth timing matching the requested 6-step transition
    setTimeout(() => {
      setIsEnteringDashboard(false);
      if (onComplete) {
        onComplete();
      }
    }, 1800);
  };

  return (
    <AppContext.Provider value={{
      books,
      selectedBook,
      setSelectedBook,
      researchPapers,
      studyMaterials,
      programmingResources,
      readingLists,
      notifications,
      categories: CATEGORIES_DATA,
      toggleSaveBook,
      toggleFavoriteBook,
      updateBookProgress,
      markBookCompleted,
      createReadingList,
      deleteReadingList,
      addBookToReadingList,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearNotifications,
      recentlyViewedBookIds,
      addToRecentlyViewed,
      clearRecentlyViewed,
      chatMessages,
      isAiTyping,
      sendUserMessage,
      clearChatHistory,
      aiPanelOpen,
      setAiPanelOpen,
      toggleAiPanel,
      userPreferences,
      updatePreferences,
      globalSearchQuery,
      setGlobalSearchQuery,
      isEnteringDashboard,
      triggerDashboardTransition,
      activeReadingBook,
      setActiveReadingBook,
      isUpgradeModalOpen,
      setIsUpgradeModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
