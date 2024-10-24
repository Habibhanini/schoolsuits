import React from "react";
import StudentNotes from "./StudentNotes";

const StudentFiles = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 w-[350px] h-[200px]">
        <h2 className="text-lg font-bold">Files</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-2 rounded">
            <img src="path-to-file-image" alt="File" />
            <p>Passport</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <img src="path-to-file-image" alt="File" />
            <p>Birth Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFiles;
