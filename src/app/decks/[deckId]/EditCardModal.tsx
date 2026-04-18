'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import type { Card } from '@/db/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { editCardAction } from './actions';

// Validation schema for editing cards with comprehensive rules
const createEditCardSchema = (existingCards: Card[], currentCardId: string) => z.object({
  front: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, 'Front field cannot be empty')
        .max(500, 'Front text cannot exceed 500 characters')
        .refine((front) => {
          return !existingCards.some(card => 
            card.id !== currentCardId && 
            card.front.trim().toLowerCase() === front.toLowerCase()
          );
        }, 'A card with this front text already exists in the deck')
    ),
  back: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, 'Back field cannot be empty')
        .max(500, 'Back text cannot exceed 500 characters')
    ),
}).refine((data) => data.front !== data.back, {
  message: 'Front and back text cannot be identical',
  path: ['back'],
});

interface EditCardModalProps {
  card: Card | null;
  deckId: string;
  isOpen: boolean;
  onClose: () => void;
  existingCards: Card[];
}

export function EditCardModal({ card, deckId, isOpen, onClose, existingCards }: EditCardModalProps) {
  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update form data when card changes
  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front,
        back: card.back,
      });
    }
  }, [card]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Create schema with existing cards context
  const EditCardSchema = card 
    ? createEditCardSchema(existingCards, card.id) 
    : null;
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Prevent submission if no card or schema
    if (!card || !EditCardSchema || isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Client-side validation with comprehensive rules
      const validatedData = EditCardSchema.parse(formData);

      // Call server action
      await editCardAction({
        ...validatedData,
        cardId: card.id,
        deckId,
      });

      // Show success toast
      toast({
        title: "Card updated successfully!",
        variant: "success",
      });

      // Close modal
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0]?.toString() || 'general';
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error editing card:', error);
        toast({
          title: "Error updating card",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'front' | 'back', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
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
              Edit Card
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Update the content for both the front and back of your flashcard.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="edit-front" className="text-white font-medium">
                  Front
                </Label>
                <span className={`text-xs ${formData.front.length > 500 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.front.length}/500
                </span>
              </div>
              <Textarea
                id="edit-front"
                rows={3}
                value={formData.front}
                onChange={(e) => handleInputChange('front', e.target.value)}
                placeholder="Enter the question or prompt..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20 resize-none"
                disabled={isSubmitting}
              />
              {errors.front && (
                <p className="text-red-400 text-sm mt-1">{errors.front}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="edit-back" className="text-white font-medium">
                  Back
                </Label>
                <span className={`text-xs ${formData.back.length > 500 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.back.length}/500
                </span>
              </div>
              <Textarea
                id="edit-back"
                rows={3}
                value={formData.back}
                onChange={(e) => handleInputChange('back', e.target.value)}
                placeholder="Enter the answer or explanation..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20 resize-none"
                disabled={isSubmitting}
              />
              {errors.back && (
                <p className="text-red-400 text-sm mt-1">{errors.back}</p>
              )}
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !card}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Card'
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}