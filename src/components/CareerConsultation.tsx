import React, { useState } from 'react';
import { CareerConsultation } from '../types/mbti';
import { Lock } from 'lucide-react';

interface CareerConsultationProps {
  onSubmit: (data: CareerConsultation) => Promise<void>;
  isLoading: boolean;
  advice?: string;
}

export const CareerConsultationForm: React.FC<CareerConsultationProps> = ({
  onSubmit,
  isLoading,
  advice,
}) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState<CareerConsultation>({
    age: '',
    occupation: '',
    concerns: '',
    apiKey: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mt-8 w-full">
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          専門家による精密診断
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              年齢
            </label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="例: 25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              現在の職業
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="例: システムエンジニア"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              現状の悩み
            </label>
            <textarea
              value={formData.concerns}
              onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="現在抱えている悩みや課題を具体的に記入してください"
            />
          </div>

          {!showApiKey ? (
            <button
              type="button"
              onClick={() => setShowApiKey(true)}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <Lock className="w-4 h-4 mr-2" />
              専門家による精密診断を受ける
            </button>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OpenAI APIキー
              </label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="sk-..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? '診断中...' : '診断を開始する'}
              </button>
            </div>
          )}
        </form>
      </div>

      {advice && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-3 text-gray-800">キャリアアドバイス</h4>
          <p className="text-gray-600 whitespace-pre-line">{advice}</p>
        </div>
      )}
    </div>
  );
};