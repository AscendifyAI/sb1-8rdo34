import React from 'react';
import { Target, ChevronRight } from 'lucide-react';
import { useThemeStore } from '../../lib/store';
import { motion } from 'framer-motion';

interface GoalProgress {
  id: string;
  title: string;
  progress: number;
  category: string;
  daysLeft: number;
}

const mockGoals: GoalProgress[] = [
  { id: '1', title: 'Run 5K Marathon', progress: 65, category: 'Fitness', daysLeft: 14 },
  { id: '2', title: 'Learn TypeScript', progress: 40, category: 'Learning', daysLeft: 30 },
  { id: '3', title: 'Save $5000', progress: 80, category: 'Finance', daysLeft: 60 },
];

export function GoalsWidget() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`
      rounded-lg p-6
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    `}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Active Goals
        </h3>
        <button className={`
          text-sm flex items-center gap-1
          ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}
          hover:opacity-80 transition-opacity
        `}>
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {mockGoals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-4 rounded-lg
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {goal.title}
                </h4>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {goal.category} • {goal.daysLeft} days left
                </span>
              </div>
              <Target className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div className="relative pt-2">
              <div className={`
                h-2 rounded-full
                ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}
              `}>
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <span className={`
                absolute right-0 -top-1 text-xs font-medium
                ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {goal.progress}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}