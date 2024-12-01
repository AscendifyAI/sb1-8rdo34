import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Rocket, Book, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface Question {
  id: string;
  title: string;
  description: string;
  options?: string[];
  type: 'select' | 'text' | 'multiselect';
}

const questions: Question[] = [
  {
    id: 'primary_goal',
    title: 'What is your primary goal?',
    description: 'Choose the main area you want to focus on',
    type: 'select',
    options: [
      'Career Growth',
      'Personal Development',
      'Health & Fitness',
      'Learning & Education',
      'Financial Success',
      'Business Growth',
    ],
  },
  {
    id: 'challenges',
    title: 'What challenges are you facing?',
    description: 'Select all that apply',
    type: 'multiselect',
    options: [
      'Time Management',
      'Lack of Motivation',
      'Unclear Direction',
      'Limited Resources',
      'Work-Life Balance',
      'Procrastination',
    ],
  },
  {
    id: 'specific_goal',
    title: 'What specific outcome do you want to achieve?',
    description: 'Be as specific as possible about your desired result',
    type: 'text',
  },
];

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit answers and redirect to dashboard
      console.log('Final answers:', answers);
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'select':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQuestion.id] === option
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'multiselect':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => {
              const selected = (answers[currentQuestion.id] || []).includes(option);
              return (
                <button
                  key={option}
                  onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    handleAnswer(
                      selected
                        ? current.filter((item: string) => item !== option)
                        : [...current, option]
                    );
                  }}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selected ? 'bg-amber-500 text-black' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        );
      case 'text':
        return (
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={4}
            placeholder="Type your answer here..."
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="h-1 bg-white/10 rounded-full">
            <div
              className="h-1 bg-amber-500 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">{currentQuestion.title}</h2>
          <p className="text-gray-400 mb-8">{currentQuestion.description}</p>

          {renderQuestionInput()}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-black transition-all ${
                !answers[currentQuestion.id]
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-amber-600'
              }`}
            >
              {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}