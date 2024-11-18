import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Image from "next/image";

const SkillInfo = () => {
  useEffect(() => {}, []);

  return (
    <div className="bg-white rounded-3xl  p-4 h-[410px] hd:w-full fhd:w-full   ">
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-between gap-5">
        <a className="[text-decoration:none] relative font-extrabold font-playfair text-[inherit] inline-block min-w-[49px]">
          Skills
        </a>
        <IoEllipsisHorizontal className="w-6 h-6" />
      </div>
      <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[86px] text-left text-mini text-black font-plus-jakarta-sans">
        <div className="self-stretch border-gainsboro-200 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-2 gap-5 text-sm">
          <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[46px]">
            Drama
          </a>
          <div className="rounded-xl bg-darkviolet-200 overflow-hidden flex flex-col items-start justify-center py-[5px] px-2.5 text-darkviolet-100">
            <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[64px]">
              Excellent
            </a>
          </div>
        </div>
        <div className="self-stretch border-gainsboro-200 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-2 gap-5 text-sm">
          <a className="[text-decoration:none] relative font-medium text-[inherit]">
            French
          </a>
          <input
            className="w-[60px] [border:none] [outline:none] bg-limegreen-200 rounded-xl overflow-hidden flex flex-col items-start justify-center py-[5px] px-2.5 box-border font-plus-jakarta-sans font-semibold text-sm text-limegreen-100"
            placeholder="Good"
            type="text"
          />
        </div>
        <div className="self-stretch border-gainsboro-200 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-2 gap-5">
          <div className="relative font-medium inline-block min-w-[53px]">
            History
          </div>
          <div className="rounded-xl bg-red-200 overflow-hidden flex flex-col items-start justify-center py-[5px] px-2.5 text-sm text-red-100">
            <div className="relative font-semibold">Major concerns</div>
          </div>
        </div>
        <div className="self-stretch border-gainsboro-200 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-2 gap-5">
          <div className="relative font-medium inline-block min-w-[68px]">
            Mandarin
          </div>
          <div className="rounded-xl bg-gold-300 overflow-hidden flex flex-col items-start justify-center py-[5px] px-2.5 text-sm text-gold-200">
            <div className="relative font-semibold inline-block min-w-[107px]">
              Some concerns
            </div>
          </div>
        </div>
        <div className="self-stretch border-gainsboro-200 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-2 gap-5">
          <div className="relative font-medium">Mathematic</div>
          <div className="rounded-xl bg-limegreen-200 overflow-hidden flex flex-col items-start justify-center py-[5px] px-2.5 text-sm text-limegreen-100">
            <div className="relative font-semibold inline-block min-w-[41px]">
              Good
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillInfo;
