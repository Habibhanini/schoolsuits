import React from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
export type RootType = {
  className?: string;
};
const UsersTable = ({ className = "" }) => {
  return (
    <div className="p-2 bg-white rounded-xl w-full">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 pb-6">
          <h1 className="text-lg font-bold font-playfair">Users</h1>
          <div
            className={`rounded-xl bg-[#c9e990] flex flex-row items-center justify-between py-[0.44rem] pl-2.5 pr-[0.56rem] gap-2.5 leading-normal tracking-normal text-smi text-olivedrab font-plus-jakarta-sans ${className}`}
          >
            <a className="flex-1 relative font-bold text-[#699e32]">
              Add a user
            </a>
            <div className="flex flex-col items-center justify-center">
              <FiPlus className="w-4 h-4 text-[#699e32]" />
            </div>
          </div>
        </div>

        {/* Teacher / Student Counters */}
        <div className="flex space-x-5 mb-4 px-2">
          <div className="flex flex-row items-center gap-2.5">
            {/* Teachers */}
            <div className="rounded-lg bg-[#e0e9ff] flex flex-row items-center justify-start py-2.5 pl-2.5 pr-2 gap-2">
              <div className="rounded-md bg-[#3971ff] flex items-center justify-center py-[0.31rem] pl-[0.31rem] pr-1">
                <a className="font-medium text-white">80</a>
              </div>
              <a className="font-medium text-[#3971ff]">Teachers</a>
            </div>
            {/* Students */}
            <div className="rounded-lg border border-gray-300 flex flex-row items-center justify-start py-2 pl-2.5 pr-2 gap-2 text-dimgray">
              <div className="rounded-md bg-[#c8c8c8] flex items-center justify-center py-[0.31rem] pl-[0.31rem] pr-1">
                <a className="font-medium text-gray-500">1239</a>
              </div>
              <a className="font-medium text-gray-500">Students</a>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="border-b border-gray-200 max-h-[42rem] lg:max-h-[75rem] overflow-y-auto">
          {[...Array(40)].map((_, idx) => (
            <div
              key={idx}
              className="border-b border-gray-300 flex flex-row items-center pt-[0.47rem] px-2.5 pb-1.5 gap-2.5 text-smi text-black font-plus-jakarta-sans flex-wrap"
            >
              {/* Avatar */}
              <div className="h-[3.125rem] w-[3.125rem] rounded-full bg-[#3971ff] shrink-0" />
              {/* User details */}
              <div className="flex-1 flex flex-col items-start justify-center pt-[0.47rem] w-full">
                <div className="w-full flex flex-col items-start justify-between pr-5 gap-1">
                  <div className="flex flex-row items-center justify-between gap-5 flex-wrap">
                    <b className="min-w-[8rem]">Lastname Firstname</b>
                    <a className="font-semibold">Oct 01, 2022</a>
                    <a className="font-semibold w-16 text-center">None</a>
                    <a className="font-semibold w-[5.44rem] text-center">
                      43’500£
                    </a>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-5 text-2xs text-dimgray flex-wrap">
                    <a className="font-medium text-[#969696] min-w-[8rem]">
                      @lastnamefirstname01
                    </a>
                    <a className="font-medium text-[#969696] w-20 text-center">
                      Register Date
                    </a>
                    <a className="font-medium text-[#969696] text-center">
                      Renew Date
                    </a>
                    <a className="font-medium text-[#969696] text-center">
                      Annual revenues
                    </a>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex flex-col items-center justify-center pt-[0.625rem]">
                <HiEllipsisHorizontal className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
