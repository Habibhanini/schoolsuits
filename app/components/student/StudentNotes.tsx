import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const StudentNotes = () => {
  return (
    <div className="bg-white rounded-3xl p-4   w-[350px] h-[200px]">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-extrabold font-playfair">Notes</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <ul className="mt-2 h-[130px] bg-gray-100 rounded-lg space-y-4 ">
        <li />
        <div className="space-y-4 p-2">
          <li className="flex justify-between border-b border-gray-300">
            <span className="font-bold">Note #1</span>
            <span className="font-semibold text-gray-400">
              By Coralie Johnson
            </span>
          </li>
          <li className="flex justify-between border-b border-gray-300">
            <span className="font-bold">Note #2</span>
            <span className="font-semibold text-gray-400">By Philip Way</span>
          </li>
          <li className="flex justify-between border-b border-gray-300">
            <span className="font-bold">Note #3</span>
            <span className="font-semibold text-gray-400">
              By Coralie Johnson
            </span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default StudentNotes;
