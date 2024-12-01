import React from 'react';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export function PricingCard({ name, price, features, recommended }: PricingTier) {
  return (
    <div className={`relative rounded-2xl p-8 ${recommended ? 'bg-gradient-to-br from-black to-navy-900 text-white' : 'bg-white'}`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-1 rounded-full text-sm font-semibold text-black">
          Recommended
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-sm opacity-75">/month</span>}
      </div>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-amber-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-all
          ${recommended
            ? 'bg-amber-500 hover:bg-amber-600 text-black'
            : 'bg-black hover:bg-gray-800 text-white'
          }`}
      >
        Get Started
      </button>
    </div>
  );
}