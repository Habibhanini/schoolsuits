import React from "react";

interface TimeBarProps {
  totalTime: number; // Total time in minutes
  timeLeft: number; // Time left in minutes
  unitName: string; // Name of the unit, e.g., "Unit 6.4"
}

const TimeBar: React.FC<TimeBarProps> = ({ totalTime, timeLeft, unitName }) => {
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="relative w-full h-10 rounded-xl bg-[#FBE9D7] overflow-hidden flex items-center">
      {/* Progress bar filler */}
      <div
        className="absolute top-0 left-0 h-full bg-[#F1B528]"
        style={{
          width: `${progressPercentage}%`,
          transition: "width 1s linear", // Smooth animation
        }}
      ></div>

      {/* Labels inside the bar */}
      <div className="relative z-10 flex justify-between w-full px-4 text-sm font-bold ">
        <span className="text-white font-jakarta text-sm ">
          {timeLeft > 0 ? `${timeLeft} min left` : "Done!"}
        </span>
        <span className="font-jakarta text-sm">{unitName}</span>
      </div>
    </div>
  );
};

export default TimeBar;
