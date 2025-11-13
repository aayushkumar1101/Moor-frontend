import svgPaths from "../imports/svg-bc8bhbecp3";

function MoorLogoSmall() {
  return (
    <div className="h-[24px] relative shrink-0 w-[93.361px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 24">
        <g id="Group 1000016083">
          <g id="mqor.ing">
            <path d={svgPaths.pe42bd80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p27a19080} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1357b200} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1a250080} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3eba4c00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3455aa00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3446a580} fill="var(--fill-0, black)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p6dece00} fill="var(--fill-0, #00A7E6)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function LogoSection() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0">
        <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
          <MoorLogoSmall />
        </div>
      </div>
      <div className="flex flex-row items-center self-stretch">
        <div className="flex h-full items-center justify-center relative shrink-0">
          <div className="flex-none h-full rotate-[180deg]">
            <div className="h-full relative w-0">
              <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 24">
                  <path d="M0.5 0V24.0001" id="Vector 12" stroke="var(--stroke-0, #1A1A1A)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Public_Sans:Medium',sans-serif] font-medium leading-[29px] left-[117.36px] text-[#4c4c6d] text-[16px] text-nowrap top-[-2px] whitespace-pre">
        A T9L Company
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[76px] py-[100px] relative shrink-0 w-full">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1240px] mx-auto">
        <div className="content-stretch flex flex-col gap-[56px] items-start relative shrink-0 w-[419px]">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
            <LogoSection />
            <p className="font-['Public_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#4c4c6d] text-[16px] w-full">
              The AI Web Docking Platform where AI agents dock with websites.
            </p>
          </div>
        </div>
        <div className="basis-0 content-stretch flex font-['Public_Sans:Regular',sans-serif] font-normal gap-[16px] grow items-center justify-end leading-[28px] min-h-px min-w-px relative shrink-0 text-[#4c4c6d] text-[16px] text-nowrap whitespace-pre">
          <p className="relative shrink-0">Privacy</p>
          <p className="relative shrink-0">{`Terms & Conditions`}</p>
        </div>
      </div>
    </footer>
  );
}
