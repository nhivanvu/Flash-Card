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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createDeckAction } from './actions';

// Validation schema
const CreateDeckSchema = z.object({
  title: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, 'Title cannot be empty')
        .max(100, 'Title cannot exceed 100 characters')
    ),
  description: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .max(500, 'Description cannot exceed 500 characters')
    )
    .optional()
    .or(z.literal('')),
});

interface CreateDeckModalProps {
  children: React.ReactNode;
}

export default function CreateDeckModal({ children }: CreateDeckModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Client-side validation
      const validatedData = CreateDeckSchema.parse(formData);

      // Call server action
      await createDeckAction({
        title: validatedData.title,
        description: validatedData.description || undefined,
      });

      // Show success toast
      toast({
        title: "Deck created successfully!",
        variant: "success",
      });

      // Reset form and close modal
      setFormData({ title: '', description: '' });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0]?.toString() || 'general';
          fieldErrors[fieldName] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error creating deck:', error);
        toast({
          title: "Error creating deck",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'title' | 'description', value: string) => {
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-black/40 backdrop-blur-md border-white/20 text-white max-w-md">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
        
        <div className="relative z-10">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold text-white">
              Create New Deck
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Create a new flashcard deck to organize your learning topics.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="title" className="text-white font-medium">
                  Title
                </Label>
                <span className={`text-xs ${formData.title.length > 100 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.title.length}/100
                </span>
              </div>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter deck title..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description" className="text-white font-medium">
                  Description (optional)
                </Label>
                <span className={`text-xs ${formData.description.length > 500 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.description.length}/500
                </span>
              </div>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter deck description..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20 resize-none"
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
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
                    Creating...
                  </>
                ) : (
                  'Create Deck'
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}