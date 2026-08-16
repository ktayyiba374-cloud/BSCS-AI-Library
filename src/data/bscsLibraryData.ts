export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: 'Artificial Intelligence' | 'Programming' | 'Web Development' | 'Data Structures' | 'Cybersecurity' | 'Machine Learning' | 'Databases' | 'Computer Networks' | 'Software Engineering' | 'Mathematics';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviewsCount: number;
  pages: number;
  progress: number; // 0 - 100
  coverUrl: string;
  description: string;
  isbn: string;
  publisher: string;
  year: string;
  isSaved?: boolean;
  isFavorite?: boolean;
  isCurrentlyReading?: boolean;
  isCompleted?: boolean;
  semesterLevel?: string;
  prerequisites?: string[];
  careerOutcome?: string;
  downloadsCount?: number;
  tableOfContents: { 
    chapter: number; 
    title: string; 
    pages: string; 
    summary: string; 
    fullContent?: string;
    codeSnippet?: string; 
    codeLanguage?: string;
    keyTakeaways?: string[];
    complexity?: { time: string; space: string; best: string; worst: string };
    diagram?: string;
    quiz?: { question: string; options: string[]; answerIndex: number; explanation: string }[];
  }[];
  keyConcepts: string[];
  readTimeHours: number;
  downloadSizeMb: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  publicationDate: string;
  journal: string;
  citations: number;
  tags: string[];
  pdfSize: string;
  doi: string;
  topic: string;
  keyFindings: string[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  course: string;
  type: 'Lecture Notes' | 'Assignments' | 'Practice Questions' | 'Exam Preparation' | 'PDFs' | 'Tutorials';
  semester: number;
  fileFormat: 'PDF' | 'ZIP' | 'DOCX' | 'MD';
  downloadsCount: number;
  rating: number;
  description: string;
  author: string;
  tags: string[];
  uploadDate: string;
}

export interface ProgrammingResource {
  id: string;
  title: string;
  language: 'Python' | 'C++' | 'Java' | 'JavaScript' | 'React' | 'TypeScript' | 'Rust' | 'Go' | 'SQL' | 'DSA';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  topics: string[];
  codeSnippet: string;
  codeLanguage: string;
  roadmapSteps: string[];
  popularProjects: string[];
  docsUrl: string;
}

export interface ReadingList {
  id: string;
  title: string;
  description: string;
  bookIds: string[];
  category: string;
  createdAt: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'recommendation' | 'reminder' | 'update' | 'system';
  time: string;
  read: boolean;
  actionUrl?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  iconName: string;
  booksCount: number;
  resourcesCount: number;
  description: string;
  gradient: string;
  color: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    iconName: 'Cpu',
    booksCount: 1420,
    resourcesCount: 320,
    description: 'Neural networks, autonomous agents, computer vision, NLP, and reinforcement learning.',
    gradient: 'from-blue-600 to-cyan-400',
    color: '#38BDF8'
  },
  {
    id: 'programming',
    name: 'Programming & Logic',
    iconName: 'Code',
    booksCount: 2150,
    resourcesCount: 480,
    description: 'Core syntax, functional paradigms, OOP, memory management, and modern languages.',
    gradient: 'from-sky-600 to-blue-500',
    color: '#60A5FA'
  },
  {
    id: 'webdev',
    name: 'Web Development',
    iconName: 'Globe',
    booksCount: 1280,
    resourcesCount: 310,
    description: 'Full-stack architectures, modern JavaScript frameworks, WebAssembly, and API design.',
    gradient: 'from-cyan-600 to-teal-400',
    color: '#22D3EE'
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algo',
    iconName: 'Network',
    booksCount: 1640,
    resourcesCount: 390,
    description: 'Trees, graphs, dynamic programming, algorithmic complexity (Big-O), and competitive coding.',
    gradient: 'from-indigo-600 to-sky-400',
    color: '#818CF8'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Crypto',
    iconName: 'ShieldCheck',
    booksCount: 980,
    resourcesCount: 210,
    description: 'Network defense, ethical hacking, applied cryptography, zero-trust security, and forensics.',
    gradient: 'from-blue-700 to-indigo-500',
    color: '#38BDF8'
  },
  {
    id: 'ml',
    name: 'Machine Learning & Data',
    iconName: 'Binary',
    booksCount: 1320,
    resourcesCount: 295,
    description: 'Supervised/unsupervised models, gradient boosting, PyTorch, TensorFlow, and statistical modeling.',
    gradient: 'from-sky-500 to-emerald-400',
    color: '#34D399'
  },
  {
    id: 'databases',
    name: 'Databases & Big Data',
    iconName: 'Database',
    booksCount: 1100,
    resourcesCount: 260,
    description: 'Relational SQL, distributed NoSQL, ACID vs BASE, indexing internals, and query optimization.',
    gradient: 'from-blue-600 to-cyan-500',
    color: '#38BDF8'
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    iconName: 'Share2',
    booksCount: 890,
    resourcesCount: 180,
    description: 'OSI 7-layer model, TCP/IP congestion control, routing protocols, and cloud connectivity.',
    gradient: 'from-indigo-500 to-cyan-400',
    color: '#22D3EE'
  },
  {
    id: 'se',
    name: 'Software Engineering',
    iconName: 'Layers',
    booksCount: 1040,
    resourcesCount: 240,
    description: 'Design patterns, CI/CD pipelines, microservices, testing paradigms, and clean architecture.',
    gradient: 'from-cyan-600 to-blue-600',
    color: '#60A5FA'
  },
  {
    id: 'math',
    name: 'Discrete Mathematics',
    iconName: 'Sigma',
    booksCount: 760,
    resourcesCount: 150,
    description: 'Set theory, combinatorics, graph theory, mathematical logic, and formal proof systems.',
    gradient: 'from-sky-600 to-indigo-600',
    color: '#38BDF8'
  }
];

