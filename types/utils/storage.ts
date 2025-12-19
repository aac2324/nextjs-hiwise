import { Quote } from '../types/quote';

const QUOTES_KEY = 'hiwise_quotes';
const FAVORITES_KEY = 'hiwise_favorites';

export const storageUtils = {
  // Quotes
  getQuotes: (): Quote[] => {
    const stored = localStorage.getItem(QUOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveQuote: (quote: Omit<Quote, 'id' | 'createdAt'>): Quote => {
    const quotes = storageUtils.getQuotes();
    const newQuote: Quote = {
      ...quote,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    quotes.push(newQuote);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
    return newQuote;
  },

  getMostRecentQuote: (): Quote | null => {
    const quotes = storageUtils.getQuotes();
    if (quotes.length === 0) return null;
    
    // Sort by createdAt and get the most recent
    const sorted = [...quotes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted[0];
  },

  // Favorites
  getFavorites: (): string[] => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  toggleFavorite: (quoteId: string): boolean => {
    const favorites = storageUtils.getFavorites();
    const index = favorites.indexOf(quoteId);
    
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return false;
    } else {
      favorites.push(quoteId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
  },

  isFavorite: (quoteId: string): boolean => {
    const favorites = storageUtils.getFavorites();
    return favorites.includes(quoteId);
  },

  getFavoriteQuotes: (): Quote[] => {
    const favorites = storageUtils.getFavorites();
    const quotes = storageUtils.getQuotes();
    return quotes.filter(quote => favorites.includes(quote.id));
  },
};