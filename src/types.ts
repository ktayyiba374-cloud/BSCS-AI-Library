export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  image?: string;
  downloadUrl?: string;
  pages?: number;
  year?: string;
  category?: string;
}

export interface Chapter {
  id: string;
  title: string;
  notes: string; // detailed description & notes
  summary?: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  marks: number;
  downloadUrl?: string;
  status?: 'Not Started' | 'Submitted' | 'Graded';
  solution?: string;
}

export interface PastPaper {
  id: string;
  year: string;
  type: 'Midterm' | 'Terminal' | 'Final';
  questions: string[];
  courseCode?: string;
  solvedPdf?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: number;
  description: string;
  overview: string;
  chapters: Chapter[];
  books: Book[];
  assignments: Assignment[];
  mcqs: MCQ[];
  pastPapers: PastPaper[];
  importantQuestions: string[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  language?: 'en' | 'ur';
}
