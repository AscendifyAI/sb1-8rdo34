import { GoalTemplate, GoalCategory } from '../types';

export const goalTemplates: Record<GoalCategory, GoalTemplate[]> = {
  fitness: [
    {
      id: 'weight-loss',
      title: 'Weight Loss Journey',
      description: 'Achieve your target weight through sustainable habits',
      defaultMetrics: [
        { name: 'weight', type: 'numeric', unit: 'kg' },
        { name: 'bodyFat', type: 'percentage' },
        { name: 'caloriesConsumed', type: 'numeric', unit: 'kcal' },
        { name: 'workoutsPerWeek', type: 'numeric' }
      ],
      suggestedMilestones: [
        'Initial health assessment',
        'Establish baseline measurements',
        'Create meal plan',
        'Develop workout routine',
        'First weight milestone (5%)',
        'Halfway point',
        'Final goal weight'
      ],
      recommendedDuration: { min: 90, max: 180, unit: 'days' }
    },
    {
      id: 'strength-training',
      title: 'Strength Building Program',
      description: 'Build muscle and increase strength systematically',
      defaultMetrics: [
        { name: 'benchPress', type: 'numeric', unit: 'kg' },
        { name: 'squat', type: 'numeric', unit: 'kg' },
        { name: 'deadlift', type: 'numeric', unit: 'kg' },
        { name: 'proteinIntake', type: 'numeric', unit: 'g' }
      ],
      suggestedMilestones: [
        'Form assessment',
        'Establish baseline lifts',
        'First strength milestone',
        'Nutrition plan optimization',
        'Intermediate lifting goals',
        'Advanced lifting goals'
      ],
      recommendedDuration: { min: 120, max: 240, unit: 'days' }
    }
  ],
  career: [
    {
      id: 'skill-development',
      title: 'Professional Skill Development',
      description: 'Master new skills to advance your career',
      defaultMetrics: [
        { name: 'coursesCompleted', type: 'numeric' },
        { name: 'projectsDelivered', type: 'numeric' },
        { name: 'certifications', type: 'numeric' },
        { name: 'practiceHours', type: 'numeric' }
      ],
      suggestedMilestones: [
        'Skill assessment',
        'Learning path creation',
        'Basic proficiency',
        'Intermediate skills',
        'Advanced mastery',
        'Real-world application'
      ],
      recommendedDuration: { min: 60, max: 180, unit: 'days' }
    }
  ],
  // Add more categories and templates...
};

export const getTemplateById = (id: string): GoalTemplate | undefined => {
  return Object.values(goalTemplates)
    .flat()
    .find(template => template.id === id);
};

export const getTemplatesByCategory = (category: GoalCategory): GoalTemplate[] => {
  return goalTemplates[category] || [];
};