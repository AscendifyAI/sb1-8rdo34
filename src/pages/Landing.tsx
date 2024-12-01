import React from 'react';
import { Brain, Target, Sparkles, ArrowRight } from 'lucide-react';
import { SignUpForm } from '../components/SignUpForm';
import { PricingCard } from '../components/PricingCard';

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm">Your Personal AI Success Partner</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-400 text-transparent bg-clip-text">
          Achieve Your Goals with AI Guidance
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Transform your aspirations into achievements with Ascendify's AI-powered mentorship platform.
          Set goals, track progress, and receive personalized guidance every step of the way.
        </p>
        <SignUpForm />
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">AI Mentorship</h3>
            <p className="text-gray-400">
              Get personalized guidance from our advanced AI mentor, available 24/7 to support your journey.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Goal Tracking</h3>
            <p className="text-gray-400">
              Set and track your goals with our intuitive dashboard. Watch your progress unfold in real-time.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
              <ArrowRight className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-4">Daily Tasks</h3>
            <p className="text-gray-400">
              Receive personalized daily tasks and actionable steps to keep you moving toward your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Choose Your Path</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Select the plan that best fits your journey. Upgrade or downgrade anytime as your needs evolve.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            name="Free"
            price="Free"
            features={[
              'Basic AI mentorship',
              'Goal setting tools',
              'Progress tracking',
              'Community access',
            ]}
          />
          <PricingCard
            name="Pro"
            price="$29"
            features={[
              'Advanced AI mentorship',
              'Unlimited goal tracking',
              'Priority support',
              'Custom action plans',
              'Analytics dashboard',
            ]}
            recommended={true}
          />
          <PricingCard
            name="Enterprise"
            price="$99"
            features={[
              'Dedicated AI mentor',
              'Team collaboration',
              'Custom integrations',
              'Advanced analytics',
              'White-label options',
            ]}
          />
        </div>
      </section>
    </div>
  );
}