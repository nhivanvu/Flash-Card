import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getUserDecksWithCardCounts } from '@/db/queries/decks'
import { DeckCard } from './DeckCard'

export const metadata: Metadata = {
  title: 'Dashboard - FlashyCardy',
  description: 'Manage your flash cards and study sessions',
}

export default async function Dashboard() {
  const { userId } = await auth()
  
  // Redirect to home if not authenticated (user can sign in via modal there)
  if (!userId) {
    redirect('/')
  }

  // Get user details from Clerk
  const user = await currentUser()
  const firstName = user?.firstName || 'Friend'

  // Fetch user's decks with card counts using query helper
  const userDecksWithCardCounts = await getUserDecksWithCardCounts(userId)

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
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {firstName}!
          </h1>
          <p className="text-base text-gray-400">
            Ready to continue your learning journey?
          </p>
        </header>

        {/* Create New Deck Button */}
        <div>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Deck
          </button>
        </div>

        {/* Decks Grid */}
        {userDecksWithCardCounts.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {userDecksWithCardCounts.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </section>
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
                  You don't have any decks yet
                </h3>
                <p className="text-gray-400">
                  Create your first deck to start your learning journey with flashcards
                </p>
              </div>
              
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create your first deck
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}