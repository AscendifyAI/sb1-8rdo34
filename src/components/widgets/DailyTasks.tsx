import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useThemeStore } from '../../lib/store';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

const mockTasks: Task[] = [
  { id: '1', title: 'Complete morning workout routine', completed: true, category: 'Health' },
  { id: '2', title: 'Review weekly goals progress', completed: false, category: 'Planning' },
  { id: '3', title: 'Read 30 minutes of selected book', completed: false, category: 'Learning' },
  { id: '4', title: 'Practice meditation', completed: true, category: 'Wellness' },
];

export function DailyTasks() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`
      rounded-lg p-6
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    `}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Today's Tasks
        </h3>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {mockTasks.filter(t => t.completed).length}/{mockTasks.length} Completed
        </span>
      </div>

      <div className="space-y-3">
        {mockTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center gap-3 p-3 rounded-lg
              ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
              transition-colors cursor-pointer group
            `}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
            )}
            <div className="flex-1">
              <p className={`
                text-sm font-medium
                ${task.completed ? 'line-through' : ''}
                ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
              `}>
                {task.title}
              </p>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {task.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}