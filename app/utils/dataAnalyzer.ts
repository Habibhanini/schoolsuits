import { DataPoint, ChartConfig, DataType, DataTypeMap } from "../types/chart";

class DataAnalyzer {
  analyzeData(data: DataPoint[]): ChartConfig {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array");
    }

    const sample = data[0];
    const keys = Object.keys(sample);
    const dataTypes = this.analyzeDataTypes(data, keys);

    return this.selectBestChart(data, keys, dataTypes);
  }

  // New method to force a specific chart type
  forceChartType(data: DataPoint[], chartType: string): ChartConfig {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array");
    }

    const sample = data[0];
    const keys = Object.keys(sample);
    const dataTypes = this.analyzeDataTypes(data, keys);

    const numericKeys = keys.filter((key) => dataTypes[key] === "numeric");
    const categoricalKeys = keys.filter(
      (key) => dataTypes[key] === "categorical"
    );
    const dateKeys = keys.filter((key) => dataTypes[key] === "date");

    // Force the specified chart type
    switch (chartType.toLowerCase()) {
      case "bar":
        return this.createBarChart(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys
        );
      case "line":
        if (dateKeys.length > 0) {
          return this.createTimeSeriesChart(data, dateKeys[0], numericKeys);
        }
        return this.createLineChart(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys
        );
      case "pie":
        return this.createPieChart(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys[0] || keys[1]
        );
      case "scatter":
        return this.createScatterChart(data, numericKeys);
      case "area":
        if (dateKeys.length > 0) {
          return this.createAreaChart(data, dateKeys[0], numericKeys);
        }
        return this.createAreaChartCategorical(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys
        );
      case "radar":
        return this.createRadarChart(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys
        );
      case "funnel":
        return this.createFunnelChart(
          data,
          categoricalKeys[0] || keys[0],
          numericKeys[0] || keys[1]
        );
      case "gauge":
        return this.createGaugeChart(data, numericKeys[0] || keys[0]);
      case "heatmap":
        return this.createHeatmapChart(data, keys);
      case "treemap":
        return this.createTreemapChart(data, keys);
      case "sunburst":
        return this.createSunburstChart(
          data,
          categoricalKeys,
          numericKeys[0] || keys[keys.length - 1]
        );
      case "boxplot":
        return this.createBoxplotChart(data, numericKeys);
      case "bottleneck":
        return this.createBottleneckChart(
          data,
          keys,
          categoricalKeys[0] || "",
          numericKeys
        );
      default:
        console.warn(
          `Unknown chart type: ${chartType}. Falling back to auto-detection.`
        );
        return this.selectBestChart(data, keys, dataTypes);
    }
  }

  private analyzeDataTypes(data: DataPoint[], keys: string[]): DataTypeMap {
    const types: DataTypeMap = {};

    keys.forEach((key) => {
      const values = data.map((item) => item[key]).filter((v) => v != null);
      types[key] = this.inferDataType(values);
    });

    return types;
  }

  private inferDataType(values: (string | number)[]): DataType {
    if (values.length === 0) return "unknown";

    const sample = values[0];

    // Check if it's a date
    if (this.isDateString(sample)) return "date";

    // Check if it's numeric
    if (typeof sample === "number" || !isNaN(Number(sample))) {
      return "numeric";
    }

    // For string values, check if they could be categorical
    if (typeof sample === "string") {
      const uniqueValues = new Set(values);
      const uniqueRatio = uniqueValues.size / values.length;
      const maxUnique = Math.min(20, values.length);

      if (uniqueValues.size <= maxUnique && uniqueRatio <= 0.8) {
        return "categorical";
      }
    }

    return "text";
  }

  private isDateString(value: string | number): boolean {
    if (typeof value !== "string") return false;
    const date = new Date(value);
    return !isNaN(date.getTime()) && value.match(/\d{4}-\d{2}-\d{2}/) !== null;
  }

  private selectBestChart(
    data: DataPoint[],
    keys: string[],
    dataTypes: DataTypeMap
  ): ChartConfig {
    console.log("🎯 Chart Selection Debug:");
    console.log("Keys:", keys);
    console.log("Data types:", dataTypes);

    const numericKeys = keys.filter((key) => dataTypes[key] === "numeric");
    const categoricalKeys = keys.filter(
      (key) => dataTypes[key] === "categorical"
    );
    const dateKeys = keys.filter((key) => dataTypes[key] === "date");

    console.log("Numeric keys:", numericKeys);
    console.log("Categorical keys:", categoricalKeys);
    console.log("Date keys:", dateKeys);

    // PRIORITY 1: BOTTLENECK DETECTION
    console.log("🔍 Testing bottleneck detection...");
    if (this.isBottleneckData(data, keys, categoricalKeys, numericKeys)) {
      console.log("✅ Creating bottleneck chart");
      return this.createBottleneckChart(
        data,
        keys,
        categoricalKeys[0] || "",
        numericKeys
      );
    }

    console.log(
      "❌ Bottleneck not detected, continuing with other chart types..."
    );

    // 2. Hierarchical data → Treemap/Sunburst
    if (this.hasHierarchicalData(data)) {
      console.log("✅ Creating treemap chart");
      return this.createTreemapChart(data, keys);
    }

    // 3. Performance metrics → Radar
    if (categoricalKeys.length >= 1 && numericKeys.length >= 4) {
      console.log("✅ Creating radar chart");
      return this.createRadarChart(data, categoricalKeys[0], numericKeys);
    }

    // 4. Process flow → Funnel
    if (this.isFunnelData(data, categoricalKeys, numericKeys)) {
      console.log("✅ Creating funnel chart");
      return this.createFunnelChart(data, categoricalKeys[0], numericKeys[0]);
    }

    // 5. Matrix/Grid data → Heatmap
    if (this.isMatrixData(data, keys)) {
      console.log("✅ Creating heatmap chart");
      return this.createHeatmapChart(data, keys);
    }

    // 6. Statistical distribution → Boxplot
    if (this.isStatisticalData(data, numericKeys)) {
      console.log("✅ Creating boxplot chart");
      return this.createBoxplotChart(data, numericKeys);
    }

    // 7. Single metric tracking → Gauge
    if (
      numericKeys.length === 1 &&
      categoricalKeys.length === 0 &&
      data.length === 1
    ) {
      console.log("✅ Creating gauge chart");
      return this.createGaugeChart(data, numericKeys[0]);
    }

    // 8. Multiple time series → Area chart
    if (dateKeys.length > 0 && numericKeys.length > 1) {
      console.log("✅ Creating area chart");
      return this.createAreaChart(data, dateKeys[0], numericKeys);
    }

    // 9. Time series → Line chart
    if (dateKeys.length > 0 && numericKeys.length === 1) {
      console.log("✅ Creating line chart");
      return this.createTimeSeriesChart(data, dateKeys[0], numericKeys);
    }

    // 10. Part-to-whole with hierarchy → Sunburst
    if (categoricalKeys.length >= 2 && numericKeys.length === 1) {
      console.log("✅ Creating sunburst chart");
      return this.createSunburstChart(data, categoricalKeys, numericKeys[0]);
    }

    // 11. Single categorical distribution → Pie chart
    if (categoricalKeys.length === 1 && numericKeys.length === 1) {
      console.log("✅ Creating pie chart");
      return this.createPieChart(data, categoricalKeys[0], numericKeys[0]);
    }

    // 12. Multiple variables correlation → Scatter plot
    if (numericKeys.length >= 2) {
      console.log("✅ Creating scatter chart (fallback)");
      return this.createScatterChart(data, numericKeys);
    }

    // 13. Categorical comparison → Bar chart
    if (categoricalKeys.length > 0 && numericKeys.length > 0) {
      console.log("✅ Creating bar chart");
      return this.createBarChart(data, categoricalKeys[0], numericKeys);
    }

    // Default to bar chart
    console.log("✅ Creating default bar chart");
    return this.createDefaultChart(data, keys);
  }

  // Enhanced bottleneck detection
  private isBottleneckData(
    data: DataPoint[],
    keys: string[],
    categoricalKeys: string[],
    numericKeys: string[]
  ): boolean {
    // PRIORITY CHECK: Direct field name matches (regardless of categorical detection)
    const fieldNames = keys.map((key) => key.toLowerCase());

    const hasProcessField = fieldNames.some((name) =>
      [
        "process",
        "step",
        "stage",
        "station",
        "operation",
        "node",
        "phase",
      ].includes(name)
    );
    const hasCapacityField = fieldNames.some((name) =>
      ["capacity", "limit", "max", "maximum"].includes(name)
    );
    const hasThroughputField = fieldNames.some((name) =>
      ["throughput", "actual", "current", "flow", "output"].includes(name)
    );
    const hasUtilizationField = fieldNames.some((name) =>
      ["utilization", "usage", "efficiency", "util"].includes(name)
    );

    console.log("🔍 Bottleneck field analysis:", {
      hasProcessField,
      hasCapacityField,
      hasThroughputField,
      hasUtilizationField,
      fieldNames,
    });

    // STRONG INDICATOR: Process field + at least 2 flow metrics
    if (hasProcessField && numericKeys.length >= 2) {
      const flowFields = [
        hasCapacityField,
        hasThroughputField,
        hasUtilizationField,
      ].filter(Boolean).length;
      if (flowFields >= 2) {
        console.log("✅ Strong bottleneck pattern detected via field names");
        return true;
      }
    }

    // FALLBACK: Traditional categorical + numeric analysis
    if (categoricalKeys.length === 0 || numericKeys.length < 2) return false;

    // Check category values for process-like terms
    const categoryValues = data.map((item) =>
      String(item[categoricalKeys[0]]).toLowerCase()
    );
    const hasProcessValues = categoryValues.some((value) =>
      [
        "step",
        "stage",
        "process",
        "station",
        "operation",
        "line",
        "receiving",
        "quality",
        "assembly",
        "testing",
        "packaging",
        "shipping",
        "check",
      ].some((keyword) => value.includes(keyword))
    );

    // Check numeric field names for bottleneck indicators
    const hasBottleneckFields = numericKeys.some((key) =>
      [
        "capacity",
        "throughput",
        "utilization",
        "limit",
        "rate",
        "flow",
        "constraint",
      ].some((keyword) => key.toLowerCase().includes(keyword))
    );

    console.log("Fallback bottleneck analysis:", {
      hasProcessValues,
      hasBottleneckFields,
    });

    return hasProcessValues && hasBottleneckFields;
  }

  // Helper methods for data pattern detection
  private hasHierarchicalData(data: DataPoint[]): boolean {
    return data.some((item) =>
      Object.values(item).some(
        (value) => typeof value === "object" && value !== null
      )
    );
  }

  private isFunnelData(
    data: DataPoint[],
    categoricalKeys: string[],
    numericKeys: string[]
  ): boolean {
    if (categoricalKeys.length !== 1 || numericKeys.length !== 1) return false;

    const values = data
      .map((item) => item[numericKeys[0]] as number)
      .sort((a, b) => b - a);
    const originalValues = data.map((item) => item[numericKeys[0]] as number);

    return JSON.stringify(values) === JSON.stringify(originalValues);
  }

  private isMatrixData(data: DataPoint[], keys: string[]): boolean {
    const hasCoordinates =
      keys.some((key) => key.toLowerCase().includes("x")) &&
      keys.some((key) => key.toLowerCase().includes("y"));
    return (
      hasCoordinates ||
      (keys.length === 3 &&
        keys.every((key) => typeof data[0][key] === "number"))
    );
  }

  private isStatisticalData(data: DataPoint[], numericKeys: string[]): boolean {
    return numericKeys.some((key) =>
      ["min", "max", "median", "q1", "q3", "outliers"].some((stat) =>
        key.toLowerCase().includes(stat)
      )
    );
  }

  // ============================================================================
  // CHART CREATION METHODS
  // ============================================================================

  private createLineChart(
    data: DataPoint[],
    categoryKey: string,
    numericKeys: string[]
  ): ChartConfig {
    return {
      chartType: "line",
      title: `${numericKeys.join(" & ")} Trends`,
      reasoning: `Line chart showing trends across ${categoryKey}.`,
      xAxis: {
        type: "category",
        data: data.map((item) => item[categoryKey] as string),
        name: categoryKey,
      },
      yAxis: {
        type: "value",
        name: numericKeys.join(" / "),
      },
      series: numericKeys.map((key) => ({
        name: key,
        type: "line" as const,
        data: data.map((item) => item[key] as number),
        smooth: true,
        symbol: "circle",
      })),
    };
  }

  private createBottleneckChart(
    data: DataPoint[],
    keys: string[],
    categoryKey: string,
    numericKeys: string[]
  ): ChartConfig {
    console.log("🛠️ Creating bottleneck streamgraph with keys:", keys);

    // Find the process/category field
    let processKey = categoryKey;
    if (!processKey) {
      processKey =
        keys.find((key) =>
          [
            "process",
            "step",
            "stage",
            "station",
            "operation",
            "node",
            "phase",
          ].includes(key.toLowerCase())
        ) || keys[0];
    }

    console.log("🏭 Process field selected:", processKey);

    // Smart field detection
    const findField = (keywords: string[]) =>
      numericKeys.find((key) =>
        keywords.some((keyword) => key.toLowerCase().includes(keyword))
      );

    const capacityKey =
      findField(["capacity", "limit", "max", "maximum"]) || numericKeys[0];
    const throughputKey =
      findField(["throughput", "actual", "current", "flow", "output"]) ||
      numericKeys[1] ||
      numericKeys[0];

    console.log("Field mapping:", { processKey, capacityKey, throughputKey });

    // Create streamgraph data
    const chartData = data.map((item, index) => {
      const capacity = Number(item[capacityKey]) || 0;
      const throughput = Number(item[throughputKey]) || 0;
      const bottleneck = Math.max(0, capacity - throughput); // Unused capacity

      return {
        name: String(item[processKey] || `Step ${index + 1}`),
        throughput,
        bottleneck,
        capacity,
      };
    });

    console.log("Streamgraph data:", chartData);

    const categories = chartData.map((item) => item.name);

    return {
      chartType: "bottleneck",
      title: `Process Flow Analysis - ${processKey}`,
      reasoning: `Detected capacity and throughput data. Streamgraph shows flow constraints and bottlenecks in the process.`,
      xAxis: {
        type: "category",
        data: categories,
        name: processKey,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 15,
          rotate: 30,
          textStyle: {
            color: "#666",
          },
        },
      },
      yAxis: {
        type: "value",
        name: "Flow Rate",
        show: false, // Hide y-axis for cleaner streamgraph look
      },
      series: [
        {
          name: "Active Throughput",
          type: "line",
          data: chartData.map((item) => item.throughput),
          stack: "flow",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#4285f4" },
                { offset: 1, color: "#1a73e8" },
              ],
            },
          },
          smooth: true,
          symbol: "none",
          lineStyle: { width: 0 },
          z: 2,
        },
        {
          name: "Bottleneck Capacity",
          type: "line",
          data: chartData.map((item) => item.bottleneck),
          stack: "flow",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(66, 133, 244, 0.3)" },
                { offset: 1, color: "rgba(66, 133, 244, 0.1)" },
              ],
            },
          },
          smooth: true,
          symbol: "none",
          lineStyle: { width: 0 },
          z: 1,
        },
      ],
    };
  }

  private createAreaChart(
    data: DataPoint[],
    dateKey: string,
    numericKeys: string[]
  ): ChartConfig {
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a[dateKey] as string).getTime() -
        new Date(b[dateKey] as string).getTime()
    );

    return {
      chartType: "area",
      title: `${numericKeys.join(" & ")} Over Time (Stacked)`,
      reasoning: `Detected multiple time series. Area chart shows cumulative trends and individual contributions over time.`,
      xAxis: {
        type: "category",
        data: sortedData.map((item) => item[dateKey] as string),
        name: dateKey,
      },
      yAxis: {
        type: "value",
        name: numericKeys.join(" / "),
      },
      series: numericKeys.map((key, index) => ({
        name: key,
        type: "line" as const,
        data: sortedData.map((item) => item[key] as number),
        stack: "total",
        areaStyle: {},
        smooth: true,
      })),
    };
  }

  private createAreaChartCategorical(
    data: DataPoint[],
    categoryKey: string,
    numericKeys: string[]
  ): ChartConfig {
    return {
      chartType: "area",
      title: `${numericKeys.join(" & ")} by ${categoryKey} (Stacked)`,
      reasoning: `Area chart showing stacked values across categories.`,
      xAxis: {
        type: "category",
        data: data.map((item) => item[categoryKey] as string),
        name: categoryKey,
      },
      yAxis: {
        type: "value",
        name: numericKeys.join(" / "),
      },
      series: numericKeys.map((key) => ({
        name: key,
        type: "line" as const,
        data: data.map((item) => item[key] as number),
        stack: "total",
        areaStyle: {},
        smooth: true,
      })),
    };
  }

  private createRadarChart(
    data: DataPoint[],
    categoryKey: string,
    numericKeys: string[]
  ): ChartConfig {
    return {
      chartType: "radar",
      title: `Multi-dimensional Analysis by ${categoryKey}`,
      reasoning: `Detected multiple metrics across categories. Radar chart shows performance patterns across different dimensions.`,
      series: [
        {
          name: "Metrics",
          type: "radar" as const,
          data: data.map((item) => ({
            value: numericKeys.map((key) => item[key] as number),
            name: item[categoryKey] as string,
          })),
          indicator: numericKeys.map((key) => ({
            name: key,
            max: Math.max(...data.map((item) => item[key] as number)) * 1.2,
          })),
        },
      ],
    };
  }

  private createFunnelChart(
    data: DataPoint[],
    categoryKey: string,
    valueKey: string
  ): ChartConfig {
    const sortedData = [...data].sort(
      (a, b) => (b[valueKey] as number) - (a[valueKey] as number)
    );

    return {
      chartType: "funnel",
      title: `${valueKey} Funnel by ${categoryKey}`,
      reasoning: `Detected descending values across stages. Funnel chart shows conversion or process flow.`,
      series: [
        {
          name: valueKey,
          type: "funnel" as const,
          data: sortedData.map((item) => ({
            name: item[categoryKey] as string,
            value: item[valueKey] as number,
          })),
          sort: "descending",
          label: {
            show: true,
            formatter: "{b}: {c}",
          },
        },
      ],
    };
  }

  private createHeatmapChart(data: DataPoint[], keys: string[]): ChartConfig {
    const xKey = keys[0];
    const yKey = keys[1];
    const valueKey = keys[2];

    const xValues = [...new Set(data.map((item) => item[xKey]))].sort();
    const yValues = [...new Set(data.map((item) => item[yKey]))].sort();

    return {
      chartType: "heatmap",
      title: `${valueKey} Heatmap`,
      reasoning: `Detected matrix-like data structure. Heatmap shows patterns and correlations in 2D space.`,
      xAxis: {
        type: "category",
        data: xValues as string[],
        name: xKey,
      },
      yAxis: {
        type: "category",
        data: yValues as string[],
        name: yKey,
      },
      visualMap: {
        min: Math.min(...data.map((item) => item[valueKey] as number)),
        max: Math.max(...data.map((item) => item[valueKey] as number)),
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "15%",
      },
      series: [
        {
          name: valueKey,
          type: "heatmap" as const,
          data: data.map((item) => [
            xValues.indexOf(item[xKey]),
            yValues.indexOf(item[yKey]),
            item[valueKey],
          ]),
          label: {
            show: true,
            formatter: "{c}",
          },
        },
      ],
    };
  }

  private createBoxplotChart(
    data: DataPoint[],
    numericKeys: string[]
  ): ChartConfig {
    return {
      chartType: "boxplot",
      title: `Statistical Distribution of ${numericKeys.join(", ")}`,
      reasoning: `Detected statistical data. Boxplot shows distribution, quartiles, and outliers.`,
      xAxis: {
        type: "category",
        data: numericKeys,
        name: "Metrics",
      },
      yAxis: {
        type: "value",
        name: "Values",
      },
      series: [
        {
          name: "Statistics",
          type: "boxplot" as const,
          data: numericKeys.map((key) => {
            const values = data
              .map((item) => item[key] as number)
              .sort((a, b) => a - b);
            const q1 = values[Math.floor(values.length * 0.25)];
            const median = values[Math.floor(values.length * 0.5)];
            const q3 = values[Math.floor(values.length * 0.75)];
            const min = values[0];
            const max = values[values.length - 1];
            return [min, q1, median, q3, max];
          }),
        },
      ],
    };
  }

  private createGaugeChart(data: DataPoint[], valueKey: string): ChartConfig {
    const value = data[0][valueKey] as number;
    const max = Math.max(100, value * 1.5); // Dynamic max based on value

    return {
      chartType: "gauge",
      title: `${valueKey} Gauge`,
      reasoning: `Detected single metric value. Gauge chart shows current status against target range.`,
      series: [
        {
          name: valueKey,
          type: "gauge" as const,
          data: [
            {
              value: value,
              name: valueKey,
            },
          ],
          min: 0,
          max: max,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0.3, "#fd666d"],
                [0.7, "#37a2da"],
                [1, "#67e0e3"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
          },
          splitLine: {
            distance: -30,
            length: 30,
          },
          axisLabel: {
            distance: -20,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
        },
      ],
    };
  }

  private createTreemapChart(data: DataPoint[], keys: string[]): ChartConfig {
    // Transform flat data into hierarchical structure
    const treeData = data.map((item) => ({
      name: item[keys[0]] as string,
      value: (item[keys[1]] as number) || 1,
    }));

    return {
      chartType: "treemap",
      title: `Hierarchical View of Data`,
      reasoning: `Detected hierarchical or nested data. Treemap shows proportional relationships in nested structure.`,
      series: [
        {
          name: "Data",
          type: "treemap" as const,
          data: treeData,
          roam: false,
          nodeClick: false,
          breadcrumb: {
            show: false,
          },
          label: {
            show: true,
            formatter: "{b}",
          },
        },
      ],
    };
  }

  private createSunburstChart(
    data: DataPoint[],
    categoricalKeys: string[],
    valueKey: string
  ): ChartConfig {
    // Create nested structure for sunburst
    const nested: any = {};

    data.forEach((item) => {
      const level1 = item[categoricalKeys[0]] as string;
      const level2 = item[categoricalKeys[1]] as string;
      const value = item[valueKey] as number;

      if (!nested[level1]) {
        nested[level1] = { name: level1, children: [], value: 0 };
      }

      nested[level1].children.push({
        name: level2,
        value: value,
      });
      nested[level1].value += value;
    });

    return {
      chartType: "sunburst",
      title: `Multi-level Distribution`,
      reasoning: `Detected multi-level categorical data. Sunburst chart shows hierarchical proportions.`,
      series: [
        {
          name: "Distribution",
          type: "sunburst" as const,
          data: Object.values(nested),
          radius: [0, "90%"],
          label: {
            show: true,
            formatter: "{b}",
          },
        },
      ],
    };
  }

  private createTimeSeriesChart(
    data: DataPoint[],
    dateKey: string,
    numericKeys: string[]
  ): ChartConfig {
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a[dateKey] as string).getTime() -
        new Date(b[dateKey] as string).getTime()
    );

    return {
      chartType: "line",
      title: `${numericKeys.join(" & ")} Over Time`,
      reasoning: `Detected time series data with date field "${dateKey}" and numeric values. Line chart shows trends over time.`,
      xAxis: {
        type: "category",
        data: sortedData.map((item) => item[dateKey] as string),
        name: dateKey,
      },
      yAxis: {
        type: "value",
        name: numericKeys.join(" / "),
      },
      series: numericKeys.map((key) => ({
        name: key,
        type: "line" as const,
        data: sortedData.map((item) => item[key] as number),
        smooth: true,
        symbol: "circle",
      })),
    };
  }

  private createPieChart(
    data: DataPoint[],
    categoryKey: string,
    valueKey: string
  ): ChartConfig {
    return {
      chartType: "pie",
      title: `Distribution of ${valueKey} by ${categoryKey}`,
      reasoning: `Detected categorical data with numeric values. Pie chart shows proportional distribution.`,
      series: [
        {
          name: valueKey,
          type: "pie" as const,
          data: data.map((item) => ({
            name: item[categoryKey] as string,
            value: item[valueKey] as number,
          })),
          center: ["50%", "50%"],
          radius: ["40%", "70%"],
          label: {
            show: true,
            formatter: "{b}: {c} ({d}%)",
          },
        },
      ],
    };
  }

  private createScatterChart(
    data: DataPoint[],
    numericKeys: string[]
  ): ChartConfig {
    const xKey = numericKeys[0];
    const yKey = numericKeys[1];
    const sizeKey = numericKeys[2]; // Optional third dimension

    return {
      chartType: "scatter",
      title: `${yKey} vs ${xKey}${sizeKey ? ` (sized by ${sizeKey})` : ""}`,
      reasoning: `Detected multiple numeric fields. Scatter plot shows correlation between variables.`,
      xAxis: {
        type: "value",
        name: xKey,
        scale: true,
      },
      yAxis: {
        type: "value",
        name: yKey,
        scale: true,
      },
      series: [
        {
          name: "Data Points",
          type: "scatter" as const,
          data: data.map((item) => [
            item[xKey] as number,
            item[yKey] as number,
            sizeKey ? (item[sizeKey] as number) : 10,
          ]),
          symbolSize: sizeKey ? (data: number[]) => Math.sqrt(data[2]) / 2 : 8,
        },
      ],
    };
  }

  private createBarChart(
    data: DataPoint[],
    categoryKey: string,
    numericKeys: string[]
  ): ChartConfig {
    return {
      chartType: "bar",
      title: `${numericKeys.join(" & ")} by ${categoryKey}`,
      reasoning: `Detected categorical and numeric data. Bar chart compares values across categories.`,
      xAxis: {
        type: "category",
        data: data.map((item) => item[categoryKey] as string),
        name: categoryKey,
      },
      yAxis: {
        type: "value",
        name: numericKeys.join(" / "),
      },
      series: numericKeys.map((key) => ({
        name: key,
        type: "bar" as const,
        data: data.map((item) => item[key] as number),
      })),
    };
  }

  private createDefaultChart(data: DataPoint[], keys: string[]): ChartConfig {
    const firstKey = keys[0];
    const secondKey = keys[1] || keys[0];

    return {
      chartType: "bar",
      title: `Data Visualization`,
      reasoning: `Using default bar chart visualization for the provided data structure.`,
      xAxis: {
        type: "category",
        data: data.map(
          (item, index) => (item[firstKey] as string) || `Item ${index + 1}`
        ),
        name: firstKey,
      },
      yAxis: {
        type: "value",
        name: "Values",
      },
      series: [
        {
          name: secondKey,
          type: "bar" as const,
          data: data.map((item) => {
            const value = item[secondKey];
            return typeof value === "number" ? value : 1;
          }),
        },
      ],
    };
  }
}

export default DataAnalyzer;
