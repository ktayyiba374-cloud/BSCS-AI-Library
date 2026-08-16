import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI client successfully initialized server-side.");
  } else {
    console.warn("GEMINI_API_KEY env variable is missing or placeholder. Running AI Assistant in local fallback mode.");
  }

  // API Routes
  app.post("/api/chat", async (req: any, res: any) => {
    const { message, history, subjectContext, language } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not defined
      const mockResponse = getMockResponse(message, language || 'en', subjectContext);
      return res.json({ text: mockResponse });
    }

    try {
      // Format history into the style expected by Gemini SDK
      // Each history item should be mapped to the expected role ('user' or 'model')
      const formattedHistory: any[] = [];
      
      if (history && history.length > 0) {
        // Keep last 6 exchanges to prevent flooding the prompt token limit
        const contextHistory = history.slice(-10);
        for (const msg of contextHistory) {
          formattedHistory.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }

      // Add the current user query
      formattedHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const sysInstruction = `You are "BScs AI Library Assistant", an expert AI academic companion designed for BS Computer Science students.
Your knowledge base matches the curriculum of this application, which covers Semesters 1 to 8 including subjects like Programming Fundamentals, Object Oriented Programming (OOP), Data Structures & Algorithms (DSA), Database Systems (SQL), Computer Organization & Assembly, Probability & Statistics, Operating Systems, Software Engineering, Computer Networks, Theory of Automata, Web Development, Artificial Intelligence, Mobile App Development, Information Security, and the Final Year Project (FYP) Capstone Guide.
You have access to the chapter-wise notes, assignments, books list, past papers (including EMTS paper guidelines), and important questions.

Core instructions:
1. Answer clearly, accurately, and at a university academic level.
2. If the user asks you to explain in Urdu, or queries in Urdu (including Roman Urdu/Hinglish like "samjha do"), respond in native Urdu script, but write key technical terms in English so they are easy to understand.
3. Help students understand complex concepts, solve homework equations/programming bugs (with well-commented code blocks in C, C++, SQL, JS, etc.), and suggest reading resources.
4. Keep the tone friendly, helpful, encouraging, and highly competent.
5. If subject context is provided (${subjectContext ? `Subject Context: ${subjectContext}` : "None"}), specialize your explanation specifically for that subject's syllabus.
6. If asked about the syllabus of BScs or subjects, direct them to explore the 'Subjects' section of the library.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: sysInstruction,
        }
      });

      res.json({ text: response.text || "I processed your request, but did not receive a text response from the model." });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "AI Assistant failed to generate a response: " + error.message });
    }
  });

  // Textbook Generator API
  app.post("/api/generate-textbook", async (req: any, res: any) => {
    const { subjectId, chapterId, bookId, topicName, subjectName, courseCode } = req.body;

    if (!ai) {
      return res.status(200).json({ useFallback: true, message: "AI client not initialized, using local fallback" });
    }

    try {
      const prompt = `You are a Senior Computer Science Professor. Generate a comprehensive, university-level, structured textbook chapter for BSCS.
Subject: "${subjectName}" (Course Code: "${courseCode}").
Topic/Chapter specified: "${topicName || chapterId}".
Generate detailed explanation, theory, and study guides matching the 2026 worldwide ACM/IEEE CS standards.

You must reply with a valid JSON matching the schema. Ensure all fields are richly populated (no placeholders, generate complete educational contents).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subjectName: { type: Type.STRING },
              courseCode: { type: Type.STRING },
              introduction: { type: Type.STRING },
              theory: { type: Type.STRING },
              structuredContent: { type: Type.STRING },
              simplifiedEnglish: { type: Type.STRING },
              urduExplanation: { type: Type.STRING },
              stepByStep: { type: Type.STRING },
              applications: { type: Type.STRING },
              examPrep: {
                type: Type.OBJECT,
                properties: {
                  mcqs: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        question: { type: Type.STRING },
                        options: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        answer: { type: Type.STRING },
                        explanation: { type: Type.STRING }
                      },
                      required: ["question", "options", "answer", "explanation"]
                    }
                  },
                  shortQuestions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        question: { type: Type.STRING },
                        answer: { type: Type.STRING }
                      },
                      required: ["question", "answer"]
                    }
                  },
                  longQuestion: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      rubric: { type: Type.STRING },
                      answer: { type: Type.STRING }
                    },
                    required: ["question", "rubric", "answer"]
                  }
                },
                required: ["mcqs", "shortQuestions", "longQuestion"]
              }
            },
            required: [
              "title", "subjectName", "courseCode", "introduction", "theory",
              "structuredContent", "simplifiedEnglish", "urduExplanation",
              "stepByStep", "applications", "examPrep"
            ]
          }
        }
      });

      const responseText = response.text || "{}";
      const textbookData = JSON.parse(responseText.trim());
      res.json({ textbook: textbookData });
    } catch (error: any) {
      console.error("Textbook Generator API Error:", error);
      res.status(500).json({ error: "Failed to generate dynamic textbook: " + error.message });
    }
  });

  // Mock responses for offline development / if API key is missing
  function getMockResponse(msg: string, lang: string, context?: string): string {
    const isUrdu = lang === 'ur' || msg.toLowerCase().includes('urdu') || msg.toLowerCase().includes('samjhao') || msg.toLowerCase().includes('urdu main');
    const cleanMsg = msg.toLowerCase();
    
    if (isUrdu) {
      if (cleanMsg.includes('oop') || cleanMsg.includes('object')) {
        return `سلام! میں BScs AI لائبریری اسسٹنٹ ہوں۔\n\n**Object Oriented Programming (OOP)** ایک پروگرامنگ پیراڈائم ہے جو 'Objects' (اشیاء) کے تصور پر مبنی ہے۔\n\nاس کے چار اہم ستون (Four Pillars) ہیں:\n1. **Encapsulation (کیپسولیشن)**: ڈیٹا اور افعال (functions) کو ایک ہی کلاس میں لپیٹنا اور بیرونی دنیا سے چھپانا۔\n2. **Inheritance (وراثت)**: ایک نئی کلاس کا پرانی کلاس کی خصوصیات حاصل کرنا۔\n3. **Polymorphism (کثیرالشکلی)**: ایک ہی فنکشن کا مختلف طریقوں سے برتاؤ کرنا۔\n4. **Abstraction (تجرید)**: غیر ضروری تفصیلات کو چھپا کر صرف اہم معلومات دکھانا۔\n\n*(نوٹ: یہ ایک نمونہ جواب ہے کیونکہ سرور پر Gemini API کی کلید ترتیب نہیں دی گئی ہے)*`;
      }
      return `سلام! میں BScs AI لائبریری اسسٹنٹ ہوں۔ فی الحال سرور پر Gemini API کی چابی (Key) ترتیب نہیں دی گئی ہے، لیکن میں آپ کے تعلیمی سوالات کا جواب دینے کے لیے تیار ہوں۔ آپ کا سوال یہ ہے: "${msg}"${context ? ` (موضوع: ${context})` : ""}. اصلی جوابات کے لیے، براہ کرم Secrets پینل میں اپنی Gemini API Key داخل کریں۔`;
    }

    // English programming / subject mocks
    if (cleanMsg.includes('oop') || cleanMsg.includes('object-oriented')) {
      return `Hello! I am the BScs AI Library Assistant. Here is an overview of **Object-Oriented Programming (OOP)**:\n\nOOP is a programming paradigm based on the concept of 'Objects', which contain data (attributes) and code (methods).\n\n### The 4 Pillars of OOP:\n1. **Encapsulation**: Bundling data and functions inside a Class, restricting direct external access.\n2. **Inheritance**: Creating child classes that inherit attributes/methods from a parent class, promoting code reuse.\n3. **Polymorphism**: The ability for a message/method to be processed in more than one form (e.g., Method Overriding or Overloading).\n4. **Abstraction**: Hiding complex implementation details and showing only the essential features.\n\n*Note: This is a fallback mock response since the server-side GEMINI_API_KEY is not configured.*`;
    }

    if (cleanMsg.includes('dsa') || cleanMsg.includes('data structure') || cleanMsg.includes('algorithm')) {
      return `Hello! In BSCS, **Data Structures & Algorithms (DSA)** is vital. Data structures organize data in memory (like Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs), while algorithms are step-by-step instructions to solve a problem.\n\nKey areas to study include:\n- **Big-O Notation** (Time & Space complexity)\n- **Sorting & Searching** (Merge Sort, Quick Sort, Binary Search)\n- **Tree Balancing** (BST, AVL trees, Heaps)\n- **Graph Traversals** (DFS, BFS)\n\n*Note: This is a local fallback response.*`;
    }

    return `Hello! I am the BScs AI Library Assistant. Currently, my server is running in offline fallback mode because the GEMINI_API_KEY is not set or is using a placeholder. \n\nYour query is: "${msg}"${context ? ` in the context of ${context}` : ""}.\n\nTo unlock the full power of university-level AI reasoning in English + Urdu, please configure your **GEMINI_API_KEY** in the Secrets panel!`;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
