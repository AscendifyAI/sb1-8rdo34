import { useState, useCallback } from 'react';
import { AI_PERSONAS, getPersonaByGoalType, getPersonaPrompt } from '../config/ai-personas';
import { useAIInteraction } from './useAIInteraction';
import type { AIResponse } from '../services/ai/types';

export function useAIPersona(goalType: string) {
  const [currentPersona, setCurrentPersona] = useState(() => getPersonaByGoalType(goalType));
  const { generateResponse, isLoading, error } = useAIInteraction();

  const getResponse = useCallback(async (prompt: string): Promise<AIResponse> => {
    const personaPrompt = getPersonaPrompt(currentPersona);
    return generateResponse({
      prompt,
      context: {
        persona: currentPersona,
        systemPrompt: personaPrompt,
      },
    });
  }, [currentPersona, generateResponse]);

  const changePersona = useCallback((newGoalType: string) => {
    setCurrentPersona(getPersonaByGoalType(newGoalType));
  }, []);

  return {
    persona: currentPersona,
    getResponse,
    changePersona,
    isLoading,
    error,
  };
}