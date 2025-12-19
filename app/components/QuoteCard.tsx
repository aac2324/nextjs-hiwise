'use client';

import { Quote } from '../../types/quote';

interface QuoteCardProps {
  quote: Quote;
  isFavorited: boolean;
  onToggleFavorite: (quoteId: string) => void;
}

export function QuoteCard({ quote, isFavorited, onToggleFavorite }: QuoteCardProps) {
  return (
    <div className="w-full flex flex-col gap-[16px] p-[16px] border border-black rounded-[8px]">
      {/* Quote Text */}
      <p className="text-[18px] leading-[28px] text-black">
        "{quote.text}"
      </p>
      
      {/* Author */}
      <p className="text-[14px] text-gray-600">
        — {quote.author}
      </p>
      
      {/* Image (if exists) */}
      {quote.imageUrl && (
        <img 
          src={quote.imageUrl} 
          alt="" 
          className="w-full h-[150px] object-cover rounded-[4px]"
        />
      )}
      
      {/* Favorite Button */}
      <button
        onClick={() => onToggleFavorite(quote.id)}
        className="flex items-center gap-[8px] text-[14px] cursor-pointer"
      >
        <svg 
          className="w-[20px] h-[20px]" 
          fill={isFavorited ? "red" : "none"} 
          stroke={isFavorited ? "red" : "black"} 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        {isFavorited ? 'Favorit' : 'Zu Favoriten'}
      </button>
    </div>
  );
}
