import React, { useState } from "react";
import dynamic from "next/dynamic";
import ApexCharts from "apexcharts";

// Dynamically import to avoid SSR issues in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart: React.FC = () => {
  const chartId = "my-pie-chart";

  // Define initial visibility for each slice
  const initialVisibility = {
    Asian: true,
    American: true,
    European: true,
  };
  const [visibleSlices, setVisibleSlices] = useState(initialVisibility);

  // Data and labels for the pie chart
  const series = [2388, 984, 485];
  const labels = ["Asian", "American", "European"];
  const colors = ["#3B82F6", "#06B6D4", "#34D399"];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: chartId,
      type: "pie",
      toolbar: { show: false },
    },
    colors,
    labels,
    // Hide the built-in legend so we can use our custom one
    legend: { show: false },
    dataLabels: {
      enabled: true,
      // Format: "<absolute>\n<percentage>%"
      formatter: (val, opts) => {
        const numericVal = Number(val);
        const absoluteValue = opts.w.config.series[opts.seriesIndex] as number;
        return `${absoluteValue}\n${numericVal.toFixed(1)}%`;
      },
      style: {
        fontSize: "13px",
        fontWeight: 500,
      },
      background: {
        enabled: true,
        foreColor: "#111",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        opacity: 0.9,
      },
      dropShadow: { enabled: false },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  // Toggle the visibility of a slice when clicking the custom legend item
  const toggleSlice = (label: string) => {
    ApexCharts.exec(chartId, "toggleSeries", label);
    setVisibleSlices((prev) => ({
      ...prev,
      //@ts-ignore
      [label]: !prev[label],
    }));
  };

  return (
    <div className="w-full  max-w-2xl rounded-lg bg-white p-4 shadow">
      {/* Header row */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Paid parents by Demographic
        </h2>
        {/* "Bill" with an avatar on the right */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/avatar.png"
            alt="Bill"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">Bill</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mb-4 flex justify-center space-x-4">
        {labels.map((label, index) => (
          <div
            key={label}
            onClick={() => toggleSlice(label)}
            className="cursor-pointer flex items-center space-x-2"
          >
            <span
              className={`block h-3 w-3 rounded-sm ${
                //@ts-ignore
                !visibleSlices[label] ? "opacity-40" : ""
              }`}
              style={{ backgroundColor: colors[index] }}
            />
            <span
              className={`text-sm font-medium ${
                //@ts-ignore
                !visibleSlices[label] ? "opacity-40" : ""
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* The Pie Chart */}
      <div className="h-72 w-full ">
        <Chart
          options={options}
          series={series}
          type="pie"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PieChart;
