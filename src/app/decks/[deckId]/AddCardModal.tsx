'use client';

import { useState } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addCardAction } from './actions';

// Validation schema matching the server action
const AddCardSchema = z.object({
  front: z.string().min(1, 'Front is required').max(1000, 'Front must be less than 1000 characters'),
  back: z.string().min(1, 'Back is required').max(1000, 'Back must be less than 1000 characters'),
});

type AddCardFormData = z.infer<typeof AddCardSchema>;

interface AddCardModalProps {
  deckId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddCardModal({ deckId, isOpen, onClose }: AddCardModalProps) {
  const [formData, setFormData] = useState<AddCardFormData>({
    front: '',
    back: '',
  });
  const [errors, setErrors] = useState<Partial<AddCardFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Client-side validation
      const validatedData = AddCardSchema.parse(formData);

      // Call server action
      await addCardAction({
        ...validatedData,
        deckId,
      });

      // Reset form and close modal
      setFormData({ front: '', back: '' });
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<AddCardFormData> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof AddCardFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error adding card:', error);
        // You could set a general error message here
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AddCardFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
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
              Add New Card
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Create a new flashcard by adding content to both the front and back.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="front" className="text-white font-medium">
                Front
              </Label>
              <Input
                id="front"
                type="text"
                value={formData.front}
                onChange={(e) => handleInputChange('front', e.target.value)}
                placeholder="Enter the question or prompt..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                disabled={isSubmitting}
              />
              {errors.front && (
                <p className="text-red-400 text-sm">{errors.front}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="back" className="text-white font-medium">
                Back
              </Label>
              <Input
                id="back"
                type="text"
                value={formData.back}
                onChange={(e) => handleInputChange('back', e.target.value)}
                placeholder="Enter the answer or explanation..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                disabled={isSubmitting}
              />
              {errors.back && (
                <p className="text-red-400 text-sm">{errors.back}</p>
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
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Card'
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}