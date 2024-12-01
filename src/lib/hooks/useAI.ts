import { useState, useCallback } from 'react';
import { AIModelType, AIResponse, GoalType, ResourceType } from '../types';
import * as aiService from '../api/aiService';

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getResponse = useCallback(async (
    prompt: string,
    modelType: AIModelType,
    context?: Record<string, any>
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.getAIResponse(prompt, modelType, context);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get AI response'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generatePlan = useCallback(async (
    goalType: GoalType,
    userPreferences: Record<string, any>
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.generatePersonalizedPlan(goalType, userPreferences);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate plan'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getResources = useCallback(async (
    resourceType: ResourceType,
    userContext: Record<string, any>
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.getAIResources(resourceType, userContext);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get resources'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeProgress = useCallback(async (
    goalId: string,
    progressData: Record<string, any>
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.analyzeProgress(goalId, progressData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to analyze progress'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateTasks = useCallback(async (
    userId: string,
    goals: Record<string, any>[]
  ): Promise<AIResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.generateDailyTasks(userId, goals);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to generate tasks'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    getResponse,
    generatePlan,
    getResources,
    analyzeProgress,
    generateTasks,
  };
}