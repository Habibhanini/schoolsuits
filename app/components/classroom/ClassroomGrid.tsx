import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { HatIcon } from "@/app/icons/SvgIcons";

interface Student {
  id: string;
  name: string;
  picture: string;
}

interface ClassroomGridProps {
  classId: string; // Class ID passed from Classroom
  onBackClick: () => void;
}

const ClassroomGrid: React.FC<ClassroomGridProps> = ({
  classId,
  onBackClick,
}) => {
  const rows = 11; // Grid rows
  const cols = 16; // Grid columns
  const [seating, setSeating] = useState<
    { seat: number[]; student: Student | null }[]
  >([]);
  const [selectedSeats, setSelectedSeats] = useState<number[][]>([]);

  useEffect(() => {
    // Fetch data from JSON
    fetch("/database/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the class data by classId
        const selectedClass = data.classes.find(
          (cls: any) => cls.id === classId
        );

        if (selectedClass) {
          // Map student IDs to student details
          const studentMap = selectedClass.students.reduce(
            (map: any, student: Student) => {
              map[student.id] = student;
              return map;
            },
            {}
          );

          // Get classroom seating and map students to their seats
          const classroom = data.classrooms.find((cls: any) =>
            cls.classes.includes(classId)
          );

          if (classroom) {
            const classroomSeating = classroom.seating.map((seat: any) => ({
              seat: seat.seat,
              student: studentMap[seat.studentId] || null,
            }));

            setSeating(classroomSeating);
          }
        }
      })
      .catch((error) => console.error("Error loading data:", error));
  }, [classId]);

  const toggleSeat = (row: number, col: number) => {
    const seat = [row, col];
    setSelectedSeats((prev) =>
      prev.some(([r, c]) => r === row && c === col)
        ? prev.filter(([r, c]) => r !== row || c !== col)
        : [...prev, seat]
    );
  };

  const isSeatSelected = (row: number, col: number) =>
    selectedSeats.some(([r, c]) => r === row && c === col);

  return (
    <div className="w-full bg-white p-8 rounded-3xl">
      {/* Header */}
      <div
        className={`max-w-full flex flex-row items-start justify-between flex-wrap content-start py-0 pl-0 pr-[3px] box-border leading-[normal] tracking-[normal] gap-5 text-left text-lg text-black font-playfair-display`}
      >
        <a className="w-[150px] relative font-extrabold text-[inherit] font-playfair inline-block shrink-0">
          Classroom Edit
        </a>
        <div className="w-[759px] flex flex-col items-start justify-start pt-[1px] px-0 pb-0 box-border max-w-full text-right text-xs text-gray-300 font-plus-jakarta-sans">
          <div className="self-stretch flex flex-row items-start justify-end gap-[15px] shrink-0 lg:flex-wrap md:flex-nowrap flex-nowrap">
            <div className="flex flex-row items-start justify-start py-0 pl-0 pr-2 gap-[5px] flex-nowrap">
              <button
                onClick={onBackClick}
                className="text-darkgray font-jakarta text-sm font-bold mr-4 text-black"
              >
                Back
              </button>
            </div>

            <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
              <IoEllipsisHorizontal className="w-6 h-6 text-black mt-[-9px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Blue bar */}
      <div className="flex flex-col items-center mt-4">
        <div className="w-[270px] max-w-6xl h-3 bg-[#3047BA] mb-4"></div>

        {/* Grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
            maxWidth: "1000px",
          }}
        >
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              // Find the student for this seat
              const seatData = seating.find(
                (seat) => seat.seat[0] === row && seat.seat[1] === col
              );

              return (
                <div
                  key={`${row}-${col}`}
                  onClick={() => toggleSeat(row, col)} // Allow selection/deselection
                  className={`w-14 h-14 flex items-center justify-center border rounded cursor-pointer ${
                    isSeatSelected(row, col)
                      ? "bg-[#287F71] text-white"
                      : "bg-[#D9D9D9]"
                  }`}
                >
                  {seatData?.student ? (
                    // If there's a student assigned to this seat, show their picture
                    <img
                      src={seatData.student.picture}
                      alt={seatData.student.name}
                      className="w-full h-full object-cover rounded "
                    />
                  ) : isSeatSelected(row, col) ? (
                    // If seat is selected but no student is assigned, show HatIcon
                    <HatIcon className="h-2 w-2 relative text-white" />
                  ) : (
                    // Default state: show FaPlus for an unselected and unassigned seat
                    <FaPlus className="h-3.5 w-3.5 relative text-[#979797]" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomGrid;