export const INITIAL_BOOKS: LibraryBook[] = [
  {
    id: 'book-1',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest',
    category: 'Data Structures',
    difficulty: 'Advanced',
    rating: 4.9,
    reviewsCount: 1240,
    pages: 1312,
    progress: 68,
    isCurrentlyReading: true,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=800&auto=format&fit=crop&q=80',
    description: 'The definitive worldwide benchmark in algorithm design and analysis. Covers fundamental divide-and-conquer, sorting networks, advanced dynamic programming, greedy strategies, and graph algorithms with rigorous mathematical proofs.',
    isbn: '978-0262033848',
    publisher: 'MIT Press (4th Edition)',
    year: '2022',
    readTimeHours: 48,
    downloadSizeMb: 34.2,
    keyConcepts: ['Asymptotic Notation', 'Red-Black Trees', 'Dynamic Programming', 'Dijkstra & Bellman-Ford', 'NP-Completeness'],
    tableOfContents: [
      { chapter: 1, title: 'The Role of Algorithms in Computing', pages: '3-15', summary: 'Algorithms as technology, efficiency benchmarks, and computational problem formulation.' },
      { chapter: 2, title: 'Getting Started: Insertion Sort & Merge Sort', pages: '16-43', summary: 'Loop invariants, analyzing worst-case running times, and divide-and-conquer recurrence.' },
      { chapter: 3, title: 'Growth of Functions and Big-O Notation', pages: '44-67', summary: 'Formal definition of Big-O, Big-Omega, Big-Theta, and asymptotic boundaries.' },
      { chapter: 4, title: 'Divide-and-Conquer & The Master Theorem', pages: '68-112', summary: 'Recurrence trees, substitution method, and the three cases of the Master Theorem.' },
      { chapter: 15, title: 'Dynamic Programming: Memoization & Tabulation', pages: '359-413', summary: 'Optimal substructure and overlapping subproblems in Rod Cutting and Matrix Chain Multiplication.' }
    ]
  },
  {
    id: 'book-2',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell, Peter Norvig',
    category: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    rating: 4.95,
    reviewsCount: 1890,
    pages: 1152,
    progress: 42,
    isCurrentlyReading: true,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    description: 'The leading textbook in Artificial Intelligence. Provides the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence, intelligent agents, search algorithms, probability, machine learning, and deep neural networks.',
    isbn: '978-0134610993',
    publisher: 'Pearson (4th Global Edition)',
    year: '2021',
    readTimeHours: 42,
    downloadSizeMb: 28.6,
    keyConcepts: ['Rational Agents', 'A* Search', 'Markov Decision Processes', 'Bayesian Networks', 'Deep Learning & Transformers'],
    tableOfContents: [
      { chapter: 1, title: 'Introduction to Intelligent Agents', pages: '1-35', summary: 'What is AI? Rationality, Turing Test, foundation disciplines, and agent environments (PEAS).' },
      { chapter: 2, title: 'Informed Search & Heuristics (A*)', pages: '63-109', summary: 'Admissible heuristics, consistent heuristics, greedy best-first search, and memory-bounded search.' },
      { chapter: 3, title: 'Adversarial Search & Games (Alpha-Beta Pruning)', pages: '161-205', summary: 'Minimax decision tree, alpha-beta cutoffs, evaluation functions, and stochastic games.' },
      { chapter: 4, title: 'Probabilistic Reasoning & Bayesian Networks', pages: '411-470', summary: 'Conditional independence, d-separation, inference by variable elimination, and Markov chains.' },
      { chapter: 5, title: 'Deep Learning & Modern NLP Transformers', pages: '801-860', summary: 'Attention mechanisms, self-attention layers, representation learning, and alignment safety.' }
    ]
  },
  {
    id: 'book-3',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin (Uncle Bob)',
    category: 'Software Engineering',
    difficulty: 'Beginner',
    rating: 4.8,
    reviewsCount: 3100,
    pages: 464,
    progress: 90,
    isCurrentlyReading: true,
    isSaved: true,
    isFavorite: false,
    coverUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Master meaningful naming, small single-responsibility functions, formatting, error handling, unit testing, and refactoring.',
    isbn: '978-0132350884',
    publisher: 'Prentice Hall',
    year: '2008',
    readTimeHours: 18,
    downloadSizeMb: 14.8,
    keyConcepts: ['SOLID Principles', 'Meaningful Names', 'Small Functions', 'Unit Testing (TDD)', 'Code Smells & Refactoring'],
    tableOfContents: [
      { chapter: 1, title: 'Clean Code: The Boy Scout Rule', pages: '1-16', summary: 'Always leave the campground cleaner than you found it. Total cost of owning a mess.' },
      { chapter: 2, title: 'Meaningful Names', pages: '17-34', summary: 'Use intention-revealing names, avoid disinformation, and make meaningful distinctions.' },
      { chapter: 3, title: 'Functions Should Do One Thing', pages: '35-58', summary: 'Small functions, one level of abstraction, few arguments, and no side effects.' },
      { chapter: 4, title: 'Formatting & Vertical Density', pages: '75-92', summary: 'Newspaper metaphor, vertical separation between concepts, and dependent functions.' },
      { chapter: 5, title: 'Unit Tests: F.I.R.S.T Principles', pages: '121-134', summary: 'Fast, Independent, Repeatable, Self-Validating, and Timely test suites.' }
    ]
  },
  {
    id: 'book-4',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Databases',
    difficulty: 'Advanced',
    rating: 4.98,
    reviewsCount: 2450,
    pages: 616,
    progress: 100,
    isCompleted: true,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    description: 'The definitive guide to the architecture of modern data systems. Unpacks storage engines (SSTables & LSM-Trees), replication algorithms, leader election, consensus (Raft/Paxos), partition strategies, and distributed transactions.',
    isbn: '978-1449373320',
    publisher: 'O\'Reilly Media',
    year: '2017',
    readTimeHours: 32,
    downloadSizeMb: 22.4,
    keyConcepts: ['LSM-Trees vs B-Trees', 'Leaderless Replication', 'Eventual Consistency', 'Linearizability', 'Stream Processing (Kafka)'],
    tableOfContents: [
      { chapter: 1, title: 'Reliability, Scalability, and Maintainability', pages: '3-26', summary: 'Defining percentiles (p99/p999), SLA targets, fault tolerance, and operability.' },
      { chapter: 3, title: 'Storage and Retrieval: LSM-Trees & B-Trees', pages: '69-110', summary: 'Append-only logs, Bloom filters, compacted SSTables, and disk page layouts.' },
      { chapter: 5, title: 'Replication: Leaders and Followers', pages: '151-198', summary: 'Synchronous vs asynchronous replication, split-brain resolution, and read-after-write guarantees.' },
      { chapter: 7, title: 'Transactions: Isolation Levels & 2PC', pages: '221-276', summary: 'Dirty reads, phantom reads, snapshot isolation, and two-phase commit protocols.' },
      { chapter: 9, title: 'Consistency and Consensus', pages: '321-380', summary: 'Total order broadcast, Paxos, Raft, Byzantine faults, and distributed locks.' }
    ]
  },
  {
    id: 'book-5',
    title: 'Hands-On Machine Learning with Scikit-Learn & PyTorch',
    author: 'Aurélien Géron',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    rating: 4.9,
    reviewsCount: 1670,
    pages: 856,
    progress: 35,
    isCurrentlyReading: false,
    isSaved: true,
    isFavorite: false,
    coverUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    description: 'Through concrete examples, minimal theory, and production-ready Python frameworks (Scikit-Learn, Keras, PyTorch), this book helps you gain an intuitive understanding of the concepts and tools for building intelligent systems.',
    isbn: '978-1098125974',
    publisher: 'O\'Reilly Media (3rd Edition)',
    year: '2023',
    readTimeHours: 38,
    downloadSizeMb: 31.0,
    keyConcepts: ['Gradient Descent', 'Random Forests', 'Convolutional Networks (CNNs)', 'Transformers & Attention', 'Autoencoders'],
    tableOfContents: [
      { chapter: 1, title: 'The Machine Learning Landscape', pages: '1-34', summary: 'Supervised vs unsupervised, batch vs online, overfitting vs underfitting tradeoffs.' },
      { chapter: 4, title: 'Training Models: Cost Functions & Regularization', pages: '111-154', summary: 'Linear regression, batch gradient descent, Ridge/Lasso regularization, and early stopping.' },
      { chapter: 10, title: 'Introduction to Artificial Neural Networks', pages: '299-348', summary: 'Biological neurons to perceptrons, multi-layer networks, backpropagation, and activation functions.' },
      { chapter: 14, title: 'Deep Computer Vision Using CNNs', pages: '461-512', summary: 'Convolutional layers, pooling filters, ResNet residual blocks, and transfer learning.' }
    ]
  },
  {
    id: 'book-6',
    title: 'Computer Networking: A Top-Down Approach',
    author: 'James F. Kurose, Keith W. Ross',
    category: 'Computer Networks',
    difficulty: 'Intermediate',
    rating: 4.85,
    reviewsCount: 1420,
    pages: 864,
    progress: 55,
    isCurrentlyReading: false,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    description: 'Focuses on the Internet and fundamental issues of networking with a top-down pedagogy: starting at the application layer (HTTP/3, DNS) down through transport (TCP/UDP, BBR), network (BGP, OSPF), and link layers.',
    isbn: '978-0136681557',
    publisher: 'Pearson (8th Edition)',
    year: '2021',
    readTimeHours: 36,
    downloadSizeMb: 26.5,
    keyConcepts: ['HTTP/2 & HTTP/3 (QUIC)', 'TCP Congestion Control (CUBIC)', 'BGP Routing', 'DNS Hierarchy', 'Subnetting & CIDR'],
    tableOfContents: [
      { chapter: 1, title: 'Computer Networks and the Internet', pages: '1-74', summary: 'Packet switching, circuit switching, delay/loss/throughput, and protocol layered architecture.' },
      { chapter: 2, title: 'Application Layer: HTTP, DNS, WebSockets', pages: '75-168', summary: 'Client-server architecture, P2P file sharing, DNS lookup cascades, and QUIC stream multiplexing.' },
      { chapter: 3, title: 'Transport Layer: Reliable Data Transfer & TCP', pages: '169-278', summary: 'UDP mechanics, Go-Back-N, Selective Repeat, TCP 3-way handshake, and slow-start flow control.' },
      { chapter: 4, title: 'Network Layer: Data Plane & SDN', pages: '279-370', summary: 'Router architectures, IPv4/IPv6 headers, CIDR address allocation, and NAT translation tables.' }
    ]
  },
  {
    id: 'book-7',
    title: 'The Pragmatic Programmer: 20th Anniversary Edition',
    author: 'David Thomas, Andrew Hunt',
    category: 'Programming',
    difficulty: 'Beginner',
    rating: 4.92,
    reviewsCount: 2800,
    pages: 352,
    progress: 100,
    isCompleted: true,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=80',
    description: 'One of the most significant books in software development. Filled with technical advice, career wisdom, craftsmanship tips, DRY principles, orthogonality, design by contract, and refactoring strategies.',
    isbn: '978-0135957059',
    publisher: 'Addison-Wesley',
    year: '2019',
    readTimeHours: 15,
    downloadSizeMb: 12.1,
    keyConcepts: ['DRY (Don\'t Repeat Yourself)', 'Orthogonality', 'Tracer Bullets', 'Design by Contract', 'Refactoring Loops'],
    tableOfContents: [
      { chapter: 1, title: 'A Pragmatic Philosophy', pages: '1-30', summary: 'Care about your craft, software entropy (broken windows theory), and stone soup collaboration.' },
      { chapter: 2, title: 'A Pragmatic Approach', pages: '31-80', summary: 'The evils of duplication, orthogonality in module boundaries, and domain languages.' },
      { chapter: 3, title: 'The Basic Tools', pages: '81-124', summary: 'Mastering your text editor, version control as time machine, and root-cause debugging.' },
      { chapter: 4, title: 'Pragmatic Paranoia', pages: '125-160', summary: 'Assertive programming, dead programs tell no lies, and crash early paradigms.' }
    ]
  },
  {
    id: 'book-8',
    title: 'Operating Systems: Three Easy Pieces (OSTEP)',
    author: 'Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau',
    category: 'Programming',
    difficulty: 'Intermediate',
    rating: 4.96,
    reviewsCount: 1950,
    pages: 714,
    progress: 75,
    isCurrentlyReading: true,
    isSaved: true,
    isFavorite: true,
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'A revolutionary, freely accessible textbook covering the three fundamental pillars of modern operating systems: Virtualization (CPU & memory), Concurrency (threads, locks, semaphores), and Persistence (file systems & RAID).',
    isbn: '978-1985086593',
    publisher: 'Arpaci-Dusseau Books',
    year: '2018',
    readTimeHours: 30,
    downloadSizeMb: 19.8,
    keyConcepts: ['Virtual Memory & TLB', 'CPU Scheduling (MLFQ)', 'Semaphores & Condition Variables', 'Deadlock Detection', 'Fast File System (FFS)'],
    tableOfContents: [
      { chapter: 1, title: 'Virtualization: The Abstraction of the Process', pages: '1-42', summary: 'Process creation, system calls (fork/exec/wait), and context switching internals.' },
      { chapter: 2, title: 'CPU Scheduling & Multi-Level Feedback Queues', pages: '43-78', summary: 'Turnaround time vs response time metrics, priority decay, and lottery scheduling.' },
      { chapter: 3, title: 'Address Spaces & Paging with TLB', pages: '145-210', summary: 'Multi-level page tables, translation lookaside buffers, and page replacement policies.' },
      { chapter: 4, title: 'Concurrency: Threads, Locks, and Semaphores', pages: '265-340', summary: 'Race conditions, test-and-set instructions, Peterson algorithm, and producer-consumer queues.' },
      { chapter: 5, title: 'Persistence: File Systems & Journaling Crash Consistency', pages: '420-490', summary: 'Inodes, directory trees, buffer caches, and write-ahead log recovery.' }
    ]
  },
  {
    id: 'book-9',
    title: 'Modern Full-Stack React & Next.js Architecture',
    author: 'Alex Chen, Sarah Jenkins',
    category: 'Web Development',
    difficulty: 'Intermediate',
    rating: 4.88,
    reviewsCount: 980,
    pages: 520,
    progress: 20,
    isCurrentlyReading: false,
    isSaved: true,
    isFavorite: false,
    coverUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    description: 'Master modern server-driven UI, Server Components (RSC), Suspense boundaries, streaming SSR, Edge middleware, optimistic state updates, and micro-frontend design patterns in production.',
    isbn: '978-1800569874',
    publisher: 'Packt Publishing',
    year: '2024',
    readTimeHours: 24,
    downloadSizeMb: 18.2,
    keyConcepts: ['React Server Components', 'Suspense Streaming', 'Hydration Internals', 'Zustand & Server State', 'Edge Caching'],
    tableOfContents: [
      { chapter: 1, title: 'The Evolution of React 19 & Server Components', pages: '1-38', summary: 'Client boundaries vs Server boundaries, zero-bundle-size dependencies, and RSC wire format.' },
      { chapter: 2, title: 'Streaming Rendering & Selective Hydration', pages: '39-82', summary: 'HTML streaming with Suspense, progressive hydration, and out-of-order chunks.' },
      { chapter: 3, title: 'Server Actions & Optimistic Mutations', pages: '83-130', summary: 'Type-safe forms, useActionState, useOptimistic UI rollbacks, and CSRF protection.' }
    ]
  },
  {
    id: 'book-10',
    title: 'Practical Malware Analysis & Ethical Hacking',
    author: 'Michael Sikorski, Andrew Honig',
    category: 'Cybersecurity',
    difficulty: 'Advanced',
    rating: 4.94,
    reviewsCount: 1540,
    pages: 800,
    progress: 15,
    isCurrentlyReading: false,
    isSaved: false,
    isFavorite: false,
    coverUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    description: 'The hands-on guide to dissecting malicious binaries. Teaches static analysis, dynamic sandboxing, x86 disassembly with IDA Pro/Ghidra, kernel debugging, shellcode decoding, and rootkit detection.',
    isbn: '978-1593272906',
    publisher: 'No Starch Press',
    year: '2022',
    readTimeHours: 40,
    downloadSizeMb: 35.0,
    keyConcepts: ['Static Disassembly (Ghidra)', 'Dynamic Sandboxing', 'x86 Assembly Internals', 'Anti-Reverse-Engineering', 'Kernel Rootkits'],
    tableOfContents: [
      { chapter: 1, title: 'Basic Static Techniques & PE Headers', pages: '1-40', summary: 'Extracting strings, PE file headers, import address tables (IAT), and cryptographic hashes.' },
      { chapter: 2, title: 'x86 Disassembly in Practice', pages: '41-98', summary: 'Registers (EAX/EBX/ESP/EBP), stack frames, function calling conventions, and arithmetic ops.' },
      { chapter: 3, title: 'Dynamic Analysis with OllyDbg & x64dbg', pages: '99-160', summary: 'Breakpoints, stepping, memory patching, and network traffic sniffing with Wireshark.' }
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Lukasz Kaiser', 'Illia Polosukhin'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, a model architecture eschewing recurrence and entirely relying on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and achieved state-of-the-art BLEU score on WMT 2014 English-to-German.',
    publicationDate: 'December 2017',
    journal: 'Advances in Neural Information Processing Systems (NeurIPS)',
    citations: 118400,
    tags: ['Transformers', 'NLP', 'Self-Attention', 'Deep Learning', 'Neural Architecture'],
    pdfSize: '2.4 MB',
    doi: '10.48550/arXiv.1706.03762',
    topic: 'Artificial Intelligence',
    keyFindings: [
      'Multi-Head Self-Attention replaces recurrence entirely for sequence modeling.',
      'Training is orders of magnitude faster due to full token parallelization.',
      'Established the foundational architecture for GPT, BERT, Claude, and Gemini.'
    ]
  },
  {
    id: 'paper-2',
    title: 'In Search of an Understandable Consensus Algorithm (Raft)',
    authors: ['Diego Ongaro', 'John Ousterhout'],
    abstract: 'Raft is a consensus algorithm for managing a replicated log. It produces a result equivalent to (multi-)Paxos and is as efficient, but its structure is different from Paxos; this makes Raft more understandable and easier to implement in real-world distributed state machines.',
    publicationDate: 'June 2014',
    journal: 'USENIX Annual Technical Conference (ATC)',
    citations: 9200,
    tags: ['Distributed Systems', 'Consensus', 'Fault Tolerance', 'Raft', 'Replicated Logs'],
    pdfSize: '1.8 MB',
    doi: '10.5555/2643634.2643666',
    topic: 'Databases & Distributed Systems',
    keyFindings: [
      'Decomposes consensus into Leader Election, Log Replication, and Safety invariants.',
      'Proven formal safety guarantees equivalent to Paxos with simpler mental models.',
      'Used by Kubernetes (etcd), HashiCorp Consul, CockroachDB, and TiKV.'
    ]
  },
  {
    id: 'paper-3',
    title: 'Deep Residual Learning for Image Recognition (ResNet)',
    authors: ['Kaiming He', 'Xiangyu Zhang', 'Shaoqing Ren', 'Jian Sun'],
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. With 152 layers, ResNet won 1st place on the ILSVRC 2015 classification task.',
    publicationDate: 'December 2015',
    journal: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR)',
    citations: 210000,
    tags: ['Computer Vision', 'ResNet', 'Deep Learning', 'Skip Connections', 'CNNs'],
    pdfSize: '3.1 MB',
    doi: '10.1109/CVPR.2016.90',
    topic: 'Machine Learning',
    keyFindings: [
      'Introduces identity shortcut connections: H(x) = F(x) + x.',
      'Completely eliminates the vanishing gradient degradation problem in ultra-deep networks.',
      'Achieved a groundbreaking 3.57% top-5 error rate on ImageNet.'
    ]
  },
  {
    id: 'paper-4',
    title: 'Spanner: Google’s Globally-Distributed Database',
    authors: ['James C. Corbett', 'Jeffrey Dean', 'Michael Epstein', 'Andrew Fikes', 'Christopher Frost', 'JJ Furman'],
    abstract: 'Spanner is Google’s scalable, multi-version, globally-distributed, and synchronously-replicated database. It is the first system to distribute data at global scale and support externally-consistent distributed transactions using TrueTime API, an explicit hardware abstraction built on GPS and atomic clocks.',
    publicationDate: 'October 2012',
    journal: 'OSDI (Operating Systems Design and Implementation)',
    citations: 6400,
    tags: ['Distributed Systems', 'Spanner', 'TrueTime', 'ACID Transactions', 'Cloud Databases'],
    pdfSize: '1.9 MB',
    doi: '10.5555/2387880.2387905',
    topic: 'Databases',
    keyFindings: [
      'Provides linearizable ACID transactions globally without locking bottlenecks.',
      'TrueTime bounds clock uncertainty with guaranteed [earliest, latest] timestamps.',
      'Pioneered the modern NewSQL database industry.'
    ]
  },
  {
    id: 'paper-5',
    title: 'Bitcoin: A Peer-to-Peer Electronic Cash System',
    authors: ['Satoshi Nakamoto'],
    abstract: 'A purely peer-to-peer version of electronic cash would allow online payments to be sent directly from one party to another without going through a financial institution. Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending. We propose a solution using Proof-of-Work to record a public history of transactions.',
    publicationDate: 'October 2008',
    journal: 'Cryptography Mailing List',
    citations: 45000,
    tags: ['Cryptography', 'Blockchain', 'Proof-of-Work', 'Distributed Ledger', 'Security'],
    pdfSize: '1.2 MB',
    doi: '10.2139/ssrn.3444078',
    topic: 'Cybersecurity',
    keyFindings: [
      'Solves the Byzantine Generals and double-spending problem without central authority.',
      'Introduces cryptographic hash-linked block structures with Proof-of-Work consensus.',
      'Spawned decentralized finance and smart contract blockchain ecosystems.'
    ]
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Complete DSA Master Reference & Big-O Cheat Sheet',
    course: 'CS-201: Data Structures and Algorithms',
    type: 'Exam Preparation',
    semester: 3,
    fileFormat: 'PDF',
    downloadsCount: 3840,
    rating: 4.95,
    description: 'Concise, high-density 18-page summary of all sorting algorithms, tree traversals, graph algorithms (BFS/DFS, Dijkstra, Prim), and dynamic programming recurrence patterns with Big-O time and space tables.',
    author: 'Prof. Dr. Tariq Mahmood & BSCS AI Team',
    tags: ['DSA', 'Big-O', 'Trees', 'Graphs', 'DP', 'Cheat Sheet'],
    uploadDate: '2025-01-15'
  },
  {
    id: 'mat-2',
    title: 'Object-Oriented Programming (C++ & Java) Lecture Transcripts',
    course: 'CS-102: Object Oriented Programming',
    type: 'Lecture Notes',
    semester: 2,
    fileFormat: 'PDF',
    downloadsCount: 2950,
    rating: 4.88,
    description: 'Complete 16-week lecture series notes covering pointers, copy constructors, dynamic polymorphism, virtual function tables (vtable), abstract classes, templates, and exception safety guarantees.',
    author: 'Department of Computer Science',
    tags: ['OOP', 'C++', 'Java', 'Polymorphism', 'Memory Management'],
    uploadDate: '2025-02-01'
  },
  {
    id: 'mat-3',
    title: 'Solved Midterm & Terminal Examination Papers (2020-2024)',
    course: 'CS-301: Operating Systems & Kernel Architecture',
    type: 'Past Papers' as any,
    semester: 5,
    fileFormat: 'PDF',
    downloadsCount: 4210,
    rating: 4.98,
    description: 'Step-by-step solved university examination papers with detailed mathematical calculations for Round Robin, SJF, Banker\'s Algorithm deadlock avoidance, and TLB page-fault penalty equations.',
    author: 'Academic Excellence Committee',
    tags: ['Past Papers', 'Solved Exams', 'Operating Systems', 'Calculations'],
    uploadDate: '2024-11-20'
  },
  {
    id: 'mat-4',
    title: 'Database Management Systems (DBMS) SQL & Normalization Lab Workbook',
    course: 'CS-204: Database Systems',
    type: 'Assignments',
    semester: 4,
    fileFormat: 'ZIP',
    downloadsCount: 2180,
    rating: 4.82,
    description: '12 comprehensive lab assignments containing complex multi-table SQL queries, window functions, 1NF to BCNF normalization exercises, and PostgreSQL indexing benchmarks.',
    author: 'Lead Lab Instructor',
    tags: ['SQL', 'DBMS', 'Normalization', 'PostgreSQL', 'Lab Manual'],
    uploadDate: '2025-01-28'
  },
  {
    id: 'mat-5',
    title: 'Computer Networks Packet Tracer Lab Guide & Subnetting Workbook',
    course: 'CS-305: Computer Networks & Telecommunication',
    type: 'Tutorials',
    semester: 6,
    fileFormat: 'PDF',
    downloadsCount: 1980,
    rating: 4.9,
    description: 'Hands-on guide to configuring Cisco routers, RIP/OSPF dynamic routing, VLAN tagging, NAT overloading, and master CIDR subnetting speed calculations.',
    author: 'Cisco Certified Academic Instructor',
    tags: ['Networks', 'Packet Tracer', 'Subnetting', 'Cisco', 'OSPF'],
    uploadDate: '2024-12-10'
  },
  {
    id: 'mat-6',
    title: 'Theory of Automata & Formal Languages: DFA, NFA, CFG, Turing Machines',
    course: 'CS-302: Theory of Automata',
    type: 'Lecture Notes',
    semester: 5,
    fileFormat: 'PDF',
    downloadsCount: 3120,
    rating: 4.91,
    description: 'Clear graphical proofs and step-by-step conversion techniques for NFA to DFA subset construction, regular expressions, pumping lemma, Chomsky normal form, and halting problem reductions.',
    author: 'Prof. S. R. Khan',
    tags: ['Automata', 'DFA', 'NFA', 'Turing Machines', 'Pumping Lemma'],
    uploadDate: '2025-02-10'
  }
];

