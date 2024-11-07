import type { NextPage } from "next";
import { IoEllipsisHorizontal } from "react-icons/io5";

export type ActualClassType = {
  className?: string;
};

const ActualClass: NextPage<ActualClassType> = ({ className = "" }) => {
  return (
    <div
      className={`max-w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal] text-left text-smi text-black font-plus-jakarta-sans ${className}`}
    >
      <div className="rounded-xl bg-white overflow-hidden flex flex-col items-start justify-start py-2.5 px-[15px] box-border gap-2.5 max-w-full">
        <div className="self-stretch overflow-hidden flex flex-row items-center justify-start py-0 pl-0 pr-[200px] gap-5 text-lg font-playfair-display mq450:gap-[90px] mq450:pr-5 mq450:box-border">
          <div className="relative font-playfair font-extrabold">
            Actual class
          </div>
        </div>
        <b className="relative text-mini inline-block text-goldenrod min-w-[97px]">
          Unit 6.4 in H8
        </b>
        <b className="relative inline-block text-deepskyblue min-w-[69px]">
          Class 10FR
        </b>
        <div className="self-stretch rounded-3xs bg-whitesmoke flex flex-col items-start justify-start text-white rounded-xl">
          <div className="w-[150px] rounded-3xs bg-continue-yellow flex flex-col items-start justify-center py-[7.5px] pl-2.5 pr-5 box-border rounded-xl">
            <b className="relative">30 min left</b>
          </div>
        </div>
      </div>
      <section className="h-[140px] flex-1 flex flex-row items-start justify-start gap-[35px] max-w-full ml-[-36px] text-left text-lg text-black font-playfair-display mq1050:min-w-full mq1250:flex-wrap mq1250:ml-0 mq750:gap-[17px]">
        <div className="flex flex-col items-start justify-start pt-[19.5px] px-0 pb-0">
          <IoEllipsisHorizontal className="w-6 h-6 mt-[-8px]" />
        </div>
        <div className="self-stretch flex-1 rounded-xl bg-white overflow-hidden flex flex-col items-start justify-start py-2.5 px-[15px] box-border gap-2.5 max-w-full mq1050:min-w-full">
          <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-5">
            <a className="[text-decoration:none] font-playfair relative font-extrabold text-[inherit]">
              Assistant Suggestion
            </a>
            <div className="flex flex-col items-start justify-start pt-[9.5px] px-0 pb-0">
              <IoEllipsisHorizontal className="w-6 h-6 mt-[-8px]" />
            </div>
          </div>
          <a className="[text-decoration:none] relative text-sm font-bold font-jakarta text-[inherit] inline-block min-w-[116px]">{`new seating plan `}</a>
          <div className="w-[250px] flex-1 relative rounded-3xs bg-whitesmoke overflow-hidden rounded-xl" />
        </div>
      </section>
    </div>
  );
};

export default ActualClass;
