interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export type QuestionDifficulty = "easy" | "medium" | "hard";

interface QuestionDetails {
  chapter: string;
  subchapter: string;
  fullAnswer: string;
}

export interface QuizQuestion {
  difficulty: QuestionDifficulty;
  id?: string;
  options: QuestionOption[];
  question: string;
  details?: QuestionDetails;
}

export interface QuestionItem {
  id: string;
  answer: string;
  difficulty: QuestionDifficulty;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  question: string;
  details?: QuestionDetails;
}
