import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
interface ClassroomGridProps {
  classroomId: string;
}
const DetailClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-3xl shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Detail</h2>
        <button className="text-gray-500">Back</button>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 mr-4">Name:</label>
        <div className="relative flex-grow max-w-[50%]">
          <input
            type="text"
            className="input input-bordered rounded-xl pl-4 pr-10 py-2 bg-gray-100 w-full"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="text-red-500 text-sm">Delete</button>
      </div>
    </div>
  );
};
export default DetailClassroom;
