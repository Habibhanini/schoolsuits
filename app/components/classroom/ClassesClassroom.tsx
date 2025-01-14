import React, { useState, useEffect } from "react";

interface ClassesClassroomProps {
  classroomId: string;
}

const ClassesClassroom: React.FC<ClassesClassroomProps> = ({ classroomId }) => {
  const [classes, setClasses] = useState<string[]>([]);

  // Fetch classroom data when the component is mounted or when classroomId changes
  useEffect(() => {
    // Fetch data from the public directory
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the classroom based on the classroomId
        const selectedClassroom = data.classrooms.find(
          (classroom: { id: string }) => classroom.id === classroomId
        );
        if (selectedClassroom) {
          // If the classroom is found, set the classes
          setClasses(selectedClassroom.classes);
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [classroomId]); // Re-run this effect if classroomId changes

  return (
    <div className="p-4 bg-white rounded-3xl shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Classes</h2>
        <button className="bg-[#c9e990] px-4 py-2 rounded-lg hover:bg-green-500 text-[#699e32] font-bold text-sm">
          Add <span className="font-bold text-sm">+</span>
        </button>
      </div>

      {/* Classes Section */}
      <div className="flex flex-wrap gap-2">
        {classes.length > 0 ? (
          classes.map((className, idx) => (
            <span
              key={idx}
              className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
            >
              {className}
            </span>
          ))
        ) : (
          <p>No classes available.</p>
        )}
      </div>
    </div>
  );
};

export default ClassesClassroom;
