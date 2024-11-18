import { useEffect } from "react";
import StudentRight from "../Layouts/Students/StudentRight";
import StudentTop from "../Layouts/Students/StudentTop";
import StudentBottom from "../Layouts/Students/StudentBottom";

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
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4">
            <StudentTop />
          </div>
          <StudentBottom />
        </div>

        <StudentRight />
      </div>
    </div>
  );
};

export default Student;
