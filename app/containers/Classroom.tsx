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
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleClassroomSelect = (classroomId: string) => {
    setSelectedClassroom(classroomId);
    setSelectedClass(null);
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
  };

  const handleAddClassroom = () => {
    setSelectedClassroom("new");
  };

  const handleBackClick = () => {
    if (selectedClass) {
      setSelectedClass(null);
    } else {
      setSelectedClassroom(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen overflow-hidden">
      <div className="flex flex-row gap-4 w-full h-full">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
          {/* ClassroomTable */}
          {!selectedClassroom && !selectedClass && (
            <div className="col-span-5 row-span-5 overflow-auto">
              <ClassroomTable
                onClassroomSelect={handleClassroomSelect}
                onAddClassroom={handleAddClassroom}
                onClassSelect={handleClassSelect}
              />
            </div>
          )}

          {/* All components when a class is selected */}
          {selectedClass && (
            <>
              <div className="col-span-5 row-span-2 ">
                <ClassroomGrid
                  classId={selectedClass}
                  onBackClick={handleBackClick}
                />
              </div>
              <div className="row-span-5 col-start-6 col-span-5 overflow-auto">
                <DetailClassroom classroomId={selectedClassroom!} />
                <StaffClassroom classroomId={selectedClassroom!} />
                <ClassesClassroom classroomId={selectedClassroom!} />
              </div>
            </>
          )}

          {/* ClassroomGrid for selected classroom */}
          {selectedClassroom && !selectedClass && (
            <div className="col-span-5 row-span-5 overflow-hidden">
              <ClassroomGrid
                classId={selectedClassroom}
                onBackClick={handleBackClick}
              />
            </div>
          )}

          {/* Add Classroom */}
          {selectedClassroom === "new" && (
            <div className="row-span-5 col-start-6 col-span-5 overflow-auto">
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
