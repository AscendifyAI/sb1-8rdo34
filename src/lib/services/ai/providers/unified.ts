import type { AIResponse, AIRequestParams, VoiceParams, VideoParams, AnalysisParams } from '../types';

const API_BASE_URL = 'https://api.unified-ai.com/v1';

export class UnifiedAIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async makeRequest(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async generateTextResponse(params: AIRequestParams): Promise<AIResponse> {
    const response = await this.makeRequest('/generate', {
      ...params,
      type: 'text',
    });
    return this.formatResponse(response);
  }

  async processVoiceInput(params: VoiceParams): Promise<AIResponse> {
    const formData = new FormData();
    formData.append('audio', params.audioData);
    formData.append('userId', params.userId);
    if (params.context) {
      formData.append('context', JSON.stringify(params.context));
    }

    const response = await fetch(`${API_BASE_URL}/voice`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Voice processing failed');
    }

    return this.formatResponse(await response.json());
  }

  async analyzeUserProgress(params: AnalysisParams): Promise<AIResponse> {
    const response = await this.makeRequest('/analyze', {
      ...params,
      type: 'analysis',
    });
    return this.formatResponse(response);
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