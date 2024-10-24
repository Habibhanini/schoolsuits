import InternCommunications from "@/app/components/student/InternCommunications";
import SchoolInfo from "@/app/components/student/SchoolInfo";
import StudentFiles from "@/app/components/student/StudentFiles";
import StudentNotes from "@/app/components/student/StudentNotes";

const StudentCenter = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-4">
      <div className="row-span-2 col-span-3">
        <SchoolInfo />
      </div>
      <div>
        {" "}
        <StudentFiles />
      </div>
      <div className="col-start-4">
        {" "}
        <StudentNotes />
      </div>
      <div className="col-span-4 row-span-2 row-start-3">
        <InternCommunications />
      </div>
    </div>
  );
};
export default StudentCenter;
