import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
interface ClassroomGridProps {
  classroomId: string;
}
const StaffClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-3xl mb-4">
      <h2 className="text-lg font-extrabold mb-2 font-playfair">Staff</h2>

      {/* Principal Section */}
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 mr-6">
          Principal:
        </label>
        <div className="relative flex-grow max-w-[50%]">
          <input
            type="text"
            className="input input-bordered rounded-xl pl-4 pr-10 py-2 bg-gray-100 w-full"
            placeholder="Search ..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <IoSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Shared with and Add Button Section */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Shared with:
        </label>
        <button className="bg-[#c9e990] px-4 py-2 rounded-lg hover:bg-green-500 text-[#699e32] font-bold text-sm">
          Add <span className="font-bold text-sm">+</span>
        </button>
      </div>
    </div>
  );
};

export default StaffClassroom;
