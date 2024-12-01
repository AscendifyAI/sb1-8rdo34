import { Goal, SubGoal } from '../../services/ai/types';
import { ResearchEngine } from '../../services/ai/core/ResearchEngine';

export class MilestoneRecommender {
  private researchEngine: ResearchEngine;

  constructor() {
    this.researchEngine = new ResearchEngine();
  }

  async generateRecommendations(goal: Goal): Promise<SubGoal[]> {
    const research = await this.researchEngine.conductResearch({
      query: `best practices for achieving ${goal.title} in ${goal.category}`,
      goalContext: [goal],
      userPreferences: {},
      maxResults: 5
    });

    return this.synthesizeRecommendations(research, goal);
  }

  async suggestNextMilestone(goal: Goal): Promise<SubGoal> {
    const completedMilestones = goal.milestones.filter(m => m.status === 'completed');
    const nextIndex = completedMilestones.length;
    
    const recommendation = await this.generateMilestoneRecommendation(
      goal,
      completedMilestones
    );

    return {
      id: `${goal.id}-next-${nextIndex}`,
      parentId: goal.id,
      title: recommendation.title,
      description: recommendation.description,
      progress: 0,
      status: 'not_started',
      dueDate: this.calculateOptimalDueDate(goal, nextIndex)
    };
  }

  private async generateMilestoneRecommendation(
    goal: Goal,
    completedMilestones: SubGoal[]
  ): Promise<{ title: string; description: string }> {
    const research = await this.researchEngine.conductResearch({
      query: `next step after ${completedMilestones.map(m => m.title).join(', ')} for ${goal.title}`,
      goalContext: [goal],
      userPreferences: {},
      maxResults: 1
    });

    return {
      title: research[0]?.title || 'Next milestone',
      description: research[0]?.snippet || ''
    };
  }

  private synthesizeRecommendations(research: any[], goal: Goal): SubGoal[] {
    return research.map((result, index) => ({
      id: `${goal.id}-recommendation-${index}`,
      parentId: goal.id,
      title: this.extractMilestoneTitle(result),
      description: result.snippet,
      progress: 0,
      status: 'not_started',
      dueDate: this.calculateOptimalDueDate(goal, index)
    }));
  }

  private extractMilestoneTitle(research: any): string {
    // Extract the most relevant phrase as a milestone title
    return research.title.split(' - ')[0];
  }

  private calculateOptimalDueDate(goal: Goal, milestoneIndex: number): Date {
    const totalDuration = goal.targetDate.getTime() - new Date().getTime();
    const intervalDuration = totalDuration / (goal.milestones.length + 1);
    
    const dueDate = new Date();
    dueDate.setTime(dueDate.getTime() + (intervalDuration * (milestoneIndex + 1)));
    
    return dueDate;
  }
}