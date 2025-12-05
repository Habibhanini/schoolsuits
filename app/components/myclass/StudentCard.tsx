import React, { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

export default function StudentCard({
  studentName = "Firstname",
  studentInitial = "S.",
  number = 1,
  initialStarCount = 0,
  initialAlertCount = 0,
}) {
  const [attendanceStatus, setAttendanceStatus] = useState("Attendance");

  // Function to get the color based on the attendance status
  const getColor = () => {
    switch (attendanceStatus) {
      case "Present":
        return "#85CA88"; // Green
      case "Absent":
        return "#EB5118"; // Red
      case "Late":
        return "#F5A12C"; // Orange
      default:
        return "#FFFFFF"; // Default (white)
    }
  };

  // Function to get the text color based on the attendance status
  const getTextColor = () => {
    return attendanceStatus === "Attendance" ? "text-gray-400" : "text-white";
  };

  return (
    <div
      className="w-full max-w-[200px] rounded-xl overflow-hidden flex flex-col items-start justify-start p-2 lg:p-3 box-border gap-2 lg:gap-3 min-w-[140px] leading-[normal] tracking-[normal] text-left text-smi text-black font-jakarta"
      style={{
        backgroundColor: "whitesmoke",
        border: `2px solid ${getColor()}`,
      }}
    >
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-end py-1">
        <IoEllipsisHorizontal className="h-4 w-4 lg:h-5 lg:w-5" />
      </div>

      <div className="overflow-hidden flex flex-row items-center justify-start gap-2 w-full">
        <Image
          className="h-8 w-8 lg:h-10 lg:w-10 relative rounded-md object-cover flex-shrink-0"
          loading="lazy"
          width={40}
          height={40}
          alt=""
          src="/images/avatar.png"
        />
        <div className="overflow-hidden flex flex-col items-start justify-start gap-1 min-w-0 flex-1">
          <a className="font-jakarta relative font-bold text-inherit text-xs lg:text-sm truncate w-full">
            {studentName}
          </a>
          <a className="font-jakarta relative font-medium text-gray-300 text-xs truncate w-full">
            {studentInitial}
          </a>
        </div>
      </div>

      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center gap-1 lg:gap-2 text-center text-base text-gold-100">
        <div className="flex-1 rounded-md bg-white overflow-hidden flex flex-row items-center justify-center min-w-0">
          <div className="overflow-hidden flex flex-row items-center justify-center py-1 lg:py-2 px-2 gap-px">
            <Image
              className="h-2 w-2 lg:h-3 lg:w-3 relative"
              loading="lazy"
              width={12}
              height={12}
              alt=""
              src="/images/star.svg"
            />
            <a className="font-jakarta relative font-semibold text-xs lg:text-sm">
              0
            </a>
          </div>
          <div className="bg-gold-100 flex flex-row items-center justify-center py-1 lg:py-2 px-2">
            <FaPlus className="h-2 w-2 lg:h-3 lg:w-3 relative text-white" />
          </div>
        </div>

        <div className="flex-1 rounded-md bg-white overflow-hidden flex flex-row items-center justify-center gap-0 text-crimson min-w-0">
          <div className="overflow-hidden flex flex-row items-center justify-center py-1 lg:py-2 px-2 gap-px">
            <Image
              className="h-2 w-2 lg:h-3 lg:w-3 relative"
              loading="lazy"
              width={12}
              height={11}
              alt=""
              src="/images/warning.svg"
            />
            <a className="font-jakarta relative font-semibold text-xs lg:text-sm">
              0
            </a>
          </div>
          <div className="bg-crimson flex flex-row items-center justify-center py-1 lg:py-2 px-2">
            <FaPlus className="h-2 w-2 lg:h-3 lg:w-3 relative text-white" />
          </div>
        </div>
      </div>

      <div className="self-stretch rounded-md overflow-hidden flex flex-row items-start justify-between gap-2 text-left text-sm text-gray-100">
        <select
          className={`w-full p-1 border h-6 lg:h-7 rounded text-xs lg:text-sm ${getTextColor()}`}
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
          style={{
            backgroundColor: getColor(),
          }}
        >
          <option
            value="Attendance"
            className="text-gray-400"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            Attendance
          </option>
          <option
            value="Present"
            className="text-white"
            style={{ backgroundColor: "#85CA88" }}
          >
            Present
          </option>
          <option
            value="Absent"
            className="text-white"
            style={{ backgroundColor: "#EB5118" }}
          >
            Absent
          </option>
          <option
            value="Late"
            className="text-white"
            style={{ backgroundColor: "#F5A12C" }}
          >
            Late
          </option>
        </select>
      </div>
    </div>
  );
}
