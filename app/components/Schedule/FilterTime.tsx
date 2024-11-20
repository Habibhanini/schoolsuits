import type { NextPage } from "next";

const FilterTime: NextPage = ({}) => {
  return (
    <div
      className={`w-full relative rounded-3xs bg-whitesmoke-100 border-gainsboro-100 border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-center justify-start text-left text-xs text-black font-plus-jakarta-sans `}
    >
      <div className="flex-1 bg-white border-gainsboro-100 border-r-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[5px] px-2.5">
        <div className="relative font-medium">Day</div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[5px] px-2.5">
        <a className="[text-decoration:none] relative font-medium text-[inherit]">
          Month
        </a>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[5px] px-2.5">
        <a className="[text-decoration:none] relative font-medium text-[inherit]">
          Year
        </a>
      </div>
    </div>
  );
};

export default FilterTime;
