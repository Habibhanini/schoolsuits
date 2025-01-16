import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Student {
  id: string;
  name: string;
  picture: string;
}

interface ClassesClassroomProps {
  classroomId: string | null; // Null when "Add Classroom" is triggered
  selectedClass: string | null; // Selected class ID
}

const ClassesClassroom: React.FC<ClassesClassroomProps> = ({
  classroomId,
  selectedClass,
}) => {
  const [classes, setClasses] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current page
  const studentsPerPage = 6; // Pagination: Students per page

  // Fetch classes for a classroom when `classroomId` changes
  useEffect(() => {
    if (classroomId && !selectedClass) {
      fetch("/database/data.json")
        .then((response) => response.json())
        .then((data) => {
          const classroomData = data.classrooms.find(
            (classroom: { id: string }) => classroom.id === classroomId
          );
          if (classroomData) {
            setClasses(classroomData.classes); // Set classes for the classroom
          }
        })
        .catch((error) => console.error("Error loading classes:", error));
    }
  }, [classroomId, selectedClass]);

  // Fetch students for a selected class
  useEffect(() => {
    if (selectedClass) {
      fetch("/database/data.json")
        .then((response) => response.json())
        .then((data) => {
          const classData = data.classes.find(
            (cls: { id: string }) => cls.id === selectedClass
          );
          if (classData) {
            setStudents(classData.students); // Set students for the selected class
          }
        })
        .catch((error) => console.error("Error loading students:", error));
    }
  }, [selectedClass]);

  // Pagination: Calculate students for the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Pagination: Handle page change
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 bg-white rounded-3xl shadow h-[470px] overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {selectedClass ? `Class: ${selectedClass}` : "Classes"}
        </h2>
        <button className="bg-[#c9e990] px-4 py-2 rounded-lg hover:bg-green-500 text-[#699e32] font-bold text-sm">
          Add <span className="font-bold text-sm">+</span>
        </button>
      </div>
      {selectedClass && totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mb-2">
          <FaChevronLeft
            onClick={() => handlePageChange(currentPage - 1)}
            className={`cursor-pointer ${
              currentPage === 1 ? "text-gray-500" : "text-gray-950"
            }`}
          />
          <span className="text-sm font-semibold">
            {currentPage} of {totalPages}
          </span>
          <FaChevronRight
            onClick={() => handlePageChange(currentPage + 1)}
            className={`cursor-pointer ${
              currentPage === totalPages ? "text-gray-500" : "text-gray-950"
            }`}
          />
        </div>
      )}
      {/* Classes or Students Section */}
      <div className="h-[calc(100%-3rem)] overflow-auto">
        {selectedClass ? (
          // Display students for the selected class
          currentStudents.length > 0 ? (
            <div className="flex flex-col gap-4">
              {currentStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 border-b-2  rounded-lg "
                >
                  <img
                    src={student.picture}
                    alt={student.name}
                    className="w-11 h-11 rounded"
                  />
                  <div>
                    <p className="font-bold text-base">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.id}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No students available for this class.</p>
          )
        ) : // Display classes if no class is selected
        classes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {classes.map((className, idx) => (
              <span
                key={idx}
                className="bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-300"
              >
                {className}
              </span>
            ))}
          </div>
        ) : (
          <p>No classes available for this classroom.</p>
        )}
      </div>

      {/* Pagination Controls */}
    </div>
  );
};

export default ClassesClassroom;