export const PROGRAMMING_RESOURCES: ProgrammingResource[] = [
  {
    id: 'prog-1',
    title: 'Modern C++ (C++20 & C++23) for High-Performance Systems',
    language: 'C++',
    difficulty: 'Advanced',
    description: 'Master smart pointers (unique_ptr/shared_ptr), move semantics, concepts, coroutines, RAII memory models, and zero-overhead abstractions for competitive programming and systems development.',
    topics: ['Smart Pointers & Memory', 'Move Semantics & Rvalue References', 'Concepts & Ranges (C++20)', 'Multithreading with std::jthread', 'Custom Allocators'],
    codeLanguage: 'cpp',
    codeSnippet: `#include <iostream>
#include <memory>
#include <concepts>

// C++20 Concept constraint
template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
class SafeBuffer {
private:
    std::unique_ptr<T[]> data;
    size_t size;
public:
    SafeBuffer(size_t n) : size(n), data(std::make_unique<T[]>(n)) {}
    
    // Fast move constructor
    SafeBuffer(SafeBuffer&& other) noexcept = default;
    SafeBuffer& operator=(SafeBuffer&& other) noexcept = default;
    
    void fill(T val) {
        for(size_t i = 0; i < size; ++i) data[i] = val;
    }
    T get(size_t idx) const { return data[idx]; }
};

int main() {
    SafeBuffer<double> buffer(1024);
    buffer.fill(3.14159);
    std::cout << "Buffer item 0: " << buffer.get(0) << "\\n";
    return 0;
}`,
    roadmapSteps: [
      '1. Pointer arithmetic, memory layout, stack vs heap',
      '2. RAII paradigm, rule of 5, constructors/destructors',
      '3. STL containers, custom iterators, lambdas',
      '4. C++20 Concepts, Templates metaprogramming',
      '5. Concurrency, memory barriers, lock-free queues'
    ],
    popularProjects: ['Custom Memory Allocator', 'High-Frequency Order Book', 'Toy HTTP/1.1 Web Server in Epoll'],
    docsUrl: 'https://en.cppreference.com'
  },
  {
    id: 'prog-2',
    title: 'Python 3.12 Deep Dive & Asyncio Internals',
    language: 'Python',
    difficulty: 'Intermediate',
    description: 'Explore the Python GIL, bytecode execution, asyncio event loop, generators, decorators, dataclasses, typing protocols, and performant data processing with NumPy/Polars.',
    topics: ['Asyncio & Coroutines', 'Decorators & Metaclasses', 'Generators & Memory Profiles', 'Typing & Pydantic V2', 'GIL Free-Threading (PEP 703)'],
    codeLanguage: 'python',
    codeSnippet: `import asyncio
import time
from typing import Protocol, List

class DataSink(Protocol):
    async def write(self, batch: List[int]) -> int: ...

class AsyncWorker:
    def __init__(self, name: str):
        self.name = name

    async def fetch_task(self, task_id: int) -> dict:
        # Non-blocking simulated network I/O
        await asyncio.sleep(0.05)
        return {"id": task_id, "status": "processed", "worker": self.name}

async def main():
    worker = AsyncWorker("Node-Alpha")
    tasks = [worker.fetch_task(i) for i in range(1, 10)]
    start = time.perf_counter()
    results = await asyncio.gather(*tasks)
    elapsed = time.perf_counter() - start
    print(f"Processed {len(results)} async tasks concurrently in {elapsed:.3f}s")

if __name__ == "__main__":
    asyncio.run(main())`,
    roadmapSteps: [
      '1. Python Data Model, dunder methods, scopes',
      '2. Generators, iterators, memory profiling',
      '3. Decorators, closures, functools',
      '4. Asynchronous programming with asyncio/trio',
      '5. C-Extensions, Cython, and PyO3 Rust bindings'
    ],
    popularProjects: ['Async Web Crawler with Rate Limiting', 'FastAPI Distributed Microservice', 'Custom Vector Search Engine'],
    docsUrl: 'https://docs.python.org/3/'
  },
  {
    id: 'prog-3',
    title: 'Modern TypeScript & React Architecture',
    language: 'TypeScript',
    difficulty: 'Intermediate',
    description: 'Type-level programming, conditional types, mapped types, discriminated unions, generic constraints, React Server Components, and state-machine driven UIs.',
    topics: ['Generic Constraints', 'Discriminated Unions', 'Utility Types (Infer, Mapped)', 'React 19 Hooks', 'Custom State Engines'],
    codeLanguage: 'typescript',
    codeSnippet: `// Advanced Discriminated Union with Type Guard
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading'; progress: number }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: Error };

function matchState<T, R>(
  state: AsyncState<T>,
  handlers: {
    idle: () => R;
    loading: (progress: number) => R;
    success: (data: T) => R;
    error: (err: Error) => R;
  }
): R {
  switch (state.status) {
    case 'idle': return handlers.idle();
    case 'loading': return handlers.loading(state.progress);
    case 'success': return handlers.success(state.data);
    case 'error': return handlers.error(state.error);
  }
}

// Example usage
const studentState: AsyncState<{ name: string; gpa: number }> = {
  status: 'success',
  data: { name: 'Ayesha Khan', gpa: 3.94 },
  timestamp: Date.now()
};

const message = matchState(studentState, {
  idle: () => 'Awaiting request...',
  loading: (p) => \`Fetching record \${p}%\`,
  success: (data) => \`Loaded: \${data.name} (GPA: \${data.gpa})\`,
  error: (err) => \`Failed: \${err.message}\`
});
console.log(message);`,
    roadmapSteps: [
      '1. Primitive types, interfaces, literal types',
      '2. Generics, constraints, conditional types with infer',
      '3. Template literal types and mapped types',
      '4. Modern React patterns (RSC, Actions, Suspense)',
      '5. Full-stack Type-Safety with tRPC/Zod'
    ],
    popularProjects: ['Interactive Real-Time Code Canvas', 'Type-Safe E-Commerce API', 'Kanban Board with Optimistic UI'],
    docsUrl: 'https://www.typescriptlang.org/docs/'
  },
  {
    id: 'prog-4',
    title: 'Essential Data Structures & Algorithms in Java',
    language: 'Java',
    difficulty: 'Intermediate',
    description: 'Implement complex AVL trees, B-Trees, Graph algorithms (Dijkstra, Tarjan SCC, Kruskal MST), Disjoint Set Union (DSU), and dynamic programming in idiomatic modern Java 21.',
    topics: ['AVL Self-Balancing Trees', 'Disjoint Set Union (Union-Find)', 'Dijkstra Shortest Path', 'Dynamic Programming Patterns', 'Java Collections Internals'],
    codeLanguage: 'java',
    codeSnippet: `import java.util.*;

public class DisjointSetUnion {
    private final int[] parent;
    private final int[] rank;

    public DisjointSetUnion(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    public boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false; // Cycle detected
        
        // Union by rank
        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        return true;
    }
}`,
    roadmapSteps: [
      '1. Java memory model, JVM Garbage Collection',
      '2. Arrays, LinkedLists, Stacks, Queues, HashMaps internals',
      '3. Binary Search Trees, AVL Trees, Heaps/Priority Queues',
      '4. Graph Traversals, Shortest Paths, Topological Sort',
      '5. Dynamic Programming: 1D, 2D, Knapsack, Bitmasking'
    ],
    popularProjects: ['Kruskal Minimum Spanning Tree Visualizer', 'LRU Cache with O(1) Operations', 'In-Memory Key-Value Store'],
    docsUrl: 'https://docs.oracle.com/en/java/'
  }
];

