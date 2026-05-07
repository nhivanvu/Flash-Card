import { PricingTable } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PricingHeader } from './PricingHeader';

export const metadata: Metadata = {
  title: 'Pricing - FlashyCardy',
  description: 'Start free, upgrade when you need more decks and AI features',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute w-70 h-70 rounded-full blur-3xl opacity-50 z-0" 
           style={{ backgroundColor: '#8b5cf6', top: '10%', left: '15%' }} />
      <div className="absolute w-90 h-90 rounded-full blur-3xl opacity-60 z-0" 
           style={{ backgroundColor: '#3b82f6', top: '40%', right: '25%' }} />
      <div className="absolute w-50 h-50 rounded-full blur-3xl opacity-65 z-0" 
           style={{ backgroundColor: '#6366f1', top: '60%', left: '10%' }} />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <Suspense fallback={<PricingHeaderFallback />}>
          <PricingHeader />
        </Suspense>
        
        <div className="mt-12">
          <PricingTable />
        </div>
        
        {/* Feature comparison section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            What's included?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free plan features */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Free Plan</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Up to 3 flashcard decks
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited cards per deck
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Basic study modes
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Progress tracking
                </li>
              </ul>
            </div>
            
            {/* Pro plan features */}
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Pro Plan
                <span className="ml-2 text-xs bg-gradient-to-r from-purple-400 to-blue-400 text-white px-2 py-1 rounded-full">
                  POPULAR
                </span>
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Unlimited flashcard decks
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Everything in Free
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-2">✨</span>
                  AI-powered flashcard generation
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-2">✨</span>
                  Advanced analytics & insights
                </li>
                <li className="flex items-center">
                  <span className="text-purple-400 mr-2">✨</span>
                  Priority support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fallback component for loading state
function PricingHeaderFallback() {
  return (
    <div className="text-center mb-12">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}