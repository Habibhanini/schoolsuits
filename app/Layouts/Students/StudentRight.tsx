import AdditionalInfo from "@/app/components/student/AdditionalInfo";
import DietaryNeeds from "@/app/components/student/DietaryNeeds";
import StudentContacts from "@/app/components/student/StudentContacts";
import { useEffect, useState } from "react";
const StudentRight = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1536); // 1536px is the breakpoint for '2xl'
    };

    // Set initial value
    handleResize();

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`grid gap-3 ${
        isLargeScreen
          ? "grid-cols-1 md:gap-4"
          : "grid-cols-6 grid-rows-[430px_auto]"
      }`}
    >
      <div
        className={`${
          isLargeScreen ? "row-span-2" : "col-span-2 col-start-1 "
        }`}
      >
        <StudentContacts />
      </div>
      <div
        className={`${isLargeScreen ? "row-span-2" : "col-span-2 col-start-3"}`}
      >
        <AdditionalInfo />
      </div>
      <div
        className={`${isLargeScreen ? "row-span-2" : "col-span-2 col-start-5"}`}
      >
        <DietaryNeeds />
      </div>
    </div>
  );
};

export default StudentRight;
