import InternCommunications from "@/app/components/student/InternCommunications";
import StudentFiles from "@/app/components/student/StudentFiles";
import React from "react";

const StudentBottom = () => {
  return (
    <div className="container mx-auto h-[400px] ">
      <div className="flex flex-row gap-4 h-full">
        <div className="w-[600px] h-full ">
          <InternCommunications />
        </div>
        <div className="w-[655px] h-full">
          <StudentFiles />
        </div>
      </div>
    </div>
  );
};

export default StudentBottom;
