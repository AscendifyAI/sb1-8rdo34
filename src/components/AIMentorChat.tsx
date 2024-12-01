import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { useAI } from '../lib/hooks/useAI';
import { ChatMessage } from '../lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export function AIMentorChat() {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getResponse, isLoading, error } = useAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const aiResponse = await getResponse(input, 'gpt4', {
        userId: user.id,
        previousMessages: messages,
      });
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: aiResponse.message,
        role: 'assistant',
        timestamp: new Date(),
        metadata: {
          suggestions: aiResponse.suggestions,
          nextSteps: aiResponse.nextSteps,
          resources: aiResponse.resources,
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/5 rounded-lg overflow-hidden">
      <div className="p-4 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-amber-500" />
          <h3 className="font-semibold">AI Mentor</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/10'
                }`}
              >
                <p>{message.content}</p>
                {message.metadata?.suggestions && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <p className="text-sm font-medium mb-1">Suggestions:</p>
                    <ul className="text-sm space-y-1">
                      {message.metadata.suggestions.map((suggestion, index) => (
                        <li key={index}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your AI mentor..."
            className="flex-1 bg-white/5 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 text-black rounded-lg p-2 hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}