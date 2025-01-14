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
}: {
  onClassroomSelect: (id: string) => void;
}) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  // Load data from JSON
  useEffect(() => {
    fetch("/database/data.json") // Path to the JSON file in the public directory
      .then((response) => response.json())
      .then((data) => {
        setClassrooms(data.classrooms); // Store the fetched classrooms data
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const handleRowClick = (id: string) => {
    console.log(`Row clicked: ${id}`);
    onClassroomSelect(id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center p-4 bg-white shadow rounded-t-lg">
        <h1 className="text-lg font-bold">Classrooms</h1>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500">
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
              <tr
                key={classroom.id}
                className="border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(classroom.id)}
              >
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 text-blue-600 font-bold">{classroom.id}</td>
                <td className="p-4">{classroom.principalTeacher}</td>
                <td className="p-4">{classroom.sharedWith || "None"}</td>
                <td className="p-4">
                  {classroom.classes.map((classId) => (
                    <span
                      key={classId}
                      className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm font-medium mr-2"
                    >
                      {classId}
                    </span>
                  ))}
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
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
