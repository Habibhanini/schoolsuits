import React from "react";

interface ClassroomGridProps {
  classroomId: string;
}

const DetailClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-3xl shadow mb-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Detail</h2>
        <button className="text-gray-500">Back</button>
      </div>

      {/* Input Section */}
      <div className="mb-4 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 mr-4">
          Classroom ID:
        </label>
        <div className="relative flex-grow max-w-[50%]">
          <input
            type="text"
            value={classroomId} // Pre-fill with classroomId
            className="input input-bordered rounded-xl pl-4 pr-10 py-2 bg-gray-100 w-full"
            readOnly
          />
        </div>
      </div>

      {/* Action Section */}
      <div className="flex justify-end">
        <button className="text-red-500 text-sm">Delete</button>
      </div>
    </div>
  );
};

export default DetailClassroom;
