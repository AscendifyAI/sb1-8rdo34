export type AIModelType = 'gpt4' | 'claude' | 'palm' | 'custom';

export type GoalType = 
  | 'career'
  | 'fitness'
  | 'education'
  | 'finance'
  | 'business'
  | 'personal';

export type ResourceType =
  | 'workout'
  | 'study'
  | 'business'
  | 'meditation'
  | 'nutrition'
  | 'financial';

export interface AIResponse {
  message: string;
  suggestions?: string[];
  nextSteps?: string[];
  resources?: Resource[];
  analysis?: Analysis;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  content: string;
  metadata: Record<string, any>;
}

export interface Analysis {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  metrics: Record<string, number>;
}

export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  description: string;
  targetDate: Date;
  milestones: Milestone[];
  progress: number;
  status: 'active' | 'completed' | 'paused';
  metrics: Record<string, number>;
  aiAnalysis?: Analysis;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  order: number;
}

export interface Task {
  id: string;
  userId: string;
  goalId?: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  aiGenerated: boolean;
  metadata?: Record<string, any>;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  aiModel: AIModelType;
  notificationSettings: NotificationSettings;
  privacySettings: PrivacySettings;
  dashboardLayout: DashboardLayout;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  taskReminders: boolean;
  progressUpdates: boolean;
  milestoneAlerts: boolean;
}

export interface PrivacySettings {
  shareProgress: boolean;
  publicProfile: boolean;
  anonymousAnalytics: boolean;
}

export interface DashboardLayout {
  widgets: {
    id: string;
    type: string;
    position: number;
    visible: boolean;
  }[];
}