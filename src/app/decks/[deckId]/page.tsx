import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDeckWithCards } from '@/db/queries/decks';
import DeckPageClient from './DeckPageClient';
interface DeckPageProps {
  params: Promise<{
    deckId: string;
  }>;
}

export async function generateMetadata({ params }: DeckPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { userId } = await auth();
  if (!userId) {
    return {
      title: 'Deck - FlashyCardy',
      description: 'Study your flashcards',
    };
  }

  const deckWithCards = await getDeckWithCards(resolvedParams.deckId, userId);
  
  return {
    title: deckWithCards ? `${deckWithCards.deck.title} - FlashyCardy` : 'Deck - FlashyCardy',
    description: deckWithCards?.deck.description || 'Study your flashcards',
  };
}

export default async function DeckPage({ params }: DeckPageProps) {
  const resolvedParams = await params;
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  const deckWithCards = await getDeckWithCards(resolvedParams.deckId, userId);

  if (!deckWithCards) {
    notFound();
  }

  const { deck, cards } = deckWithCards;

  return <DeckPageClient deck={deck} cards={cards} />;
}