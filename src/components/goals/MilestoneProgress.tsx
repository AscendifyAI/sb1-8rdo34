import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { SubGoal } from '../../lib/services/ai/types';
import { useThemeStore } from '../../lib/store';

interface MilestoneProgressProps {
  milestones: SubGoal[];
  onMilestoneClick: (milestone: SubGoal) => void;
}

export function MilestoneProgress({ 
  milestones, 
  onMilestoneClick 
}: MilestoneProgressProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onMilestoneClick(milestone)}
          className={`
            p-4 rounded-lg cursor-pointer
            ${theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-white hover:bg-gray-50'}
            transition-colors
          `}
        >
          <div className="flex items-center gap-3">
            {milestone.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            
            <div className="flex-1">
              <h4 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {milestone.title}
              </h4>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 rounded-full bg-gray-200">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {milestone.progress}%
                </span>
              </div>
            </div>

            <ChevronRight className={`w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}