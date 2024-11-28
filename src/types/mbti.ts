export type MBTIType =
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface MBTIResult {
  type: MBTIType;
  title: string;
  description: string;
  characteristics: string[];
  summary: string;
}

export interface CareerConsultation {
  age: string;
  occupation: string;
  concerns: string;
  apiKey: string;
}