import { useEffect } from "react";
import StudentCenter from "../Layouts/Students/StudentCenter";
import StudentLeft from "../Layouts/Students/StudentLeft";
import StudentRight from "../Layouts/Students/StudentRight";

const Student = () => {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 h-screen lg:overflow-y-scroll">
      <div className="grid grid-cols-9 grid-rows-[1fr_auto] gap-4 flex-grow">
        <div className="col-span-3  ">
          <StudentLeft />
        </div>
        <div className="fhd:col-span-4 fhd:col-start-4 hd:col-span-6">
          <StudentCenter />
        </div>
        <div className="lg:col-span-9 lg:row-start-2 hd:mt-[-40px] fhd:row-start-1 fhd:col-span-2 fhd:col-start-8 fhd:mt-0">
          <StudentRight />
        </div>
      </div>
    </div>
  );
};

export default Student;
