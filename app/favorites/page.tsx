'use client';

import { useState } from 'react';
import Menu from '../components/Menu';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../../types/quote';

// Sample quotes (same as library - later this will be shared state or from database)
const allQuotes: Quote[] = [
  {
    id: '1',
    text: 'Wir verlangen, das Leben müsse einen Sinn haben, aber es hat nur ganz genau soviel Sinn, als wir selber ihm zu geben imstande sind.',
    author: 'Hermann Hesse, Siddharta',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    text: 'Der Weg ist das Ziel.',
    author: 'Konfuzius',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    text: 'Wer kämpft, kann verlieren. Wer nicht kämpft, hat schon verloren.',
    author: 'Bertolt Brecht',
    createdAt: '2024-01-03',
  },
];

export default function FavoritesPage() {
  // For now, start with one favorite to show how it looks
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1']);

  const handleToggleFavorite = (quoteId: string) => {
    setFavoriteIds(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const favoriteQuotes = allQuotes.filter(q => favoriteIds.includes(q.id));
  
  const sortedQuotes = [...favoriteQuotes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      
      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <h1 className="font-bold text-[24px] text-black">
          Favoriten
        </h1>
        
        {sortedQuotes.length === 0 ? (
          <div className="flex flex-col gap-[8px] items-center text-center py-[40px]">
            <p className="text-[18px] text-black">
              Noch keine Favoriten gespeichert
            </p>
            <p className="text-[14px] text-gray-600">
              Tippe auf das Herz, um Sprüche zu deinen Favoriten hinzuzufügen
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] w-full max-w-[400px]">
            {sortedQuotes.map((quote) => (
              <QuoteCard 
                key={quote.id}
                quote={quote} 
                isFavorited={true}
                onToggleFavorite={handleToggleFavorite} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
