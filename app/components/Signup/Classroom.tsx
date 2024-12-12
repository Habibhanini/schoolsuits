import React from "react";

const Classroom: React.FC = () => {
  return (
    <div className=" p-6 bg-white ">
      <h2 className="text-2xl font-semibold mb-6">About your Classerooms</h2>
      <button className=" w-48 py-3 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500">
        Add a new classroom
      </button>
    </div>
  );
};

export default Classroom;
