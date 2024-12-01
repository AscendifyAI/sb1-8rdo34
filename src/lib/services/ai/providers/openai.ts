import OpenAI from 'openai';
import { AI_CONFIG } from '../../../config/ai.config';
import type { AIProvider, AIRequestParams } from '../types';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateResponse(params: AIRequestParams) {
    const { prompt, role, context } = params;
    const model = AI_CONFIG.models.gpt4;

    const completion = await this.client.chat.completions.create({
      model: model.id,
      messages: [
        { role: 'system', content: role },
        { role: 'user', content: prompt },
      ],
      temperature: model.temperature,
      max_tokens: model.maxTokens,
    });

    return {
      message: completion.choices[0].message.content || '',
      suggestions: this.extractSuggestions(completion),
      nextSteps: this.extractNextSteps(completion),
    };
  }

  private extractSuggestions(completion: any) {
    // Implementation for extracting suggestions
    return [];
  }

  private extractNextSteps(completion: any) {
    // Implementation for extracting next steps
    return [];
  }
}