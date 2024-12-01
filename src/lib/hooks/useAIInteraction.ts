import { useState, useCallback } from 'react';
import { AIService } from '../services/ai/AIService';
import type { 
  AIRequestParams, 
  VoiceParams, 
  VideoParams,
  AIResponse 
} from '../services/ai/types';

export function useAIInteraction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const aiService = new AIService(
    import.meta.env.VITE_AI_API_KEY,
    import.meta.env.VITE_TAVUS_API_KEY
  );

  const generateResponse = useCallback(async (params: AIRequestParams): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.generateResponse(params);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('AI interaction failed');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processVoice = useCallback(async (params: VoiceParams): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.processVoice(params);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Voice processing failed');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processVideo = useCallback(async (params: VideoParams): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.processVideo(params);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Video processing failed');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    generateResponse,
    processVoice,
    processVideo,
  };
}