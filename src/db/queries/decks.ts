import { db } from '@/db';
import { decks, cards } from '@/db/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import type { Deck, Card } from '@/db/schema';

export async function getUserDecks(userId: string): Promise<Deck[]> {
  return db.select()
    .from(decks)
    .where(eq(decks.userId, userId))
    .orderBy(desc(decks.createdAt));
}

export async function getUserDecksWithCardCounts(userId: string) {
  return db
    .select({
      id: decks.id,
      title: decks.title,
      description: decks.description,
      createdAt: decks.createdAt,
      updatedAt: decks.updatedAt,
      cardCount: count(cards.id),
    })
    .from(decks)
    .leftJoin(cards, eq(cards.deckId, decks.id))
    .where(eq(decks.userId, userId))
    .groupBy(decks.id, decks.title, decks.description, decks.createdAt, decks.updatedAt)
    .orderBy(desc(decks.createdAt));
}

export async function getDeckById(deckId: string, userId: string): Promise<Deck | undefined> {
  const [deck] = await db.select()
    .from(decks)
    .where(and(eq(decks.id, deckId), eq(decks.userId, userId)));
  
  return deck;
}

export async function getDeckWithCards(deckId: string, userId: string): Promise<{ deck: Deck; cards: Card[] } | null> {
  const deck = await getDeckById(deckId, userId);
  if (!deck) return null;

  const deckCards = await db.select()
    .from(cards)
    .where(eq(cards.deckId, deckId))
    .orderBy(desc(cards.createdAt));

  return { deck, cards: deckCards };
}

export async function createDeck(data: { title: string; description?: string; userId: string }): Promise<Deck> {
  const [newDeck] = await db.insert(decks)
    .values({
      title: data.title,
      description: data.description,
      userId: data.userId,
    })
    .returning();

  return newDeck;
}

export async function updateDeck(
  deckId: string, 
  userId: string, 
  updates: { title?: string; description?: string }
): Promise<Deck | null> {
  // Verify ownership
  const existingDeck = await getDeckById(deckId, userId);
  if (!existingDeck) return null;

  const [updatedDeck] = await db.update(decks)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(decks.id, deckId))
    .returning();

  return updatedDeck;
}

export async function deleteDeck(deckId: string, userId: string): Promise<boolean> {
  const existingDeck = await getDeckById(deckId, userId);
  if (!existingDeck) return false;

  await db.delete(decks).where(eq(decks.id, deckId));
  return true;
}