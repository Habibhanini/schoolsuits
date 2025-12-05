"use client";
import { useState, useCallback, useEffect } from "react";
import SmartChart from "./SmartChart";
import DataAnalyzer from "../../utils/dataAnalyzer";
import { useComments } from "./CommentsContext";
import { DataPoint, SampleDataset, DatasetWithConfig } from "../../types/chart";
interface ChartsContainerProps {
  onScrollToChart?: (scrollFn: (chartId: string) => void) => void;
}

export default function ChartsContainer({
  onScrollToChart,
}: ChartsContainerProps = {}) {
  // State Management
  const [datasets, setDatasets] = useState<DatasetWithConfig[]>([]);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [jsonInputs, setJsonInputs] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [selectedSampleCharts, setSelectedSampleCharts] = useState<string[]>(
    []
  );
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showJsonInputs, setShowJsonInputs] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Comments Context
  const { getCommentsByChart, getZoneCommentsByChart, getTotalComments } =
    useComments();

  // Sample Datasets Configuration
  const sampleDatasets: Record<string, SampleDataset> = {
    sales: {
      name: "Sales Performance",
      chartType: "bar",
      data: [
        { month: "Jan", sales: 1200, profit: 300 },
        { month: "Feb", sales: 1900, profit: 450 },
        { month: "Mar", sales: 3000, profit: 800 },
        { month: "Apr", sales: 5000, profit: 1200 },
        { month: "May", sales: 4200, profit: 1000 },
        { month: "Jun", sales: 3800, profit: 950 },
      ],
    },
    distribution: {
      name: "Market Share Distribution",
      chartType: "pie",
      data: [
        { category: "Product A", value: 35 },
        { category: "Product B", value: 25 },
        { category: "Product C", value: 20 },
        { category: "Product D", value: 12 },
        { category: "Product E", value: 8 },
      ],
    },
    scatter: {
      name: "Performance vs Investment",
      chartType: "scatter",
      data: [
        { investment: 100, performance: 85, size: 120 },
        { investment: 150, performance: 92, size: 180 },
        { investment: 200, performance: 78, size: 220 },
        { investment: 250, performance: 95, size: 300 },
        { investment: 300, performance: 88, size: 280 },
        { investment: 350, performance: 98, size: 400 },
      ],
    },
    timeSeries: {
      name: "Website Traffic Trends",
      chartType: "line",
      data: [
        { date: "2024-01-01", visitors: 1200 },
        { date: "2024-01-02", visitors: 1350 },
        { date: "2024-01-03", visitors: 1100 },
        { date: "2024-01-04", visitors: 1800 },
        { date: "2024-01-05", visitors: 2200 },
        { date: "2024-01-06", visitors: 1900 },
        { date: "2024-01-07", visitors: 2400 },
      ],
    },
    radar: {
      name: "Team Performance Analysis",
      chartType: "radar",
      data: [
        {
          department: "Sales",
          efficiency: 85,
          quality: 90,
          speed: 78,
          cost: 82,
          satisfaction: 88,
        },
        {
          department: "Marketing",
          efficiency: 92,
          quality: 85,
          speed: 90,
          cost: 75,
          satisfaction: 85,
        },
        {
          department: "Support",
          efficiency: 78,
          quality: 95,
          speed: 70,
          cost: 90,
          satisfaction: 92,
        },
      ],
    },
    funnel: {
      name: "Conversion Funnel",
      chartType: "funnel",
      data: [
        { stage: "Leads", count: 10000 },
        { stage: "Qualified", count: 5000 },
        { stage: "Proposals", count: 2000 },
        { stage: "Negotiations", count: 800 },
        { stage: "Closed", count: 400 },
      ],
    },
    heatmap: {
      name: "Activity Heatmap",
      chartType: "heatmap",
      data: [
        { hour: 0, day: "Mon", activity: 12 },
        { hour: 1, day: "Mon", activity: 8 },
        { hour: 2, day: "Mon", activity: 5 },
        { hour: 0, day: "Tue", activity: 15 },
        { hour: 1, day: "Tue", activity: 18 },
        { hour: 2, day: "Tue", activity: 12 },
        { hour: 0, day: "Wed", activity: 20 },
        { hour: 1, day: "Wed", activity: 25 },
        { hour: 2, day: "Wed", activity: 22 },
      ],
    },
    gauge: {
      name: "Performance Score",
      chartType: "gauge",
      data: [{ metric: "Overall Score", value: 78.5 }],
    },
    treemap: {
      name: "Market Segments",
      chartType: "treemap",
      data: [
        { segment: "Enterprise", revenue: 450000 },
        { segment: "SMB", revenue: 280000 },
        { segment: "Startup", revenue: 120000 },
        { segment: "Education", revenue: 95000 },
        { segment: "Government", revenue: 180000 },
      ],
    },
    multiSeries: {
      name: "Multi-Platform Traffic",
      chartType: "area",
      data: [
        { date: "2024-01-01", desktop: 1200, mobile: 800, tablet: 400 },
        { date: "2024-01-02", desktop: 1350, mobile: 950, tablet: 450 },
        { date: "2024-01-03", desktop: 1100, mobile: 1100, tablet: 500 },
        { date: "2024-01-04", desktop: 1800, mobile: 1200, tablet: 550 },
        { date: "2024-01-05", desktop: 2200, mobile: 1400, tablet: 600 },
      ],
    },
    sunburst: {
      name: "Product Hierarchy",
      chartType: "sunburst",
      data: [
        { category: "Electronics", subcategory: "Phones", sales: 350 },
        { category: "Electronics", subcategory: "Laptops", sales: 280 },
        { category: "Electronics", subcategory: "Tablets", sales: 150 },
        { category: "Clothing", subcategory: "Shirts", sales: 200 },
        { category: "Clothing", subcategory: "Pants", sales: 180 },
        { category: "Clothing", subcategory: "Shoes", sales: 220 },
      ],
    },
  };
  // Add this useEffect after your existing useEffects

  // Data Analysis and Processing
  const analyzeAndSetData = useCallback(
    async (
      dataArray: DataPoint[][],
      names: string[],
      chartTypes: (string | undefined)[],
      loadAll: boolean = false
    ) => {
      try {
        setIsLoading(true);
        setError("");
        const analyzer = new DataAnalyzer();
        const analyzedDatasets: DatasetWithConfig[] = [];

        for (let index = 0; index < dataArray.length; index++) {
          const data = dataArray[index];
          if (data && data.length > 0) {
            try {
              let analysis;

              if (chartTypes[index]) {
                analysis = analyzer.forceChartType(data, chartTypes[index]!);
              } else {
                analysis = analyzer.analyzeData(data);
              }

              const datasetId = `chart-${Date.now()}-${index}-${Math.random()
                .toString(36)
                .substr(2, 4)}`;
              analyzedDatasets.push({
                id: datasetId,
                name: names[index] || `Dataset ${index + 1}`,
                data,
                config: analysis,
                // Always expand charts when loading from Quick Start
                isExpanded: true,
              });
            } catch (err) {
              console.error(`Error analyzing dataset ${index + 1}:`, err);
              setError(
                `Failed to analyze dataset ${index + 1}: ${
                  err instanceof Error ? err.message : "Unknown error"
                }`
              );
            }
          }
        }

        if (analyzedDatasets.length > 0) {
          // Instead of replacing, merge with existing datasets
          setDatasets((prev) => {
            // Remove datasets that were replaced (same chart type and name combination)
            const filteredPrev = prev.filter((existingDataset) => {
              return !analyzedDatasets.some(
                (newDataset) =>
                  newDataset.name === existingDataset.name &&
                  newDataset.config.chartType ===
                    existingDataset.config.chartType
              );
            });
            return [...filteredPrev, ...analyzedDatasets];
          });

          // Always show all datasets (both existing and new)
          setSelectedCharts((prev) => {
            const newIds = analyzedDatasets.map((d) => d.id);
            const existingIds = prev.filter(
              (id) =>
                !analyzedDatasets.some((newDataset) =>
                  datasets.some(
                    (existingDataset) =>
                      existingDataset.id === id &&
                      newDataset.name === existingDataset.name &&
                      newDataset.config.chartType ===
                        existingDataset.config.chartType
                  )
                )
            );
            return [...existingIds, ...newIds];
          });

          if (isInitialLoad) {
            setIsInitialLoad(false);
          }
        }
      } catch (err) {
        setError(
          `Analysis error: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialLoad, datasets]
  );

  // Input Handlers
  const handleJsonInputChange = useCallback(
    (index: number, value: string) => {
      const newInputs = [...jsonInputs];
      newInputs[index] = value;
      setJsonInputs(newInputs);
    },
    [jsonInputs]
  );
  const scrollToChart = useCallback((chartId: string) => {
    // First ensure the chart is visible and expanded
    setDatasets((prev) =>
      prev.map((dataset) =>
        dataset.id === chartId ? { ...dataset, isExpanded: true } : dataset
      )
    );

    // Ensure chart is in selectedCharts
    setSelectedCharts((prev) =>
      prev.includes(chartId) ? prev : [...prev, chartId]
    );

    // Wait for state updates, then scroll
    setTimeout(() => {
      const chartElement = document.getElementById(`chart-${chartId}`);
      if (chartElement) {
        chartElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Add visual feedback
        chartElement.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.4)";
        setTimeout(() => {
          chartElement.style.boxShadow = "";
        }, 2000);
      }
    }, 100);
  }, []);
  const handleAnalyzeAll = useCallback(async () => {
    const dataArray: DataPoint[][] = [];
    const names: string[] = [];
    const chartTypes: (string | undefined)[] = [];

    jsonInputs.forEach((input, index) => {
      if (input.trim()) {
        try {
          const parsed = JSON.parse(input);

          if (parsed.chartType && parsed.data && Array.isArray(parsed.data)) {
            dataArray.push(parsed.data);
            names.push(parsed.name || `Custom Dataset ${index + 1}`);
            chartTypes.push(parsed.chartType);
          } else if (Array.isArray(parsed)) {
            dataArray.push(parsed);
            names.push(`Custom Dataset ${index + 1}`);
            chartTypes.push(undefined);
          } else {
            throw new Error("Invalid format");
          }
        } catch (err) {
          setError(
            `Invalid JSON format in Dataset ${index + 1}. ` +
              `Expected: {"chartType": "bar", "name": "Chart Name", "data": [...]} ` +
              `or simple array [...]`
          );
          return;
        }
      }
    });

    if (dataArray.length === 0) {
      setError("Please provide at least one valid JSON dataset");
      return;
    }

    await analyzeAndSetData(dataArray, names, chartTypes, false);
  }, [jsonInputs, analyzeAndSetData]);

  const loadSampleDatasets = useCallback(
    async (keys: string[], loadAll: boolean = false) => {
      const dataArray: DataPoint[][] = [];
      const names: string[] = [];
      const chartTypes: (string | undefined)[] = [];

      keys.forEach((key) => {
        if (sampleDatasets[key]) {
          dataArray.push(sampleDatasets[key].data);
          names.push(sampleDatasets[key].name);
          chartTypes.push(sampleDatasets[key].chartType);
        }
      });

      const newInputs = ["", "", "", ""];
      const displayKeys = keys.slice(0, 4);
      displayKeys.forEach((key, index) => {
        if (sampleDatasets[key] && index < 4) {
          const dataset = sampleDatasets[key];
          newInputs[index] = JSON.stringify(
            {
              chartType: dataset.chartType,
              name: dataset.name,
              data: dataset.data,
            },
            null,
            2
          );
        }
      });
      setJsonInputs(newInputs);

      await analyzeAndSetData(dataArray, names, chartTypes, loadAll);
    },
    [analyzeAndSetData]
  );

  const toggleSampleChart = useCallback(
    (key: string) => {
      setSelectedSampleCharts((prev) => {
        const isSelected = prev.includes(key);
        let newSelected: string[];

        if (isSelected) {
          newSelected = prev.filter((k) => k !== key);
        } else {
          newSelected = [...prev, key];
        }

        if (newSelected.length > 0) {
          loadSampleDatasets(newSelected, false);
        } else {
          setDatasets([]);
          setSelectedCharts([]);
          setJsonInputs(["", "", "", ""]);
        }

        return newSelected;
      });
    },
    [loadSampleDatasets]
  );

  const loadAllSampleDatasets = useCallback(() => {
    const allKeys = Object.keys(sampleDatasets);
    setSelectedSampleCharts(allKeys);
    loadSampleDatasets(allKeys, true);
  }, [loadSampleDatasets]);

  const clearAllSampleCharts = useCallback(() => {
    setSelectedSampleCharts([]);
    setDatasets([]);
    setSelectedCharts([]);
    setJsonInputs(["", "", "", ""]);
    setError("");
    setIsInitialLoad(true);
  }, []);

  // Chart Management
  const handleChartToggle = useCallback((chartId: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  }, []);

  const handleExpandToggle = useCallback((chartId: string) => {
    setDatasets((prev) =>
      prev.map((dataset) =>
        dataset.id === chartId
          ? { ...dataset, isExpanded: !dataset.isExpanded }
          : dataset
      )
    );
  }, []);

  // Load initial data
  useEffect(() => {
    if (
      isInitialLoad &&
      datasets.length === 0 &&
      selectedSampleCharts.length === 0
    ) {
      const allKeys = Object.keys(sampleDatasets);
      const shuffled = [...allKeys].sort(() => 0.5 - Math.random());
      const randomKeys = shuffled.slice(0, 4);

      setSelectedSampleCharts(randomKeys);
      loadSampleDatasets(randomKeys, false);
    }
  }, [
    isInitialLoad,
    datasets.length,
    selectedSampleCharts.length,
    loadSampleDatasets,
  ]);

  // Computed Values
  const visibleDatasets = datasets.filter((dataset) =>
    selectedCharts.includes(dataset.id)
  );

  const totalComments = datasets.reduce(
    (total, dataset) =>
      total +
      getCommentsByChart(dataset.id).length +
      getZoneCommentsByChart(dataset.id).length,
    0
  );
  useEffect(() => {
    if (onScrollToChart) {
      onScrollToChart(scrollToChart);
    }
  }, [onScrollToChart, scrollToChart]);

  const getChartIcon = (chartType: string) => {
    const icons = {
      bar: "📊",
      pie: "🥧",
      scatter: "⚡",
      line: "📈",
      radar: "🕸️",
      funnel: "🔽",
      heatmap: "🌡️",
      gauge: "⏱️",
      treemap: "🌳",
      area: "📉",
      sunburst: "🌞",
      bottleneck: "🔄",
    };
    return icons[chartType as keyof typeof icons] || "📋";
  };

  return (
    <div className="min-h-screen ">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📊</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Stats */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {datasets.length}
                  </div>
                  <div className="text-xs text-gray-500">Charts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {totalComments}
                  </div>
                  <div className="text-xs text-gray-500">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">
                    {visibleDatasets.length}
                  </div>
                  <div className="text-xs text-gray-500">Visible</div>
                </div>
              </div>
              {/* View Mode Toggle */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Chart Type Selection */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Quick Start
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Choose chart types to visualize your data
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowJsonInputs(!showJsonInputs)}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors flex items-center space-x-1.5"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Custom Data</span>
                </button>
                {selectedSampleCharts.length > 0 && (
                  <button
                    onClick={clearAllSampleCharts}
                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm rounded-lg transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={loadAllSampleDatasets}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-md"
                >
                  Load All
                </button>
              </div>
            </div>

            {/* Chart Type Grid - Compact */}
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2">
              {Object.entries(sampleDatasets).map(([key, dataset]) => {
                const isSelected = selectedSampleCharts.includes(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleSampleChart(key)}
                    className={`group relative p-3 rounded-lg border transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                    }`}
                    title={dataset.name}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">
                        {getChartIcon(dataset.chartType!)}
                      </div>
                      <div className="text-xs font-medium text-gray-700 truncate">
                        {dataset.chartType
                          ? dataset.chartType.charAt(0).toUpperCase() +
                            dataset.chartType.slice(1)
                          : "Unknown"}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom JSON Input */}
            {showJsonInputs && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Custom Data Input
                  </h3>
                  <button
                    onClick={handleAnalyzeAll}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Analyzing..." : "Analyze Data"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jsonInputs.map((input, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dataset {index + 1}
                      </label>
                      <textarea
                        value={input}
                        onChange={(e) =>
                          handleJsonInputChange(index, e.target.value)
                        }
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                        placeholder={`{"chartType": "bar", "name": "Chart Name", "data": [...]}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-blue-800 font-medium">
                  Analyzing data...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Charts Display */}
        {visibleDatasets.length > 0 && (
          <div className="space-y-6">
            {/* Charts Grid/List */}
            <div
              className={`space-y-8 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 xl:grid-cols-2 gap-8"
                  : "space-y-8"
              }`}
            >
              {visibleDatasets.map((dataset) => (
                <div
                  key={dataset.id}
                  id={`chart-${dataset.id}`}
                  className="group"
                >
                  {dataset.isExpanded ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300">
                      {/* Chart Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                              <span className="text-white text-lg">
                                {getChartIcon(dataset.config.chartType)}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {dataset.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {dataset.data.length} data points •{" "}
                                {getCommentsByChart(dataset.id).length +
                                  getZoneCommentsByChart(dataset.id)
                                    .length}{" "}
                                comments
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                {dataset.config.chartType.toUpperCase()}
                              </span>
                            </div>
                            <button
                              onClick={() => handleExpandToggle(dataset.id)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Collapse"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Chart Content */}
                      <div className="p-0">
                        <SmartChart
                          data={dataset.data}
                          config={dataset.config}
                          chartId={dataset.id}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => handleExpandToggle(dataset.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 text-xl">
                              {getChartIcon(dataset.config.chartType)}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              {dataset.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {dataset.config.chartType} • {dataset.data.length}{" "}
                              data points
                            </p>
                            <p className="text-xs text-gray-500">
                              {dataset.config.reasoning}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {getCommentsByChart(dataset.id).length +
                                getZoneCommentsByChart(dataset.id).length}
                            </div>
                            <div className="text-xs text-gray-500">
                              Comments
                            </div>
                          </div>
                          <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {datasets.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-white/20 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-blue-600"
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
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Create Amazing Charts?
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Choose from our sample chart types above or upload your own data
                to get started
              </p>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    🚀 Quick Start
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Click any chart type to load sample data</li>
                    <li>• Use "Load All Charts" for a complete overview</li>
                    <li>• Switch between grid and list views</li>
                    <li>• Interactive commenting on all charts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    🔧 Advanced Features
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Point and zone commenting</li>
                    <li>• Chart zoom and pan functionality</li>
                    <li>• 12+ chart types supported</li>
                    <li>• Smart data analysis and recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
