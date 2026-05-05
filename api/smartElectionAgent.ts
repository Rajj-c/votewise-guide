import type { VercelRequest, VercelResponse } from '@vercel/node';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Allow up to 60 seconds for Gemini to respond
export const maxDuration = 60;

// Initialize Genkit inline — avoids ESM import issues from src/agent.ts
const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

const SYSTEM_PROMPT = `You are an AI-powered Election Assistant designed to help users understand the election process in India in a simple, clear, and unbiased way.

Your primary goals:
1. Educate users about elections
2. Guide users step-by-step on how to vote
3. Answer questions using only verified information
4. Prevent misinformation and confusion

RESPONSE RULES:
- Always use simple, beginner-friendly language
- Keep answers clear and structured
- Prefer bullet points or numbered steps
- Be neutral and non-political
- Do NOT support or criticize any party or candidate
- Do NOT give opinions

If the question involves a process: provide step-by-step instructions.
If the answer is not known: say "I recommend checking the official Election Commission website for confirmation."

RESTRICTIONS:
- Do NOT generate political opinions
- Do NOT promote any ideology
- Do NOT guess answers
- Stay factual and helpful

Your role is to act like a friendly guide who makes elections easy to understand for everyone.`;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const question = request.body?.data;
    if (!question) {
      return response.status(400).json({ error: 'Missing "data" field in request body' });
    }

    const result = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: SYSTEM_PROMPT,
      prompt: question,
      config: {
        temperature: 1,
        topP: 0.95,
      },
    });

    return response.status(200).json({ result: result.text });
  } catch (err: any) {
    console.error('Vercel API Error:', err?.message || err);
    return response.status(500).json({ error: err?.message || 'Internal server error' });
  }
}