export const INITIAL_READING_LISTS: ReadingList[] = [
  {
    id: 'list-1',
    title: '🚀 AI & Machine Learning Mastery',
    description: 'Curated sequential roadmap from mathematical foundations to modern Transformer architectures and deep reinforcement learning.',
    bookIds: ['book-2', 'book-5', 'book-1'],
    category: 'Artificial Intelligence',
    createdAt: '2025-01-10',
    color: '#38BDF8'
  },
  {
    id: 'list-2',
    title: '💻 Software Craftsmanship & System Design',
    description: 'Essential reading list for writing scalable, maintainable distributed systems and clean enterprise software.',
    bookIds: ['book-3', 'book-4', 'book-7'],
    category: 'Software Engineering',
    createdAt: '2025-01-18',
    color: '#60A5FA'
  },
  {
    id: 'list-3',
    title: '🧠 Core Computer Science Fundamentals',
    description: 'The holy trinity of CS undergrad: Algorithms (CLRS), Operating Systems (OSTEP), and Computer Networking (Kurose).',
    bookIds: ['book-1', 'book-8', 'book-6'],
    category: 'Data Structures',
    createdAt: '2025-02-01',
    color: '#22D3EE'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🤖 New AI Recommendation Ready',
    message: 'Based on your reading in "Introduction to Algorithms", we added "Designing Data-Intensive Applications" to your tailored recommendations.',
    type: 'recommendation',
    time: '10 minutes ago',
    read: false,
    actionUrl: '/books'
  },
  {
    id: 'notif-2',
    title: '📚 Weekly Reading Goal Progress: 75%',
    message: 'You have completed 4.5 hours of reading this week. Only 1.5 hours left to reach your weekly milestone!',
    type: 'reminder',
    time: '2 hours ago',
    read: false,
    actionUrl: '/progress'
  },
  {
    id: 'notif-3',
    title: '✨ 500+ Solved Past Papers Added',
    message: 'Spring 2025 past papers and solved calculation sheets for CS-301 (OS) and CS-201 (DSA) are now available in Study Materials.',
    type: 'update',
    time: '1 day ago',
    read: true,
    actionUrl: '/study-materials'
  },
  {
    id: 'notif-4',
    title: '🎓 System Update: BSCS Library AI v3.0',
    message: 'Enjoy the new near-black neon blue interface, interactive code playground, instant PDF textbook reader, and offline bookmarks.',
    type: 'system',
    time: '3 days ago',
    read: true
  }
];

