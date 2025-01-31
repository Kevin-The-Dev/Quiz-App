import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw } from 'lucide-react';
import { QuizState } from '../types';

interface ResultScreenProps {
  quizState: QuizState;
  totalQuestions: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  quizState,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (quizState.score / totalQuestions) * 100;
  const getFeedback = () => {
    if (percentage >= 80) return "Outstanding! You're a quiz master!";
    if (percentage >= 60) return "Great job! You've done well!";
    if (percentage >= 40) return "Good effort! Keep practicing!";
    return "Don't give up! Try again to improve your score!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quiz Complete!
        </h2>

        <div className="space-y-4 mb-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {quizState.score}/{totalQuestions}
            </p>
            <p className="text-gray-600">{getFeedback()}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Correct Answers:</span>
              <span className="font-semibold text-green-600">{quizState.score}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Incorrect Answers:</span>
              <span className="font-semibold text-red-600">
                {totalQuestions - quizState.score}
              </span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};