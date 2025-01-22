import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import StudentCard from "./StudentCard";

export type ClassType = {
  className?: string;
  classroomId: string;
  classId: string;
};

const MyClass: NextPage<ClassType> = ({
  className = "",
  classroomId,
  classId,
}) => {
  const [students, setStudents] = useState<any[]>([]);
  const [seating, setSeating] = useState<any[]>([]);
  const [maxRows, setMaxRows] = useState<number>(1);
  const [maxCols, setMaxCols] = useState<number>(1);

  useEffect(() => {
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedClassroom = data.classrooms.find(
          (classroom: { id: string }) => classroom.id === classroomId
        );
        const selectedClass = data.classes.find(
          (classData: { id: string }) => classData.id === classId
        );

        if (selectedClassroom && selectedClass) {
          const studentsData = selectedClass.students;
          const seatingData = selectedClassroom.seating;

          // Find max rows & columns to define grid size
          const maxRow =
            Math.max(...seatingData.map((seat: any) => seat.seat[0])) + 1;
          const maxCol =
            Math.max(...seatingData.map((seat: any) => seat.seat[1])) + 1;

          setMaxRows(maxRow);
          setMaxCols(maxCol);

          // Map seating positions to students
          const seatingWithStudents = seatingData.map(
            (seat: { studentId: string; seat: [number, number] }) => {
              const student = studentsData.find(
                (s: { id: string }) => s.id === seat.studentId
              );
              return { ...seat, student };
            }
          );

          console.log("Seating Data:", seatingWithStudents);

          setStudents(studentsData);
          setSeating(seatingWithStudents);
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [classroomId, classId]);

  return (
    <div className={`rounded-xl bg-white p-6 max-w-full h-full ${className}`}>
      {/* Header Section */}
      <div className="flex flex-row items-start justify-between flex-wrap py-0 pl-0 pr-3 box-border text-lg text-black font-playfair-display">
        <a className="w-[95px] relative font-extrabold inline-block">
          My Class
        </a>
        <div className="w-[759px] flex flex-col items-start justify-start text-right text-xs text-gray-300">
          <div className="flex flex-row items-start justify-end gap-[15px]">
            <div className="flex flex-row items-start gap-2">
              <IoFilterSharp className="w-6 h-6 text-black" />
              <span className="text-sm font-bold">Nb of students:</span>
              <b className="text-sm text-black">{students.length}</b>
              <span className="text-sm font-bold">Nb of absences:</span>
              <b className="text-sm text-black">{students.length * 0}</b>{" "}
              {/* Placeholder for absences */}
            </div>
            <IoEllipsisHorizontal className="w-6 h-6 text-black" />
          </div>
        </div>
      </div>

      {/* Dynamic Grid Layout with Correct Seat Mapping */}
      <div
        className="grid gap-8 mt-8"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`, // Define grid columns dynamically
          gridTemplateRows: `repeat(${maxRows}, auto)`, // Define grid rows dynamically
        }}
      >
        {seating.map((seat, index) => (
          <div
            key={index}
            className="relative  "
            style={{
              gridColumnStart: seat.seat[1] - 2, // Adjust column start
              gridRowStart: seat.seat[0] + 1, // Adjust row start
              width: "170px", // Ensures uniform size
              height: "130px", // Ensures space between rows

              alignItems: "center",
            }}
          >
            {seat.student ? (
              <StudentCard
                studentName={seat.student.name}
                studentInitial={seat.student.name.charAt(0)}
                number={seat.student.id}
                initialStarCount={0}
                initialAlertCount={0}
              />
            ) : (
              <span className="text-gray-500 text-sm">Empty Seat</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
