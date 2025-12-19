import imgFrame13 from "figma:asset/6b889686916560c570e61fcebc144ff09dd5fbb6.png";

function Frame() {
  return (
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
  );
}

function Icons() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[3px] py-[5px] relative shrink-0 size-[20px]" data-name="Icons">
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black text-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        HiWise
      </p>
      <Icons />
    </div>
  );
}

function Component() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="2">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[24px] relative w-full">
          <Frame1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal gap-[8px] items-center justify-center relative shrink-0 text-black text-center w-full">
      <p className="capitalize leading-[44px] relative shrink-0 text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Welcher Spruch begegnet dir heute?
      </p>
      <p className="leading-[24px] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Teile deine heutigen Gedanken oder Erkenntnisse mit der Familie.
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full">
      <div className="bg-black relative rounded-[4px] shrink-0 w-full" data-name="Button/Medium">
        <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex gap-[10px] items-center justify-center px-[16px] py-[10px] relative w-full">
            <p className="capitalize font-['DM_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white" style={{ fontVariationSettings: "'opsz' 14" }}>
              Jetzt Teilen
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[200px] relative rounded-[8px] shadow-[0px_11px_15px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgFrame13} />
    </div>
  );
}

export default function Teilen() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Teilen">
      <Component />
      <div className="h-[628px] relative shrink-0 w-full">
        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[36px] items-center justify-center pb-[32px] pt-[5px] px-[16px] relative size-full">
            <Frame5 />
            <Frame4 />
          </div>
        </div>
      </div>
    </div>
  );
}