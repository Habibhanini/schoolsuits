import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart: React.FC = () => {
  const series = [
    {
      name: "U12",
      data: [10, 30, 60, 100],
    },
    {
      name: "U20",
      data: [20, 25, 40, 60],
    },
  ];

  const categories = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 0,
        blur: 4,
        opacity: 0.12,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },
    colors: ["#2A6ADB", "#34D399"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 3,
        gradientToColors: ["#2A6ADB", "#34D399"],
        inverseColors: false,
        opacityFrom: 0.65,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: "#fff",
      hover: {
        size: 6,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: ({ series, dataPointIndex, w }) => {
        const avatarUrl = "/images/avatar.png";
        const category = w.globals.categoryLabels[dataPointIndex];

        const u12Val = series[0][dataPointIndex] ?? 0;
        const u20Val = series[1][dataPointIndex] ?? 0;

        return `
          <div class="rounded-md border border-gray-200 bg-white p-2 shadow-md">
            <div class="flex flex-col items-center space-y-2">
              <div class="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                <img
                  src="${avatarUrl}"
                  alt="Avatar"
                  class="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div class="text-xs text-gray-500">${category}</div>
              <div class="text-sm font-medium text-gray-700">U12: ${u12Val}</div>
              <div class="text-sm font-medium text-gray-700">U20: ${u20Val}</div>
            </div>
          </div>
        `;
      },
    },
    xaxis: {
      categories,
      labels: { style: { colors: "#6B7280" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: { style: { colors: "#6B7280" } },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
    dataLabels: {
      enabled: false,
    },
    // Legend configuration: position at the top with bold labels
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "#374151",
      },
      markers: {
        size: 8,
        shape: "line",
        strokeWidth: 8,
      },
    },
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Growth for U12 and U20 notes
        </h2>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
          Notes
        </span>
      </div>

      <div className="h-80 w-full">
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default AreaChart;
