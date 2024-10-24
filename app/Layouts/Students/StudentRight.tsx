import AdditionalInfo from "@/app/components/student/AdditionalInfo";
import DietaryNeeds from "@/app/components/student/DietaryNeeds";
import StudentContacts from "@/app/components/student/StudentContacts";

const StudentRight = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-5 gap-4">
      <div className="row-span-2 col-span-1 ">
        {" "}
        <StudentContacts />
      </div>
      <div className="row-start-3 col-span-1 ">
        {" "}
        <AdditionalInfo />
      </div>
      <div className="row-span-2 row-start-4 col-span-1 ">
        {" "}
        <DietaryNeeds />
      </div>
    </div>
  );
};
export default StudentRight;
