import { 
  Goal, 
  ProgressUpdate, 
  ProgressMetrics, 
  ProgressTrend,
  TimeFrame 
} from '../types';

export class ProgressTracker {
  calculateProgress(goal: Goal, updates: ProgressUpdate[]): number {
    const metrics = this.calculateMetrics(goal, updates);
    return this.computeOverallProgress(metrics, goal.metrics);
  }

  analyzeProgressTrend(
    updates: ProgressUpdate[], 
    timeFrame: TimeFrame
  ): ProgressTrend {
    const timeFramedUpdates = this.filterByTimeFrame(updates, timeFrame);
    const trend = this.calculateTrendLine(timeFramedUpdates);
    
    return {
      direction: this.determineTrendDirection(trend),
      velocity: this.calculateProgressVelocity(trend),
      consistency: this.measureConsistency(timeFramedUpdates),
      projectedCompletion: this.estimateCompletion(trend)
    };
  }

  private calculateMetrics(
    goal: Goal, 
    updates: ProgressUpdate[]
  ): ProgressMetrics {
    const latestUpdate = this.getLatestUpdate(updates);
    
    return {
      completion: this.calculateCompletionPercentage(goal, updates),
      streak: this.calculateCurrentStreak(updates),
      velocity: this.calculateVelocity(updates),
      consistency: this.calculateConsistency(updates)
    };
  }

  private filterByTimeFrame(
    updates: ProgressUpdate[], 
    timeFrame: TimeFrame
  ): ProgressUpdate[] {
    const now = new Date();
    const timeFrameStart = this.getTimeFrameStart(now, timeFrame);
    
    return updates.filter(update => 
      new Date(update.timestamp) >= timeFrameStart
    );
  }

  private getTimeFrameStart(date: Date, timeFrame: TimeFrame): Date {
    const start = new Date(date);
    switch (timeFrame) {
      case 'day':
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start.setDate(date.getDate() - date.getDay());
        break;
      case 'month':
        start.setDate(1);
        break;
      case 'year':
        start.setMonth(0, 1);
        break;
    }
    return start;
  }

  private calculateTrendLine(updates: ProgressUpdate[]): number[] {
    if (updates.length < 2) return [];
    
    const xValues = updates.map((_, i) => i);
    const yValues = updates.map(update => update.value);
    
    return this.linearRegression(xValues, yValues);
  }

  private linearRegression(x: number[], y: number[]): number[] {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return x.map(xi => slope * xi + intercept);
  }

  private getLatestUpdate(updates: ProgressUpdate[]): ProgressUpdate | null {
    return updates.length > 0 
      ? updates.reduce((latest, current) => 
          new Date(current.timestamp) > new Date(latest.timestamp) 
            ? current 
            : latest
        )
      : null;
  }

  private calculateCompletionPercentage(
    goal: Goal, 
    updates: ProgressUpdate[]
  ): number {
    const latest = this.getLatestUpdate(updates);
    if (!latest) return 0;
    
    return (latest.value / goal.target) * 100;
  }

  private calculateCurrentStreak(updates: ProgressUpdate[]): number {
    let streak = 0;
    const sortedUpdates = [...updates].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    for (let i = 0; i < sortedUpdates.length; i++) {
      if (i === 0) {
        streak = 1;
        continue;
      }
      
      const current = new Date(sortedUpdates[i].timestamp);
      const previous = new Date(sortedUpdates[i - 1].timestamp);
      const dayDiff = Math.floor(
        (previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  private calculateVelocity(updates: ProgressUpdate[]): number {
    if (updates.length < 2) return 0;
    
    const sortedUpdates = [...updates].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    const first = sortedUpdates[0];
    const last = sortedUpdates[sortedUpdates.length - 1];
    const daysDiff = (
      new Date(last.timestamp).getTime() - 
      new Date(first.timestamp).getTime()
    ) / (1000 * 60 * 60 * 24);
    
    return (last.value - first.value) / daysDiff;
  }

  private calculateConsistency(updates: ProgressUpdate[]): number {
    if (updates.length < 2) return 1;
    
    const velocities = [];
    for (let i = 1; i < updates.length; i++) {
      const timeDiff = (
        new Date(updates[i].timestamp).getTime() - 
        new Date(updates[i - 1].timestamp).getTime()
      ) / (1000 * 60 * 60 * 24);
      
      velocities.push((updates[i].value - updates[i - 1].value) / timeDiff);
    }
    
    const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length;
    const variance = velocities.reduce(
      (sum, v) => sum + Math.pow(v - avgVelocity, 2), 
      0
    ) / velocities.length;
    
    return 1 / (1 + variance);
  }

  private determineTrendDirection(trendLine: number[]): 'up' | 'down' | 'stable' {
    if (trendLine.length < 2) return 'stable';
    
    const slope = trendLine[trendLine.length - 1] - trendLine[0];
    if (Math.abs(slope) < 0.01) return 'stable';
    return slope > 0 ? 'up' : 'down';
  }

  private calculateProgressVelocity(trendLine: number[]): number {
    if (trendLine.length < 2) return 0;
    return (trendLine[trendLine.length - 1] - trendLine[0]) / trendLine.length;
  }

  private measureConsistency(updates: ProgressUpdate[]): number {
    return this.calculateConsistency(updates);
  }

  private estimateCompletion(trendLine: number[]): Date | null {
    if (trendLine.length < 2) return null;
    
    const velocity = this.calculateProgressVelocity(trendLine);
    if (velocity <= 0) return null;
    
    const daysToCompletion = Math.ceil((100 - trendLine[trendLine.length - 1]) / velocity);
    const completion = new Date();
    completion.setDate(completion.getDate() + daysToCompletion);
    
    return completion;
  }

  private computeOverallProgress(
    metrics: ProgressMetrics, 
    goalMetrics: any[]
  ): number {
    const weights = {
      completion: 0.6,
      consistency: 0.2,
      velocity: 0.2
    };
    
    return (
      metrics.completion * weights.completion +
      metrics.consistency * weights.consistency +
      (metrics.velocity > 0 ? 1 : 0) * weights.velocity
    );
  }
}