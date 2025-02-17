// components/BottleneckChart.tsx
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexCharts for Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BottleneckChart: React.FC = () => {
  // Data for each of the three layered shapes:
  // "center" = actual 100%, 87.6%, 64.4%, 44.2%, 12.1%
  // "middle" and "outer" are each ~5% wider than the next to create layers.

  // --- Center Shape (darkest, top) ---
  const centerData = [
    { x: "Jan", y: [-50, 50] }, // 100% => half is 50
    { x: "Feb", y: [-43.8, 43.8] }, // 87.6% => half is 43.8
    { x: "Mar", y: [-32.2, 32.2] }, // 64.4%
    { x: "Apr", y: [-22.1, 22.1] }, // 44.2%
    { x: "May", y: [-6.05, 6.05] }, // 12.1%
  ];

  // --- Middle Shape ---
  const middleData = [
    { x: "Jan", y: [-50, 50] },
    { x: "Feb", y: [-48.8, 48.8] },
    { x: "Mar", y: [-37.2, 37.2] },
    { x: "Apr", y: [-33.1, 33.1] },
    { x: "May", y: [-11.05, 11.05] },
  ];

  // Put them all in series so ApexCharts draws three overlapping rangeArea shapes
  // The LAST series in the array is drawn on TOP.
  const series: ApexAxisChartSeries = [
    { name: "Middle Layer", data: middleData },
    { name: "Center Shape", data: centerData },
  ];

  // Shared chart options
  const options: ApexOptions = {
    chart: {
      type: "rangeArea",
      toolbar: { show: false },
      zoom: {
        enabled: false,
      },
    },
    // We want each shape to be a smooth funnel
    stroke: {
      curve: "smooth",
      // Give no stroke to the first two layers, a thicker outline to the top layer:
      width: [0, 0, 4],
    },
    // Use the same color for all three series,
    // but different opacities (defined below in fill.opacity)
    colors: ["#3B82F6", "#3B82F6"],

    // We'll use "solid" fill for all three, but with an array of opacities
    fill: {
      type: "solid",
      opacity: [0.3, 0.85], // outer=lightest, middle=medium, center=dark
    },

    // Remove or hide the Y-axis so it's purely a funnel shape
    yaxis: {
      show: false,
      min: -60,
      max: 60,
    },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      labels: {
        style: {
          colors: "#6B7280", // Tailwind gray-500
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    grid: {
      borderColor: "#E5E7EB", // light gray
      strokeDashArray: 3,
    },
    dataLabels: {
      enabled: false,
    },
    // You can hide the legend if you don't want "Outer/Middle/Center" labels
    legend: {
      show: false,
    },
    // Annotations to label each School # & percentage above each month
    annotations: {
      xaxis: [],
    },
  };

  // components/BottleneckChart.tsx
  return (
    <div className="w-full max-w-3xl rounded-lg bg-white p-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Success rating
        </h2>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600">
          School
        </span>
      </div>

      {/* CUSTOM ROW of "School #X" + percentage */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-center">
          <div className="font-medium text-gray-700">School #1</div>
          <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
            100%
          </div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">School #2</div>
          <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
            87.6%
          </div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">School #5</div>
          <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
            64.4%
          </div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">School #4</div>
          <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
            44.2%
          </div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">School #3</div>
          <div className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
            12.1%
          </div>
        </div>
      </div>

      {/* The chart below */}
      <div className="h-80 w-full">
        <Chart
          options={options}
          series={series}
          type="rangeArea"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default BottleneckChart;
