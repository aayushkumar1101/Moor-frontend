import svgPaths from "../imports/svg-bc8bhbecp3";

function MoorLogo() {
  return (
    <div className="h-[40px] relative shrink-0 w-[155.604px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 156 40">
        <g id="Group 1000016083">
          <g id="mqor.ing">
            <path d={svgPaths.p3fef7c80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p218e8300} fill="var(--fill-0, black)" />
            <path d={svgPaths.p28df7c70} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2b9c0880} fill="var(--fill-0, black)" />
            <path d={svgPaths.p5928b80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p30562380} fill="var(--fill-0, black)" />
            <path d={svgPaths.p390f4e00} fill="var(--fill-0, black)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.pec8e800} fill="var(--fill-0, #00A7E6)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

export function Header() {
  return (
    <header className="relative h-[94px] w-full">
      <div className="absolute bg-white h-[94px] left-0 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] top-0 w-full" />
      <div className="absolute content-stretch flex items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1240px]">
        <MoorLogo />
      </div>
    </header>
  );
}
