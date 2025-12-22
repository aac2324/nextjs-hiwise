'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { supabase } from '../utils/supabase/client';

export default function AdminPage() {
  const router = useRouter();

  const [sessionChecked, setSessionChecked] = useState(false);

  // Formular-States
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Beim Laden: ist User eingeloggt?
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // nicht eingeloggt → auf Login-Seite
        router.replace('/login');
      } else {
        setSessionChecked(true);
      }
    }
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

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

    const payload = {
      text: quoteText.trim(),
      author: author.trim(),
      image_url: imagePreview || null,
    };

    const { error } = await supabase.from('quotes').insert(payload);

    if (error) {
      console.error('Fehler beim Speichern:', error);
      return;
    }

    setQuoteText('');
    setAuthor('');
    setImageFile(null);
    setImagePreview(null);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Während wir die Session prüfen oder gerade umleiten:
  if (!sessionChecked) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Weiterleiten…</p>
        </div>
      </div>
    );
  }

  // Eingeloggt → Admin-Formular
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />

      <div className="flex flex-col gap-[16px] items-center px-[16px] py-[20px] pb-[32px]">
        <div className="w-full max-w-[400px] flex justify-between items-center">
          <h1 className="font-bold text-[24px] text-black">
            Füge einen neuen Spruch hinzu
          </h1>
          <button
            onClick={handleLogout}
            className="text-[14px] text-gray-600 underline"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[20px] w-full max-w-[400px]"
        >
          {/* Spruch */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Spruch
            </label>
            <textarea
              value={quoteText}
              onChange={e => setQuoteText(e.target.value)}
              placeholder="Gib hier den Spruch ein..."
              rows={6}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px] leading-[24px] resize-none focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Autor */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Autor
            </label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="z.B. Hermann Hesse, Siddharta"
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px] focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Bild */}
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Bild (optional)
            </label>

            {!imagePreview ? (
              <label
                htmlFor="image-upload"
                className="w-full px-[12px] py-[40px] border-2 border-dashed border-black rounded-[4px] cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center gap-[8px]"
              >
                <svg
                  className="w-[40px] h-[40px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
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
                  <svg
                    className="w-[16px] h-[16px]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Erfolg */}
          {showSuccess && (
            <div className="w-full px-[16px] py-[12px] bg-green-100 border border-green-500 rounded-[4px]">
              <p className="text-[14px] font-medium text-green-800 text-center">
                Spruch erfolgreich hinzugefügt!
              </p>
            </div>
          )}

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
