import type { VercelRequest, VercelResponse } from '@vercel/node';
import { smartElectionAgent } from '../src/agent';

// Allow this serverless function to run for up to 60 seconds to prevent Gemini timeouts
export const maxDuration = 60;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Add CORS headers to allow frontend access
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Ensure it's a POST request
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const question = request.body.data;
    const result = await smartElectionAgent(question);
    return response.status(200).json({ result });
  } catch (err: any) {
    console.error('Vercel API Error:', err);
    return response.status(500).json({ error: err.message });
  }
}
