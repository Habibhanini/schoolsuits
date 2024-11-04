import { useState } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { StarIcon, WarningIcon } from "@/app/icons/SvgIcons";

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
    <div className="w-[132px] h-[132px] bg-[#f6f6f6] rounded-lg p-2 relative shadow-md">
      <div className="absolute top-1 left-1 bg-gray-800 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
        {number}
      </div>
      <div className="absolute top-1 right-1">
        <IoEllipsisHorizontal className="text-black text-sm w-6 h-4" />
      </div>
      <div className="flex items-center gap-1 mt-4">
        <div className="w-11 h-11 bg-[#d9d9d9] rounded"></div>
        <div>
          <p className="text-sm font-semibold">{studentName}</p>
          <p className="text-gray-600 text-xs">{studentInitial}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 gap-4">
        <div className="flex items-center bg-white rounded">
          <div className="bg-yellow-400 w-5 h-5 flex items-center justify-center rounded-l">
            <StarIcon className="text-white text-sm w-4 h-4" />
          </div>
          <p className="mx-1 text-sm">{starCount}</p>
          <button
            onClick={() => setStarCount(starCount + 1)}
            className="text-sm font-semibold"
          >
            <FiPlus />
          </button>
        </div>
        <div className="flex items-center bg-white rounded">
          <div className="bg-red-400 w-5 h-5 flex items-center justify-center rounded-l">
            <WarningIcon className="text-white text-sm w-4 h-4" />
          </div>
          <p className="mx-1 text-sm">{alertCount}</p>
          <button
            onClick={() => setAlertCount(alertCount + 1)}
            className="text-sm font-semibold"
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="mt-2">
        <select className="w-full p-1 border border-white bg-white text-gray-400 h-6 rounded focus:outline-none focus:ring focus:ring-blue-300 text-sm">
          <option>Attendance</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Excused</option>
        </select>
      </div>
    </div>
  );
}
