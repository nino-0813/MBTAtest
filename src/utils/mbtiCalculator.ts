import { MBTIType } from '../types/mbti';

// Calculate scores for each MBTI dimension
interface DimensionScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export function calculateMBTIType(answers: number[]): MBTIType {
  const scores: DimensionScores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Map questions to dimensions
  answers.forEach((answer, index) => {
    const questionNumber = index + 1;
    
    // E/I questions (1, 5, 9, 13, 17)
    if ([1, 5, 9, 13, 17].includes(questionNumber)) {
      if (answer <= 1) scores.I++;
      else scores.E++;
    }
    
    // S/N questions (2, 6, 10, 14, 18)
    if ([2, 6, 10, 14, 18].includes(questionNumber)) {
      if (answer <= 1) scores.S++;
      else scores.N++;
    }
    
    // T/F questions (3, 7, 11, 15, 19)
    if ([3, 7, 11, 15, 19].includes(questionNumber)) {
      if (answer <= 1) scores.T++;
      else scores.F++;
    }
    
    // J/P questions (4, 8, 12, 16, 20)
    if ([4, 8, 12, 16, 20].includes(questionNumber)) {
      if (answer <= 1) scores.J++;
      else scores.P++;
    }
  });

  // Determine each dimension by comparing scores
  const type = [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('') as MBTIType;

  return type;
}