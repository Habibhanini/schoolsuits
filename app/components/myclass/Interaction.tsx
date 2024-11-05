import {
  StarIcon,
  UnionLeftIcon,
  UnionRightIcon,
  WarningIcon,
} from "@/app/icons/SvgIcons";
import type { NextPage } from "next";
import Image from "next/image";
import { IoEllipsisHorizontal } from "react-icons/io5";

export type RootType = {
  className?: string;
};

const Interaction: NextPage<RootType> = ({ className = "" }) => {
  return (
    <div
      className={` flex flex-col items-start justify-start gap-5 leading-[normal] tracking-[normal]  ${className}`}
    >
      <section className="w-full rounded-xl bg-white flex flex-col items-start justify-start p-[15px] box-border gap-[5px] min-w-[235px] max-w-[333px] text-left text-mini text-black font-plus-jakarta-sans">
        <div className="self-stretch  flex flex-row items-center justify-between flex-wrap content-center gap-5 text-lg font-playfair-display">
          <a className="[text-decoration:none] font-playfair relative font-extrabold text-[inherit]">
            Interaction
          </a>
          <IoEllipsisHorizontal className="w-6 h-6 mt-[-8px]" />
        </div>
        <b className="self-stretch relative">Slides</b>
        <div className="self-stretch  flex flex-row items-start justify-start gap-[5px]">
          <button
            onClick={() => {}}
            className="btn flex rounded-xl text-md items-center transition-colors duration-300 bg-gray-300 text-black hover:bg-gray-400 w-[150px] h-[50px]"
          >
            <UnionLeftIcon className="mt-1 h-5 w-5" />
            Safeguarding
          </button>
          <button
            onClick={() => {}}
            className="btn flex rounded-xl text-md items-center transition-colors duration-300 bg-goldenrod text-white hover:bg-continue-yellow-dark w-[150px] h-[50px]"
          >
            Next Slide
            <UnionRightIcon className="ml-2 h-5 w-5 mt-1" />
          </button>
        </div>
        <b className="self-stretch relative">Board</b>
        <div className="self-stretch  flex flex-row items-start justify-start gap-[5px]">
          <button
            onClick={() => {}}
            className="btn flex rounded-xl text-md items-center transition-colors duration-300 bg-[#ead04f] text-white hover:bg-continue-yellow-dark w-[150px] h-[50px]"
          >
            <StarIcon className="h-5 w-5" />
            House pts
          </button>
          <button
            onClick={() => {}}
            className="btn flex rounded-xl text-md items-center transition-colors duration-300 bg-[#db6c6d] text-white hover:bg-safeguard-red-dark w-[150px] h-[50px]"
          >
            <WarningIcon className=" h-5 w-5 " />
            warning
          </button>
        </div>
      </section>
      <section className="w-full rounded-xl bg-white flex flex-col items-start justify-start p-[15px] box-border gap-2.5 min-w-[235px] max-w-[342px]   text-left text-lg text-black font-playfair-display">
        <div className="self-stretch  flex flex-row items-center justify-between flex-wrap content-center gap-5">
          <h3 className="m-0 w-[95px] relative text-inherit font-extrabold font-playfair  inline-block shrink-0">
            Timeline
          </h3>
          <IoEllipsisHorizontal className="w-6 h-6 mt-[-8px]" />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[289px] gap-[5px] text-xs text-white font-plus-jakarta-sans">
          <div className="self-stretch  flex flex-row items-center justify-start gap-[5px]">
            <div className="rounded-2xl bg-teal  flex flex-col items-start justify-start py-[5px] pl-2 pr-[9px]">
              <div className="relative font-medium inline-block pl-1 min-w-[38px]">
                08:30
              </div>
            </div>
            <div className="flex-1  flex flex-col items-start justify-start text-black">
              <div className="self-stretch flex flex-row items-center justify-start">
                <div className="relative font-medium">Firstname S.</div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start text-2xs text-gray-300">
                <div className="relative font-medium inline-block min-w-[72px]">
                  got a warning
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-start py-0 px-[30px]">
            <div className="h-4 w-px relative border-teal border-r-[1px] border-solid box-border" />
          </div>
          <div className="self-stretch n flex flex-row items-center justify-start gap-[5px]">
            <div className="rounded-2xl bg-teal  flex flex-col items-start justify-start py-[5px] pl-2 pr-[9px]">
              <div className="relative font-medium inline-block pl-1 min-w-[38px]">
                08:30
              </div>
            </div>
            <div className="flex-1  flex flex-col items-start justify-start text-black">
              <div className="self-stretch  flex flex-row items-center justify-start">
                <div className="relative font-medium">Firstname S.</div>
              </div>
              <div className="self-stretch  flex flex-row items-center justify-start text-2xs text-gray-300">
                <div className="relative font-medium">got a house point</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interaction;
