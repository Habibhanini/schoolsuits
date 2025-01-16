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
    setSelectedClass(null); // Reset the selected class
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId); // Set the selected class
  };

  const handleAddClassroom = () => {
    setSelectedClassroom("new"); // Indicate a new classroom creation
    setSelectedClass(null);
  };

  const handleBackClick = () => {
    if (selectedClass) {
      setSelectedClass(null); // Reset selected class and go back to classroom view
    } else {
      setSelectedClassroom(null); // Reset selected classroom and go back to table view
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen overflow-hidden">
      <div className="flex flex-row gap-4 w-full h-full">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full h-full">
          {/* ClassroomTable: Shows all classrooms if no selection */}
          {!selectedClassroom && !selectedClass && (
            <div className="col-span-5 row-span-5 overflow-auto">
              <ClassroomTable
                onClassroomSelect={handleClassroomSelect}
                onAddClassroom={handleAddClassroom}
                onClassSelect={handleClassSelect}
              />
            </div>
          )}

          {/* When a class is selected, display ClassesClassroom and other components */}
          {selectedClass && (
            <>
              <div className="col-span-4 row-span-3">
                <ClassroomGrid
                  classId={selectedClass}
                  onBackClick={handleBackClick}
                />
              </div>
              <div className="col-span-1 row-span-5 overflow-auto">
                <DetailClassroom classroomId={selectedClassroom!} />
                <StaffClassroom classroomId={selectedClassroom!} />
                <ClassesClassroom
                  classroomId={selectedClassroom!}
                  selectedClass={selectedClass}
                />
              </div>
            </>
          )}

          {/* ClassroomGrid: Shows seating chart for a selected classroom */}
          {selectedClassroom &&
            !selectedClass &&
            selectedClassroom == "new" && (
              <>
                <div className="col-span-4 row-span-5">
                  <ClassroomGrid
                    classId={selectedClassroom}
                    onBackClick={handleBackClick}
                  />
                </div>
                <div className="col-span-1 row-span-5 overflow-hidden">
                  <DetailClassroom classroomId={selectedClassroom} />
                  <StaffClassroom classroomId={selectedClassroom} />
                  <ClassesClassroom
                    classroomId={selectedClassroom}
                    selectedClass={null}
                  />
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Classroom;
