import { useState, useEffect } from 'react';
import { QuizQuestion, QuizState } from '../types';

const QUESTION_TIME_LIMIT = 30;

// Mock data as fallback
const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which company released a cutting-edge language model named GPT-4?",
    options: ["OpenAI", "Google", "Meta", "Microsoft"],
    correctAnswer: "OpenAI"
  },
  {
    id: 2,
    question: "Which company achieved a significant breakthrough in quantum computing by announcing a quantum supremacy milestone in 2023?",
    options: ["IBM", "Google", "Microsoft", "Intel"],
    correctAnswer: "Google"
  },
  {
    id: 3,
    question: "What is the name of the Tesla electric truck that was unveiled in 2023?",
    options: ["Cybertruck", "Roadster", "Model X", "Powertruck"],
    correctAnswer: "Cybertruck"
  },
  {
    id: 4,
    question: "Which cryptocurrency made headlines for reaching an all-time high in 2023 after institutional adoption increased?",
    options: ["Bitcoin", "Ethereum", "Dogecoin", "Solana"],
    correctAnswer: "Bitcoin"
  },
  {
    id: 5,
    question: "Which company launched a widely discussed AR headset called 'Vision Pro' in 2023?",
    options: ["Microsoft", "Apple", "Meta", "Sony"],
    correctAnswer: "Apple"
  },
  {
    id: 6,
    question: "Which company is leading the development of the Metaverse with its platform called Horizon Worlds?",
    options: ["Apple", "Meta", "Microsoft", "Sony"],
    correctAnswer: "Meta"
  },
  {
    id: 7,
    question: "Which popular blockchain protocol announced a major upgrade in 2023 to improve scalability and reduce energy consumption?",
    options: ["Ethereum", "Polkadot", "Solana", "Cardano"],
    correctAnswer: "Ethereum"
  },
  {
    id: 8,
    question: "Which company announced the integration of AI tools into its productivity suite, Microsoft 365, in 2023?",
    options: ["Google", "Meta", "Microsoft", "Apple"],
    correctAnswer: "Microsoft"
  },
  {
    id: 9,
    question: "Which company’s stock was the first to reach a market capitalization of $3 trillion in 2022?",
    options: ["Tesla", "Apple", "Microsoft", "Amazon"],
    correctAnswer: "Apple"
  },
  {
    id: 10,
    question: "Which social media giant rebranded itself as Meta in 2021 to focus on the Metaverse?",
    options: ["Instagram", "Twitter", "Meta", "Snapchat"],
    correctAnswer: "Meta"
  }
];


export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: -1,
    score: 0,
    answers: {},
    timeRemaining: QUESTION_TIME_LIMIT,
    isComplete: false,
  });

  // Load questions from API with fallback to mock data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://api.jsonserve.com/Uw5CrX');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        console.log('Falling back to mock data');
        setQuestions(MOCK_QUESTIONS);
        setError(null);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (quizState.currentQuestion >= 0 && !quizState.isComplete && quizState.timeRemaining > 0) {
      timer = setInterval(() => {
        setQuizState((prev) => {
          if (prev.timeRemaining <= 1) {
            // Time's up, move to next question
            const nextQuestion = prev.currentQuestion + 1;
            return {
              ...prev,
              currentQuestion: nextQuestion,
              timeRemaining: QUESTION_TIME_LIMIT,
              isComplete: nextQuestion >= questions.length
            };
          }
          return {
            ...prev,
            timeRemaining: prev.timeRemaining - 1
          };
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizState.currentQuestion, quizState.isComplete, questions.length]);

  const startQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: {},
      timeRemaining: QUESTION_TIME_LIMIT,
      isComplete: false,
    });
  };

  const submitAnswer = (answer: string) => {
    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = currentQ.correctAnswer === answer;

    setQuizState((prev) => {
      const nextQuestion = prev.currentQuestion + 1;
      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: { ...prev.answers, [prev.currentQuestion]: answer },
        currentQuestion: nextQuestion,
        timeRemaining: QUESTION_TIME_LIMIT,
        isComplete: nextQuestion >= questions.length,
      };
    });
  };

  return {
    questions,
    quizState,
    loading,
    error,
    startQuiz,
    submitAnswer,
  };
};