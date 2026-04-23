'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { createDeck, deleteDeck } from '@/db/queries/decks';

export async function createDeckAction(data: { title: string; description?: string }) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const newDeck = await createDeck({
      title: data.title,
      description: data.description,
      userId,
    });

    revalidatePath('/dashboard');
    return { success: true, deck: newDeck };
  } catch (error) {
    console.error('Failed to create deck:', error);
    throw new Error('Failed to create deck');
  }
}

export async function deleteDeckAction(deckId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const deleted = await deleteDeck(deckId, userId);
    
    if (!deleted) {
      throw new Error('Deck not found or access denied');
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete deck:', error);
    throw new Error('Failed to delete deck');
  }
}