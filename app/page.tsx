'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setTime(data.time);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-black mb-4">
        {message}
      </h1>
      <p className="text-gray-600 text-lg">
        Server time: {time}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Refresh
      </button>
    </div>
  );
}

