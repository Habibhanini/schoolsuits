import React from "react";

const AdditionalInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold">Additional Information</h2>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
          Eligible for free transport
        </span>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
          Young Carer
        </span>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
          Uniform Allowance
        </span>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
          Service Children Concerns
        </span>
      </div>
    </div>
  );
};

export default AdditionalInfo;
