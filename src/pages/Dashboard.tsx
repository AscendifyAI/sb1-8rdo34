import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AIMentorChat } from '../components/AIMentorChat';
import { DailyTasks } from '../components/widgets/DailyTasks';
import { ProgressOverview } from '../components/widgets/ProgressOverview';
import { GoalsWidget } from '../components/widgets/GoalsWidget';
import { MotivationalQuote } from '../components/widgets/MotivationalQuote';
import { useThemeStore } from '../lib/store';

export function Dashboard() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressOverview />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DailyTasks />
            <GoalsWidget />
          </div>
          <MotivationalQuote />
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Your AI Mentor
            </h2>
            <AIMentorChat />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}