'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createDeck } from '@/db/queries/decks';

// Zod validation schema for creating a new deck
const CreateDeckSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

type CreateDeckInput = z.infer<typeof CreateDeckSchema>;

export async function createDeckAction(data: CreateDeckInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Validate with Zod
  const validatedData = CreateDeckSchema.parse(data);

  // Use query helper function
  const newDeck = await createDeck({
    ...validatedData,
    userId,
  });

  // Revalidate the dashboard page to show the new deck
  revalidatePath('/dashboard');
  
  return { success: true, deck: newDeck };
}