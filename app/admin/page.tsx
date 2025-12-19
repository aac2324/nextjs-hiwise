'use client';

import { useState } from 'react';
import Menu from '../components/Menu';

export default function AdminPage() {
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quoteText.trim() || !author.trim()) {
      return;
    }

    // TODO: Send to backend API
    console.log('New quote:', { quoteText, author, imagePreview });

    setQuoteText('');
    setAuthor('');
    setImageFile(null);
    setImagePreview(null);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      
      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <h1 className="font-bold text-[24px] text-black">
          Admin: Neuer Spruch
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] w-full max-w-[400px]">
          {/* Quote Text */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="quote-text" className="font-medium text-[14px] text-black">
              Spruch
            </label>
            <textarea
              id="quote-text"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              placeholder="Gib hier den Spruch ein..."
              rows={6}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px] resize-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="author" className="font-medium text-[14px] text-black">
              Autor
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="z.B. Hermann Hesse, Siddharta"
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-[14px] text-black">
              Bild (optional)
            </label>
            
            {!imagePreview ? (
              <label 
                htmlFor="image-upload"
                className="w-full px-[12px] py-[40px] border-2 border-dashed border-black rounded-[4px] cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center gap-[8px]"
              >
                <svg className="w-[40px] h-[40px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[14px] text-gray-600">
                  Klicke zum Hochladen
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="w-full relative rounded-[8px] overflow-hidden border border-black">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-[200px] object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-[8px] right-[8px] bg-white rounded-full p-[8px] shadow-lg border border-black cursor-pointer hover:bg-gray-100"
                >
                  <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="w-full px-[16px] py-[12px] bg-green-100 border border-green-500 rounded-[4px]">
              <p className="font-medium text-[14px] text-green-800 text-center">
                Spruch erfolgreich hinzugefügt!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            className="bg-black text-white py-[12px] px-[16px] rounded-[4px] text-[16px] font-medium cursor-pointer hover:bg-gray-800"
          >
            Spruch Hinzufügen
          </button>
        </form>
      </div>
    </div>
  );
}
