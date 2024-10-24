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
    <div
      className="grid grid-cols-9 grid-rows-1 gap-4"
      style={{ height: "100vh" }}
    >
      <div className="col-span-3">
        <StudentLeft />
      </div>
      <div className="col-span-4 col-start-4">
        <StudentCenter />
      </div>
      <div className="col-span-2 col-start-8">
        <StudentRight />
      </div>
    </div>
  );
};

export default Student;
