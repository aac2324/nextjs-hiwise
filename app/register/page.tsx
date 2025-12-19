'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { supabase } from '../utils/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrorMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      // optional: redirect-URL nach E-Mail-Bestätigung
      // options: { emailRedirectTo: 'http://localhost:3000/login' },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg('Registrierung fehlgeschlagen. Bitte Daten prüfen.');
      return;
    }

    // Je nach Supabase-Einstellung:
    // - mit E-Mail-Bestätigung: User muss Mail klicken
    // - ohne Bestätigung: direkt eingeloggt
    setMessage('Account erstellt. Bitte E-Mails prüfen oder hier einloggen.');
    // optional direkt auf Login leiten:
    // router.replace('/login');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      <div className="flex-1 flex flex-col items-center px-[16px] py-[20px]">
        <h1 className="font-bold text-[24px] text-black mb-[16px]">
          Account erstellen
        </h1>

        <form
          onSubmit={handleRegister}
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

          {errorMsg && (
            <p className="text-red-600 text-[14px]">{errorMsg}</p>
          )}
          {message && (
            <p className="text-green-700 text-[14px]">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-[12px] rounded-[4px] text-[16px] font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? 'Erstelle Account…' : 'Account erstellen'}
          </button>
        </form>

        <button
          onClick={() => router.push('/login')}
          className="mt-[16px] text-[14px] text-gray-600 underline"
        >
          Zurück zum Login
        </button>
      </div>
    </div>
  );
}
