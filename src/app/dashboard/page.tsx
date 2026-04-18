import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { db } from '@/db'
import { decks, cards } from '@/db/schema'
import { eq, desc, count } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription 
} from '@/components/ui/card'

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

  // Fetch user's decks with card counts
  const userDecksWithCardCounts = await db
    .select({
      id: decks.id,
      title: decks.title,
      description: decks.description,
      createdAt: decks.createdAt,
      cardCount: count(cards.id),
    })
    .from(decks)
    .leftJoin(cards, eq(cards.deckId, decks.id))
    .where(eq(decks.userId, userId))
    .groupBy(decks.id, decks.title, decks.description, decks.createdAt)
    .orderBy(desc(decks.createdAt))

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
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
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
              <Card
                key={deck.id}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:ring-white/30 hover:shadow-2xl hover:scale-105"
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
                
                <CardHeader className="relative z-10 space-y-3 p-6">
                  <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {deck.title}
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-400 space-x-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{deck.cardCount} cards</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(deck.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardHeader>

                {deck.description && (
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-300 line-clamp-2">
                      {deck.description}
                    </CardDescription>
                  </CardContent>
                )}

                <CardFooter className="relative z-10 bg-transparent border-t-white/10 p-6 space-x-3 mt-auto">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="flex-1"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Study
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                </CardFooter>
              </Card>
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
              
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto">
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