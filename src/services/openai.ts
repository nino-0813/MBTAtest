import OpenAI from 'openai';
import { MBTIResult, CareerConsultation } from '../types/mbti';

export async function getCareerAdvice(
  result: MBTIResult,
  consultation: CareerConsultation
): Promise<string> {
  const openai = new OpenAI({
    apiKey: consultation.apiKey,
    dangerouslyAllowBrowser: true
  });

  const prompt = `
あなたはMBTI診断に基づくキャリアカウンセラーです。
以下の情報に基づいて、具体的なキャリアアドバイスを提供してください：

MBTI診断結果：
タイプ: ${result.type}
特徴: ${result.characteristics.join(', ')}

相談者情報：
年齢: ${consultation.age}
現在の職業: ${consultation.occupation}
現状の悩み: ${consultation.concerns}

以下の点を含めて、具体的なアドバイスを提供してください：
1. MBTIタイプに基づく強みの活かし方
2. 現在の悩みに対する具体的な解決策
3. キャリア発展のための具体的なステップ
4. おすすめの職種や働き方
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "あなたは経験豊富なキャリアカウンセラーです。MBTIの知識を活かして、具体的で実践的なアドバイスを提供してください。"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content || 'アドバイスを生成できませんでした。';
}