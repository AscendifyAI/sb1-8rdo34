import { AIModelType, AIResponse, ChatMessage, GoalType, ResourceType } from '../types';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export async function getAIResponse(
  prompt: string,
  modelType: AIModelType,
  context?: Record<string, any>
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      modelType,
      context,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get AI response');
  }

  return response.json();
}

export async function generatePersonalizedPlan(
  goalType: GoalType,
  userPreferences: Record<string, any>
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalType,
      userPreferences,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate plan');
  }

  return response.json();
}

export async function getAIResources(
  resourceType: ResourceType,
  userContext: Record<string, any>
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resourceType,
      userContext,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get AI resources');
  }

  return response.json();
}

export async function analyzeProgress(
  goalId: string,
  progressData: Record<string, any>
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
      progressData,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze progress');
  }

  return response.json();
}

export async function generateDailyTasks(
  userId: string,
  goals: Record<string, any>[]
): Promise<AIResponse> {
  const response = await fetch(`${API_URL}/ai/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      goals,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate tasks');
  }

  return response.json();
}