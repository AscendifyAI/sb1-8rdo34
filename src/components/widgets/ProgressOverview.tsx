import React from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';
import { useThemeStore } from '../../lib/store';
import { motion } from 'framer-motion';

interface ProgressStat {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
}

const stats: ProgressStat[] = [
  { icon: TrendingUp, label: 'Weekly Progress', value: '78%', change: 12 },
  { icon: Award, label: 'Goals Completed', value: '3/5', change: -1 },
  { icon: Zap, label: 'Current Streak', value: '7 days', change: 2 },
];

export function ProgressOverview() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`
      rounded-lg p-6
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    `}>
      <h3 className={`font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Progress Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-4 rounded-lg
              ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <stat.icon className="w-5 h-5 text-amber-500" />
              </div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {stat.label}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </span>
              <span className={`
                text-sm
                ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}
              `}>
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}