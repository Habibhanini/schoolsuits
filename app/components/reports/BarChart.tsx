import React from "react";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart: React.FC = () => {
  // Two series: Under 12 and Under 20
  const series = [
    {
      name: "Under 12",
      data: [100, 200, 400, 600],
    },
    {
      name: "Under 20",
      data: [250, 350, 500, 730],
    },
  ];

  // The x-axis categories (quarters)
  const categories = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];

  // ApexCharts configuration
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#55D58E", "#13AFD5"], // Under 12, Under 20
    plotOptions: {
      bar: {
        horizontal: false,
        // Keep your preferred columnWidth
        columnWidth: "50%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      tickPlacement: "on",
      // Force a smaller range so categories are closer together
      min: -0.2,
      max: 3.2,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#6B7280", // gray-500
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280", // gray-500
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
    fill: {
      opacity: 0.9,
    },
    tooltip: {
      theme: "light",
    },
    legend: {
      labels: {
        colors: "#374151", // gray-700
      },
      position: "top",
      horizontalAlign: "center",
    },
  };

  return (
    <div className="w-full max-w-xl rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-base font-semibold text-gray-800">
        Total Students by Quarter (2024)
      </h2>
      <div className="h-72 w-full">
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
};

export default BarChart;
