import React from "react";
interface ClassroomGridProps {
  classroomId: string;
}
const ClassesClassroom: React.FC<ClassroomGridProps> = ({ classroomId }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Classes</h2>
      <button className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 mb-4">
        Add <span className="font-bold">+</span>
      </button>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          10Fr
        </span>
        <span className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          8Ger
        </span>
        <span className="bg-purple-200 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
          7Math
        </span>
      </div>
    </div>
  );
};

export default ClassesClassroom;
