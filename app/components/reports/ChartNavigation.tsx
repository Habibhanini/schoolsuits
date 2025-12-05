import React from "react";
import { DatasetWithConfig } from "../../types/chart";

interface ChartNavigationProps {
  datasets: DatasetWithConfig[];
  selectedCharts: string[];
  onChartToggle: (chartId: string) => void;
  onExpandToggle: (chartId: string) => void;
}

const ChartNavigation: React.FC<ChartNavigationProps> = ({
  datasets,
  selectedCharts,
  onChartToggle,
  onExpandToggle,
}) => {
  const getChartIcon = (chartType: string) => {
    const iconClass = "w-4 h-4";
    switch (chartType) {
      case "bar":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        );
      case "line":
        return (
          <svg
            className={iconClass}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4"
            />
          </svg>
        );
      case "pie":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h14V7l-7-5z" />
          </svg>
        );
      case "scatter":
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="4" r="2" />
            <circle cx="12" cy="8" r="2" />
            <circle cx="8" cy="16" r="2" />
            <circle cx="16" cy="12" r="2" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Chart Navigation ({datasets.length} charts)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {datasets.map((dataset) => (
          <div
            key={dataset.id}
            className={`border rounded-lg p-3 transition-all cursor-pointer ${
              selectedCharts.includes(dataset.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-blue-600">
                  {getChartIcon(dataset.config.chartType)}
                </div>
                <span className="text-xs font-medium text-gray-600 uppercase">
                  {dataset.config.chartType}
                </span>
              </div>

              <div className="flex space-x-1">
                {/* Expand/Collapse Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpandToggle(dataset.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    dataset.isExpanded
                      ? "text-blue-600 hover:text-blue-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title={dataset.isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {dataset.isExpanded ? (
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>

                {/* Show/Hide Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChartToggle(dataset.id);
                  }}
                  className={`p-1 rounded transition-colors ${
                    selectedCharts.includes(dataset.id)
                      ? "text-green-600 hover:text-green-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  title={selectedCharts.includes(dataset.id) ? "Hide" : "Show"}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {selectedCharts.includes(dataset.id) ? (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div
              onClick={() => onChartToggle(dataset.id)}
              className="cursor-pointer"
            >
              <h4 className="text-sm font-medium text-gray-800 truncate mb-1">
                {dataset.name}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {dataset.data.length} data points
              </p>
            </div>
          </div>
        ))}
      </div>

      {datasets.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-sm">No charts available</p>
          <p className="text-xs text-gray-400 mt-1">
            Load sample data or add custom datasets
          </p>
        </div>
      )}
    </div>
  );
};

export default ChartNavigation;
