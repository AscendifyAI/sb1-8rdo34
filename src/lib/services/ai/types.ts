// ... (previous interfaces remain the same)

export interface ResearchParams {
  query: string;
  goalContext: any[];
  userPreferences: UserPreferences;
  timeframe?: string;
  maxResults?: number;
}

export interface ResearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
  timestamp: string;
  relevanceScore: number;
  metadata?: Record<string, any>;
}

export interface Goal {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number;
  status: GoalStatus;
  priority: number;
  milestones: Milestone[];
  subgoals: SubGoal[];
  metrics: GoalMetric[];
  progressHistory: ProgressEntry[];
  resources: Resource[];
  keywords?: string[];
}

export interface SubGoal {
  id: string;
  parentId: string;
  title: string;
  description: string;
  progress: number;
  status: GoalStatus;
  dueDate: Date;
}

export interface GoalMetric {
  id: string;
  name: string;
  type: 'numeric' | 'boolean' | 'percentage';
  target: number;
  current: number;
  unit?: string;
  history: MetricEntry[];
}

export interface ProgressEntry {
  timestamp: Date;
  value: number;
  notes?: string;
  metrics: Record<string, number>;
}

export interface MetricEntry {
  timestamp: Date;
  value: number;
  context?: Record<string, any>;
}

export type GoalStatus = 
  | 'not_started'
  | 'in_progress'
  | 'on_track'
  | 'at_risk'
  | 'behind'
  | 'completed'
  | 'paused';

// ... (rest of the previous interfaces remain the same)