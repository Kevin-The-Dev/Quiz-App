export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: Record<number, string>;
  timeRemaining: number;
  isComplete: boolean;
}