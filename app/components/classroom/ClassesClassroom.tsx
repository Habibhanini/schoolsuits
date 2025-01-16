import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface Student {
  id: string;
  name: string;
  picture: string;
}

interface ClassesClassroomProps {
  classroomId: string | null;
  selectedClass: string | null;
}

const classOptions = ["10Fr", "11Fr", "8Ger", "9Eng", "12Sci", "7Math"];

const classColors: { [key: string]: string } = {
  "10Fr": "bg-blue-100 text-blue-600",
  "8Ger": "bg-blue-100 text-blue-600",
  "7Math": "bg-purple-100 text-purple-600",
  "9Eng": "bg-green-100 text-green-600",
  "12Sci": "bg-yellow-100 text-yellow-600",
  "11Fr": "bg-yellow-100 text-yellow-600",
};

const ClassesClassroom: React.FC<ClassesClassroomProps> = ({
  classroomId,
  selectedClass,
}) => {
  const [classes, setClasses] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const studentsPerPage = 6;

  useEffect(() => {
    if (classroomId && !selectedClass) {
      fetch("/database/data.json")
        .then((response) => response.json())
        .then((data) => {
          const classroomData = data.classrooms.find(
            (classroom: { id: string }) => classroom.id === classroomId
          );
          if (classroomData) {
            setClasses(classroomData.classes);
          }
        })
        .catch((error) => console.error("Error loading classes:", error));
    }
  }, [classroomId, selectedClass]);

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

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddClass = () => {
    if (selectedClasses.length > 0) {
      setClasses((prevClasses) => [
        ...prevClasses,
        ...selectedClasses.filter((cls) => !prevClasses.includes(cls)),
      ]);
      setSelectedClasses([]);
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="p-4 bg-white rounded-3xl  h-[470px] overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold text-gray-800 font-playfair">
          {selectedClass ? `Class: ${selectedClass}` : "Classes"}
        </h2>
        {!selectedClass && (
          <button
            className="bg-[#c9e990] px-4 py-2 rounded-lg hover:bg-green-100 text-[#699e32] font-bold text-sm"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Add <span className="font-bold text-sm">+</span>
          </button>
        )}
      </div>

      {/* Styled Dropdown */}
      {showDropdown && !selectedClass && (
        <div
          ref={dropdownRef}
          className="absolute top-14 left-0 bg-[#111729] p-4 rounded-xl shadow-md w-64 z-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-sm font-semibold">Select Classes</h3>
            <button onClick={() => setShowDropdown(false)}>
              <FaTimes className="text-white cursor-pointer hover:text-gray-400" />
            </button>
          </div>

          <div className="space-y-2">
            {classOptions.map((cls) => (
              <label
                key={cls}
                className="flex items-center space-x-2 text-white text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={cls}
                  checked={selectedClasses.includes(cls)}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedClasses((prev) =>
                      prev.includes(selectedValue)
                        ? prev.filter((item) => item !== selectedValue)
                        : [...prev, selectedValue]
                    );
                  }}
                  className="form-checkbox h-4 w-4 text-blue-500 border-gray-500 bg-transparent"
                />
                <span>{cls}</span>
              </label>
            ))}
          </div>
          <button
            className="w-full mt-4 bg-white text-[#111729] py-2 rounded-lg font-semibold hover:bg-gray-200"
            onClick={handleAddClass}
          >
            Add Selected
          </button>
        </div>
      )}

      {/* Display Selected Classes as Styled Pills */}
      {!selectedClass && classes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {classes.map((className) => (
            <span
              key={className}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                classColors[className] || "bg-gray-100 text-gray-600"
              }`}
            >
              {className}
            </span>
          ))}
        </div>
      )}
      {selectedClass && totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-2">
          <FaChevronLeft
            onClick={() => handlePageChange(currentPage - 1)}
            className={`cursor-pointer ${
              currentPage === 1 ? "text-gray-500" : "text-gray-950"
            }`}
          />
          <span className="text-sm font-semibold text-gray-700">
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
      {/* Display Students When a Class is Selected */}
      {selectedClass ? (
        currentStudents.length > 0 ? (
          <div className="flex flex-col gap-4 mt-2">
            {currentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-4 border-b-2 rounded-lg "
              >
                <img
                  src={student.picture}
                  alt={student.name}
                  className="w-11 h-11 rounded"
                />
                <div>
                  <p className="font-bold text-base text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500">{student.id}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No students available for this class.
          </p>
        )
      ) : null}
    </div>
  );
};

export default ClassesClassroom;
