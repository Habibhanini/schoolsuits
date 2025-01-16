import { useState, useEffect } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface Classroom {
  id: string;
  name: string;
  principalTeacher: string;
  sharedWith: string | null;
  classes: string[];
}

const ClassroomTable = ({
  onClassroomSelect,
  onAddClassroom,
  onClassSelect,
}: {
  onClassroomSelect: (id: string) => void;
  onAddClassroom: () => void;
  onClassSelect: (id: string) => void;
}) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => setClassrooms(data.classrooms))
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  const getRandomColor = () => {
    const colors = [
      { bg: "#EEF2FF", text: "#6366F1" }, // Light blue
      { bg: "#FEF2F2", text: "#DC2626" }, // Light red
      { bg: "#ECFDF5", text: "#065F46" }, // Light green
      { bg: "#FDF4FF", text: "#A21CAF" }, // Light purple
      { bg: "#FEFCE8", text: "#CA8A04" }, // Light yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="max-w-full h-full mx-auto bg-white rounded-3xl shadow-lg p-4">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-bold font-playfair">Classrooms</h1>
        <button
          className="bg-continue-yellow text-white px-4 py-2 rounded-lg hover:bg-continue-yellow-dark text-sm font-medium"
          onClick={onAddClassroom}
        >
          Add a Classroom
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-[#7E7E7E] text-smi  ">
            <tr>
              <th className="p-3 w-10 resize cursor-col-resize">
                <input type="checkbox" className="cursor-pointer" />
              </th>
              <th className="p-3  w-12 font-medium resize cursor-col-resize">
                ID
              </th>
              <th className="p-3 w-48 font-medium resize cursor-col-resize">
                Principal Teacher
              </th>
              <th className="p-3 w-48 font-medium resize cursor-col-resize">
                Shared with
              </th>
              <th className="p-3 font-medium resize cursor-col-resize">
                Classes
              </th>
              <th className="p-3 text-right resize cursor-col-resize"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {classrooms.map((classroom) => (
              <tr key={classroom.id} className="border-b hover:bg-gray-50">
                <td className="p-3 w-10">
                  <input type="checkbox" className="cursor-pointer" />
                </td>
                <td
                  className="p-3 text-blue-600 font-semibold cursor-pointer"
                  onClick={() => onClassroomSelect(classroom.id)}
                >
                  {classroom.id}
                </td>
                <td className="p-3 font-medium text-gray-900">
                  {classroom.principalTeacher}
                </td>
                <td className="p-3 font-medium text-gray-900">
                  {classroom.sharedWith || "None"}
                </td>
                <td className="p-3 space-x-1">
                  {classroom.classes.map((classId) => {
                    const { bg, text } = getRandomColor();
                    return (
                      <span
                        key={classId}
                        onClick={() => onClassSelect(classId)}
                        className="px-2 py-1 text-smi rounded-full font-medium cursor-pointer"
                        style={{ backgroundColor: bg, color: text }}
                      >
                        {classId}
                      </span>
                    );
                  })}
                </td>
                <td className="p-3 text-right">
                  <button className="text-gray-500 hover:text-gray-700 text-3xl">
                    <IoEllipsisHorizontal className="w-6 h-6 text-black " />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassroomTable;
