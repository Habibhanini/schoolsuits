import { useState, useEffect } from "react";

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
  onClassSelect: (id: string) => void; // New handler for class selection
}) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => setClassrooms(data.classrooms))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center p-4 bg-white shadow rounded-t-lg">
        <h1 className="text-lg font-bold">Classrooms</h1>
        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
          onClick={onAddClassroom}
        >
          Add a Classroom
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow rounded-b-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4">ID</th>
              <th className="p-4">Principal Teacher</th>
              <th className="p-4">Shared with</th>
              <th className="p-4">Classes</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((classroom) => (
              <tr key={classroom.id} className="border-b hover:bg-gray-100">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td
                  className="p-4 text-blue-600 font-bold cursor-pointer"
                  onClick={() => onClassroomSelect(classroom.id)}
                >
                  {classroom.id}
                </td>
                <td className="p-4">{classroom.principalTeacher}</td>
                <td className="p-4">{classroom.sharedWith || "None"}</td>
                <td className="p-4">
                  {classroom.classes.map((classId) => (
                    <span
                      key={classId}
                      onClick={() => onClassSelect(classId)} // Class click
                      className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm font-medium cursor-pointer"
                    >
                      {classId}
                    </span>
                  ))}
                </td>
                <td className="p-4">
                  <button className="text-gray-500">...</button>
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
