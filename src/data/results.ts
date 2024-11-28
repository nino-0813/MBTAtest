import { MBTIResult } from '../types/mbti';

export const results: Record<string, MBTIResult> = {
  ISTJ: {
    type: 'ISTJ',
    title: '責任感が強い実務家',
    description: '現実的で計画的。責任感が強く、規則を守る。データや事実を重視し、決断力に優れる。',
    characteristics: [
      '慎重で信頼できる',
      '静かで控えめだが、内に情熱を秘めている',
      'データや事実を重視する',
      '規律正しい'
    ],
    summary: 'ISTJは伝統を重んじ、計画性があり、着実に目標を達成するタイプ。慎重かつ分析的な判断を行う実務家。'
  },
  // ... Add all 16 types here
};