export const MOCK_ACADEMIC_QUOTES = [
  {
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson, SICP"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },
  {
    quote: "The computer was born to solve problems that did not exist before.",
    author: "Bill Gates"
  }
];

// Smart Mock AI Knowledge Base for accurate instant answers without APIs
export const AI_KNOWLEDGE_BASE: { [key: string]: string } = {
  default: `I am your **BSCS Library AI Assistant**. I can help you with:

- **Book Recommendations**: Find beginner, intermediate, or research-level textbooks across all 10 CS domains.
- **Concept Explanations**: Ask me to explain Dijkstra's algorithm, Page Tables, Raft Consensus, Transformers, or Big-O notation.
- **Code & Syntax**: Get clean code snippets in C++, Python, Java, JavaScript, and SQL.
- **Exam Preparation**: Review key concepts, past paper calculation formulas, and study strategies.

Try asking:
*"Explain how A* Search works in AI"* or *"What is the difference between B-Trees and LSM-Trees?"*`,

  machine_learning: `### 🤖 Beginner Machine Learning Roadmap & Recommendations

Here is a structured curriculum with top recommended books from our library:

1. **Hands-On Machine Learning with Scikit-Learn & PyTorch** by Aurélien Géron
   - *Why*: The absolute best practical guide. Takes you from basic regression to deep CNNs with clean Python code.
2. **Artificial Intelligence: A Modern Approach (4th Edition)** by Russell & Norvig
   - *Why*: The gold standard for AI agents, probabilistic reasoning, and search algorithms.
3. **Pattern Recognition and Machine Learning** by Christopher Bishop
   - *Why*: For the deep mathematical foundation (Bayesian inference, Gaussians, SVMs).

💡 **Key Starter Concepts**:
- Supervised Learning: Linear Regression, Logistic Regression, Decision Trees.
- Loss Functions: MSE, Cross-Entropy.
- Optimization: Gradient Descent, Adam Optimizer, Learning Rate Schedules.`,

  data_structures: `### 📊 Data Structures & Algorithms Mastery

Here are the foundational topics to conquer for university exams & technical interviews:

1. **Arrays & Hash Maps**: O(1) average lookup, hash collisions (Chaining vs Open Addressing).
2. **Trees & Heaps**: 
   - Binary Search Trees (BST), AVL Trees (Rotations), Red-Black Trees.
   - Min/Max Heap: O(log n) insertions, O(1) get-min.
3. **Graphs**:
   - Traversals: BFS (Queue - shortest path in unweighted graph), DFS (Stack/Recursion).
   - Shortest Path: Dijkstra (Greedy with PriorityQueue), Bellman-Ford (handles negative weights).
   - Minimum Spanning Tree: Kruskal (Disjoint Set Union) & Prim.
4. **Dynamic Programming**:
   - Identify overlapping subproblems and optimal substructure.
   - Master 0/1 Knapsack, Longest Common Subsequence (LCS), and Matrix Chain Multiplication.`,

  operating_systems: `### 💻 Operating Systems: Core Pillars (OSTEP Overview)

1. **Virtualization**:
   - **CPU**: Time-sharing, context switching, Process Control Block (PCB), Multi-Level Feedback Queue (MLFQ).
   - **Memory**: Paging, Page Tables, Translation Lookaside Buffer (TLB), Virtual Memory, Page Fault replacement (LRU/Clock).
2. **Concurrency**:
   - Threads share memory; processes have separate address spaces.
   - Race conditions, Mutex locks, Semaphores (Counting & Binary), Condition Variables.
   - **Deadlock conditions (Coffman)**: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.
3. **Persistence**:
   - File systems, Inodes, Directory trees, Journaling (Write-Ahead Logging for crash consistency).`
};
