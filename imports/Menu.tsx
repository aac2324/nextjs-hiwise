function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal gap-[24px] items-center justify-center leading-[24px] px-[16px] py-[55px] relative text-[16px] text-black text-center text-nowrap w-full">
          <p className="relative shrink-0" style={{ fontVariationSettings: "'opsz' 14" }}>
            Start
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'opsz' 14" }}>
            Teilen
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'opsz' 14" }}>
            Alle Sprüche
          </p>
          <p className="relative shrink-0" style={{ fontVariationSettings: "'opsz' 14" }}>
            Favoriten
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Menü">
      <div className="bg-white relative shrink-0 w-full" data-name="2">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center justify-center px-[16px] py-[24px] relative w-full">
            <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
              <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
                HiWise
              </p>
              <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[3px] py-[5px] relative shrink-0 size-[20px]" data-name="Icons">
                <div className="h-[12px] relative shrink-0 w-[16px]">
                  <div className="absolute inset-[-4.17%_-3.13%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
                      <g id="Frame 6">
                        <path d="M0.5 0.5H16.5" id="Vector 3" stroke="var(--stroke-0, black)" strokeLinecap="round" />
                        <path d="M0.5 6.5H16.5" id="Vector 4" stroke="var(--stroke-0, black)" strokeLinecap="round" />
                        <path d="M0.5 12.5H16.5" id="Vector 6" stroke="var(--stroke-0, black)" strokeLinecap="round" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
      </div>
      <Frame />
    </div>
  );
}