import { Subject, Book } from '../types';

export const allBooks: Book[] = [
  {
    id: "book-c-programming",
    title: "The C Programming Language",
    author: "Brian W. Kernighan & Dennis M. Ritchie",
    description: "The classic and authoritative guide to C programming, written by its creators. Perfect for learning low-level memory operations, syntax foundations, and core algorithmic thinking.",
    rating: 4.9,
    pages: 272,
    year: "1988",
    category: "Programming"
  },
  {
    id: "book-cpp-programming",
    title: "Object-Oriented Programming in C++",
    author: "Robert Lafore",
    description: "A comprehensive, easy-to-understand tutorial that introduces the fundamentals of object-oriented programming using the C++ language. Packed with practical examples and exercises.",
    rating: 4.8,
    pages: 1012,
    year: "2001",
    category: "OOP"
  },
  {
    id: "book-dsa",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest & Clifford Stein",
    description: "Often called the 'bible of algorithms', this book provides a comprehensive and detailed introduction to the design and analysis of computer algorithms.",
    rating: 4.7,
    pages: 1312,
    year: "2009",
    category: "DSA"
  },
  {
    id: "book-dbms",
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry F. Korth & S. Sudarshan",
    description: "The preferred textbook for university database courses. Covers relational databases, SQL syntax, transaction management, indexing, and normal forms.",
    rating: 4.6,
    pages: 1376,
    year: "2019",
    category: "Database Systems"
  },
  {
    id: "book-os",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin & Greg Gagne",
    description: "Provides a clear description of the concepts that underlie operating systems. Introduces virtualization, processes, threads, scheduling, CPU synchronization, and security.",
    rating: 4.8,
    pages: 976,
    year: "2018",
    category: "Operating Systems"
  },
  {
    id: "book-networks",
    title: "Computer Networking: A Top-Down Approach",
    author: "James Kurose & Keith Ross",
    description: "An engaging, modern introduction to computer networks using a layered, top-down approach, exploring the internet protocol stack from application to physical layers.",
    rating: 4.7,
    pages: 864,
    year: "2020",
    category: "Networks"
  },
  {
    id: "book-ai",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    description: "The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence, covering agent frameworks, search, logic, and machine learning.",
    rating: 4.9,
    pages: 1152,
    year: "2020",
    category: "Artificial Intelligence"
  }
];

