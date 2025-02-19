import React, { useState } from "react";
import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart: React.FC = () => {
  const chartId = "my-bar-chart";

  const [visibleGroups, setVisibleGroups] = useState({
    under12: true,
    under20: true,
  });

  const series = [
    { name: "Under 12 - Start", data: [100, 120, 150, 180] },
    { name: "Under 12 - End", data: [120, 140, 170, 200] },
    {
      name: "",
      data: [0, 0, 0, 0],
      showInLegend: false,
      color: "transparent",
    },
    { name: "Under 20 - Start", data: [200, 240, 280, 320] },
    { name: "Under 20 - End", data: [250, 290, 340, 380] },
  ];

  const categories = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: chartId,
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#55D58E", "#13AFD5", "transparent", "#55D58E", "#13AFD5"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories,
      tickPlacement: "on",
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#6B7280" } },
    },
    yaxis: {
      labels: { style: { colors: "#6B7280" } },
    },
    grid: { borderColor: "#E5E7EB", strokeDashArray: 3 },
    fill: { opacity: 0.9 },
    tooltip: { theme: "light" },
    legend: { show: false },
  };

  // Toggling
  const toggleGroup = (group: "under12" | "under20") => {
    if (group === "under12") {
      ApexCharts.exec(chartId, "toggleSeries", "Under 12 - Start");
      ApexCharts.exec(chartId, "toggleSeries", "Under 12 - End");
      setVisibleGroups((prev) => ({ ...prev, under12: !prev.under12 }));
    } else {
      ApexCharts.exec(chartId, "toggleSeries", "Under 20 - Start");
      ApexCharts.exec(chartId, "toggleSeries", "Under 20 - End");
      setVisibleGroups((prev) => ({ ...prev, under20: !prev.under20 }));
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-base font-semibold text-gray-800">
        Total Students by Quarter (2024)
      </h2>

      {/* Custom Legend with Grouped Toggles */}
      <div className="mb-4 flex justify-center space-x-4">
        {/* Under 12 Legend */}
        <div
          onClick={() => toggleGroup("under12")}
          className="cursor-pointer flex items-center space-x-2"
        >
          <span
            className={`block h-3 w-3 rounded-sm ${
              !visibleGroups.under12 ? "opacity-40" : ""
            }`}
            style={{ backgroundColor: "#55D58E" }}
          />
          <span
            className={`text-sm font-medium ${
              !visibleGroups.under12 ? "opacity-40" : ""
            }`}
          >
            U12
          </span>
        </div>

        {/* Under 20 Legend */}
        <div
          onClick={() => toggleGroup("under20")}
          className="cursor-pointer flex items-center space-x-2"
        >
          <span
            className={`block h-3 w-3 rounded-sm ${
              !visibleGroups.under20 ? "opacity-40" : ""
            }`}
            style={{ backgroundColor: "#13AFD5" }}
          />
          <span
            className={`text-sm font-medium ${
              !visibleGroups.under20 ? "opacity-40" : ""
            }`}
          >
            U20
          </span>
        </div>
      </div>

      {/* The Chart */}
      <div className="h-72 w-full">
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
};

export default BarChart;
