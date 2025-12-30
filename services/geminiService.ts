
import { GoogleGenAI, Type } from "@google/genai";
import { RecoveryInput, AIResponse } from "../types";

export const generateCollectionStrategy = async (input: RecoveryInput): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const paymentInfoContext = input.paymentLink 
    ? `- Payment Details/Link: ${input.paymentLink} (PLEASE EMBED THIS IN THE MESSAGES)`
    : '- Payment Details: Not provided';

  const prompt = `You are PayChaser AI, expert at collecting overdue payments in Indian B2B context.

CONTEXT:
- Customer: ${input.customerName}
- Amount: ₹${input.amount}
- Days Overdue: ${input.daysOverdue}
- Type: ${input.customerType}
- History: ${input.paymentHistory}
- Previous attempts: ${input.previousAttempts}
${paymentInfoContext}

TASK:
1. Determine urgency (Low/Medium/High)
2. Analyze situation (2-3 sentences)
3. Generate personalized messages for:
   - WhatsApp (conversational, culturally appropriate, use emojis, mention UPI/payment link explicitly)
   - Email (professional, structured, with subject line, include payment details/link)
   - Phone call (talking points, objection handling)
4. Recommend best channel with reasoning
5. Predict payment probability (0-100%)
6. Suggest 3-4 specific next steps

Be professional yet witty, balance firmness with relationship maintenance, use Indian business context (Hinglish where appropriate for WhatsApp). If a payment link or details are provided, ensure they are naturally integrated into the WhatsApp and Email drafts.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          urgency: { type: Type.STRING, description: 'High/Medium/Low' },
          analysis: { type: Type.STRING },
          messages: {
            type: Type.OBJECT,
            properties: {
              whatsapp: { type: Type.STRING },
              email: { type: Type.STRING },
              call_script: { type: Type.STRING }
            },
            required: ['whatsapp', 'email', 'call_script']
          },
          recommended_channel: { type: Type.STRING },
          reasoning: { type: Type.STRING },
          payment_probability: { type: Type.NUMBER },
          next_steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['urgency', 'analysis', 'messages', 'recommended_channel', 'reasoning', 'payment_probability', 'next_steps']
      }
    }
  });

  return JSON.parse(response.text);
};
