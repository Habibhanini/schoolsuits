import React, { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  picture: string;
}

interface ClassesClassroomProps {
  classroomId: string;
}

const ClassesClassroom: React.FC<ClassesClassroomProps> = ({ classroomId }) => {
  const [classes, setClasses] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Fetch classroom data when the component is mounted or when classroomId changes
  useEffect(() => {
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the classroom based on the classroomId
        const selectedClassroom = data.classrooms.find(
          (classroom: { id: string }) => classroom.id === classroomId
        );
        if (selectedClassroom) {
          setClasses(selectedClassroom.classes);
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [classroomId]);

  // Fetch students when a class is clicked
  useEffect(() => {
    if (selectedClass) {
      fetch("/database/data.json")
        .then((response) => response.json())
        .then((data) => {
          const classData = data.classes.find(
            (cls: { id: string }) => cls.id === selectedClass
          );
          if (classData) {
            setStudents(classData.students);
          }
        })
        .catch((error) => console.error("Error loading students:", error));
    }
  }, [selectedClass]);

  return (
    <div className="p-4 bg-white rounded-3xl shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">
          {selectedClass ? "Students" : "Classes"}
        </h2>
        {selectedClass && (
          <button
            onClick={() => setSelectedClass(null)} // Back to classes
            className="text-blue-600 hover:underline text-sm"
          >
            Back
          </button>
        )}
      </div>

      {/* Classes or Students Section */}
      <div className="flex flex-wrap gap-2">
        {selectedClass ? (
          students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-4 p-2 border rounded-lg w-full"
              >
                <img
                  src={student.picture}
                  alt={student.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold text-sm">{student.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No students available for this class.</p>
          )
        ) : classes.length > 0 ? (
          classes.map((className, idx) => (
            <span
              key={idx}
              onClick={() => setSelectedClass(className)} // Select class
              className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
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
