import React from "react";

const StudentNotes = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4   w-[350px] h-[200px]">
      <h2 className="text-lg font-bold">Notes</h2>
      <ul>
        <li>
          <strong>Note #1</strong> By Coralie Johnson
        </li>
        <li>
          <strong>Note #2</strong> By Philip Way
        </li>
        <li>
          <strong>Note #3</strong> By Coralie Johnson
        </li>
      </ul>
    </div>
  );
};

export default StudentNotes;
