'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { supabase } from '../utils/supabase/client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMessage(null);
    setErrorMsg(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // später für Produktion anpassen:
      // hierhin leitet Supabase nach Klick auf den Link weiter
      redirectTo: 'http://localhost:3000/reset-password',
    });

    setSending(false);

    if (error) {
      console.error(error);
      setErrorMsg('Senden fehlgeschlagen. Bitte E-Mail prüfen.');
      return;
    }

    setMessage('Wenn es einen Account gibt, wurde eine E-Mail versendet.');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      <div className="flex-1 flex flex-col items-center px-[16px] py-[20px]">
        <h1 className="font-bold text-[24px] text-black mb-[16px]">
          Passwort vergessen
        </h1>

        <form
          onSubmit={handleSend}
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

          {errorMsg && (
            <p className="text-red-600 text-[14px]">{errorMsg}</p>
          )}
          {message && (
            <p className="text-green-700 text-[14px]">{message}</p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="bg-black text-white py-[12px] rounded-[4px] text-[16px] font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {sending ? 'Sende E-Mail…' : 'Link zum Zurücksetzen senden'}
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
