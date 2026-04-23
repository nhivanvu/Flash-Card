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
  const [shuffledCards, setShuffledCards] = useState<Card[]>(cards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectCards, setIncorrectCards] = useState<Card[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [showResponseButtons, setShowResponseButtons] = useState(false);

  // Initialize shuffled cards on mount
  useEffect(() => {
    setShuffledCards(cards);
  }, [cards]);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setAwaitingResponse(false);
    setShowResponseButtons(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIncorrectCards([]);
    setShowSummary(false);
  };

  const handleNext = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setAwaitingResponse(false);
      setShowResponseButtons(false);
    } else {
      // Show summary screen
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      setAwaitingResponse(false);
      setShowResponseButtons(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setAwaitingResponse(true);
      // Show response buttons exactly when card flip animation completes (700ms)
      setTimeout(() => {
        setShowResponseButtons(true);
      }, 680); // Slightly reduced to account for execution time and match animation precisely
    } else {
      setShowResponseButtons(false);
    }
  };

  const handleGotIt = () => {
    setCorrectCount(prev => prev + 1);
    setAwaitingResponse(false);
    setShowResponseButtons(false);
    // Auto-advance to summary if this is the last card
    if (currentCardIndex === shuffledCards.length - 1) {
      setShowSummary(true);
    } else {
      handleNext();
    }
  };

  const handleStillLearning = () => {
    const currentCard = shuffledCards[currentCardIndex];
    setIncorrectCount(prev => prev + 1);
    setIncorrectCards(prev => [...prev, currentCard]);
    setAwaitingResponse(false);
    setShowResponseButtons(false);
    // Auto-advance to summary if this is the last card
    if (currentCardIndex === shuffledCards.length - 1) {
      setShowSummary(true);
    } else {
      handleNext();
    }
  };

  const studyIncorrectOnly = () => {
    setShuffledCards(incorrectCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setAwaitingResponse(false);
    setShowResponseButtons(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIncorrectCards([]);
    setShowSummary(false);
  };

  const endStudySession = () => {
    onEndStudySession();
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setAwaitingResponse(false);
    setShowResponseButtons(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIncorrectCards([]);
    setShowSummary(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (showSummary) return; // Don't handle shortcuts on summary screen
      
      // Prevent default behavior for handled keys
      const handledKeys = [' ', 'Enter', 'ArrowRight', 'ArrowLeft', 'l', 'j', 'L', 'J', '1', '2'];
      if (handledKeys.includes(event.key)) {
        event.preventDefault();
      }

      if (showResponseButtons) {
        // When showing response buttons, only allow Got It / Still Learning
        switch (event.key) {
          case '1':
          case 'ArrowRight':
          case 'l':
          case 'L':
            handleGotIt();
            break;
          case '2':
          case 'ArrowLeft':
          case 'j':
          case 'J':
            handleStillLearning();
            break;
        }
      } else {
        // Normal navigation
        switch (event.key) {
          case ' ': // Spacebar
          case 'Enter':
            if (!isFlipped) {
              handleFlip();
            }
            break;
          case 'ArrowRight':
          case 'l':
          case 'L':
            if (!awaitingResponse) {
              handleNext();
            }
            break;
          case 'ArrowLeft':
          case 'j':
          case 'J':
            if (!awaitingResponse) {
              handlePrevious();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isFlipped, awaitingResponse, showResponseButtons, showSummary]); // Dependencies to ensure handlers use current state

  // Early return after all hooks are called
  if (shuffledCards.length === 0 || !isStudyMode) return null;

  const currentCard = shuffledCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / shuffledCards.length) * 100;

  // Summary screen
  if (showSummary) {
    const totalCards = shuffledCards.length;
    const percentage = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;
    
    return (
      <section className="space-y-8 text-center">
        {/* Summary Card */}
        <div 
          className="mx-auto max-w-md p-8 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">📚 Study Session Complete</h2>
          
          <div className="space-y-4 text-lg">
            <div className="text-white">
              <span className="text-gray-400">Total cards studied:</span> {totalCards}
            </div>
            <div className="text-green-400">
              <span className="text-gray-400">Correct:</span> {correctCount}
            </div>
            <div className="text-red-400">
              <span className="text-gray-400">Still learning:</span> {incorrectCount}
            </div>
            <div className="text-white font-semibold text-xl">
              <span className="text-gray-400">Score:</span> {percentage}%
            </div>
          </div>
          
          {percentage >= 80 && (
            <div className="mt-4 text-yellow-400 text-lg">🎉 Great job!</div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Button
            onClick={shuffleCards}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            🔀 Shuffle
          </Button>
          
          {incorrectCards.length > 0 && (
            <Button
              onClick={studyIncorrectOnly}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              📚 Study incorrect only
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

  return (
    <section className="space-y-6">
      {/* Shuffle button positioned on the right */}
      <div className="flex justify-end">
        <Button
          onClick={shuffleCards}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Shuffle
          <svg className="w-4 h-4 ml-2" fill="white" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </Button>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Card {currentCardIndex + 1} of {shuffledCards.length}</span>
          
          {/* Score tracker centered between labels */}
          {(correctCount > 0 || incorrectCount > 0) && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-400">
                ✅ {correctCount}
              </span>
              <span className="text-red-400">
                ❌ {incorrectCount}
              </span>
            </div>
          )}
          
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Hints */}
      <div className="flex justify-center items-center gap-3 opacity-90 flex-wrap">
        {showResponseButtons ? (
          <>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800/60 border border-gray-700/60 text-gray-300 font-mono text-xs">
                1
              </span>
              <span>got it</span>
            </div>
            <div className="w-px h-2.5 bg-gray-600/60"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800/60 border border-gray-700/60 text-gray-300 font-mono text-xs">
                2
              </span>
              <span>still learning</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800/60 border border-gray-700/60 text-gray-300 font-mono text-xs">
                Space
              </span>
              <span>flip</span>
            </div>
            <div className="w-px h-2.5 bg-gray-600/60"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800/60 border border-gray-700/60 text-gray-300 font-mono text-xs">
                →
              </span>
              <span>next</span>
            </div>
            <div className="w-px h-2.5 bg-gray-600/60"></div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800/60 border border-gray-700/60 text-gray-300 font-mono text-xs">
                ←
              </span>
              <span>previous</span>
            </div>
          </>
        )}
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

      {/* Study Controls */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {showResponseButtons ? (
          // Show Got It / Still Learning buttons
          <>
            <Button
              onClick={handleGotIt}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              ✅ Got it
            </Button>
            
            <Button
              onClick={handleStillLearning}
              className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              ❌ Still learning
            </Button>
          </>
        ) : (
          // Show normal navigation buttons
          <>
            <Button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-80 disabled:cursor-not-allowed"
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

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </>
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