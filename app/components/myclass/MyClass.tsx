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
    <div
      className={`rounded-xl bg-white p-4 lg:p-6 w-full h-full min-h-[600px] overflow-auto ${className}`}
    >
      {/* Header Section */}
      <div className="flex flex-row items-start justify-between flex-wrap py-0 pl-0 pr-3 box-border text-lg text-black font-playfair-display mb-4">
        <a className="relative font-extrabold inline-block">My Class</a>
        <div className="flex flex-col items-end justify-start text-right text-xs text-gray-300">
          <div className="flex flex-row items-center justify-end gap-[15px] flex-wrap">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <IoFilterSharp className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
              <span className="text-xs lg:text-sm font-bold whitespace-nowrap">
                Nb of students:
              </span>
              <b className="text-xs lg:text-sm text-black">{students.length}</b>
              <span className="text-xs lg:text-sm font-bold whitespace-nowrap">
                Nb of absences:
              </span>
              <b className="text-xs lg:text-sm text-black">
                {students.length * 0}
              </b>
            </div>
            <IoEllipsisHorizontal className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
          </div>
        </div>
      </div>

      {/* Dynamic Grid Layout with Responsive Card Sizing */}
      <div
        className="grid gap-2 lg:gap-4 xl:gap-6 mt-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
          gridTemplateRows: `repeat(${maxRows}, auto)`,
          padding: "1rem",
        }}
      >
        {seating.map((seat, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center"
            style={{
              gridColumnStart: seat.seat[1] - 3,
              gridRowStart: seat.seat[0] + 1,
              minHeight: "120px",
            }}
          >
            {seat.student ? (
              <div className="w-full max-w-[180px] lg:max-w-[200px]">
                <StudentCard
                  studentName={seat.student.name}
                  studentInitial={seat.student.name.charAt(0)}
                  number={seat.student.id}
                  initialStarCount={0}
                  initialAlertCount={0}
                />
              </div>
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
