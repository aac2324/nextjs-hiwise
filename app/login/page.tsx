'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { supabase } from '../utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Wenn schon eingeloggt → direkt nach /admin
  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace('/admin');
      } else {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      setAuthError('Login fehlgeschlagen. Bitte E-Mail und Passwort prüfen.');
      return;
    }

    // Erfolgreich ⇒ weiter zur Admin-Seite
    router.replace('/admin');
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Lade…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      <div className="flex-1 flex flex-col items-center px-[16px] py-[20px]">
        <h1 className="font-bold text-[24px] text-black mb-[16px]">
          Admin Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-[16px] w-full max-w-[400px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px]"
              required
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px]"
              required
            />
          </div>

          {authError && (
            <p className="text-red-600 text-[14px]">{authError}</p>
          )}

          <button
            type="submit"
            className="bg-black text-white py-[12px] rounded-[4px] text-[16px] font-medium hover:bg-gray-800"
          >
            Einloggen
          </button>
        </form>
        <div className="mt-[16px] w-full max-w-[400px] flex flex-col gap-[8px] items-start">
         <button
            onClick={() => router.push('/forgot-password')}
            className="text-[14px] text-gray-600 underline"
            type="button"
        >
            Passwort vergessen?
        </button>
        <button
            onClick={() => router.push('/register')}
            className="text-[14px] text-gray-600 underline"
            type="button"
        >
            Noch keinen Account? Account erstellen
        </button>
        </div>
      </div>
    </div>
  );
}
