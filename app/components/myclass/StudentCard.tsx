import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { StarIcon, WarningIcon } from "@/app/icons/SvgIcons";
import Image from "next/image";
import { HiPlus } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";

export default function StudentCard({
  studentName = "Firstname",
  studentInitial = "S.",
  number = 1,
  initialStarCount = 0,
  initialAlertCount = 0,
}) {
  const [starCount, setStarCount] = useState(initialStarCount);
  const [alertCount, setAlertCount] = useState(initialAlertCount);

  return (
    <div
      className={`rounded-3xs bg-whitesmoke-100 overflow-hidden flex flex-col items-start justify-start p-[5px] box-border gap-[5px] min-w-[140px] max-w-[200px] leading-[normal] tracking-[normal] text-center text-smi text-white font-plus-jakarta-sans `}
    >
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-5">
        <div className="bg-gray-800 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          <a className="[text-decoration:none] flex-1 relative font-semibold text-[inherit]">
            {number}
          </a>
        </div>
        <div className="flex flex-col items-start justify-start pt-[5.5px] px-0 pb-0">
          <IoEllipsisHorizontal className="w-5 h-5 text-black" />
        </div>
      </div>
      <div className="flex flex-row items-start justify-start py-0 pl-0 pr-7 gap-[3px] text-left text-black">
        <div className="h-10 w-10 relative rounded-md bg-gainsboro-400" />
        <div className="flex flex-col items-start justify-start pt-[2.5px] px-0 pb-0">
          <div className="flex flex-col items-start justify-start gap-[3px]">
            <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[66px]">
              {studentName}
            </a>
            <a className="[text-decoration:none] relative font-medium text-gray-300">
              {studentInitial}
            </a>
          </div>
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center gap-[5px] text-base text-gold-100">
        <div className="rounded-md bg-white overflow-hidden flex flex-row items-center justify-center">
          <div className="overflow-hidden flex flex-row items-center justify-center p-[5px] gap-px">
            <Image
              className="h-2.5 w-2.5 relative"
              loading="lazy"
              width={10}
              height={10}
              alt=""
              src="/vector.svg"
            />
            <div className="relative font-semibold">0</div>
          </div>
          <div className="bg-gold-100 flex flex-row items-center justify-center py-2 px-[9px]">
            <FaPlus className="w-3 h-3 text-gray-100" />
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white overflow-hidden flex flex-row items-center justify-between gap-0 [row-gap:20px] text-crimson">
          <div className="overflow-hidden flex flex-row items-center justify-center py-[5px] px-1 gap-px">
            <Image
              className="h-2.5 w-[11.1px] relative"
              loading="lazy"
              width={11}
              height={10}
              alt=""
              src="/vector-2.svg"
            />
            <a className="[text-decoration:none] relative font-semibold text-[inherit]">
              0
            </a>
          </div>
          <div className="bg-crimson flex flex-row items-center justify-center py-2 px-[9px] z-[1]">
            <FaPlus className="w-3 h-3 text-gray-100" />
          </div>
        </div>
      </div>
      <div className="self-stretch rounded-md bg-white overflow-hidden flex flex-row items-start justify-between py-[5px] pl-[5px] pr-1 gap-5 text-left text-sm text-gray-100">
        <select className="w-full p-1 border border-white bg-white text-gray-400 h-7 rounded focus:outline-none focus:ring focus:ring-blue-300 text-sm">
          <option>Attendance</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Excused</option>
        </select>
      </div>
    </div>
  );
}
