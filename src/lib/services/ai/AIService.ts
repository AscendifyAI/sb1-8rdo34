import { UnifiedAIProvider } from './providers/unified';
import { TavusService } from '../video/TavusService';
import type { 
  AIResponse, 
  AIRequestParams, 
  VoiceParams,
  VideoParams,
  AnalysisParams 
} from './types';

export class AIService {
  private unifiedProvider: UnifiedAIProvider;
  private tavusService: TavusService;

  constructor(aiApiKey: string, tavusApiKey: string) {
    this.unifiedProvider = new UnifiedAIProvider(aiApiKey);
    this.tavusService = new TavusService(tavusApiKey);
  }

  async generateResponse(params: AIRequestParams): Promise<AIResponse> {
    try {
      return await this.unifiedProvider.generateTextResponse(params);
    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async processVoice(params: VoiceParams): Promise<AIResponse> {
    try {
      return await this.unifiedProvider.processVoiceInput(params);
    } catch (error) {
      console.error('Voice processing error:', error);
      throw new Error('Failed to process voice input');
    }
  }

  async processVideo(params: VideoParams): Promise<AIResponse> {
    try {
      const { sessionId } = await this.tavusService.initializeSession(params);
      return await this.tavusService.generateResponse(sessionId, params.context?.prompt || '');
    } catch (error) {
      console.error('Video processing error:', error);
      throw new Error('Failed to process video');
    }
  }

  async analyzeProgress(params: AnalysisParams): Promise<AIResponse> {
    try {
      return await this.unifiedProvider.analyzeUserProgress(params);
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to analyze progress');
    }
  }
}