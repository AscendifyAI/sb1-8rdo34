export type GoalCategory = 
  | 'fitness'
  | 'career'
  | 'education'
  | 'finance'
  | 'business'
  | 'personal'
  | 'health'
  | 'relationships'
  | 'creativity';

export interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  defaultMetrics: MetricDefinition[];
  suggestedMilestones: string[];
  recommendedDuration: Duration;
  category?: GoalCategory;
  prerequisites?: string[];
  resources?: ResourceReference[];
}

export interface MetricDefinition {
  name: string;
  type: 'numeric' | 'percentage' | 'boolean';
  unit?: string;
  target?: number;
  minimum?: number;
  maximum?: number;
}

export interface Duration {
  min: number;
  max: number;
  unit: 'days' | 'weeks' | 'months';
}

export interface ResourceReference {
  type: 'article' | 'video' | 'course' | 'book';
  title: string;
  url?: string;
  description?: string;
}

export interface ProgressUpdate {
  timestamp: string;
  value: number;
  notes?: string;
  metrics: Record<string, number>;
}

export interface ProgressMetrics {
  completion: number;
  streak: number;
  velocity: number;
  consistency: number;
}

export interface ProgressTrend {
  direction: 'up' | 'down' | 'stable';
  velocity: number;
  consistency: number;
  projectedCompletion: Date | null;
}

export type TimeFrame = 'day' | 'week' | 'month' | 'year';