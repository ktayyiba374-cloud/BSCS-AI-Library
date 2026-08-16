export interface TextbookContent {
  title: string;
  courseCode: string;
  subjectName: string;
  introduction: string;
  theory: string;
  structuredContent: string;
  simplifiedEnglish: string;
  urduExplanation: string;
  stepByStep: string;
  applications: string;
  examPrep: {
    mcqs: Array<{ question: string; options: string[]; answer: string; explanation: string }>;
    shortQuestions: Array<{ question: string; answer: string }>;
    longQuestion: { question: string; rubric: string; answer: string };
  };
}

export const fallbackTextbooks: Record<string, TextbookContent> = {
  "programming-fundamentals-pointers": {
    title: "Chapter 5: Memory Management and Pointers in C",
    courseCode: "CS-101",
    subjectName: "Programming Fundamentals",
    introduction: "Pointers are one of the most powerful and fundamental features of the C programming language, providing a low-level bridge between variables and physical memory addresses. Unlike standard variables that hold values (such as integers or characters), a pointer is a variable whose explicit value is the hexadecimal memory address of another variable. Understanding pointers is critical for dynamic memory allocation, efficient array manipulation, and high-performance system programming.",
    theory: "Under the Von Neumann architecture, computer memory (RAM) is organized as an ordered sequence of contiguous 1-byte storage cells, each uniquely identified by a sequential binary address. When a variable is declared, the compiler reserves a chunk of bytes corresponding to the data type (e.g., 4 bytes for an `int` on 64-bit systems). \n\nWe utilize the Address-of Operator (`&`) to retrieve the physical RAM address of any variable, and the Indirection/Dereference Operator (`*`) to access the actual value stored at that specific address. Globally, international CS standards (IEEE/ACM curricula) emphasize pointers as the direct interface to computer architecture, enabling pass-by-reference parameter passing and low-overhead block operations.",
    structuredContent: "### 1.1 Declaring and Initializing Pointers\nA pointer declaration requires specifying the data type of the target variable, followed by an asterisk (`*`) and the pointer variable name.\n\n```c\nint num = 42;      // A standard integer variable\nint *ptr = &num;   // A pointer variable 'ptr' initialized to store the address of 'num'\n```\n\n### 1.2 The Dereferencing Operation\nTo read or modify the data stored in the memory address held by a pointer, we dereference the pointer using the asterisk operator:\n\n```c\nprintf(\"Value of num: %d\\n\", num);       // Outputs 42\nprintf(\"Address of num: %p\\n\", &num);    // Outputs hexadecimal address e.g., 0x7ffd9c15\nprintf(\"Value stored in ptr: %p\\n\", ptr); // Outputs 0x7ffd9c15\nprintf(\"Value dereferenced: %d\\n\", *ptr);  // Outputs 42\n\n*ptr = 99; // Changing the value of num through the pointer ptr\nprintf(\"New value of num: %d\\n\", num);   // Outputs 99\n```\n\n### 1.3 Pointer Arithmetic\nPointer arithmetic operates relative to the size of the underlying data type. If an integer pointer is incremented (`ptr++`), it does not increase the address by 1 byte; instead, it increments by `sizeof(int)` (typically 4 bytes), referencing the contiguous memory address of the next index:\n\n$$\\text{New Address} = \\text{Current Address} + (i \\times \\text{sizeof(Type)})$$",
    simplifiedEnglish: "Think of computer memory as a massive hotel where each room has a unique room number (this is the memory address). \n\nA standard variable is like a guest staying in room 204. A **pointer** is a special notebook that simply writes down the number '204'. If you look inside the notebook, you don't find the guest; you find the directions to room 204. \n\nBy using the notebook (dereferencing), you can walk directly to room 204 and change what is inside, without needing to copy the guest or carry them around! This is incredibly useful because it is much faster to pass a small room number around than to duplicate a heavy room full of furniture.",
    urduExplanation: "پوائنٹرز (Pointers) کمپیوٹر کی میموری (RAM) کا براہِ راست ایڈریس محفوظ کرنے کے لیے استعمال ہوتے ہیں۔\n\nجب ہم ایک عام متغیر (variable) جیسے `int x = 10;` بناتے ہیں تو کمپیوٹر میموری میں اس کے لیے ایک جگہ مختص کر دیتا ہے۔ ہر جگہ کا ایک منفرد پتہ (address) ہوتا ہے۔\n\n1. **ایڈریس آپریٹر (&)**: یہ کسی بھی ویریبل کا میموری ایڈریس معلوم کرنے کے لیے استعمال ہوتا ہے۔\n2. **ڈی ریفرنس آپریٹر (*)**: یہ اس ایڈریس پر موجود اصل قیمت (value) تک پہنچنے کے لیے استعمال ہوتا ہے۔\n\nمثال کے طور پر:\n```c\nint x = 10;\nint *p = &x; // پوائنٹر p میں x کا ایڈریس محفوظ ہو گیا ہے\n```\nاب اگر ہم `*p` لکھیں گے تو اس سے مراد 10 ہوگا، اور اگر ہم `*p = 20;` کریں گے تو میموری میں x کی اصل قیمت تبدیل ہو کر 20 ہو جائے گی۔",
    stepByStep: "### Step-by-Step Execution Sequence:\n\n**Step 1: Allocation**\nThe compiler allocates 4 bytes of RAM for integer variable `x` at memory address `0x1000`, storing the binary representation of integer value `5`.\n\n**Step 2: Pointer Declaration**\nThe compiler allocates 8 bytes for a pointer variable `ptr` (on 64-bit platforms) at address `0x2008`.\n\n**Step 3: Assignment**\nThe statement `ptr = &x;` stores the address value `0x1000` directly into pointer variable `ptr`.\n\n**Step 4: Modification (Dereferencing)**\nThe CPU executes `*ptr = 25`. It reads the value in `ptr` (`0x1000`), accesses address `0x1000`, and overwrites the binary block with value `25`.",
    applications: "Pointers are heavily utilized in several low-level software systems:\n1. **Operating System Kernels**: Linux and Windows kernels are written in C, utilizing pointers to directly access page tables, device registers, and network interface buffers.\n2. **Dynamic Memory Allocation**: Standard library functions like `malloc()` and `calloc()` return `void *` pointers, which represent blocks of heap memory dynamically managed during runtime.\n3. **Efficient Data Structures**: Linked lists, binary trees, and heaps rely entirely on pointers to chain scattered node blocks in heap memory.",
    examPrep: {
      mcqs: [
        {
          question: "What is the size of an integer pointer on a standard 64-bit computer architecture?",
          options: ["2 Bytes", "4 Bytes", "8 Bytes", "Depends on the size of the integer"],
          answer: "8 Bytes",
          explanation: "On a 64-bit machine, the memory address registers are 64 bits (8 bytes) wide. Therefore, all pointers, regardless of the data type they point to, require 8 bytes of storage."
        },
        {
          question: "Given 'int arr[5] = {10, 20, 30}; int *ptr = arr;', what is the output of '*(ptr + 2)'?",
          options: ["10", "20", "30", "Undefined value"],
          answer: "30",
          explanation: "'arr' represents the base address of the array (index 0). Adding 2 to the pointer moves it forward by two integer steps to index 2, which holds the value 30. Dereferencing yields 30."
        }
      ],
      shortQuestions: [
        {
          question: "What is a Dangling Pointer and how can it be prevented?",
          answer: "A dangling pointer occurs when a pointer continues to store the memory address of a block that has been freed or deallocated. It can be prevented by setting the pointer to `NULL` immediately after calling `free()` on the block."
        },
        {
          question: "Explain the difference between 'const int *ptr' and 'int *const ptr'.",
          answer: "'const int *ptr' means the data pointed to is constant and cannot be modified through this pointer, though the pointer can be changed to point elsewhere. 'int *const ptr' means the pointer address itself is constant and cannot change, but the integer data it references can be altered."
        }
      ],
      longQuestion: {
        question: "Write a complete C program demonstrating how pointers are passed to a function to swap two numbers. Explain the memory layout before, during, and after the function call.",
        rubric: "1. Correct function prototype (5 Marks)\n2. Correct usage of dereference operators (5 Marks)\n3. Correct main implementation with address passing (5 Marks)\n4. Accurate theoretical explanation of the stack frames (5 Marks)",
        answer: "```c\n#include <stdio.h>\n\n// Swaps two variables by passing their memory addresses\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int num1 = 100, num2 = 200;\n    printf(\"Before: num1 = %d, num2 = %d\\n\", num1, num2);\n    \n    // Passing addresses of num1 and num2\n    swap(&num1, &num2);\n    \n    printf(\"After: num1 = %d, num2 = %d\\n\", num1, num2);\n    return 0;\n}\n```\n\n**Memory Layout Explanation:**\n- **Before:** `num1` (100) and `num2` (200) reside in the `main` stack frame.\n- **During Call:** Inside `swap()`, pointers `a` and `b` receive `&num1` and `&num2`. Dereferencing `*a` and `*b` updates the memory registers belonging to `main` stack variables.\n- **After:** The `swap` stack frame is popped. The changes are permanent because physical memory values were updated."
      }
    }
  },
  "oop-pillars": {
    title: "Chapter 3: The Four Pillars of Object-Oriented Programming",
    courseCode: "CS-201",
    subjectName: "Object-Oriented Programming",
    introduction: "Object-Oriented Programming (OOP) is an industry-standard programming paradigm that organizes software design around data, or objects, rather than functions and logic. Mastered via C++ or Java, OOP decomposes complex corporate applications into manageable, reusable modules. The core philosophy of OOP rests upon four vital pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    theory: "To build software that scales across thousands of developers, we must encapsulate states and behaviors, restrict arbitrary direct edits, inherit attributes to prevent copy-paste logic, and establish polymorphism to write generic interfaces. Globally accepted software engineering standards (such as the SOLID principles) are built directly on top of these four pillars.",
    structuredContent: "### 2.1 Encapsulation\nEncapsulation is the practice of bundling data (attributes) and methods (behaviors) into a single logical unit called a Class, while restricting direct external access to internal states.\n\n```cpp\nclass BankAccount {\nprivate:\n    double balance; // Private attribute - hidden from external files\npublic:\n    BankAccount(double initialBalance) { balance = initialBalance; }\n    \n    void deposit(double amount) {\n        if (amount > 0) balance += amount; // Managed state validation\n    }\n    double getBalance() { return balance; } // Getter interface\n};\n```\n\n### 2.2 Abstraction\nAbstraction hides the intricate inner-workings of a class and exposes only the essential operational features through a clean API interface. This is achieved using interfaces, abstract classes, or virtual methods.\n\n### 2.3 Inheritance\nInheritance allows a new class (derived/child class) to acquire the attributes and methods of an existing class (base/parent class), eliminating redundant code declarations.\n\n```cpp\nclass Animal {\npublic:\n    void breathe() { cout << \"Breathing...\" << endl; }\n};\nclass Dog : public Animal { // Dog inherits breathe()\npublic:\n    void bark() { cout << \"Woof!\" << endl; }\n};\n```\n\n### 2.4 Polymorphism\nPolymorphism (meaning 'many forms') allows a single interface or method to behave differently depending on the context. It comes in two primary forms:\n1. **Compile-time Polymorphism**: Function overloading and operator overloading.\n2. **Run-time Polymorphism**: Method overriding using base class pointers and virtual functions.",
    simplifiedEnglish: "Imagine a **Car**:\n1. **Encapsulation**: The complex engine, battery, and fuel wires are locked under the hood (private). You can only adjust them through the steering wheel, pedals, and gear shift (public interfaces).\n2. **Abstraction**: You do not need to understand how the engine burning gasoline spins the wheels. You just press the gas pedal and go.\n3. **Inheritance**: A *Sports Car* is a subclass of a *General Car*. It inherits wheels, headlights, and brakes, so the designer does not need to reinvent those parts.\n4. **Polymorphism**: The single action of pressing the 'horn' sounds like a beep in a sedan, but a loud trumpet in a semi-truck.",
    urduExplanation: "آبجیکٹ اورینٹڈ پروگرامنگ (OOP) کے چار ستون ہیں:\n\n1. **Encapsulation (کیپسولیشن)**: ڈیٹا اور افعال کو ایک کلاس میں بند کرنا۔ ڈیٹا کو بیرونی خطرات سے بچانے کے لیے اسے `private` کیا جاتا ہے اور صرف مخصوص طریقوں سے تبدیل کیا جا سکتا ہے۔\n2. **Abstraction (تجرید)**: غیر ضروری تفصیلات کو چھپانا اور صرف ضروری خصوصیات فراہم کرنا۔ مثال کے طور پر، آپ کو گاڑی چلانے کے لیے گیئر بدلنے کی ضرورت ہے، یہ جاننے کی ضرورت نہیں کہ انجن کیسے گھوم رہا ہے۔\n3. **Inheritance (وراثت)**: پہلے سے موجود کلاس کی خصوصیات کو نئی کلاس میں منتقل کرنا، جس سے کوڈ دوبارہ لکھنے کی ضرورت نہیں پڑتی۔\n4. **Polymorphism (کثیرالشکلی)**: ایک ہی نام کے فنکشن کا مختلف صورتوں میں الگ الگ کام کرنا۔",
    stepByStep: "### Step-by-Step OOP Design Process:\n\n**Step 1: Interface Mapping**\nDefine an Abstract Base Class declaring pure virtual functions (e.g., `virtual void draw() = 0;`).\n\n**Step 2: Concrete Implementation**\nInherit from the base class and override the virtual methods in concrete subclasses (e.g., `Circle::draw()` and `Square::draw()`).\n\n**Step 3: Access Regulation**\nApply encapsulation by declaring member variables as `private` and getters/setters as `public` to assert control over variable changes.\n\n**Step 4: Late-Binding Resolution**\nAssign child objects to parent pointers (`Shape* s = new Circle();`). Call virtual methods to verify dynamic execution.",
    applications: "OOP is the foundation of modern large-scale applications:\n1. **Enterprise Systems**: Banking systems utilize encapsulation to secure transaction history and ensure balances are updated strictly through authorized methods.\n2. **GUI Frameworks**: Buttons, windows, and sliders inherit from a base `Widget` class, overriding layout behaviors dynamically.\n3. **Game Development**: Game objects (Players, Enemies, Bosses) inherit from an `Entity` base class, allowing the game loop to update them uniformly.",
    examPrep: {
      mcqs: [
        {
          question: "Which of the following is used to achieve run-time polymorphism in C++?",
          options: ["Friend Functions", "Templates", "Virtual Functions", "Constructor Overloading"],
          answer: "Virtual Functions",
          explanation: "Virtual functions allow the compiler to perform late-binding (resolving function calls at runtime depending on the actual object type, rather than the pointer type)."
        },
        {
          question: "What does encapsulation help to prevent?",
          options: ["Code execution", "Unauthorized direct modification of private variables", "Memory leaks", "Polymorphic calls"],
          answer: "Unauthorized direct modification of private variables",
          explanation: "By hiding variables behind private keywords and exposing them via getter/setter validations, encapsulation prevents external programs from corrupting internal states."
        }
      ],
      shortQuestions: [
        {
          question: "What is the difference between an Abstract Class and an Interface?",
          answer: "An abstract class can contain both implemented methods and pure virtual methods, alongside variables. An interface (represented as a pure abstract class in C++) contains ONLY pure virtual methods (declarations) and no member variables or implemented code."
        },
        {
          question: "Why do we require virtual destructors in inherited classes?",
          answer: "If a base class pointer pointing to a derived object is deleted, and the base class destructor is NOT virtual, the compiler only calls the base destructor, leaking any dynamic heap allocations defined in the child class."
        }
      ],
      longQuestion: {
        question: "Explain the Diamond Problem in Multiple Inheritance with a C++ diagram/code representation, and show how Virtual Inheritance resolves it.",
        rubric: "1. Drawing / Code outline of the Diamond Structure (5 Marks)\n2. Explaining the compilation error (ambiguity) (5 Marks)\n3. Correct use of virtual keyword during inheritance (5 Marks)\n4. Verifying solution output (5 Marks)",
        answer: "```cpp\n#include <iostream>\nusing namespace std;\n\nclass A { public: int data; };\n\n// Virtual keyword ensures single instance of A in child objects\nclass B : virtual public A {};\nclass C : virtual public A {};\n\nclass D : public B, public C {};\n\nint main() {\n    D obj;\n    obj.data = 100; // No ambiguity compiler error!\n    cout << obj.data << endl;\n    return 0;\n}\n```\n\n** Diamond Problem Analysis:**\nIf class B and C inherit from A, and D inherits from both B and C, two copies of class A are injected into class D. When referencing variables from class A, the compiler throws a 'member is ambiguous' error. Declaring inheritance as `virtual` ensures only a single instance of class A is shared."
      }
    }
  },
  "dsa-complexity": {
    title: "Chapter 1: Algorithm Complexity & Big-O Notation",
    courseCode: "CS-301",
    subjectName: "Data Structures & Algorithms",
    introduction: "Algorithm analysis is the core discipline of software engineering that gauges the efficiency of computing procedures relative to input scale. In computer science, we utilize Big-O, Big-Theta, and Big-Omega asymptotic notations to formalize lower, average, and upper mathematical limits of running times. Efficient algorithms optimize memory footprint and processor utilization, ensuring programs scale seamlessly.",
    theory: "We evaluate execution complexity under the RAM model of computation, assuming each fundamental operation (assignment, addition, indexing) takes constant 1 unit of time. The overall run-time is represented as a function $T(N)$ relative to input length $N$. globally recognized standards focus heavily on optimizing time-space tradeoffs to avoid slow processing speeds.",
    structuredContent: "### 1.1 Big-O (Worst-Case Asymptotic Bound)\nBig-O notation establishes a mathematical upper bound for $T(N)$ as $N$ grows toward infinity. We write $T(N) = O(g(N))$ if there exist positive constants $c$ and $N_0$ such that:\n\n$$T(N) \\le c \\times g(N) \\quad \\forall N \\ge N_0$$\n\n### 1.2 Comparison of Standard Complexities\n- **$O(1)$ (Constant)**: Array lookup by index, pushing/popping from stack.\n- **$O(\\log N)$ (Logarithmic)**: Binary Search, searching inside a balanced AVL Tree.\n- **$O(N)$ (Linear)**: Traversing an array, finding minimum value in an unsorted list.\n- **$O(N \\log N)$ (Linearithmic)**: Merge Sort, Quick Sort (average case), Heap Sort.\n- **$O(N^2)$ (Quadratic)**: Bubble Sort, Selection Sort, nested double loops.",
    simplifiedEnglish: "Imagine you are trying to find a word in a physical dictionary:\n- **$O(N)$ (Linear Search)**: You read the dictionary page by page, starting from the first page until you find the word. If the word is 'Zebra', it will take you thousands of pages.\n- **$O(\\log N)$ (Binary Search)**: You open the dictionary exactly in the middle. You check if your word is in the left half or the right half. You discard the other half, and repeat. You find the word in about 15 steps instead of 100,000! This is logarithmic scale.",
    urduExplanation: "کمپلیکسٹی اینالیسس (Complexity Analysis) کسی بھی الگورتھم کی کارکردگی (efficiency) کی پیمائش کرنے کا ریاضیاتی طریقہ ہے۔\n\nہم عام طور پر **Big-O** نوٹیشن کا استعمال کرتے ہیں جو یہ بتاتی ہے کہ جیسے جیسے ڈیٹا کا سائز (N) بڑھے گا، الگورتھم کا وقت کتنا بڑھے گا۔\n\n- **O(1)**: مستقل وقت (Constant Time) - جیسے ایرے میں کسی انڈیکس پر رکھی قیمت دیکھنا۔\n- **O(log N)**: لاگرتھمک وقت - جیسے بائنری سرچ (ہر قدم پر آدھا ڈیٹا ختم کرنا)۔\n- **O(N)**: لینیئر وقت (Linear Time) - جیسے پوری ایرے کو شروع سے آخر تک دیکھنا۔\n- **O(N^2)**: کواڈریٹک وقت - جیسے نیسٹڈ لوپس جو ببل سورٹ میں ہوتے ہیں۔",
    stepByStep: "### Step-by-Step Complexity Derivation:\n\n**Step 1: Identify Operations**\nReview code block and trace statement loops. Let's analyze a nested for loop:\n```cpp\nfor(int i=0; i<N; i++) {\n    for(int j=0; j<N; j++) {\n        sum += arr[i][j];\n    }\n}\n```\n\n**Step 2: Set Up Summation**\nOuter loop runs $N$ times. Inner loop runs $N$ times for each outer step. The constant operation `sum += arr[i][j]` executes:\n$$\\sum_{i=0}^{N-1} \\sum_{j=0}^{N-1} 1 = N \\times N = N^2$$\n\n**Step 3: Drop Lower Order Terms**\nIf $T(N) = 3N^2 + 5N + 12$, drop the constants ($3, 5, 12$) and lower terms ($5N$). As $N \\to \\infty$, $N^2$ dominates the growth curve.\n\n**Step 4: Express in Big-O**\n$T(N) = O(N^2)$.",
    applications: "Complexity analysis drives high-level infrastructure design:\n1. **Database Engines**: Use indexes (B+ Trees) to reduce record lookup complexities from linear $O(N)$ to logarithmic $O(\\log N)$.\n2. **Search Suggest Engines**: Rely on Tries to achieve constant-character prefixes lookup regardless of dictionary size.\n3. **Network Routing**: Employs Dijkstra's algorithm to compute shortest internet package routing paths efficiently.",
    examPrep: {
      mcqs: [
        {
          question: "What is the average-case time complexity of Quick Sort?",
          options: ["O(N)", "O(N log N)", "O(N^2)", "O(log N)"],
          answer: "O(N log N)",
          explanation: "In average partitions, Quick Sort splits arrays relatively evenly, leading to a tree depth of log N, each step scanning N items, totaling O(N log N)."
        },
        {
          question: "Which of the following functions grows the fastest as N increases?",
          options: ["N log N", "2^N", "N^2", "N!"],
          answer: "N!",
          explanation: "Factorial growth O(N!) is extremely explosive, growing significantly faster than exponential growth O(2^N) or polynomial growth."
        }
      ],
      shortQuestions: [
        {
          question: "Define the terms Time Complexity and Space Complexity.",
          answer: "Time Complexity represents the growth rate of processor execution time as a function of input size. Space Complexity represents the growth rate of auxiliary memory registers (RAM) allocated during algorithm execution."
        },
        {
          question: "What is the Time Complexity of searching an item in a sorted array using Binary Search?",
          answer: "Logarithmic time complexity O(log N), because the search space is divided in half with each comparison step."
        }
      ],
      longQuestion: {
        question: "Explain the difference between Best, Average, and Worst-case analysis of algorithms. Use the insertion sort algorithm to illustrate your explanation.",
        rubric: "1. Definition of case bounds (5 Marks)\n2. Insertion Sort mechanics explanation (5 Marks)\n3. Deriving Best case insertion complexity (5 Marks)\n4. Deriving Worst case insertion complexity (5 Marks)",
        answer: "Best-case represents the minimum possible execution step count (lower bound), Average-case is the expected performance across typical random inputs, and Worst-case represents the absolute maximum boundary (upper bound).\n\n**Insertion Sort Illustration:**\n- **Best Case:** The input array is already sorted. The algorithm simply verifies adjacent elements with no swaps. Time Complexity is $O(N)$.\n- **Worst Case:** The input array is sorted in descending order. Every item must be swapped all the way back to the start index. Time Complexity is $O(N^2)$."
      }
    }
  },
  "database-normalization": {
    title: "Chapter 3: Database Normalization & Normal Forms",
    courseCode: "CS-401",
    subjectName: "Database Systems",
    introduction: "Database normalization is a systematic, mathematical process of structuring relational database tables to prevent duplicate records, minimize redundancies, and eliminate data modification anomalies (insertion, deletion, and update anomalies). Normalization decomposes large, bloated tables into smaller, cohesive relations tied by primary-foreign key structures.",
    theory: "Formulated by Edgar F. Codd, normalization uses Functional Dependencies (FDs) to align relations into progressive 'Normal Forms' (1NF, 2NF, 3NF, BCNF). If database states violate these forms, redundant records will inflate storage costs, and simple edits can inadvertently corrupt transactional records.",
    structuredContent: "### 3.1 Insertion, Update, and Deletion Anomalies\n- **Insertion Anomaly**: Inability to insert a fact because another unrelated fact is missing.\n- **Deletion Anomaly**: Deleting a fact accidentally deletes a separate, important fact.\n- **Update Anomaly**: Updating a single duplicated attribute requires updating multiple rows, risking inconsistent states.\n\n### 3.2 Progressive Normal Forms\n\n```\n+-----------------------------------------------------------+\n| Unnormalized Table -> Split Multi-valued attributes (1NF)  |\n+-----------------------------------------------------------+\n                            | \n+-----------------------------------------------------------+\n| 1NF -> Remove Partial Functional Dependencies (2NF)      |\n+-----------------------------------------------------------+\n                            | \n+-----------------------------------------------------------+\n| 2NF -> Remove Transitive Functional Dependencies (3NF)     |\n+-----------------------------------------------------------+\n                            | \n+-----------------------------------------------------------+\n| 3NF -> If (X -> Y), X must be a superkey (BCNF)           |\n+-----------------------------------------------------------+\n```\n\n### 3.3 Normalization Mathematical Definitions\n- **1st Normal Form (1NF)**: Every cell contains only atomic (single) values. No repeating groups.\n- **2nd Normal Form (2NF)**: Relations must be in 1NF, and all non-prime attributes must be **fully functionally dependent** on the primary key (no partial dependencies: $X \\to Y$ where $X$ is a subset of candidate key).\n- **3rd Normal Form (3NF)**: Must be in 2NF, and no transitive dependencies are allowed (if $A \\to B$ and $B \\to C$, then $A \\to C$ cannot exist unless $B$ is a superkey).\n- **Boyce-Codd Normal Form (BCNF)**: For every non-trivial functional dependency $X \\to Y$, $X$ must be a superkey of the relation.",
    simplifiedEnglish: "Think of a spreadsheet where we store university courses. If we write down student details (ID, Name, Phone) and course details (Code, Professor, Room) in one single row, every time a student takes multiple courses, we copy-paste their name and phone number! This is dangerous.\n- If the student changes their phone number, we must update 10 different rows (Update Anomaly).\n- If the only student taking 'History 101' drops out, deleting their row deletes the History course entirely from our system (Deletion Anomaly).\n\nNormalization is simply splitting this giant, messy table into two clean, separate notebooks: **Students Notebook** (each student listed once) and **Courses Notebook** (each course listed once), then linking them using student IDs.",
    urduExplanation: "ڈیٹا بیس نارملائزیشن (Normalization) ڈیٹا بیس کی میزوں (tables) کو اس طرح ترتیب دینے کا عمل ہے تاکہ ڈیٹا بار بار دہرایا نہ جائے اور تبدیلیاں کرنے میں غلطیاں نہ ہوں۔\n\nاس کے چار اہم مراحل درج ذیل ہیں:\n\n1. **پہلا مرحلہ (1NF)**: ہر خانے (cell) میں صرف ایک ہی قیمت ہونی چاہیے۔ کوئی بھی کالم ایک سے زیادہ ویلیوز نہیں رکھ سکتا۔\n2. **دوسرا مرحلہ (2NF)**: ٹیبل 1NF میں ہو اور کوئی بھی جزوی انحصار (partial dependency) نہ ہو۔ یعنی تمام کالمز مکمل طور پر پرائمری کی (Primary Key) پر منحصر ہوں۔\n3. **تیسرا مرحلہ (3NF)**: ٹیبل 2NF میں ہو اور کوئی عبوری انحصار (transitive dependency) نہ ہو۔ یعنی اگر کالم A پر کالم B منحصر ہے، اور B پر C، تو C کو براہ راست A پر منحصر نہیں ہونا چاہیے (ہم انہیں علیحدہ ٹیبلز میں تقسیم کر دیتے ہیں)۔\n4. **BCNF**: یہ 3NF کی ایک سخت قسم ہے جس میں ہر فعال انحصار $X \\to Y$ کے لیے، X کا سپر کی ہونا لازمی ہے۔",
    stepByStep: "### Step-by-Step Normalization Example:\n\n**Step 1: Inspect Unnormalized Data**\nConsider a relation `STUDENT_COURSES(StudentID, StudentName, CourseCode, CourseRoom, Grade)`.\nKey candidate is `(StudentID, CourseCode)`.\n\n**Step 2: Identify Functional Dependencies**\n- `StudentID -> StudentName` (Partial Dependency: depends on part of key).\n- `CourseCode -> CourseRoom` (Partial Dependency).\n- `(StudentID, CourseCode) -> Grade` (Full Dependency).\n\n**Step 3: Apply 2NF Decompositions**\nSplit partial dependencies into new tables:\n- `STUDENT(StudentID, StudentName)`\n- `COURSE(CourseCode, CourseRoom)`\n- `ENROLLMENT(StudentID, CourseCode, Grade)`\n\n**Step 4: Verify 3NF and BCNF Compliance**\nNo transitive dependencies remain. All determinants in FDs are candidate keys. Normalization complete.",
    applications: "Normalization is applied globally in corporate database architectures:\n1. **Financial Ledgers**: Ensure every transaction row is absolute, preventing anomalies during balance updates.\n2. **E-Commerce Systems**: Separate customer records, catalogs, orders, and shipment tracking info to keep table locks lightweight and secure.\n3. **Hospital Portals**: Prevent patient records from being lost when an individual doctor's contract terminates.",
    examPrep: {
      mcqs: [
        {
          question: "When does a partial dependency occur?",
          options: [
            "When a prime attribute depends on a non-prime attribute",
            "When a non-prime attribute depends on only a part of a composite candidate key",
            "When a candidate key is empty",
            "When a non-prime attribute depends on another non-prime attribute"
          ],
          answer: "When a non-prime attribute depends on only a part of a composite candidate key",
          explanation: "Partial dependency occurs when a non-prime attribute is dependent on a proper subset of a composite candidate key, which violates 2nd Normal Form."
        },
        {
          question: "A table is in 3NF but violates BCNF if:",
          options: [
            "It has a transitive dependency",
            "It contains multi-valued attributes",
            "A functional dependency X -> Y exists where X is NOT a superkey",
            "It does not have a primary key"
          ],
          answer: "A functional dependency X -> Y exists where X is NOT a superkey",
          explanation: "BCNF has a single rule: for any non-trivial dependency X -> Y, X must be a superkey. 3NF allows X -> Y if Y is a prime attribute, which BCNF strictly forbids."
        }
      ],
      shortQuestions: [
        {
          question: "What is a Transitive Functional Dependency?",
          answer: "Transitive functional dependency is an indirect relationship between columns in the same table where a non-prime attribute determines another non-prime attribute ($A \\to B$ and $B \\to C$, so $A \\to C$ is transitive)."
        },
        {
          question: "Why would we sometimes choose to De-normalize a database?",
          answer: "Denormalization is used in Read-Heavy Data Warehouses or analytics systems to intentionally inject redundancy. This avoids expensive table join operations and increases query read performance."
        }
      ],
      longQuestion: {
        question: "Normalize the following relation to 3rd Normal Form: EMP_DEPT(EmpID, EmpName, Salary, DeptID, DeptName, DeptManager). The functional dependencies are: EmpID -> EmpName, Salary, DeptID; and DeptID -> DeptName, DeptManager.",
        rubric: "1. Analysis of existing Normal Form state (5 Marks)\n2. Explaining the Transitive Dependency (5 Marks)\n3. Correct 2NF/3NF decomposing step (5 Marks)\n4. Defining Primary/Foreign key links (5 Marks)",
        answer: "The candidate key is `EmpID`.\n- `EmpID -> DeptID` is a functional dependency.\n- `DeptID -> DeptName, DeptManager` is also a functional dependency.\n- This means `EmpID -> DeptName, DeptManager` is a transitive dependency through `DeptID` which violates 3NF.\n\n**3NF Decompositions:**\nWe split the relation into two tables:\n1. `EMPLOYEE(EmpID, EmpName, Salary, DeptID)` - primary key `EmpID`, foreign key `DeptID`.\n2. `DEPARTMENT(DeptID, DeptName, DeptManager)` - primary key `DeptID`.\nBoth tables are now in 3NF as all transitive dependencies have been removed."
      }
    }
  },
  "operating-systems-scheduling": {
    title: "Chapter 2: CPU Scheduling Algorithms",
    courseCode: "CS-402",
    subjectName: "Operating Systems",
    introduction: "CPU scheduling is the core process that decides which threads or processes in the ready queue are allocated processor execution time. In multi-tasking operating systems, schedulers maximize CPU utilization, optimize throughput, minimize latency, and guarantee fair resource allocation among computing tasks.",
    theory: "We evaluate scheduling algorithms using standard OS performance metrics: Turnaround Time, Waiting Time, Response Time, and CPU Utilization. Standard schedules can be Preemptive (allowing processes to be interrupted mid-execution) or Non-preemptive (running until task yield or completion).",
    structuredContent: "### 2.1 Scheduling Metrics Definitions\n- **Burst Time**: CPU execution time required by a process.\n- **Arrival Time**: The physical time stamp when a process enters the ready queue.\n- **Waiting Time**: Total time spent waiting in the ready queue:\n  $$\\text{Waiting Time} = \\text{Turnaround Time} - \\text{Burst Time}$$\n- **Turnaround Time**: Total elapsed time from process arrival to execution completion:\n  $$\\text{Turnaround Time} = \\text{Completion Time} - \\text{Arrival Time}$$\n\n### 2.2 Core Algorithms\n1. **First-Come, First-Served (FCFS)**: Non-preemptive scheduling where the process that requests the CPU first gets it first.\n2. **Shortest Job First (SJF)**: Optimizes average waiting times by choosing the task with the smallest CPU burst time.\n3. **Round Robin (RR)**: Preemptive scheduling designed for timesharing. Each process is allocated a small, contiguous slice of CPU execution time called a **Time Quantum**.",
    simplifiedEnglish: "Imagine a checkout counter at a supermarket:\n- **FCFS**: People form a single queue and check out in order of arrival. If a customer with a massive cart is at the front, everyone behind them must wait a very long time (this is called the Convoy Effect).\n- **SJF**: The cashier asks who has the fewest items and checks them out first. This is super efficient for getting people out quickly, but the person with the huge cart might starve and wait forever.\n- **Round Robin**: The cashier spends exactly 1 minute scanning items for each customer, then moves them to the back of the queue and serves the next person for 1 minute. It is extremely fair and keeps everyone moving.",
    urduExplanation: "سی پی یو شیڈولنگ (CPU Scheduling) وہ عمل ہے جس کے ذریعے آپریٹنگ سسٹم فیصلہ کرتا ہے کہ کون سا پروسیس کب اور کتنی دیر کے لیے سی پی یو استعمال کرے گا۔\n\nاس کے اہم ترین الگورتھمز یہ ہیں:\n\n1. **FCFS (First Come First Served)**: جو پہلے آئے گا، وہ پہلے پائے گا۔ یہ بہت سادہ ہے لیکن اگر بڑا پروسیس شروع میں آ جائے تو سب کو انتظار کرنا پڑتا ہے۔\n2. **SJF (Shortest Job First)**: جس پروسیس کا کام سب سے چھوٹا ہو، اسے پہلے چلایا جاتا ہے۔ یہ اوسط انتظار کا وقت (Average Waiting Time) کم کرتا ہے۔\n3. **Round Robin (RR)**: ہر پروسیس کو ایک مخصوص وقت دیا جاتا ہے جسے 'Time Quantum' کہتے ہیں۔ وقت ختم ہونے پر پروسیس پیچھے چلا جاتا ہے اور اگلے پروسیس کی باری آتی ہے۔",
    stepByStep: "### Step-by-Step Round Robin Execution Trace:\n\n**Step 1: Set Parameters**\nProcesses $P_1$ (BT=10), $P_2$ (BT=4), $P_3$ (BT=5). Time Quantum $Q = 3$.\n\n**Step 2: Time [0-3]**\n$P_1$ executes for 3 units, remaining BT = 7. Ready queue contains $[P_2, P_3, P_1]$.\n\n**Step 3: Time [3-6]**\n$P_2$ executes for 3 units, remaining BT = 1. Ready queue contains $[P_3, P_1, P_2]$.\n\n**Step 4: Time [6-9]**\n$P_3$ executes for 3 units, remaining BT = 2. Ready queue contains $[P_1, P_2, P_3]$. Iterate until all burst times reach zero.",
    applications: "CPU scheduling manages real-time responsive interfaces:\n1. **Cloud Orchestrators**: Schedule virtual containers dynamically across clustered servers to balance high request volumes.\n2. **Smartphones**: Preemptively deprioritize background downloads when user opens high-performance games, ensuring zero lag.\n3. **Industrial Robots**: Rely on Hard Real-Time schedulers where execution deadlines are absolute to prevent system failures.",
    examPrep: {
      mcqs: [
        {
          question: "Which of the following scheduling algorithms can lead to process starvation?",
          options: ["First-Come, First-Served", "Round Robin", "Shortest Job First", "All of the above"],
          answer: "Shortest Job First",
          explanation: "In SJF, if small processes continuously arrive, a process with a large CPU burst time will remain at the bottom of the queue and 'starve' for CPU allocation."
        },
        {
          question: "What is the Convoy Effect in CPU scheduling?",
          options: [
            "Small processes blocked behind a single giant process in FCFS",
            "A deadlock state",
            "Paging failures",
            "Round Robin scheduling queues swapping"
          ],
          answer: "Small processes blocked behind a single giant process in FCFS",
          explanation: "The Convoy Effect occurs when several short processes wait for one long process to release the CPU, inflating average waiting times under FCFS."
        }
      ],
      shortQuestions: [
        {
          question: "Explain the difference between Preemptive and Non-preemptive scheduling.",
          answer: "In preemptive scheduling, the OS can interrupt a running process and reclaim the CPU to assign it to another task. In non-preemptive scheduling, a process retains control of the CPU until it voluntarily terminates or blocks for I/O."
        },
        {
          question: "What is the role of the Dispatcher in Operating Systems?",
          answer: "The dispatcher is the module that actually gives control of the CPU to the process selected by the short-term scheduler. It performs context-switching and jumps to the execution code instruction."
        }
      ],
      longQuestion: {
        question: "Calculate the average waiting time and turnaround time using Non-preemptive Shortest Job First (SJF) for the following processes: P1 (Arrival=0, Burst=8), P2 (Arrival=1, Burst=4), P3 (Arrival=2, Burst=9), P4 (Arrival=3, Burst=5). Draw the Gantt chart.",
        rubric: "1. Correct Gantt Chart drawing (5 Marks)\n2. Accurate calculation of Completion Times (5 Marks)\n3. Correct calculation of Turnaround Times (5 Marks)\n4. Accurate calculation of Waiting Times (5 Marks)",
        answer: "**Gantt Chart Sequence:**\n- At $t=0$, only $P_1$ is present. $P_1$ runs until completion at $t=8$.\n- At $t=8$, $P_2, P_3, P_4$ have all arrived. Schedulers chooses the shortest: $P_2$ (BT=4), which runs until $t=12$.\n- Schedulers chooses $P_4$ (BT=5), running to $t=17$.\n- Schedulers chooses $P_3$ (BT=9), running to $t=26$.\n\n**Metrics Matrix:**\n- **P1**: Completion=8, Turnaround=8, Waiting=0\n- **P2**: Completion=12, Turnaround=11, Waiting=7\n- **P4**: Completion=17, Turnaround=14, Waiting=9\n- **P3**: Completion=26, Turnaround=24, Waiting=15\n\n- **Average Turnaround Time:** $(8+11+24+14)/4 = 14.25$ units.\n- **Average Waiting Time:** $(0+7+15+9)/4 = 7.75$ units."
      }
    }
  },
  "fyp-milestones": {
    title: "Capstone Milestone Guide: Idea to Final Presentation",
    courseCode: "CS-801",
    subjectName: "Final Year Project Guide",
    introduction: "The Final Year Project (FYP) represents the peak of a student's undergraduate BSCS degree. It is a comprehensive, year-long double-semester project where students solve complex real-world software engineering or research challenges, developing high-quality, production-ready full-stack architectures or mathematical AI frameworks.",
    theory: "An FYP is divided into key academic gates and deliverables that map directly to industry agile sprint frameworks. Standard deliverables include the Project Proposal, Software Requirements Specification (SRS), Architectural Design Document (ADD), Mid-Year Prototype, Final Implementation, Testing Assessment, and the Academic Thesis.",
    structuredContent: "### 4.1 Semester 1 Milestones (Core Engineering)\n1. **Formulating the Idea**: Researching high-demand domains (e.g. distributed computing, AI agents, secure cloud architectures) and locking in a supervisor.\n2. **The Proposal Presentation**: Defending problem statements, project scopes, expected solutions, and milestones mapped on Gantt charts.\n3. **SRS Document (Software Requirements Specification)**: Authoring functional/non-functional constraints, user personas, use-case models, and entity diagrams.\n4. **ADD Document (Architectural Design)**: Specifying database schemas, API routes, system sequence blueprints, and cloud hosting diagrams.\n\n### 4.2 Semester 2 Milestones (Development and Deployment)\n1. **Alpha Prototype**: Coding core APIs, database bindings, and layout views.\n2. **Beta Testing**: Running user tests, unit tests, and optimizing load capacities.\n3. **Academic Thesis**: Writing a 5-chapter thesis detailing Literature Review, System Methodology, Analysis, and Conclusions.",
    simplifiedEnglish: "Think of your Final Year Project (FYP) as building a real house:\n1. **Semester 1**: You write a blueprint (Proposal), consult the future owners on how many bedrooms they need (SRS), and design the structural piping and electricity lines (Architecture).\n2. **Semester 2**: You lay down bricks, pour concrete, build the actual walls (Development), test if the roof leaks (Testing), and finally hand over the keys and write down a guide on how to maintain the house (Thesis).",
    urduExplanation: "فائنل ایئر پروجیکٹ (FYP) بی ایس سی ایس کا سب سے اہم مرحلہ ہے۔ یہ دو سمسٹرز پر محیط ہوتا ہے:\n\n**سمسٹر 1 (منصوبہ بندی اور ڈیزائن)**:\n1. **پروپوزل (Proposal)**: اپنے آئیڈیا کا دفاع کرنا کہ یہ مسئلہ کیوں اہم ہے اور آپ اسے کیسے حل کریں گے۔\n2. **SRS دستاویز**: سسٹم کی تمام ضروریات، یوزر کیسز (Use Cases) اور ڈیٹا بیس کے خاکے تیار کرنا۔\n\n**سمسٹر 2 (کوڈنگ اور تھیسس)**:\n1. **کوڈنگ اور ڈویلپمنٹ**: اصل سافٹ ویئر بنانا، ڈیٹا بیس جوڑنا، اور یوزر انٹرفیس کو چالو کرنا۔\n2. **ٹیسٹنگ اور تھیسس (Thesis)**: پروجیکٹ کے نتائج پر مبنی 5 ابواب کا تھیسس لکھنا اور فائنل پینل کے سامنے پریزنٹیشن دینا۔",
    stepByStep: "### Step-by-Step Capstone Milestone Progression:\n\n**Month 1-2: Problem Statement Defense**\nResearch existing scientific papers, formulate a unique engineering solution, find a supervisor, and defend the Project Proposal.\n\n**Month 3-4: System Requirements & Architecture**\nDraft the complete Software Requirements Specification (SRS) detailing state diagrams, entity relational designs, and sequence patterns.\n\n**Month 5-8: Sprint Development & Assembly**\nSet up codebase repositories, initialize database pipelines, write backend logic and client interfaces incrementally.\n\n**Month 9-10: Quality Verification & Thesis Writing**\nPerform load testing, unit testing, and draft the formal academic thesis for peer review defense.",
    applications: "An FYP prepares computer science graduates for several professional sectors:\n1. **Enterprise Engineering**: Teaches graduates to coordinate clean code repositories, write full-stack automated tests, and handle production database deployments.\n2. **Scientific Research**: Prepares students for Master's or Ph.D. degrees by teaching literature reviews, formal math structures, and academic writing.\n3. **Product Founders**: Accelerates startup creation by validating real-world SaaS prototypes with industry mentors.",
    examPrep: {
      mcqs: [
        {
          question: "Which diagram is central to outlining functional system interactions in an SRS document?",
          options: ["Class Diagram", "Use Case Diagram", "Deployment Diagram", "Entity Relationship Diagram"],
          answer: "Use Case Diagram",
          explanation: "The Use Case Diagram defines interactions between external actors and the system's core functional use cases, making it the primary visualization of requirements."
        },
        {
          question: "What is the purpose of the Gantt chart in an FYP proposal?",
          options: ["Database modeling", "Project timeline scheduling and task tracking", "Network packet testing", "Exception handling"],
          answer: "Project timeline scheduling and task tracking",
          explanation: "Gantt charts visually model project task schedules, dependencies, and milestones, displaying timelines across months of development."
        }
      ],
      shortQuestions: [
        {
          question: "What is the difference between Functional and Non-Functional Requirements?",
          answer: "Functional Requirements specify WHAT the system must do (e.g., 'User can login', 'System generates receipt'). Non-Functional Requirements specify HOW the system should perform under conditions (e.g., 'Page loads within 2 seconds', 'Database encrypts client details with AES-256')."
        },
        {
          question: "State the standard structure of a 5-chapter BSCS thesis.",
          answer: "Chapter 1: Introduction; Chapter 2: Literature Review/Related Work; Chapter 3: Proposed Methodology & System Architecture; Chapter 4: Results, Testing, & Analysis; Chapter 5: Conclusion & Future Work."
        }
      ],
      longQuestion: {
        question: "Draft a sample Software Requirements Specification (SRS) template containing the essential sections required by academic review boards for an AI-powered E-Learning platform.",
        rubric: "1. Inclusion of standard system overview and scopes (5 Marks)\n2. Correct declaration of Functional Requirements (5 Marks)\n3. Correct list of Non-Functional criteria (Performance, Security) (5 Marks)\n4. Outline of Actor roles (Student, Instructor, Admin) (5 Marks)",
        answer: "**1. Scope and Objective:**\nThe platform leverages LLMs to provide real-time tutoring feedback, automatically translating complex engineering concepts into local languages and assessing quiz questions.\n\n**2. Functional Requirements (FRs):**\n- **FR-1**: User Registration & Auth (OAuth / Student Credentials).\n- **FR-2**: Content Delivery (Read textbook, stream lectures).\n- **FR-3**: AI Integration (Chat assistance, textbook page translation, dynamic quiz evaluation).\n- **FR-4**: Instructor Workspace (Upload syllabi, view classroom performance metrics).\n\n**3. Non-Functional Requirements (NFRs):**\n- **NFR-1**: Security (SSL encryption on all database write routes, authentication tokens).\n- **NFR-2**: Scalability (Support up to 10,000 concurrent page loads).\n- **NFR-3**: Usability (Intuitive navigation matching WCAG 2.1 AAA standards)."
      }
    }
  }
};

