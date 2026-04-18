'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createCard } from '@/db/queries/cards';

// Zod validation schema for adding a new card
const AddCardSchema = z.object({
  front: z.string().min(1, 'Front is required').max(1000, 'Front must be less than 1000 characters'),
  back: z.string().min(1, 'Back is required').max(1000, 'Back must be less than 1000 characters'),
  deckId: z.string().uuid('Invalid deck ID'),
});

type AddCardInput = z.infer<typeof AddCardSchema>;

export async function addCardAction(data: AddCardInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Validate with Zod
  const validatedData = AddCardSchema.parse(data);

  // Use query helper function
  const newCard = await createCard({
    ...validatedData,
    userId,
  });

  if (!newCard) {
    throw new Error('Failed to create card or deck not found');
  }

  // Revalidate the deck page to show the new card
  revalidatePath(`/decks/${validatedData.deckId}`);
  
  return { success: true, card: newCard };
}