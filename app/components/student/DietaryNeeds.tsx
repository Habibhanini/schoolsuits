import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const DietaryNeeds = () => {
  return (
    <div className="bg-white rounded-3xl shadow p-4 h-[276px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">Dietry Needs</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <ul className="mt-2 h-[200px] bg-gray-100 rounded-lg space-y-4 ">
        <li />
        <div className="space-y-4 p-2">
          <li className="flex justify-between border-b font-normal border-gray-300">
            <strong>Halal</strong>
          </li>
          <li className="flex justify-between border-b font-normal border-gray-300">
            <strong>No dairy produce</strong>
          </li>
          <li className="flex justify-between border-b font-normal border-gray-300">
            <strong>Gluten Free</strong>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default DietaryNeeds;
