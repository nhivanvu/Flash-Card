'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createCard, updateCard, deleteCard } from '@/db/queries/cards';

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

// Zod validation schema for editing a card
const EditCardSchema = z.object({
  front: z.string().min(1, 'Front is required').max(500, 'Front must be less than 500 characters'),
  back: z.string().min(1, 'Back is required').max(500, 'Back must be less than 500 characters'),
  cardId: z.string().uuid('Invalid card ID'),
  deckId: z.string().uuid('Invalid deck ID'),
});

type EditCardInput = z.infer<typeof EditCardSchema>;

export async function editCardAction(data: EditCardInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Validate with Zod
  const validatedData = EditCardSchema.parse(data);

  // Use query helper function
  const updatedCard = await updateCard(validatedData.cardId, userId, {
    front: validatedData.front,
    back: validatedData.back,
  });

  if (!updatedCard) {
    throw new Error('Card not found or access denied');
  }

  // Revalidate the deck page to show the updated card
  revalidatePath(`/decks/${validatedData.deckId}`);
  
  return { success: true, card: updatedCard };
}

// Delete card action
export async function deleteCardAction(cardId: string, deckId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Validate inputs
  const cardIdValidated = z.string().uuid().parse(cardId);
  const deckIdValidated = z.string().uuid().parse(deckId);

  // Use query helper function
  const deleted = await deleteCard(cardIdValidated, userId);

  if (!deleted) {
    throw new Error('Card not found or access denied');
  }

  // Revalidate the deck page to remove the deleted card
  revalidatePath(`/decks/${deckIdValidated}`);
  
  return { success: true };
}