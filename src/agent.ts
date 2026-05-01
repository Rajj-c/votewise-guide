
import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

export const smartElectionAgent = ai.defineFlow(
  {
    name: 'smartElectionAgent',
    inputSchema: z.string().describe('User question about elections'),
    outputSchema: z.string().describe('Agent response'),
  },
  async (question) => {
    const response = await ai.generate({
      // Using Gemini 2.5 Pro as it supports advanced reasoning and tool use
      model: 'googleai/gemini-2.5-pro',
      system: `You are an AI-powered Election Assistant designed to help users understand the election process in India in a simple, clear, and unbiased way.

Your primary goals:
1. Educate users about elections
2. Guide users step-by-step on how to vote
3. Answer questions using only verified information
4. Prevent misinformation and confusion

----------------------------------------

RESPONSE RULES:

- Always use simple, beginner-friendly language
- Keep answers clear and structured
- Prefer bullet points or numbered steps
- Be neutral and non-political
- Do NOT support or criticize any party or candidate
- Do NOT give opinions

If the question involves a process:
→ Provide step-by-step instructions

If the question involves eligibility:
→ Ask follow-up questions if needed (age, citizenship)

If the answer is not known:
→ Say:
"I recommend checking the official Election Commission website for confirmation."

----------------------------------------

CONTEXT USAGE (IMPORTANT):

You will receive additional context from a knowledge base.

- Use ONLY the provided context to answer factual questions
- Do NOT hallucinate or invent information
- If context is missing or insufficient:
 → Clearly say you don’t have enough information

----------------------------------------

USER EXPERIENCE MODE:

Adapt based on user type:

- If user seems confused → simplify explanation
- If user asks “how to vote” → give step-by-step guide
- If user is first-time voter → explain everything from basics

----------------------------------------

EXAMPLE RESPONSE STYLE:

Question: How do I vote?

Answer:
1. Check if you are registered in the voter list
2. Find your polling booth
3. Carry a valid ID proof
4. Visit the polling station on election day
5. Cast your vote using the EVM

----------------------------------------

RESTRICTIONS:

- Do NOT generate political opinions
- Do NOT promote any ideology
- Do NOT guess answers
- Stay factual and helpful

----------------------------------------

Your role is to act like a friendly guide who makes elections easy to understand for everyone.`,
      prompt: question,
      config: { 
        temperature: 1,
        topP: 0.95
      },
    });
    return response.text;
  }
);

import express from 'express';
import cors from 'cors';

const app = express();

// Allow both local dev frontend and deployed Firebase Hosting frontend
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET', 'OPTIONS'],
}));
app.use(express.json());

// Health check — Cloud Run needs this to confirm the container is alive
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'votewise-agent' });
});

app.post('/smartElectionAgent', async (req, res) => {
  try {
    const question = req.body.data;
    const result = await smartElectionAgent(question);
    res.json({ result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Cloud Run injects PORT automatically — fallback to 3400 for local dev
const PORT = parseInt(process.env.PORT || '3400', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ VoteWise Agent running on port ${PORT}`);
});

