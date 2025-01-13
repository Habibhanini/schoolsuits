import React, { useState } from "react";
import ClassesClassroom from "../components/classroom/ClassesClassroom";
import ClassroomGrid from "../components/classroom/ClassroomGrid";
import ClassroomTable from "../components/classroom/ClassroomTable";
import DetailClassroom from "../components/classroom/DetailClassroom";
import StaffClassroom from "../components/classroom/StaffClassroom";

const Classroom = () => {
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(
    null
  );

  const handleClassroomSelect = (classroomId: string) => {
    setSelectedClassroom(classroomId);
  };

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="flex flex-row gap-4">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full">
          {/* ClassroomTable always visible */}
          <div className="col-span-5 row-span-5">
            {!selectedClassroom && (
              <ClassroomTable onClassroomSelect={handleClassroomSelect} />
            )}
            {selectedClassroom && (
              <ClassroomGrid classroomId={selectedClassroom} />
            )}
          </div>

          {/* Conditionally render other components if a classroom is selected */}
          {selectedClassroom && (
            <div className="row-span-5 col-start-6 col-span-5">
              <DetailClassroom classroomId={selectedClassroom} />
              <StaffClassroom classroomId={selectedClassroom} />
              <ClassesClassroom classroomId={selectedClassroom} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classroom;