export const subjectsData: Subject[] = [
  // --- SEMESTER 1 ---
  {
    id: "programming-fundamentals",
    name: "Programming Fundamentals",
    code: "CS-101",
    semester: 1,
    description: "Introduction to computer programming using the C language.",
    overview: "This course is the gateway to computer science. It covers the core syntax of structured programming languages, variables, operators, conditional structures, loops, arrays, pointers, functions, and file structure in standard C language. Students develop computational thinking and logical problem-solving skills.",
    importantQuestions: [
      "Explain the difference between call by value and call by reference with code snippets.",
      "What is a pointer? How are pointers used to access elements of an array?",
      "Explain the structure of a dynamic memory allocation block. How do malloc, calloc, and free work?",
      "Differentiate between structured programming and procedured programming.",
      "How does recursion work? Explain using the Fibonacci series or factorial calculation."
    ],
    chapters: [
      {
        id: "pf-ch1",
        title: "Introduction to C & Development Environments",
        notes: "C is a procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It is a middle-level language that supports both low-level memory operations and high-level structural constructs.\n\nKey Concepts:\n1. Compiler: Converts C source code (.c) into machine executable code (.exe/binary).\n2. Syntax structure of a simple C program:\n   ```c\n   #include <stdio.h>\n   int main() {\n       printf(\"Hello, BSCS Student!\\n\");\n       return 0;\n   }\n   ```\n3. Preprocessor directives: Lines starting with '#' are preprocessor commands. `#include <stdio.h>` tells the compiler to insert standard input-output header file contents before compiling."
      },
      {
        id: "pf-ch2",
        title: "Variables, Data Types, and Operators",
        notes: "Variables are named memory storage locations. In C, variables must be declared before use with a specific data type.\n\nData Types:\n- `int`: for integer numbers (usually 4 bytes).\n- `float`: for single-precision decimal numbers (4 bytes).\n- `double`: for double-precision decimal numbers (8 bytes).\n- `char`: for individual characters (1 byte).\n\nOperators:\n- Arithmetic: `+`, `-`, `*`, `/`, `%` (modulo - returns remainder).\n- Relational: `==`, `!=`, `<`, `>`, `<=`, `>=`.\n- Logical: `&&` (AND), `||` (OR), `!` (NOT)."
      },
      {
        id: "pf-ch3",
        title: "Control Structures: Conditionals and Loops",
        notes: "Control flow defines the execution path of a program.\n\nConditionals:\n- `if`, `else if`, `else` statements block execution based on logical boolean evaluations.\n- `switch-case` is a multi-way branch structure targeting variable evaluations.\n\nLoops:\n- `for` loop: Count-controlled loop with initial state, condition, and increment/decrement step in one line.\n- `while` loop: Condition-controlled loop checking execution permission at the top.\n- `do-while` loop: Post-condition loop executing at least once before checking conditions."
      },
      {
        id: "pf-ch4",
        title: "Functions and Modular Programming",
        notes: "A function is a self-contained block of statements designed to perform a specific task.\n\nSyntax:\n```c\nreturn_type function_name(parameter_list) {\n    // body\n    return value;\n}\n```\n\nParameters can be passed by value (copying data) or by reference (sending variable memory address using pointers)."
      }
    ],
    books: [allBooks[0]],
    assignments: [
      {
        id: "pf-assign1",
        title: "Dynamic Student Grade Calculator",
        description: "Create a C program that prompts the user for the number of students, dynamically allocates an integer array for marks using malloc(), calculates average grade, highest marks, and prints a formatted report.",
        dueDate: "2026-07-20",
        marks: 20,
        status: "Not Started"
      }
    ],
    mcqs: [
      {
        id: "pf-mcq1",
        question: "Which of the following is correct to declare a pointer in C?",
        options: ["int p;", "int *p;", "pointer int p;", "&int p;"],
        answer: "int *p;",
        explanation: "In C, prefixing the variable name with an asterisk '*' in a declaration designates it as a pointer to the specified data type."
      },
      {
        id: "pf-mcq2",
        question: "What is the return type of the malloc() function?",
        options: ["int *", "float *", "void *", "char *"],
        answer: "void *",
        explanation: "malloc() returns a generic pointer of type void* which can be cast to any type."
      }
    ],
    pastPapers: [
      {
        id: "pf-paper-2025-mid",
        year: "2025",
        type: "Midterm",
        questions: [
          "Q1: Draw a flowchart and write a C program to check whether a number is prime or not.",
          "Q2: Explain switch-case with a calculator program.",
          "Q3: Trace the output of the nested for loops provided in the exam paper."
        ]
      }
    ]
  },
  {
    id: "ict",
    name: "Introduction to Information and Communication Technologies",
    code: "CS-102",
    semester: 1,
    description: "Foundational computer systems and internet concepts.",
    overview: "This course covers fundamental IT concepts, computer hardware architectures, operating system principles, internet architectures, networking topologies, databases, security concepts, and the role of computing in modern societies.",
    importantQuestions: [
      "Explain the Von Neumann Architecture of computer systems with a diagram.",
      "What are input, output, and secondary storage systems? Explain virtual memory.",
      "Detail network topologies: Ring, Star, Mesh, Bus. Which is most robust?"
    ],
    chapters: [
      {
        id: "ict-ch1",
        title: "Hardware Architecture and CPU Operations",
        notes: "Computer hardware refers to the physical components of a computer. Von Neumann architecture outlines the main structure: CPU (Control Unit + ALU), Memory (RAM/ROM), Secondary Storage, and Input/Output devices."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "calculus-1",
    name: "Calculus & Analytical Geometry",
    code: "MATH-101",
    semester: 1,
    description: "Limits, derivatives, integrations, and mathematical limits.",
    overview: "This course introduces key mathematical frameworks used in computer graphics, machine learning, and game engines. It covers functions, limits, continuity, derivative techniques, integration, and coordinates geometry.",
    importantQuestions: [
      "Evaluate limits using L'Hopital's Rule.",
      "Explain the fundamental theorem of calculus and its engineering applications."
    ],
    chapters: [
      {
        id: "calc-ch1",
        title: "Limits and Continuity",
        notes: "A limit is the value that a function approaches as the input approaches some value. Continuity means there are no jumps or breaks in the function path."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "english-composition",
    name: "English Composition",
    code: "ENG-101",
    semester: 1,
    description: "Academic writing, vocabulary, grammar, and research structures.",
    overview: "Improves standard reading and writing competence. Emphasizes sentence structure, paragraph coherence, essay formatting, referencing, and academic research summaries.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },

  // --- SEMESTER 2 ---
  {
    id: "oop",
    name: "Object-Oriented Programming",
    code: "CS-201",
    semester: 2,
    description: "Advanced paradigm design using Classes, Inheritance, Polymorphism, and encapsulation in C++.",
    overview: "Object-Oriented Programming (OOP) is a modern software paradigm focusing on modeling real-world problems as structures called objects. C++ is used to master class hierarchies, constructors, data hiding, code reusability via inheritance, compile-time and run-time polymorphism, exception handling, and templates.",
    importantQuestions: [
      "Detail the four pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism). Give code illustrations.",
      "What is a virtual function? Why do we need virtual destructors?",
      "Explain operator overloading. Write a program to overload the '+' operator to add two complex numbers.",
      "Explain deep copy vs shallow copy. How does a custom copy constructor prevent pointer leaks?",
      "What is multiple inheritance? Explain the diamond problem and how virtual inheritance solves it."
    ],
    chapters: [
      {
        id: "oop-ch1",
        title: "Classes, Objects, and Encapsulation",
        notes: "A class is a user-defined blueprint containing attributes (data) and behaviors (functions). An object is an instance of a class.\n\nEncapsulation hides internal data members using `private` visibility specifiers and exposes them only through `public` getter and setter methods. This safeguards internal program states."
      },
      {
        id: "oop-ch2",
        title: "Constructors and Destructors",
        notes: "Constructors are special member functions called automatically when an object is created. They have the same name as the class and no return type.\n\nTypes of Constructors:\n- Default constructor (takes no arguments).\n- Parameterized constructor.\n- Copy constructor (creates deep/shallow copies of an existing object).\n\nDestructors clear system allocations when objects go out of scope. They are prefixed with a tilde '~'."
      },
      {
        id: "oop-ch3",
        title: "Inheritance and Code Reusability",
        notes: "Inheritance allows a new class (derived/child class) to inherit members and methods from an existing class (base/parent class).\n\nC++ supports Single, Multiple, Multilevel, Hierarchical, and Hybrid inheritance formats. Visibility modes (`public`, `protected`, `private`) regulate access privileges in derived classes."
      },
      {
        id: "oop-ch4",
        title: "Polymorphism (Static & Dynamic)",
        notes: "Polymorphism means 'many forms'. It allows methods to act differently based on parameters or classes.\n\n1. Compile-Time (Static) Polymorphism: Handled via function overloading and operator overloading.\n2. Run-Time (Dynamic) Polymorphism: Achieved via virtual functions and pointer assignments in class hierarchies. The specific method is resolved dynamically at runtime."
      }
    ],
    books: [allBooks[1]],
    assignments: [
      {
        id: "oop-assign1",
        title: "E-Commerce System Class Diagram & Implementation",
        description: "Design a complete C++ application simulating an e-commerce platform. Implement classes for User, Product, ShoppingCart, and Order. Support polymorphism for different payment methods (CreditCard, PayPal) and show inheritance hierarchy.",
        dueDate: "2026-08-05",
        marks: 30,
        status: "Not Started"
      }
    ],
    mcqs: [
      {
        id: "oop-mcq1",
        question: "Which keyword is used to implement run-time polymorphism in C++?",
        options: ["static", "friend", "virtual", "const"],
        answer: "virtual",
        explanation: "The virtual keyword in a base class declaration directs the compiler to use late-binding (dynamic resolution) for function calls."
      }
    ],
    pastPapers: [
      {
        id: "oop-paper-2025-final",
        year: "2025",
        type: "Terminal",
        questions: [
          "Q1: Differentiate between abstract classes and interfaces in C++. Give syntax.",
          "Q2: Explain the diamond problem in C++ and solve it using virtual base classes.",
          "Q3: Write a complete template-based generic Stack class."
        ]
      }
    ]
  },
  {
    id: "dld",
    name: "Digital Logic Design",
    code: "CS-202",
    semester: 2,
    description: "Logic gates, Boolean algebra, flip-flops, registers, and digital circuits.",
    overview: "Covers the electronic underpinnings of computer systems. Students learn number representation, logic gates, Karnaugh Maps simplification, combinational circuits (adders, multiplexers), and sequential logic systems (flip-flops, counters, registers).",
    importantQuestions: [
      "Simplify standard boolean functions using a 4-variable Karnaugh Map.",
      "Design a full adder circuit using NAND gates only.",
      "What is the difference between latch and flip-flop?"
    ],
    chapters: [
      {
        id: "dld-ch1",
        title: "Boolean Algebra and Logic Simplification",
        notes: "Digital systems operate in base-2 (binary). Boolean algebra governs logical variables (AND, OR, NOT operations). Karnaugh Maps (K-maps) offer grid-based, visual simplifications for logical outputs."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "calculus-2",
    name: "Calculus & Multivariable Functions",
    code: "MATH-102",
    semester: 2,
    description: "Multivariable equations, partial derivatives, and integrations.",
    overview: "Bridges basic calculus into multi-dimensional analysis, exploring vectors, sequences, infinite series, double and triple integrals, and differential equations.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "communication-skills",
    name: "Communication Skills",
    code: "ENG-102",
    semester: 2,
    description: "Professional speaking, presentation strategies, and corporate correspondence.",
    overview: "Builds communication competence for computer scientists. Focuses on writing technical pitches, resume styling, cover letters, active listening, and speech deliveries.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "pakistan-studies",
    name: "Pakistan Studies",
    code: "HU-101",
    semester: 2,
    description: "Historical, political, and socio-economic frameworks of Pakistan.",
    overview: "Explores the historical timeline leading to the creation of Pakistan, constitutional structures, and national socio-economic policies.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },

  // --- SEMESTER 3 ---
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    code: "CS-301",
    semester: 3,
    description: "Linear and non-linear data structures including Linked Lists, Trees, Graphs, sorting, and hashing.",
    overview: "DSA is the core of efficient computer systems. This course teaches how data is organized, accessed, and processed in memory. Topics include asymptotic notation (Big-O), arrays, stacks, queues, linked lists, trees (AVL, Binary Search Tree), heaps, graphs (DFS, BFS), sorting techniques, and hashing.",
    importantQuestions: [
      "Compare the time complexities of Bubble Sort, Quick Sort, and Merge Sort (best, average, worst case).",
      "Write a function to detect and remove a loop in a Singly Linked List.",
      "How does an AVL Tree maintain balance? Explain LL, RR, LR, RL rotation sequences.",
      "Differentiate between Depth-First Search (DFS) and Breadth-First Search (BFS) for graph traversals.",
      "Explain the concept of Hash collisions and discuss chaining vs open-addressing methodologies."
    ],
    chapters: [
      {
        id: "dsa-ch1",
        title: "Introduction to Complexity Analysis & Big-O",
        notes: "Algorithm analysis evaluates efficiency in terms of time (processor speed) and space (RAM). We use Big-O asymptotic notation to outline upper bounds of running times relative to input size (N).\n\nStandard Complexities:\n- `O(1)`: Constant Time\n- `O(log N)`: Logarithmic Time\n- `O(N)`: Linear Time\n- `O(N log N)`: Linearithmic Time\n- `O(N^2)`: Quadratic Time"
      },
      {
        id: "dsa-ch2",
        title: "Linked Lists (Singly, Doubly, and Circular)",
        notes: "Unlike arrays, linked lists are dynamic data structures where elements (nodes) are scattered in memory. Nodes are joined using pointer references. Inserting and deleting items takes constant time O(1) once position is retrieved, but searching is sequential O(N)."
      },
      {
        id: "dsa-ch3",
        title: "Trees and Binary Search Trees (BST)",
        notes: "Trees represent non-linear hierarchical relationships. A BST ensures for every node: values on the left child sub-tree are smaller, values on the right child sub-tree are larger. Traversing BST 'in-order' yields sorted sequences."
      }
    ],
    books: [allBooks[2]],
    assignments: [
      {
        id: "dsa-assign1",
        title: "BST Tree Operations and Balancing",
        description: "Implement a fully working Binary Search Tree in C++ or Java. Support insert(), search(), delete(), and tree traversals (In-order, Pre-order, Post-order). Implement tree balance checking.",
        dueDate: "2026-09-12",
        marks: 25,
        status: "Not Started"
      }
    ],
    mcqs: [
      {
        id: "dsa-mcq1",
        question: "What is the worst-case time complexity of searching in a standard Binary Search Tree?",
        options: ["O(log N)", "O(N)", "O(1)", "O(N log N)"],
        answer: "O(N)",
        explanation: "If a BST becomes skewed (unbalanced, resembling a linked list), searching behaves linearly, requiring O(N) comparisons."
      }
    ],
    pastPapers: [
      {
        id: "dsa-paper-2025-mid",
        year: "2025",
        type: "Midterm",
        questions: [
          "Q1: Implement a circular Queue using arrays. Handle boundary conditions.",
          "Q2: Draw the BST after inserting: 45, 12, 56, 89, 23, 7, 50.",
          "Q3: Trace the Heapify algorithm on array: [4, 10, 3, 5, 1]."
        ]
      }
    ]
  },
  {
    id: "computer-organization",
    name: "Computer Organization & Assembly Language",
    code: "CS-302",
    semester: 3,
    description: "Processor design, instruction sets, CPU scheduling, and low-level assembly syntax.",
    overview: "Bridges hardware structures and high-level software. Explores x86/MIPS register systems, machine instructions, interrupt handling, caching architectures, and assembly coding.",
    importantQuestions: [
      "Detail x86 general purpose registers and their specialized functions.",
      "What is pipelining? How do pipeline hazards (structural, control, data) degrade CPU speeds?"
    ],
    chapters: [
      {
        id: "co-ch1",
        title: "Register Architectures and Memory Address Modes",
        notes: "CPU registers are top-speed, volatile storage arrays built into processors. Understanding general purpose registers (AX, BX, CX, DX) is vital for writing low-level instructions."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "probability-statistics",
    name: "Probability & Statistics",
    code: "MATH-301",
    semester: 3,
    description: "Statistical models, binomial distribution, regression, and data sets.",
    overview: "Covers crucial mathematical frameworks for AI and Big Data. Explores probability distributions, variance, standard deviation, estimation theories, testing hypotheses, and linear regression.",
    importantQuestions: [
      "Explain Bayes' Theorem. Give an example problem."
    ],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },

  // --- SEMESTER 4 ---
  {
    id: "database-systems",
    name: "Database Systems",
    code: "CS-401",
    semester: 4,
    description: "Relational models, ERDs, SQL queries, Normalization, transactions, and indexing.",
    overview: "This course outlines data management systems. It focuses heavily on Entity-Relationship Diagrams (ERDs), relational algebra, Relational Schema translations, standard SQL queries, functional dependencies, 1NF, 2NF, 3NF, BCNF normalization, concurrency control, and transactions.",
    importantQuestions: [
      "Explain 1NF, 2NF, 3NF, and BCNF normalization with tables.",
      "How do ACID properties guarantee transaction integrity in relational databases?",
      "Write SQL statements for joins (Inner, Left, Right, Full) and discuss subqueries."
    ],
    chapters: [
      {
        id: "db-ch1",
        title: "Relational Database Concepts & ERD Design",
        notes: "A database management system (DBMS) manages organized tables. An Entity-Relationship Diagram (ERD) is a blueprint detailing database tables, properties, and relationship cardinalities (1:1, 1:N, M:N)."
      },
      {
        id: "db-ch2",
        title: "SQL Query Mastery",
        notes: "SQL (Structured Query Language) contains:\n- DDL (Data Definition): CREATE, ALTER, DROP.\n- DML (Data Manipulation): SELECT, INSERT, UPDATE, DELETE.\n- DCL (Data Control): GRANT, REVOKE.\n- TCL (Transaction Control): COMMIT, ROLLBACK."
      },
      {
        id: "db-ch3",
        title: "Normalization & Functional Dependencies",
        notes: "Normalization organizes tables to minimize data redundancy and dependency anomalies. 1NF removes repeating groups. 2NF removes partial dependency. 3NF removes transitive dependency."
      }
    ],
    books: [allBooks[3]],
    assignments: [
      {
        id: "db-assign1",
        title: "University Management System Database Design",
        description: "Draw a detailed ERD and write the SQL script to create schemas, indexes, and populate mock data for a University Course Enrollment portal.",
        dueDate: "2026-10-10",
        marks: 30,
        status: "Not Started"
      }
    ],
    mcqs: [
      {
        id: "db-mcq1",
        question: "Which normal form handles transitive functional dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: "3NF",
        explanation: "A table is in 3NF if it is in 2NF and there are no transitive functional dependencies of non-prime attributes on primary keys."
      }
    ],
    pastPapers: [
      {
        id: "db-paper-2025-final",
        year: "2025",
        type: "Terminal",
        questions: [
          "Q1: Write SQL to find the second highest salary from an Employee table.",
          "Q2: Explain locking-based concurrency control protocols (2-Phase Locking)."
        ]
      }
    ]
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    code: "CS-402",
    semester: 4,
    description: "Kernel, system calls, process scheduling, synchronization, virtual memory, and deadlock handling.",
    overview: "Operating Systems act as intermediates between user apps and hardware. This course covers processes, thread controls, scheduling algorithms (FCFS, SJF, Round Robin), synchronization mechanisms (semaphores, mutexes), deadlocks, memory virtualization, and paging.",
    importantQuestions: [
      "Detail process states and state transition diagrams.",
      "How does Banker's Algorithm ensure deadlock avoidance? Work through an allocation matrix.",
      "Explain Paging. What is a Translation Lookaside Buffer (TLB)?"
    ],
    chapters: [
      {
        id: "os-ch1",
        title: "Processes and CPU Scheduling",
        notes: "A process is a program in execution. The CPU scheduler switches processes quickly to simulate multitasking. Schedulers use algorithms like FCFS (First Come First Served), SJF (Shortest Job First), and Round Robin (RR)."
      }
    ],
    books: [allBooks[4]],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    code: "CS-403",
    semester: 4,
    description: "SDLC pipelines, Agile, design patterns, UML, and testing metrics.",
    overview: "Introduces standard engineering practices for constructing complex software systems, exploring Agile/Scrum lifecycles, requirement analysis, UML diagram specifications, design patterns, and unit/integration testing methodologies.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "computer-networks",
    name: "Computer Networks",
    code: "CS-404",
    semester: 4,
    description: "OSI & TCP/IP stack layers, routing protocols, switches, routers, and secure ports.",
    overview: "Covers data communication over modern networks. Outlines OSI & TCP/IP layered structures, socket routing, secure ports, IP addressing, subnetting calculations, routing protocols (RIP, OSPF, BGP), and transport layer congestion managers (TCP, UDP).",
    importantQuestions: [
      "Perform a subnetting calculation: Divide 192.168.1.0/24 into 4 subnets.",
      "Differentiate between OSI model and TCP/IP stack."
    ],
    chapters: [
      {
        id: "net-ch1",
        title: "OSI Layer Model and Functions",
        notes: "The Open Systems Interconnection (OSI) is a 7-layer framework: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP is a compressed, real-world protocol suite with 4 layers."
      }
    ],
    books: [allBooks[5]],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "theory-of-automata",
    name: "Theory of Automata & Formal Languages",
    code: "CS-405",
    semester: 4,
    description: "DFA, NFA, Regular Expressions, Context-Free Grammars, and Turing Machines.",
    overview: "Mathematical models of computing machines. Explores Deterministic Finite Automata (DFA), Non-deterministic Finite Automata (NFA), Regular Expressions, Context-Free Grammars (CFG), Pushdown Automata, and Turing Machines defining physical bounds of compute power.",
    importantQuestions: [
      "Design a DFA that accepts binary strings ending with '101'.",
      "Explain the Chomsky Hierarchy of languages."
    ],
    chapters: [
      {
        id: "auto-ch1",
        title: "Finite Automata (DFA and NFA)",
        notes: "Finite Automata are simple machines representing state transitions. DFAs have exactly one exit transition per character per state, whereas NFAs support multiple potential exit paths, null transitions, and guesses."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },

  // --- SEMESTER 5-8 ---
  {
    id: "web-development",
    name: "Web Systems & Technologies",
    code: "CS-501",
    semester: 5,
    description: "Modern full-stack technologies: HTML, CSS, JavaScript, React.js, Node.js, and API structures.",
    overview: "Focuses on modern web application architectures. Guides students from basic static layouts into robust client-side routing, single-page frameworks, asynchronous state managers, RESTful endpoints, and relational/non-relational database connectivity.",
    importantQuestions: [
      "Explain virtual DOM and reconciliation mechanisms in React.",
      "What is the Event Loop in JavaScript? Explain how async/await works under the hood."
    ],
    chapters: [
      {
        id: "web-ch1",
        title: "HTML5, CSS3, and ES6+ JavaScript Foundations",
        notes: "HTML5 structures web documents. CSS3 handles layout styling. Modern JavaScript (ES6+) introduces arrow functions, promises, classes, module structures, and destructuring syntax."
      },
      {
        id: "web-ch2",
        title: "React.js Components & React Hooks",
        notes: "React is a declarative, component-based view engine. Hooks like `useState` regulate component state, while `useEffect` coordinates asynchronous fetch calls and subscriptions securely."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    code: "CS-502",
    semester: 6,
    description: "Search agents, expert logic, Neural Networks, Machine Learning, and NLP concepts.",
    overview: "Examines intelligent agent frameworks. Outlines blind search models (DFS, BFS), informed heuristics (A* Search, minimax for games), propositional logic, machine learning pipelines, basic neural networks, and prompt engineering.",
    importantQuestions: [
      "Detail how the A* Search algorithm works. Why must heuristics be admissible?",
      "Explain the backpropagation algorithm in neural networks."
    ],
    chapters: [
      {
        id: "ai-ch1",
        title: "Intelligent Agents and Search Algorithms",
        notes: "An AI agent perceives environments through sensors and acts via actuators. Problem solving searches state trees. Breadth-First search guarantees shallowest goals, but heuristic search like A* finds optimal paths."
      }
    ],
    books: [allBooks[6]],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "mobile-app-development",
    name: "Mobile Application Development",
    code: "CS-601",
    semester: 7,
    description: "Building cross-platform mobile apps using Flutter or React Native.",
    overview: "Covers mobile architectures, interface creation, native capabilities integration (GPS, Camera), background workers, local data engines, and cloud notification channels.",
    importantQuestions: [],
    chapters: [],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "information-security",
    name: "Information Security",
    code: "CS-701",
    semester: 7,
    description: "Symmetric & asymmetric cryptography, network protocols, firewalls, and penetration analysis.",
    overview: "Outlines principles of secure systems. Students learn symmetric encryption (AES), public-key architectures (RSA), hashing (SHA-256), secure handshake handshakes (SSL/TLS), and common software vulnerabilities.",
    importantQuestions: [
      "Detail how RSA Asymmetric encryption works. Give a mathematical example.",
      "Explain the difference between Symmetric and Asymmetric Encryption."
    ],
    chapters: [
      {
        id: "sec-ch1",
        title: "Cryptography Basics: AES and RSA",
        notes: "Cryptography protects data. Symmetric encryption (AES) uses one key for both encryption and decryption. Asymmetric encryption (RSA) uses a public key to encrypt and a private key to decrypt."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  },
  {
    id: "fyp-guide",
    name: "Final Year Project Guide",
    code: "CS-801",
    semester: 8,
    description: "Guidelines and step-by-step milestones to execute your BSCS capstone FYP.",
    overview: "The Final Year Project (FYP) represents the culmination of academic computer science studies. This guide details standard proposal formats, software requirement specifications (SRS), design blueprints, agile execution cycles, final testing reports, and thesis formatting.",
    importantQuestions: [
      "What are the major milestones in a BSCS capstone project?",
      "Detail the structure of a standard FYP Software Requirements Specification (SRS)."
    ],
    chapters: [
      {
        id: "fyp-ch1",
        title: "Idea Formulation & Proposal Structure",
        notes: "Your FYP must tackle a real-world scientific or engineering challenge. Proposals detail Problem Formulation, Proposed Methodology, Architectural Diagrams, Expected Deliverables, and Gantt charts."
      },
      {
        id: "fyp-ch2",
        title: "SRS: Software Requirements Specification",
        notes: "SRS documentations outline Functional and Non-functional specifications, User Personas, Use Case Diagrams, and System Sequence Diagrams. This acts as the project contract."
      }
    ],
    books: [],
    assignments: [],
    mcqs: [],
    pastPapers: []
  }
];
