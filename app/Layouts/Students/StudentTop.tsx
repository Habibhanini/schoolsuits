import SchoolInfo from "@/app/components/student/SchoolInfo";
import SkillInfo from "@/app/components/student/SkillInfo";
import StudentProfile from "@/app/components/student/StudentProfile";
import React from "react";

const StudentTop = () => {
  return (
    <div className="  h-[410px] ">
      {/* Container for all three components in the same row with a fixed height */}
      <div className="flex flex-row gap-4 h-full">
        <div className="w-[520px] h-full">
          <StudentProfile />
        </div>
        <div className="w-[320px] h-full">
          <SchoolInfo />
        </div>
        <div className="w-[400px] h-full">
          <SkillInfo />
        </div>
      </div>
    </div>
  );
};

export default StudentTop;
