import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Calendar, 
  MessageSquare, 
  Book, 
  Settings,
  Phone,
  Video,
  Users,
  LogOut
} from 'lucide-react';
import { useThemeStore, useAuthStore } from '../../lib/store';

export function Sidebar() {
  const theme = useThemeStore((state) => state.theme);
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'AI Mentor', path: '/mentor' },
    { icon: Book, label: 'Resources', path: '/resources' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const baseClasses = `
    fixed left-0 top-0 h-screen w-64 
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} 
    border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
    p-4 flex flex-col
  `;

  return (
    <aside className={baseClasses}>
      <div className="flex items-center gap-2 mb-8">
        <Target className="w-8 h-8 text-amber-500" />
        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Ascendify
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive 
                ? 'bg-amber-500 text-white' 
                : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 pt-4 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-colors">
          <Phone className="w-5 h-5" />
          <span>Voice Call</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-colors">
          <Video className="w-5 h-5" />
          <span>Video Call</span>
        </button>
      </div>

      <button 
        onClick={() => logout()}
        className={`
          mt-4 flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors
          ${theme === 'dark' 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </aside>
  );
}