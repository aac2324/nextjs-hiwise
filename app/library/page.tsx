'use client';

import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../../types/quote';
import { supabase } from '../utils/supabaseClient';

export default function LibraryPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Quotes laden
  useEffect(() => {
    async function loadQuotes() {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading quotes:', error);
      } else {
        // Map DB-Result in unser Quote-Interface
        const mapped = (data || []).map((row: any) => ({
          id: row.id,
          text: row.text,
          author: row.author,
          imageUrl: row.image_url ?? undefined,
          createdAt: row.created_at,
        })) as Quote[];

        setQuotes(mapped);
      }

      setLoading(false);
    }

    loadQuotes();
  }, []);

  const handleToggleFavorite = (quoteId: string) => {
    setFavorites(prev =>
      prev.includes(quoteId)
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[16px] text-gray-600">Lade Sprüche…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />

      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <h1 className="font-bold text-[24px] text-black">
          Alle Sprüche
        </h1>

        {quotes.length === 0 ? (
          <p className="text-[18px] text-black text-center py-[40px]">
            Noch keine Sprüche vorhanden
          </p>
        ) : (
          <div className="flex flex-col gap-[24px] w-full max-w-[400px]">
            {quotes.map((quote) => (
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
