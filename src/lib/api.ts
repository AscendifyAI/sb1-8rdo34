import { type User } from './store';

interface AIResponse {
  message: string;
  suggestions?: string[];
  nextSteps?: string[];
}

const API_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:3001/api';

export async function getAIMentorResponse(
  prompt: string,
  user: User,
  context?: Record<string, any>
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/mentor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      userId: user.id,
      context,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get AI response');
  }

  return response.json();
}