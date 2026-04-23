'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription 
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteDeckAction } from './actions'

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCardClick = () => {
    router.push(`/decks/${deck.id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/decks/${deck.id}/edit`)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteDeckAction(deck.id)
      setShowDeleteDialog(false)
    } catch (error) {
      console.error('Failed to delete deck:', error)
      // You could add toast notification here
    } finally {
      setIsDeleting(false)
    }
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
        <Button 
          onClick={handleDeleteClick}
          variant="outline" 
          size="sm"
          className="w-full flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </Button>
      </CardFooter>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-black/95 backdrop-blur-md border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Delete {deck.title}?</DialogTitle>
            <DialogDescription className="text-gray-300">
              This will permanently delete all {deck.cardCount} cards. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}