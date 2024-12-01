import { AI_CONFIG } from '../../../config/ai.config';
import type { AIProvider, AIRequestParams } from '../types';

export class PaLMProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(params: AIRequestParams) {
    const { prompt, role, context } = params;
    const model = AI_CONFIG.models.palm;

    // Implement Google PaLM API integration
    return {
      message: '',
      suggestions: [],
      nextSteps: [],
    };
  }
}