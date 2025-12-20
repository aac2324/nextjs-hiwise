'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../../types/quote';
import { supabase } from '../utils/supabase/client';

export default function FavoritesPage() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      // 1. Session prüfen
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session?.user) {
        router.replace('/login');
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      // 2. Favoriten-Quote-IDs für diesen User holen
      const { data: favs, error: favError } = await supabase
        .from('favorites')
        .select('quote_id')
        .eq('user_id', uid);

      if (favError) {
        console.error('Error loading favorites:', favError);
        setLoading(false);
        return;
      }

      const quoteIds = (favs || []).map(f => f.quote_id);

      if (quoteIds.length === 0) {
        setQuotes([]);
        setLoading(false);
        return;
      }

      // 3. Die passenden Quotes laden
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .in('id', quoteIds);

      if (quotesError) {
        console.error('Error loading quotes for favorites:', quotesError);
        setLoading(false);
        return;
      }

      const mapped = (quotesData || []).map((row: any) => ({
        id: row.id,
        text: row.text,
        author: row.author,
        imageUrl: row.image_url ?? undefined,
        createdAt: row.created_at,
      })) as Quote[];

      // Optional: Nach Datum sortieren (neueste zuerst)
      mapped.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setQuotes(mapped);
      setLoading(false);
    }

    loadFavorites();
  }, [router]);

  const handleToggleFavorite = async (quoteId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('quote_id', quoteId);

    if (error) {
      console.error('Error removing favorite:', error);
      return;
    }

    // Aus der Liste entfernen
    setQuotes(prev => prev.filter(q => q.id !== quoteId));
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[16px] text-gray-600">Lade Favoriten…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />

      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <h1 className="font-bold text-[24px] text-black">
          Favoriten
        </h1>

        {quotes.length === 0 ? (
          <div className="flex flex-col gap-[8px] items-center text-center py-[40px] max-w-[400px]">
            <p className="text-[18px] text-black">
              Noch keine Favoriten gespeichert
            </p>
            <p className="text-[14px] text-gray-600">
              Tippe auf das Herz in der Spruchliste, um Favoriten hinzuzufügen.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[24px] w-full max-w-[400px]">
            {quotes.map((quote) => (
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
