import React, { useState } from 'react';
import { MBTIResult, CareerConsultation } from '../types/mbti';
import { CareerConsultationForm } from './CareerConsultation';
import { getCareerAdvice } from '../services/openai';

interface ResultCardProps {
  result: MBTIResult;
  onRetakeTest: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onRetakeTest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string>();

  const handleConsultation = async (data: CareerConsultation) => {
    setIsLoading(true);
    try {
      const careerAdvice = await getCareerAdvice(result, data);
      setAdvice(careerAdvice);
    } catch (error) {
      console.error('Error getting career advice:', error);
      alert('アドバイスの取得中にエラーが発生しました。APIキーを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        あなたのタイプは {result.type} です
      </h2>
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{result.title}</h3>
      <p className="text-gray-600 mb-6">{result.description}</p>
      
      <h4 className="text-lg font-semibold mb-3 text-gray-700">特徴:</h4>
      <ul className="list-disc list-inside mb-6 text-gray-600">
        {result.characteristics.map((trait, index) => (
          <li key={index} className="mb-2">{trait}</li>
        ))}
      </ul>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-2 text-gray-700">まとめ</h4>
        <p className="text-gray-600">{result.summary}</p>
      </div>

      <CareerConsultationForm
        onSubmit={handleConsultation}
        isLoading={isLoading}
        advice={advice}
      />
      
      <button
        onClick={onRetakeTest}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6"
      >
        テストをもう一度受ける
      </button>
    </div>
  );
};