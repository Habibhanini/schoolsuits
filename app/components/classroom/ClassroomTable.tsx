const ClassroomTable = ({
  onClassroomSelect,
}: {
  onClassroomSelect: (id: string) => void;
}) => {
  const handleRowClick = (id: string) => {
    console.log(`Row clicked: ${id}`); // Confirming the row click is triggered
    onClassroomSelect(id); // Pass selected classroom ID to parent
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
            <tr
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                console.log("Row A1 clicked!"); // Debugging click on row
                handleRowClick("A1");
              }}
            >
              <td className="p-4">
                <input type="checkbox" />
              </td>
              <td className="p-4 text-blue-600 font-bold">A1</td>
              <td className="p-4">Philip Wey</td>
              <td className="p-4">Coralie Johnson</td>
              <td className="p-4">
                <span className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm font-medium mr-2">
                  10Fr
                </span>
              </td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <button className="text-gray-500">...</button>
              </td>
            </tr>
            <tr
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                console.log("Row H1 clicked!"); // Debugging click on row
                handleRowClick("H1");
              }}
            >
              <td className="p-4">
                <input type="checkbox" />
              </td>
              <td className="p-4 text-blue-600 font-bold">H1</td>
              <td className="p-4">Beatrice Von Den Berg</td>
              <td className="p-4">None</td>
              <td className="p-4">
                <span className="bg-blue-200 text-blue-600 px-2 py-1 rounded-full text-sm font-medium mr-2">
                  10Fr
                </span>
              </td>
              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                <button className="text-gray-500">...</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassroomTable;
