import { db } from '@/db';
import { cards, decks } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import type { Card } from '@/db/schema';

export async function getCardById(cardId: string, userId: string): Promise<Card | undefined> {
  const [result] = await db.select({
    card: cards
  })
    .from(cards)
    .innerJoin(decks, eq(cards.deckId, decks.id))
    .where(and(eq(cards.id, cardId), eq(decks.userId, userId)));
  
  return result?.card;
}

export async function getCardsByDeckId(deckId: string, userId: string): Promise<Card[]> {
  // First verify the user owns the deck
  const [deckCheck] = await db.select({ id: decks.id })
    .from(decks)
    .where(and(eq(decks.id, deckId), eq(decks.userId, userId)));
    
  if (!deckCheck) return [];

  return db.select()
    .from(cards)
    .where(eq(cards.deckId, deckId))
    .orderBy(desc(cards.createdAt));
}

export async function createCard(data: { front: string; back: string; deckId: string; userId: string }): Promise<Card | null> {
  // First verify the user owns the deck
  const [deckCheck] = await db.select({ id: decks.id })
    .from(decks)
    .where(and(eq(decks.id, data.deckId), eq(decks.userId, data.userId)));
    
  if (!deckCheck) return null;

  const [newCard] = await db.insert(cards)
    .values({
      front: data.front,
      back: data.back,
      deckId: data.deckId,
    })
    .returning();

  return newCard;
}

export async function updateCard(
  cardId: string,
  userId: string,
  updates: { front?: string; back?: string }
): Promise<Card | null> {
  // Verify ownership through deck
  const existingCard = await getCardById(cardId, userId);
  if (!existingCard) return null;

  const [updatedCard] = await db.update(cards)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(cards.id, cardId))
    .returning();

  return updatedCard;
}

export async function deleteCard(cardId: string, userId: string): Promise<boolean> {
  const existingCard = await getCardById(cardId, userId);
  if (!existingCard) return false;

  await db.delete(cards).where(eq(cards.id, cardId));
  return true;
}