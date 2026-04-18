'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription 
} from '@/components/ui/card'

interface DeckCardProps {
  deck: {
    id: string
    title: string
    description: string | null
    createdAt: Date
    cardCount: number
  }
}

export function DeckCard({ deck }: DeckCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/decks/${deck.id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/decks/${deck.id}/edit`)
  }

  const handleStudyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/decks/${deck.id}`)
  }

  return (
    <Card
      onClick={handleCardClick}
      className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 ring-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:ring-white/30 hover:shadow-2xl hover:scale-105 cursor-pointer"
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
          onClick={handleStudyClick}
          variant="default" 
          size="sm"
          className="w-full flex-1"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Study
        </Button>
        <Button 
          onClick={handleEditClick}
          variant="outline" 
          size="sm"
          className="w-full flex-1"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}