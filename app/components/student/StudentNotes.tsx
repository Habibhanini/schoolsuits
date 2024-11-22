import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const StudentNotes = () => {
  return (
    <div className="bg-white rounded-3xl p-4   w-full h-[200px]">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-extrabold font-playfair">Notes</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div
        className={`max-w-full overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal] `}
      >
        <section className="flex-1 rounded-3xs bg-whitesmoke-100 overflow-hidden flex flex-col items-start justify-start pt-0 px-[5px] pb-[4.5px] box-border max-w-full text-left text-sm text-black font-jakarta">
          <div className="self-stretch border-gainsboro-300 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-2.5 pb-2 gap-5 mq372:flex-wrap">
            <div className="w-[194px] relative text-sm font-jakarta font-semibold inline-block shrink-0">
              Note #1
            </div>
            <div className="relative font-semibold text-sm font-jakarta text-gray-200 text-right">
              By Coralie Johnson
            </div>
          </div>
          <div className="self-stretch border-gainsboro-300 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-2.5 pb-2 gap-5 mq335:flex-wrap">
            <div className="w-[194px] font-jakarta relative text-sm font-semibold inline-block shrink-0">
              Note #2
            </div>
            <a className="font-jakarta relative font-semibold text-sm text-gray-200 text-right">
              By Philip Wey
            </a>
          </div>
          <div className="self-stretch border-gainsboro-300 border-b-[1px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-2.5 pb-2 gap-5 mq372:flex-wrap">
            <div className="w-[194px] font-jakarta relative text-sm font-semibold inline-block shrink-0">
              Note #3
            </div>
            <div className="relative font-jakarta font-semibold text-sm text-gray-200 text-right">
              By Coralie Johnson
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentNotes;
