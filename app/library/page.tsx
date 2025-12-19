'use client';

import { useState } from 'react';
import Menu from '../components/Menu';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../../types/quote';

// Sample quotes for now (later this will come from your database)
const sampleQuotes: Quote[] = [
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

export default function LibraryPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (quoteId: string) => {
    setFavorites(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const sortedQuotes = [...sampleQuotes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      
      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <h1 className="font-bold text-[24px] text-black">
          Alle Sprüche
        </h1>
        
        {sortedQuotes.length === 0 ? (
          <p className="text-[18px] text-black text-center py-[40px]">
            Noch keine Sprüche vorhanden
          </p>
        ) : (
          <div className="flex flex-col gap-[24px] w-full max-w-[400px]">
            {sortedQuotes.map((quote) => (
              <QuoteCard 
                key={quote.id}
                quote={quote} 
                isFavorited={favorites.includes(quote.id)} 
                onToggleFavorite={handleToggleFavorite} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