export function getFallbackContent(subjectId: string, chapterId?: string, topicName?: string): TextbookContent {
  // Let's map subject + chapter/topic to our high quality fallback resources
  let key = "";
  if (subjectId === "programming-fundamentals" || topicName?.toLowerCase().includes("pointer") || chapterId?.includes("pf-ch")) {
    key = "programming-fundamentals-pointers";
  } else if (subjectId === "oop" || topicName?.toLowerCase().includes("object") || chapterId?.includes("oop-ch") || topicName?.toLowerCase().includes("pillar")) {
    key = "oop-pillars";
  } else if (subjectId === "dsa" || topicName?.toLowerCase().includes("complexity") || chapterId?.includes("dsa-ch") || topicName?.toLowerCase().includes("big-o")) {
    key = "dsa-complexity";
  } else if (subjectId === "database-systems" || topicName?.toLowerCase().includes("normalization") || chapterId?.includes("db-ch") || topicName?.toLowerCase().includes("sql")) {
    key = "database-normalization";
  } else if (subjectId === "operating-systems" || topicName?.toLowerCase().includes("scheduling") || chapterId?.includes("os-ch") || topicName?.toLowerCase().includes("process")) {
    key = "operating-systems-scheduling";
  } else if (subjectId === "fyp-guide" || topicName?.toLowerCase().includes("milestone") || chapterId?.includes("fyp-ch") || topicName?.toLowerCase().includes("srs")) {
    key = "fyp-milestones";
  } else {
    // Default dynamic mock generator based on any subject
    const titleClean = topicName || (chapterId ? `Chapter Notes for ${chapterId}` : "University Textbook Guide");
    const subjName = subjectId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return {
      title: titleClean,
      courseCode: "CS-TEMP",
      subjectName: subjName,
      introduction: `This comprehensive academic guide covers the core structures of ${titleClean} as prescribed in global university CS standards. This module introduces the theoretical foundations, structural subdivisions, and software engineering methodologies that represent key knowledge areas.`,
      theory: `Under internationally recognized CS standards (ACM/IEEE standards), ${titleClean} forms an essential part of the computer science syllabus. The theoretical bounds describe how computing machines parse, analyze, and execute this specific system component, bridging computational complexity with architectural capabilities.`,
      structuredContent: `### 1.1 Fundamental Principles of ${titleClean}\nTo implement robust, high-performance systems, we must analyze the data pipelines and execution cycles of ${titleClean}. Every module contains state declarations, algorithm protocols, and functional evaluations.\n\n### 1.2 Mathematical Foundations\nThe mathematical limits are evaluated using recurrence relations and probability models. We express the algorithmic upper-bound as:\n\n$$T(N) = \\sum_{i=1}^{N} f(i) + O(1)$$\n\n### 1.3 Complete Implementation Code\nBelow is a production-ready system block representing this topic's implementation pattern:\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\n// Academic implementation class\ntemplate <typename T>\nclass AcademicSystem {\nprivate:\n    T state;\npublic:\n    AcademicSystem(T initial) : state(initial) {}\n    T getState() { return state; }\n    void process() {\n        cout << \"Executing academic computational pipeline...\" << endl;\n    }\n};\n\nint main() {\n    AcademicSystem<string> app(\"Active Academic Content\");\n    app.process();\n    return 0;\n}\n\`\`\``,
      simplifiedEnglish: `Think of this topic like a highly organized library system. Instead of throwing all books in a giant pile, we categorize them into shelves, rows, and call-numbers. This ensures that when a reader searches for a topic, they can navigate straight to the exact location without scanning the entire library. This is the core purpose of this computer science concept.`,
      urduExplanation: `یہ مضمون کمپیوٹر سائنس کے بنیادی نصاب کا اہم حصہ ہے۔\n\nاس تصور کو سمجھنے کے لیے آپ لائبریری کی مثال لے سکتے ہیں جہاں کتابوں کو ڈھیر کی شکل میں پھینکنے کی بجائے ترتیب سے رکھا جاتا ہے۔ اس طرح جب بھی کسی کتاب کی ضرورت ہو، اسے سیکنڈوں میں تلاش کیا جا سکتا ہے۔ کمپیوٹر سائنس میں اس طریقے کو ڈیٹا آرگنائزیشن یا سسٹم شیڈولنگ کہتے ہیں تاکہ کارکردگی کو تیز ترین بنایا جا سکے۔`,
      stepByStep: `### Step-by-Step System Walkthrough:\n\n**Step 1: Initialization**\nDeclare active system states and allocate the required storage blocks in computer memory.\n\n**Step 2: Parsing**\nAnalyze input tokens or variables, verifying syntax structures and processing permissions.\n\n**Step 3: Algorithm Execution**\nRun the primary computational steps, solving loops, logic gates, or mathematical derivations.\n\n**Step 4: Output Generation**\nCommit changes to the database or storage device, deallocating temporary registers.`,
      applications: `This topic is utilized in key software industry pipelines:\n1. **Cloud Computing**: Orchestrating task clusters and balancing network requests.\n2. **Database Architectures**: Designing efficient B-Tree record routing and indexes.\n3. **Artificial Intelligence**: Structuring deep learning network pipelines and parsing inputs.`,
      examPrep: {
        mcqs: [
          {
            question: `Which of the following describes the primary objective of ${titleClean}?`,
            options: ["Optimizing program execution efficiency", "Compiling code to assembly", "Handling exception errors", "Shorter file size"],
            answer: "Optimizing program execution efficiency",
            explanation: "The core goal of computer science theories and subjects is to systematically structure data and scheduling to achieve maximum processing speeds."
          },
          {
            question: "Under standard academic evaluation, which asymptotic notation specifies the upper-bound runtime?",
            options: ["Big-Omega", "Big-Theta", "Big-O", "Little-o"],
            answer: "Big-O",
            explanation: "Big-O notation is mathematically defined to represent the asymptotic upper bound (worst-case scenario) of algorithm execution."
          }
        ],
        shortQuestions: [
          {
            question: `What are the core components of ${titleClean}?`,
            answer: "The core components include state variables (data structures), algorithmic methods (procedures), boundary conditions (validations), and structural outputs (results)."
          },
          {
            question: "Why is space-time tradeoff critical in algorithm design?",
            answer: "Often, reducing execution time requires allocating more memory caches, and minimizing memory usage requires more computing loops. Software engineers must optimize this balance depending on physical hardware limits."
          }
        ],
        longQuestion: {
          question: `Draft a complete architectural proposal explaining the role of ${titleClean} in modern cloud infrastructure.`,
          rubric: "1. Problem formulation (5 Marks)\n2. System design proposal (5 Marks)\n3. Correct diagram description (5 Marks)\n4. Security and performance criteria (5 Marks)",
          answer: "Modern cloud systems manage massive distributed requests. By organizing data pipelines using this topic's guidelines, we establish microservice isolation, preventing cascading failures.\n\n**System Design Sequence:**\n- **Client Gateway**: Authenticates incoming requests.\n- **Task Broker**: Evaluates resource demands and enqueues requests.\n- **Worker Cluster**: Processes logic in parallel threads.\n- **Storage Core**: Commits verified data securely."
        }
      }
    };
  }
  return fallbackTextbooks[key];
}
