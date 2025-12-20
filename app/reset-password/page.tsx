'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../components/Menu';
import { supabase } from '../utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();

  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Beim Laden: prüfen, ob Supabase den User aufgrund des Links bereits eingeloggt hat
  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('getSession error:', error);
        setSessionError('Fehler beim Prüfen des Links. Bitte fordere einen neuen an.');
      } else if (!data.session) {
        // Keine Session = Link ungültig oder bereits verwendet
        setSessionError('Ungültiger oder abgelaufener Link. Bitte fordere einen neuen an.');
      }

      setCheckingSession(false);
    }

    checkSession();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);

    if (!password || password.length < 6) {
      setUpdateError('Das Passwort sollte mindestens 6 Zeichen lang sein.');
      return;
    }
    if (password !== passwordRepeat) {
      setUpdateError('Die Passwörter stimmen nicht überein.');
      return;
    }

    setUpdating(true);

    const { error } = await supabase.auth.updateUser({ password });

    setUpdating(false);

    if (error) {
      console.error('Error updating password:', error);
      setUpdateError('Passwort konnte nicht geändert werden. Bitte versuche es erneut.');
      return;
    }

    setUpdateSuccess('Passwort wurde erfolgreich geändert. Du wirst gleich zum Login weitergeleitet.');
    setTimeout(() => {
      router.replace('/login');
    }, 2500);
  };

  // 1. Während wir prüfen…
  if (checkingSession) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Link wird geprüft…</p>
        </div>
      </div>
    );
  }

  // 2. Keine gültige Session → Fehlermeldung + Link „Neuen Link anfordern“
  if (sessionError) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Menu />
        <div className="flex-1 flex flex-col items-center px-[16px] py-[20px]">
          <h1 className="font-bold text-[24px] text-black mb-[16px]">
            Passwort zurücksetzen
          </h1>
          <p className="text-red-600 mb-[12px] text-center max-w-[400px]">
            {sessionError}
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-[14px] text-gray-600 underline"
          >
            Neuen Link anfordern
          </button>
        </div>
      </div>
    );
  }

  // 3. Gültige Session → Neues Passwort setzen
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      <div className="flex-1 flex flex-col items-center px-[16px] py-[20px]">
        <h1 className="font-bold text-[24px] text-black mb-[16px]">
          Neues Passwort setzen
        </h1>

        <form
          onSubmit={handleReset}
          className="flex flex-col gap-[16px] w-full max-w-[400px]"
        >
          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Neues Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px]"
              required
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="text-[14px] font-medium text-black">
              Passwort wiederholen
            </label>
            <input
              type="password"
              value={passwordRepeat}
              onChange={e => setPasswordRepeat(e.target.value)}
              className="w-full px-[12px] py-[10px] border border-black rounded-[4px] text-[16px]"
              required
            />
          </div>

          {updateError && (
            <p className="text-red-600 text-[14px]">{updateError}</p>
          )}
          {updateSuccess && (
            <p className="text-green-700 text-[14px]">{updateSuccess}</p>
          )}

          <button
            type="submit"
            disabled={updating}
            className="bg-black text-white py-[12px] rounded-[4px] text-[16px] font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {updating ? 'Aktualisiere…' : 'Passwort speichern'}
          </button>
        </form>
      </div>
    </div>
  );
}

