'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function PricingHeader() {
  const searchParams = useSearchParams();
  const upgrade = searchParams.get('upgrade');

  const upgradeMessages = useMemo(() => {
    const messages = {
      'deck-limit': {
        title: 'Need More Decks?',
        subtitle: 'Upgrade to Pro for unlimited flashcard decks and continue your learning journey',
        highlight: 'unlimited decks',
      },
      'ai-generation': {
        title: 'Unlock AI-Powered Learning',
        subtitle: 'Generate flashcards instantly with AI and supercharge your study sessions',
        highlight: 'AI flashcard generation',
      },
      'analytics': {
        title: 'Get Advanced Insights',
        subtitle: 'Track your progress with detailed analytics and optimize your study habits',
        highlight: 'advanced analytics',
      },
    };

    return messages[upgrade as keyof typeof messages];
  }, [upgrade]);

  const defaultMessage = {
    title: 'Choose Your Plan',
    subtitle: 'Start free, upgrade when you need more decks and AI features',
    highlight: null,
  };

  const message = upgradeMessages || defaultMessage;

  return (
    <div className="text-center mb-12">
      {upgrade && (
        <div className="mb-4 inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full">
          <span className="text-purple-300 text-sm font-medium">
            🚀 Upgrade needed for {upgradeMessages?.highlight}
          </span>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {message.title}
      </h1>
      
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        {message.subtitle}
      </p>
      
      {upgrade && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg max-w-md mx-auto">
          <p className="text-purple-200 text-sm">
            You've hit the limits of the free plan. Upgrade to Pro to continue using all features.
          </p>
        </div>
      )}
    </div>
  );
}