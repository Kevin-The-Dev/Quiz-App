import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <Brain className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome to the Quiz Challenge!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Test your knowledge and challenge yourself with our exciting quiz. Are you ready?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Start Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};