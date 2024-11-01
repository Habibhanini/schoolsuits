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
        <div className="2xl:col-span-4 2xl:col-start-4 lg:col-span-6">
          <StudentCenter />
        </div>
        <div className="lg:col-span-9 lg:row-start-2 lg:mt-[-40px] 2xl:row-start-1 2xl:col-span-2 2xl:col-start-8 2xl:mt-0">
          <StudentRight />
        </div>
      </div>
    </div>
  );
};

export default Student;
