'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../../types/quote';
import { supabase } from '../utils/supabase/client';

export default function LibraryPage() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 1. Quotes laden
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (quotesError) {
        console.error('Error loading quotes:', quotesError);
      } else {
        const mapped = (quotesData || []).map((row: any) => ({
          id: row.id,
          text: row.text,
          author: row.author,
          imageUrl: row.image_url ?? undefined,
          createdAt: row.created_at,
        })) as Quote[];

        setQuotes(mapped);
      }

      // 2. User-Session holen
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (session?.user) {
        const uid = session.user.id;
        setUserId(uid);

        // 3. Favoriten für diesen User laden
        const { data: favs, error: favError } = await supabase
          .from('favorites')
          .select('quote_id')
          .eq('user_id', uid);

        if (favError) {
          console.error('Error loading favorites:', favError);
        } else if (favs) {
          setFavoriteIds(favs.map(f => f.quote_id));
        }
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const handleToggleFavorite = async (quoteId: string) => {
    // Nicht eingeloggt → auf Login-Seite schicken
    if (!userId) {
      router.push('/login');
      return;
    }

    // Ist schon Favorit → löschen
    if (favoriteIds.includes(quoteId)) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('quote_id', quoteId);

      if (error) {
        console.error('Error removing favorite:', error);
        return;
      }

      setFavoriteIds(prev => prev.filter(id => id !== quoteId));
    } else {
      // Noch kein Favorit → hinzufügen
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, quote_id: quoteId });

      if (error) {
        console.error('Error adding favorite:', error);
        return;
      }

      setFavoriteIds(prev => [...prev, quoteId]);
    }
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
                isFavorited={favoriteIds.includes(quote.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

