import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { QuizQuestion as QuizQuestionType } from '../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  timeRemaining,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [playCorrect] = useSound('/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/incorrect.mp3', { volume: 0.5 });

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining === 0 && !selectedAnswer) {
        handleAnswer('');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, selectedAnswer]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      playCorrect();
    } else {
      playIncorrect();
    }
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Question {questionNumber + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-semibold text-purple-600">
            Time: {timeRemaining}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-purple-600 h-2 rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${(timeRemaining / 30) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};