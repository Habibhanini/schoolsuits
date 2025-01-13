import React from "react";
interface ClassroomGridProps {
  classroomId: string;
}
const DetailClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Detail</h2>
        <button className="text-gray-500">Back</button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          placeholder="Type here..."
          className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500"
        />
      </div>
      <button className="text-red-500 text-sm">Delete</button>
    </div>
  );
};
export default DetailClassroom;
