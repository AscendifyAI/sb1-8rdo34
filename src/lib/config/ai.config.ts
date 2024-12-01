export const AI_CONFIG = {
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3001/api',
  models: {
    gpt4: {
      id: 'gpt-4-turbo-preview',
      maxTokens: 500,
      temperature: 0.7,
    },
    claude: {
      id: 'claude-3-opus-20240229',
      maxTokens: 1000,
      temperature: 0.7,
    },
    palm: {
      id: 'palm-2',
      maxTokens: 800,
      temperature: 0.7,
    },
  },
  endpoints: {
    chat: '/ai/chat',
    plan: '/ai/plan',
    resources: '/ai/resources',
    analyze: '/ai/analyze',
    tasks: '/ai/tasks',
  },
};

export const AI_ROLES = {
  mentor: 'You are an AI mentor focused on helping users achieve their personal and professional goals. Provide actionable advice and guidance.',
  analyst: 'You are an AI analyst specialized in evaluating user progress and providing detailed insights and recommendations.',
  planner: 'You are an AI planner focused on creating personalized action plans and strategies based on user goals and preferences.',
};