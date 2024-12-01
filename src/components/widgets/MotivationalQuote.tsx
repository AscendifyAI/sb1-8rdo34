import React from 'react';
import { Quote } from 'lucide-react';
import { useThemeStore } from '../../lib/store';
import { motion } from 'framer-motion';

interface DailyQuote {
  text: string;
  author: string;
  category: string;
}

const mockQuote: DailyQuote = {
  text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  author: "Winston Churchill",
  category: "Persistence"
};

export function MotivationalQuote() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        rounded-lg p-6 relative overflow-hidden
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
      `}
    >
      <Quote className={`
        absolute top-4 right-4 w-8 h-8
        ${theme === 'dark' ? 'text-gray-700' : 'text-gray-200'}
      `} />
      
      <div className="relative">
        <p className={`
          text-lg font-medium mb-4 italic
          ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
        `}>
          "{mockQuote.text}"
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {mockQuote.author}
            </p>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {mockQuote.category}
            </span>
          </div>
          
          <button className={`
            text-sm px-4 py-2 rounded-lg
            ${theme === 'dark' 
              ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' 
              : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
            }
            transition-colors
          `}>
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
}