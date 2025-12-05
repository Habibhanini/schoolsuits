import SchoolInfo from "@/app/components/student/SchoolInfo";
import SkillInfo from "@/app/components/student/SkillInfo";
import StudentProfile from "@/app/components/student/StudentProfile";
import React from "react";

const StudentTop = () => {
  return (
    <div className="container mx-auto h-[400px] ">
      <div className="flex flex-row gap-4 h-full">
        <div className=" w-full h-full ">
          <StudentProfile />
        </div>
        <div className="w-full h-full">
          <SchoolInfo />
        </div>
        <div className="w-full h-full">
          <SkillInfo />
        </div>
      </div>
    </div>
  );
};

export default StudentTop;
