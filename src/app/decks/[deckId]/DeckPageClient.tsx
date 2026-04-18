'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Deck, Card } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { 
  Card as UICard,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription 
} from '@/components/ui/card';
import StudyCards from './StudyCards';

interface DeckPageClientProps {
  deck: Deck;
  cards: Card[];
}

export default function DeckPageClient({ deck, cards }: DeckPageClientProps) {
  const [isStudyMode, setIsStudyMode] = useState(false);

  const startStudySession = () => {
    setIsStudyMode(true);
  };

  const endStudySession = () => {
    setIsStudyMode(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute w-70 h-70 rounded-full blur-3xl opacity-30 z-0" 
           style={{ backgroundColor: '#8b5cf6', top: '5%', right: '10%' }} />
      <div className="absolute w-90 h-90 rounded-full blur-3xl opacity-40 z-0" 
           style={{ backgroundColor: '#3b82f6', top: '30%', left: '5%' }} />
      <div className="absolute w-50 h-50 rounded-full blur-3xl opacity-50 z-0" 
           style={{ backgroundColor: '#6366f1', bottom: '20%', right: '15%' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-16 py-16 space-y-12">
        {/* Header Section */}
        <header className="space-y-6">
          {/* Back button */}
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Button>
          </Link>

          {/* Deck info with inline Start Study Session button */}
          <div className="space-y-2 mt-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">
                {deck.title}
              </h1>
              {cards.length > 0 && !isStudyMode && (
                <Button 
                  onClick={startStudySession}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Study Session
                </Button>
              )}
            </div>
            {deck.description && (
              <p className="text-lg text-gray-400">
                {deck.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>{cards.length} cards</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Created {new Date(deck.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cards Content */}
        {cards.length > 0 ? (
          <div className="space-y-8">
            {/* Study Mode Component */}
            <StudyCards 
              cards={cards} 
              isStudyMode={isStudyMode}
              onEndStudySession={endStudySession}
            />
            
            {!isStudyMode && (
              /* Cards Grid View */
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">All Cards</h2>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
    + Add Card
  </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards.map((card) => (
                    <UICard
                      key={card.id}
                      className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:ring-white/30 hover:shadow-2xl hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
                      
                      <CardHeader className="relative z-10 p-4">
                        <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {card.front}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 p-4 pt-0">
                        <CardDescription className="text-gray-300">
                          {card.back}
                        </CardDescription>
                      </CardContent>

                      <div className="relative z-10 p-4 pt-0 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                      </div>
                    </UICard>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Empty State */
          <section className="text-center py-16">
            <div className="mx-auto max-w-md space-y-8">
              {/* Empty state icon */}
              <div className="mx-auto w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  No cards in this deck yet
                </h3>
                <p className="text-gray-400">
                  Add your first card to start studying
                </p>
              </div>
              
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 mx-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add your first card
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}