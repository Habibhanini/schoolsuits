import { HatIcon } from "@/app/icons/SvgIcons";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisHorizontal, IoFilterSharp } from "react-icons/io5";
interface ClassroomGridProps {
  classroomId: string;
}
const ClassroomGrid: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  const rows = 11; // Reduce rows for a wider layout
  const cols = 16; // Increase columns for horizontal expansion
  const [selectedSeats, setSelectedSeats] = useState<number[][]>([]);

  // Handle seat selection
  const toggleSeat = (row: number, col: number) => {
    const seat = [row, col];
    setSelectedSeats((prev) =>
      prev.some(([r, c]) => r === row && c === col)
        ? prev.filter(([r, c]) => r !== row || c !== col)
        : [...prev, seat]
    );
  };

  // Check if a seat is selected
  const isSeatSelected = (row: number, col: number) =>
    selectedSeats.some(([r, c]) => r === row && c === col);

  return (
    <div className=" w-full  bg-white p-8 rounded-xl">
      {/* Header */}
      <div
        className={`max-w-full  flex flex-row items-start justify-between flex-wrap content-start py-0 pl-0 pr-[3px] box-border leading-[normal] tracking-[normal] gap-5 text-left text-lg text-black font-playfair-display `}
      >
        <a className=" w-[150px] relative font-extrabold text-[inherit] font-playfair inline-block shrink-0">
          Classroom Edit
        </a>
        <div className="w-[759px] flex flex-col items-start justify-start pt-[1px] px-0 pb-0 box-border max-w-full text-right text-xs text-gray-300 font-plus-jakarta-sans">
          <div className="self-stretch flex flex-row items-start justify-end gap-[15px] shrink-0 lg:flex-wrap md:flex-nowrap flex-nowrap">
            <div className="flex flex-row items-start justify-start py-0 pl-0 pr-2 gap-[5px] flex-nowrap">
              <a className=" text-darkgray font-jakarta text-sm font-bold mr-4 text-black">
                back
              </a>
            </div>

            <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
              <IoEllipsisHorizontal className="w-6 h-6 text-black mt-[-9px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Blue bar */}
      <div className="flex flex-col items-center mt-4 ">
        <div className="w-[270px] max-w-6xl h-3 bg-[#3047BA] mb-4"></div>

        {/* Grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`, // 16 columns
            maxWidth: "1000px", // Adjust maximum width for wider layout
          }}
        >
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                onClick={() => toggleSeat(row, col)}
                className={`w-14 h-14 flex items-center justify-center border rounded cursor-pointer ${
                  isSeatSelected(row, col)
                    ? "bg-[#287F71] text-white"
                    : "bg-[#D9D9D9]"
                }`}
              >
                {isSeatSelected(row, col) ? (
                  <HatIcon className="h-2 w-2 relative text-white" />
                ) : (
                  <FaPlus className="h-3.5 w-3.5 relative text-[#979797]" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Confirm button */}
        <button
          onClick={() => console.log(selectedSeats)}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Confirm Seating
        </button>
      </div>
    </div>
  );
};

export default ClassroomGrid;
