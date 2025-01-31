import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartScreen } from './components/StartScreen';
import { QuizQuestion } from './components/QuizQuestion';
import { ResultScreen } from './components/ResultScreen';
import { useQuiz } from './hooks/useQuiz';

function App() {
  const { questions, quizState, loading, error, startQuiz, submitAnswer } = useQuiz();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (quizState.currentQuestion === -1) {
    return <StartScreen onStart={startQuiz} />;
  }

  if (quizState.isComplete) {
    return (
      <ResultScreen
        quizState={quizState}
        totalQuestions={questions.length}
        onRestart={startQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {questions[quizState.currentQuestion] && (
            <QuizQuestion
              key={quizState.currentQuestion}
              question={questions[quizState.currentQuestion]}
              questionNumber={quizState.currentQuestion}
              totalQuestions={questions.length}
              timeRemaining={quizState.timeRemaining}
              onAnswer={submitAnswer}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;