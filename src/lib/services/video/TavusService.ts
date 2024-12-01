import type { VideoParams, AIResponse } from '../ai/types';

const TAVUS_API_URL = 'https://api.tavus.io/v1';

export class TavusService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async initializeSession(params: VideoParams): Promise<{ sessionId: string }> {
    const response = await fetch(`${TAVUS_API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        userId: params.userId,
        preferences: params.preferences,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize video session');
    }

    return response.json();
  }

  async generateResponse(sessionId: string, prompt: string): Promise<AIResponse> {
    const response = await fetch(`${TAVUS_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        sessionId,
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate video response');
    }

    return this.formatResponse(await response.json());
  }

  private formatResponse(response: any): AIResponse {
    return {
      message: response.message || '',
      suggestions: response.suggestions || [],
      nextSteps: response.nextSteps || [],
      analysis: response.analysis || null,
      resources: response.resources || [],
    };
  }
}