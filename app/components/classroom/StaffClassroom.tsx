import React from "react";
interface ClassroomGridProps {
  classroomId: string;
}
const StaffClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Staff</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Principal:
        </label>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow p-2 border rounded-l-lg bg-gray-100 text-gray-500"
          />
          <button className="bg-green-400 text-white px-4 py-2 rounded-r-lg hover:bg-green-500">
            Add <span className="font-bold">+</span>
          </button>
        </div>
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Shared with:
      </label>
      <button className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500">
        Add <span className="font-bold">+</span>
      </button>
    </div>
  );
};

export default StaffClassroom;
