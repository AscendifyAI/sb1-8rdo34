import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { useThemeStore, useAuthStore } from '../../lib/store';

export function TopBar() {
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((state) => state.user);

  return (
    <header className={`
      h-16 px-8 border-b
      ${theme === 'dark' 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
      }
    `}>
      <div className="h-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Welcome back, {user?.name}!</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition-colors
              ${theme === 'dark' 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-100'
              }
            `}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            className={`
              p-2 rounded-lg transition-colors relative
              ${theme === 'dark' 
                ? 'hover:bg-gray-700' 
                : 'hover:bg-gray-100'
              }
            `}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)} Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}