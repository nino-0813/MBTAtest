import { create } from 'zustand';
import { Question } from '../types/mbti';
import { questions } from '../data/questions';

interface TestState {
  currentQuestion: number;
  answers: number[];
  setAnswer: (questionId: number, answer: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>((set) => ({
  currentQuestion: 0,
  answers: new Array(questions.length).fill(-1),
  setAnswer: (questionId: number, answer: number) =>
    set((state) => ({
      answers: state.answers.map((a, i) => (i === questionId ? answer : a)),
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestion: Math.min(state.currentQuestion + 1, questions.length - 1),
    })),
  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),
  resetTest: () =>
    set({
      currentQuestion: 0,
      answers: new Array(questions.length).fill(-1),
    }),
}));