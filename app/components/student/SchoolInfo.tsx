import React from "react";

const SchoolInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-[350px] h-[420px]">
      <h2 className="text-lg font-bold">School Information</h2>
      <ul className="list-none">
        <li>
          <strong>Enrolment Status:</strong> 15/181-W
        </li>
        <li>
          <strong>Admission Date:</strong> 06/09/2017
        </li>
        <li>
          <strong>Admission Number:</strong> 004654
        </li>
        <li>
          <strong>UPN:</strong> A9514545105
        </li>
        <li>
          <strong>Unique Learner Number:</strong> 65194912317
        </li>
        <li>
          <strong>Exam Number:</strong> 6845
        </li>
      </ul>
    </div>
  );
};

export default SchoolInfo;
