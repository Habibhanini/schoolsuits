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
      className={`w-[200px] rounded-md bg-whitesmoke-100 overflow-hidden flex flex-col items-start justify-start p-[5px] box-border gap-[5px] min-w-[140px] max-w-[200px] leading-[normal] tracking-[normal] text-left text-smi text-black font-jakarta `}
    >
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-end py-[2.6px] px-0">
        <IoEllipsisHorizontal className="h-5 w-5 " />
      </div>
      <div className="overflow-hidden flex flex-row items-center justify-start py-0 pl-0 pr-[82px] gap-[3px]">
        <Image
          className="h-10 w-10 relative rounded-md object-cover"
          loading="lazy"
          width={40}
          height={40}
          alt=""
          src="/images/avatar.png"
        />
        <div className="overflow-hidden flex flex-col items-start justify-start gap-[3px]">
          <a className="[text-decoration:none] font-jakarta relative font-bold text-[inherit] inline-block min-w-[66px]">
            {studentName}
          </a>
          <a className="[text-decoration:none] font-jakarta relative font-medium text-gray-300">
            {studentInitial}
          </a>
        </div>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center gap-[5px] text-center text-base text-gold-100">
        <div className="rounded-md bg-white overflow-hidden flex flex-row items-center justify-center">
          <div className="overflow-hidden flex flex-row items-center justify-center py-[5px] px-[11px] gap-px">
            <Image
              className="h-3 w-3 relative mr-1"
              loading="lazy"
              width={12}
              height={12}
              alt=""
              src="/images/star.svg"
            />
            <a className="font-jakarta relative font-semibold text-base">0</a>
          </div>
          <div className="bg-gold-100 flex flex-row items-center justify-center py-2 px-4">
            <FaPlus className="h-3.5 w-3.5 relative text-white" />
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white overflow-hidden flex flex-row items-center justify-between gap-0 [row-gap:20px] text-crimson">
          <div className="overflow-hidden flex flex-row items-center justify-center py-[5px] px-[11px] gap-px">
            <Image
              className="h-[10.8px] w-3 relative mr-1"
              loading="lazy"
              width={12}
              height={11}
              alt=""
              src="/images/warning.svg"
            />
            <a className="font-jakarta relative font-semibold text-base">0</a>
          </div>
          <div className="bg-crimson flex flex-row items-center justify-center py-2 px-4">
            <FaPlus className="h-3.5 w-3.5 relative text-white" />
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
