import React from "react";
import ChartsContainer from "../components/reports/ChartsContainer";
import UsersSectionContainer from "../components/reports/UsersSectionContainer";

const Reports = () => {
  return (
    <div className="flex w-full gap-4 p-1">
      {/* Charts container fills remaining space */}
      <div className="flex-1">
        <ChartsContainer />
      </div>

      {/* Users container fixed to 250px */}
      <div className="w-[250px]">
        <UsersSectionContainer />
      </div>
    </div>
  );
};

export default Reports;
