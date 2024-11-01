import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const AdditionalInfo = () => {
  return (
    <div className="bg-white rounded-3xl  p-4 lg:h-[350px] 2xl:h-[170px] 2xl:ml-0 lg:ml-1 ">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-extrabold font-playfair">
          Additional informations
        </h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-[#3f71fb] py-1 px-3 rounded-full font-semibold text-sm">
          Eligible for free transport
        </span>
        <span className="bg-blue-100 text-[#3f71fb] py-1 px-3 rounded-full font-semibold text-sm">
          Young Carer
        </span>
        <span className="bg-blue-100 text-[#3f71fb] py-1 px-3 rounded-full font-semibold text-sm">
          Uniform Allowance
        </span>
        <span className="bg-blue-100 text-[#3f71fb] py-1 px-3 rounded-full font-semibold text-sm">
          School Arrange
        </span>
        <span className="bg-blue-100 text-[#3f71fb] py-1 px-3 rounded-full font-semibold text-sm">
          Service Children Concerns
        </span>
      </div>
    </div>
  );
};

export default AdditionalInfo;
