import Image from "next/image";
import React, { useCallback } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
export type RootType = {
  className?: string;
};
const UsersTable = ({ className = "" }) => {
  return (
    <div className="p-2 bg-white rounded-xl 2xl:w-full lg:w-[1080px] 2xl:h-full lg:h-[690px] ">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center  p-4 pb-6">
          <h1 className="text-2xl font-bold font-playfair">Users</h1>
          <div
            className={`rounded-xl bg-[#c9e990]  flex flex-row items-start justify-start py-[7px] pl-2.5 pr-[9px] gap-2.5 leading-[normal] tracking-[normal] text-right text-smi text-olivedrab font-plus-jakarta-sans ${className}`}
          >
            <a className=" flex-1 relative font-bold text-[#699e32]">
              Add a user
            </a>
            <div className="flex flex-col items-start justify-start  px-0 pb-0">
              <FiPlus className="w-4 h-4 text-[#699e32]" />
            </div>
          </div>
        </div>

        <div className="flex space-x-5 mb-4 px-2">
          <div
            className={`max-w-full  flex flex-row items-start justify-start py-0 pl-0 pr-[1299px] box-border gap-2.5 leading-[normal] tracking-[normal] text-right text-smi text-white font-plus-jakarta-sans mq450:pr-5 mq450:box-border mq825:pr-[649px] mq825:box-border mq1500:flex-wrap ${className}`}
          >
            <div className="rounded-lg bg-[#e0e9ff] flex flex-row items-center justify-start py-2.5 pl-2.5 pr-[9px] gap-[5px]">
              <div className="rounded-md bg-[#3971ff]  flex flex-col items-start justify-start py-[5px] pl-[5px] pr-1">
                <a className=" self-stretch relative font-medium text-white">
                  80
                </a>
              </div>
              <a className="relative font-medium text-[#3971ff] text-left">
                Teachers
              </a>
            </div>
            <div className="rounded-lg border-[#e8e8e8] border-[1px] border-solid  flex flex-row items-center justify-start py-2 pl-2.5 pr-[7px] gap-[5px] text-dimgray">
              <div className="rounded-md bg-[#c8c8c8]  flex flex-col items-start justify-start py-[5px] pl-[5px] pr-1">
                <a className=" self-stretch relative font-medium text-gray-500 inline-block min-w-[30px]">
                  1239
                </a>
              </div>
              <a className=" relative font-medium text-gray-500 text-left inline-block min-w-[59px]">
                Students
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white  border-b border-gray-200 max-h-[674px] overflow-y-auto scrollable ">
          {[...Array(15)].map((_, index) => (
            <div
              className={`border-gainsboro-100 border-b-[1px] border-solid box-border max-w-full  flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5 gap-2.5 leading-[normal] tracking-[normal] text-center text-smi text-black font-plus-jakarta-sans mq1225:flex-wrap ${className}`}
            >
              <div className="h-[50px] w-[50px] relative rounded-full bg-[#3971ff]  shrink-0" />
              <div className="flex-1 flex flex-col items-start justify-start pt-[7.5px] px-0 pb-0 box-border min-w-[929px] max-w-full mq1050:min-w-full">
                <div className="w-[528px] flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-[5px] max-w-full">
                  <div className="self-stretch flex flex-row items-start justify-between gap-5 mq450:flex-wrap">
                    <b className="relative inline-block text-left min-w-[129px]">
                      Lastname Firstname
                    </b>
                    <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[82px]">
                      Oct 01, 2022
                    </a>
                    <a className="[text-decoration:none] w-16 relative font-semibold text-[inherit] inline-block shrink-0">
                      None
                    </a>
                    <a className="[text-decoration:none] w-[87px] relative font-semibold text-[inherit] inline-block shrink-0">
                      43’500£
                    </a>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-between gap-5 text-2xs text-dimgray mq450:flex-wrap">
                    <a className="[text-decoration:none] relative font-medium text-[#969696] text-left inline-block min-w-[129px]">
                      @lastnamefirstname01
                    </a>
                    <a className="[text-decoration:none] w-[82px] relative font-medium text-[#969696] inline-block shrink-0">
                      Register Date
                    </a>
                    <a className="[text-decoration:none] relative font-medium text-[#969696]">
                      Renew Date
                    </a>
                    <a className="[text-decoration:none] relative font-medium text-[#969696]">
                      Annual revenues
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[10px] px-0 pb-0">
                <HiEllipsisHorizontal className="w-8 h-8 relative " />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
