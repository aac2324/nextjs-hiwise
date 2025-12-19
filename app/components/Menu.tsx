'use client';

import Link from 'next/link';
import { useState } from 'react';

function MenuIcon({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-[5px]">
      <svg className="w-[16px] h-[12px]" fill="none" viewBox="0 0 17 13">
        <path d="M0.5 0.5H16.5" stroke="black" strokeLinecap="round" />
        <path d="M0.5 6.5H16.5" stroke="black" strokeLinecap="round" />
        <path d="M0.5 12.5H16.5" stroke="black" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function CloseIcon({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-[5px]">
      <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
        <path d="M1 1L15 15" stroke="black" strokeLinecap="round" />
        <path d="M15 1L1 15" stroke="black" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="bg-white w-full border-b border-black">
        <div className="flex items-center justify-between px-[16px] py-[24px]">
          <Link href="/start" className="font-bold text-[18px] text-black">
            HiWise
          </Link>
          {isOpen ? (
            <CloseIcon onClick={() => setIsOpen(false)} />
          ) : (
            <MenuIcon onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="bg-white w-full border-b border-black">
          <div className="flex flex-col gap-[24px] items-center py-[55px] text-[16px] text-black">
            <Link href="/start" onClick={() => setIsOpen(false)}>
              Start
            </Link>
            <Link href="/library" onClick={() => setIsOpen(false)}>
              Alle Sprüche
            </Link>
            <Link href="/favorites" onClick={() => setIsOpen(false)}>
              Favoriten
            </Link>
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
