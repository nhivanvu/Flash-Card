import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getUserDecksWithCardCounts } from '@/db/queries/decks'
import { DeckCard } from './DeckCard'
import CreateDeckModal from './CreateDeckModal'

export const metadata: Metadata = {
  title: 'Dashboard - FlashyCardy',
  description: 'Manage your flash cards and study sessions',
}

export default async function Dashboard() {
  const { userId, has } = await auth()
  
  // Redirect to home if not authenticated (user can sign in via modal there)
  if (!userId) {
    redirect('/')
  }

  // Check billing status
  const hasUnlimitedDecks = has({ feature: 'unlimited_decks' })
  const isProUser = has({ plan: 'pro' })

  // Get user details from Clerk
  const user = await currentUser()
  const firstName = user?.firstName || 'Friend'

  // Fetch user's decks with card counts using query helper
  const userDecksWithCardCounts = await getUserDecksWithCardCounts(userId)

  // Check if user has reached free plan limits
  const deckCount = userDecksWithCardCounts.length
  const hasReachedFreeLimit = !hasUnlimitedDecks && deckCount >= 3
  const isNearLimit = !hasUnlimitedDecks && deckCount === 2

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
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {firstName}!
              </h1>
              <p className="text-base text-gray-400">
                Ready to continue your learning journey?
              </p>
            </div>
            
            {/* Plan Status Badge */}
            <div className="flex items-center gap-4">
              {isProUser ? (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-white font-medium text-sm">Pro Plan</span>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-gray-300 font-medium text-sm">Free Plan</span>
                  <span className="text-gray-400 text-sm">({deckCount}/3 decks)</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Create New Deck Button with Billing Logic */}
        <div className="space-y-4">
          {hasReachedFreeLimit ? (
            // Show upgrade prompt when limit is reached
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-6 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">You've reached your deck limit!</h3>
                  <p className="text-gray-400">Free users can create up to 3 decks. Upgrade to Pro for unlimited decks.</p>
                </div>
              </div>
              <Link 
                href="/pricing?upgrade=deck-limit"
                className="bg-gradient-to-r from-purple-400 to--500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 w-fit"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                🚀 Upgrade to Pro
              </Link>
            </div>
          ) : (
            // Show create button with optional limit warning
            <div className="space-y-3">
              {isNearLimit && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center gap-3">
                  <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-yellow-300 text-sm font-medium">
                      You can create {3 - deckCount} more deck{3 - deckCount !== 1 ? 's' : ''} on the free plan
                    </p>
                    <Link href="/pricing?upgrade=deck-limit" className="text-yellow-400 hover:text-yellow-300 text-sm underline">
                      Upgrade to Pro for unlimited decks
                    </Link>
                  </div>
                </div>
              )}
              <CreateDeckModal>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Deck
                  {!hasUnlimitedDecks && (
                    <span className="bg-white/20 px-2 py-1 rounded text-xs">
                      {deckCount}/3
                    </span>
                  )}
                </button>
              </CreateDeckModal>
            </div>
          )}
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
              
              <CreateDeckModal>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create your first deck
                  {!hasUnlimitedDecks && (
                    <span className="bg-white/20 px-2 py-1 rounded text-xs">
                      Free: 3 decks max
                    </span>
                  )}
                </button>
              </CreateDeckModal>
              
              {!hasUnlimitedDecks && (
                <p className="text-sm text-gray-500">
                  Free plan includes up to 3 decks. 
                  <Link href="/pricing?upgrade=deck-limit" className="text-purple-400 hover:text-purple-300 underline ml-1">
                    Upgrade to Pro for unlimited decks
                  </Link>
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}