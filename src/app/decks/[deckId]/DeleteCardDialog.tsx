'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteCardAction } from './actions';
import type { Card } from '@/db/schema';

interface DeleteCardDialogProps {
  card: Card | null;
  deckId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteCardDialog({ card, deckId, isOpen, onClose }: DeleteCardDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!card || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteCardAction(card.id, deckId);

      toast({
        title: "Card deleted successfully!",
        variant: "success",
      });

      onClose();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: "Error deleting card",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/40 backdrop-blur-md border-white/20 text-white max-w-md">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
        
        <div className="relative z-10">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold text-white">
              Delete Card
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Are you sure you want to delete this card? This action cannot be undone.
            </DialogDescription>
            
            {card && (
              <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-400">Front:</span>
                    <p className="text-white">{card.front}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-400">Back:</span>
                    <p className="text-white">{card.back}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogHeader>
          
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete Card'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}