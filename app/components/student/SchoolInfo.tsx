import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const SchoolInfo = () => {
  return (
    <div className="bg-white rounded-3xl  p-4 hd:w-[315px] fhd:w-full h-[410px] ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold font-playfair">
          School informations
        </h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <ul className="list-none space-y-3">
        <li className="flex justify-between">
          <span className="font-normal text-sm">Enrolment Status:</span>
          <span className="text-[#3f71fb] text-sm font-extrabold">
            15/181-W
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">Admission Date:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">
            06/09/2017
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">Admission Number:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">004654</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">Former UPN:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">
            A9514545105
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">UPN:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">
            A9514545105
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">Unique Learner Number:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">
            65194912317
          </span>
        </li>
        <li className="flex justify-between ">
          <span className="font-normal text-sm">UCI:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">
            65198491235Y
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal text-sm">Exam Number:</span>
          <span className="text-[#3f71fb] font-extrabold text-sm">6845</span>
        </li>
      </ul>
    </div>
  );
};

export default SchoolInfo;
