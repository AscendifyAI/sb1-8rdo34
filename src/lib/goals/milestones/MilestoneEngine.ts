import { Goal, SubGoal, GoalStatus } from '../../services/ai/types';
import { AIEngine } from '../../services/ai/core/AIEngine';

export class MilestoneEngine {
  private aiEngine: AIEngine;

  constructor(aiEngine: AIEngine) {
    this.aiEngine = aiEngine;
  }

  async generateMilestones(goal: Goal): Promise<SubGoal[]> {
    const response = await this.aiEngine.generatePersonalizedResponse(
      this.buildMilestonePrompt(goal)
    );

    return this.processMilestoneResponse(response, goal);
  }

  async adjustMilestones(goal: Goal, progress: number): Promise<SubGoal[]> {
    const analysis = await this.aiEngine.analyzeUserProgress();
    return this.recalibrateMilestones(goal, analysis);
  }

  private buildMilestonePrompt(goal: Goal): string {
    return `Break down the following goal into strategic milestones:
      Goal: ${goal.title}
      Description: ${goal.description}
      Category: ${goal.category}
      Target Date: ${goal.targetDate}
      Current Progress: ${goal.progress}%`;
  }

  private processMilestoneResponse(response: any, goal: Goal): SubGoal[] {
    const suggestions = response.suggestions || [];
    return suggestions.map((suggestion: string, index: number) => ({
      id: `${goal.id}-milestone-${index}`,
      parentId: goal.id,
      title: suggestion,
      description: '',
      progress: 0,
      status: 'not_started' as GoalStatus,
      dueDate: this.calculateMilestoneDueDate(goal, index, suggestions.length)
    }));
  }

  private calculateMilestoneDueDate(
    goal: Goal, 
    milestoneIndex: number, 
    totalMilestones: number
  ): Date {
    const goalDuration = goal.targetDate.getTime() - new Date().getTime();
    const milestoneInterval = goalDuration / totalMilestones;
    const dueDate = new Date();
    dueDate.setTime(dueDate.getTime() + (milestoneInterval * (milestoneIndex + 1)));
    return dueDate;
  }

  private async recalibrateMilestones(
    goal: Goal, 
    analysis: any
  ): Promise<SubGoal[]> {
    const adjustedMilestones = [...goal.milestones];
    
    // Adjust milestone difficulty based on progress
    if (analysis.velocity > 1.2) {
      // User is progressing faster than expected
      return this.increaseMilestoneDifficulty(adjustedMilestones);
    } else if (analysis.velocity < 0.8) {
      // User is progressing slower than expected
      return this.decreaseMilestoneDifficulty(adjustedMilestones);
    }
    
    return adjustedMilestones;
  }

  private increaseMilestoneDifficulty(milestones: SubGoal[]): SubGoal[] {
    return milestones.map(milestone => ({
      ...milestone,
      // Add more challenging aspects while maintaining achievability
    }));
  }

  private decreaseMilestoneDifficulty(milestones: SubGoal[]): SubGoal[] {
    return milestones.map(milestone => ({
      ...milestone,
      // Simplify milestones to make them more attainable
    }));
  }
}