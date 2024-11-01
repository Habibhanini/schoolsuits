import SkillChart from "@/app/components/student/SkillChart";
import StudentProfile from "@/app/components/student/StudentProfile";

const StudentLeft = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 gap-4">
      <div className="row-span-4">
        {" "}
        <StudentProfile />
      </div>
      <div className="row-span-2 2xl:mr-0">
        {" "}
        <SkillChart />
      </div>
    </div>
  );
};
export default StudentLeft;
