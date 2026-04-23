'use client';

import { useState, useEffect } from 'react';
import type { Card } from '@/db/schema';
import { Button } from '@/components/ui/button';

interface StudyCardsProps {
  cards: Card[];
  isStudyMode: boolean;
  onEndStudySession: () => void;
}

export default function StudyCards({ cards, isStudyMode, onEndStudySession }: StudyCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // End of study session
      onEndStudySession();
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const endStudySession = () => {
    onEndStudySession();
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for handled keys
      const handledKeys = [' ', 'Enter', 'ArrowRight', 'ArrowLeft', 'l', 'j', 'L', 'J'];
      if (handledKeys.includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case ' ': // Spacebar
        case 'Enter':
          handleFlip();
          break;
        case 'ArrowRight':
        case 'l':
        case 'L':
          handleNext();
          break;
        case 'ArrowLeft':
        case 'j':
        case 'J':
          handlePrevious();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isFlipped]); // Dependencies to ensure handlers use current state

  // Early return after all hooks are called
  if (cards.length === 0 || !isStudyMode) return null;

  const currentCard = cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / cards.length) * 100;

  return (
    <section className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Card {currentCardIndex + 1} of {cards.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center py-8">
        <div className="perspective-1000">
          <div 
            className="flashcard-container cursor-pointer" 
            onClick={handleFlip}
          >
            <div className={`flashcard-inner relative w-96 h-64 transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front of card */}
              <div 
                className="flashcard-face absolute inset-0 w-full h-full backface-hidden rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="text-center p-6 space-y-2">
                  <div className="text-2xl font-bold text-white break-words">
                    {currentCard.front}
                  </div>
                  <div className="text-sm text-gray-400">
                    Click to reveal answer
                  </div>
                </div>
              </div>
              
              {/* Back of card */}
              <div 
                className="flashcard-face absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="text-center p-6 space-y-2">
                  <div className="text-2xl font-bold text-white break-words">
                    {currentCard.back}
                  </div>
                  <div className="text-sm text-gray-400">
                    Click to flip back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hints */}
      <div className="flex justify-center items-center gap-3 pb-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800/50 border border-gray-700/50 text-gray-300 font-mono">
            Space
          </span>
          <span>to flip</span>
        </div>
        <div className="w-px h-4 bg-gray-600/50"></div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800/50 border border-gray-700/50 text-gray-300 font-mono">
            →
          </span>
          <span>next</span>
        </div>
        <div className="w-px h-4 bg-gray-600/50"></div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800/50 border border-gray-700/50 text-gray-300 font-mono">
            ←
          </span>
          <span>previous</span>
        </div>
      </div>

      {/* Study Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Button>

        <Button
          onClick={handleFlip}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Flip
        </Button>

        {currentCardIndex < cards.length - 1 ? (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Next
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Complete
          </Button>
        )}

        <Button
          onClick={endStudySession}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          End Session
        </Button>
      </div>
    </section>
  );
}