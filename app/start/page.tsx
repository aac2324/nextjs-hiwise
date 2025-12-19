'use client';

import Menu from '../components/Menu';

function QuoteSection() {
  return (
    <div className="flex flex-col gap-[8px] items-center text-center w-full">
      <p className="text-[24px] leading-[32px] text-black">
        "Wir verlangen, das Leben müsse einen Sinn haben, aber es hat nur ganz genau soviel Sinn, als wir selber ihm zu geben imstande sind."
      </p>
      <p className="text-[18px] text-black">
        Hermann Hesse, Siddharta
      </p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <button className="bg-black text-white py-[10px] px-[16px] rounded-[4px] text-[16px] font-medium">
        Alle Sprüche
      </button>
      <button className="bg-white text-black py-[10px] px-[16px] rounded-[4px] text-[16px] font-medium border border-black">
        Favoriten
      </button>
    </div>
  );
}

function ImageCard() {
  return (
    <div className="h-[200px] w-full rounded-[8px] shadow-lg overflow-hidden">
      <img 
        alt="Decorative" 
        className="w-full h-full object-cover"
        src="/assets/6b889686916560c570e61fcebc144ff09dd5fbb6.png"
      />
    </div>
  );
}

export default function StartPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Menu />
      <div className="flex flex-col gap-[24px] items-center px-[16px] py-[20px] pb-[32px]">
        <QuoteSection />
        <Buttons />
        <ImageCard />
      </div>
    </div>
  );
}
