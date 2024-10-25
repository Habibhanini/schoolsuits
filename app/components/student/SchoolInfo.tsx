import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const SchoolInfo = () => {
  return (
    <div className="bg-white rounded-3xl shadow p-4 w-[350px] h-[420px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">
          School informations
        </h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <ul className="list-none space-y-3">
        <li className="flex justify-between">
          <span className="font-normal">Enrolment Status:</span>
          <span className="text-[#3f71fb] font-extrabold">15/181-W</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">Admission Date:</span>
          <span className="text-[#3f71fb] font-extrabold">06/09/2017</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">Admission Number:</span>
          <span className="text-[#3f71fb] font-extrabold">004654</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">Former UPN:</span>
          <span className="text-[#3f71fb] font-extrabold">A9514545105</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">UPN:</span>
          <span className="text-[#3f71fb] font-extrabold">A9514545105</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">Unique Learner Number:</span>
          <span className="text-[#3f71fb] font-extrabold">65194912317</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">UCI:</span>
          <span className="text-[#3f71fb] font-extrabold">65198491235Y</span>
        </li>
        <li className="flex justify-between">
          <span className="font-normal">Exam Number:</span>
          <span className="text-[#3f71fb] font-extrabold">6845</span>
        </li>
      </ul>
    </div>
  );
};

export default SchoolInfo;
