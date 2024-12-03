import type { NextPage } from "next";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import StudentCard from "./StudentCard";
import { useState, useEffect, SetStateAction } from "react";
export type ClassType = {
  className?: string;
};
import students from "../../database/student.json";
const MyClass: NextPage<ClassType> = ({ className = "" }) => {
  return (
    <div className={`rounded-xl bg-white p-6 max-w-full   h-full ${className}`}>
      <div
        className={`max-w-full  flex flex-row items-start justify-between flex-wrap content-start py-0 pl-0 pr-[3px] box-border leading-[normal] tracking-[normal] gap-5 text-left text-lg text-black font-playfair-display ${className}`}
      >
        <a className=" w-[95px] relative font-extrabold text-[inherit] font-playfair inline-block shrink-0">
          My class
        </a>
        <div className="w-[759px] flex flex-col items-start justify-start pt-[1px] px-0 pb-0 box-border max-w-full text-right text-xs text-gray-300 font-plus-jakarta-sans">
          <div className="self-stretch flex flex-row items-start justify-end gap-[15px] shrink-0 lg:flex-wrap md:flex-nowrap flex-nowrap">
            <div className="flex flex-row items-start justify-start py-0 pl-0 pr-2 gap-[5px] flex-nowrap">
              <IoFilterSharp className="w-6 h-6 relative text-black mt-[-2px]" />
              <a className=" text-darkgray font-jakarta text-sm font-bold mr-4 text-black">
                Last Name from A - Z
              </a>
              <a className=" text-darkgray-400  text-sm relative font-bold">
                Nb of students
              </a>
              <b className="relative inline-block text-sm  mr-4 text-black min-w-[18px]">
                {students.length}
              </b>
              <a className=" text-darkgray-400  text-sm  mr-1 font-bold text-[inherit] inline-block min-w-[86px]">
                Nb of absence
              </a>
              <a className="  font-bold text-sm text-black">
                {students.reduce(
                  (acc, student) => acc + student.initialAlertCount,
                  0
                )}
              </a>
            </div>

            <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
              <IoEllipsisHorizontal className="w-6 h-6 text-black mt-[-9px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-24 mt-5">
        {Array.from(
          { length: Math.ceil(students.length / 4) },
          (_, groupIndex) => (
            <div
              key={groupIndex}
              className="grid grid-cols-2 gap-4 "
              style={{ width: "max-content" }}
            >
              {students
                .slice(groupIndex * 4, groupIndex * 4 + 4)
                .map((student) => (
                  <StudentCard
                    key={student.number}
                    studentName={student.studentName}
                    studentInitial={student.studentInitial}
                    number={student.number}
                    initialStarCount={student.initialStarCount}
                    initialAlertCount={student.initialAlertCount}
                  />
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyClass;
