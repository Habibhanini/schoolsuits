"use client";
import Interaction from "../../components/myclass/Interaction";
import MyClass from "../../components/myclass/MyClass";

const ClassInProg = () => {
  return (
    <div className="flex flex-col gap-4 p-4 h-full min-h-screen">
      <div className="flex flex-row gap-4 h-full">
        {/* Main Class Area - Takes most of the space */}
        <div className="flex-1">
          <MyClass classroomId="A1" classId="10Fr" />
        </div>

        {/* Interaction Sidebar - Reduced width */}
        <div className="w-[20vw] min-w-[280px] max-w-[320px]">
          <Interaction />
        </div>
      </div>
    </div>
  );
};

export default ClassInProg;
