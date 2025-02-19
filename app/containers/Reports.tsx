import React from "react";
import ChartsContainer from "../components/reports/ChartsContainer";
import UsersSectionContainer from "../components/reports/UsersSectionContainer";

const Reports = () => {
  return (
    <div className="flex w-full gap-4 p-1">
      {/* Charts take 2/3 of the width */}
      <div className="flex-[2] min-w-[1300px]">
        <ChartsContainer />
      </div>

      {/* Users take 1/3 of the width */}
      <div className="flex-1 min-w-[250px]">
        <UsersSectionContainer />
      </div>
    </div>
  );
};

export default Reports;
