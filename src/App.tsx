import React from 'react';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultCard } from './components/ResultCard';
import { useTestStore } from './store/testStore';
import { questions } from './data/questions';
import { results } from './data/results';
import { Brain } from 'lucide-react';
import { calculateMBTIType } from './utils/mbtiCalculator';

function App() {
  const { currentQuestion, answers, setAnswer, nextQuestion, previousQuestion, resetTest } =
    useTestStore();

  const isComplete = answers.every((answer) => answer !== -1);
  const currentQuestionData = questions[currentQuestion];

  const calculateResult = () => {
    const mbtiType = calculateMBTIType(answers);
    return results[mbtiType];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="flex items-center mb-8">
        <Brain className="w-8 h-8 text-blue-500 mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">MBTI性格診断テスト</h1>
      </div>

      {isComplete ? (
        <ResultCard result={calculateResult()} onRetakeTest={resetTest} />
      ) : (
        <div className="w-full max-w-2xl">
          <ProgressBar current={currentQuestion} total={questions.length} />
          <QuestionCard
            question={currentQuestionData}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={(answer) => {
              setAnswer(currentQuestion, answer);
              if (currentQuestion < questions.length - 1) {
                nextQuestion();
              }
            }}
          />
          <div className="mt-6 flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors"
            >
              前の質問
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              次の質問
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;