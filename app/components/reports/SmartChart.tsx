import React, { useState, useRef, useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { useComments } from "./CommentsContext";
import { DataPoint, ChartConfig } from "../../types/chart";

interface SmartChartProps {
  data: DataPoint[] | null;
  config: ChartConfig | null;
  chartId: string;
  highlightedCommentId?: string | null;
}

interface ZoneSelection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  isSelecting: boolean;
}

const SmartChart: React.FC<SmartChartProps> = ({
  data,
  config,
  chartId,
  highlightedCommentId,
}) => {
  const {
    addComment,
    addZoneComment,
    getCommentsByChart,
    getZoneCommentsByChart,
    highlightedCommentIds,
    isCommentHighlighted,
    isZoneCommentHighlighted,
  } = useComments();

  // Comment mode state
  const [commentMode, setCommentMode] = useState<"point" | "zone">("point");

  // Chart interaction states
  const [isZoomMode, setIsZoomMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  // Point comment states
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{
    x: number;
    y: number;
    chartX: any;
    chartY: any;
  } | null>(null);

  // Zone comment states
  const [showZoneCommentModal, setShowZoneCommentModal] = useState(false);

  function resetZoneSelection(): ZoneSelection {
    return {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      width: 0,
      height: 0,
      isSelecting: false,
    };
  }

  const [zoneSelection, setZoneSelection] = useState<ZoneSelection>(
    resetZoneSelection()
  );
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Common states
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("User");
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const [activeComment, setActiveComment] = useState<any>(null);
  const [activeZoneComment, setActiveZoneComment] = useState<any>(null);
  const chartRef = useRef<any>(null);

  // Enhanced color palettes for better differentiation
  const avatars = ["👤", "👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🔬", "👨‍💻", "👩‍💻", "🧑‍🎨", "🎨", "🔥"];

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#F97316",
    "#84CC16",
    "#EC4899",
    "#6366F1",
    "#14B8A6",
    "#F43F5E",
    "#8B5A2B",
    "#7C3AED",
    "#DC2626",
  ];

  const pieColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#F4A261",
    "#E76F51",
    "#74B9FF",
    "#00B894",
    "#FDCB6E",
    "#E17055",
    "#A29BFE",
    "#FD79A8",
    "#6C5CE7",
  ];

  const radarColors = [
    "rgba(255, 107, 107, 0.6)",
    "rgba(78, 205, 196, 0.6)",
    "rgba(69, 183, 209, 0.6)",
    "rgba(150, 206, 180, 0.6)",
    "rgba(255, 234, 167, 0.6)",
    "rgba(221, 160, 221, 0.6)",
  ];

  const zoneColors = [
    "rgba(59, 130, 246, 0.15)",
    "rgba(16, 185, 129, 0.15)",
    "rgba(245, 158, 11, 0.15)",
    "rgba(239, 68, 68, 0.15)",
    "rgba(139, 92, 246, 0.15)",
    "rgba(6, 182, 212, 0.15)",
    "rgba(249, 115, 22, 0.15)",
    "rgba(132, 204, 22, 0.15)",
    "rgba(236, 72, 153, 0.15)",
    "rgba(99, 102, 241, 0.15)",
  ];

  // Generate random insights based on chart type
  const getChartInsights = () => {
    const insights = {
      bar: [
        "📊 The highest performing category shows 23% above average",
        "📈 Growth trend indicates consistent 15% month-over-month increase",
        "🎯 Current performance is tracking 8% ahead of quarterly goals",
        "⚡ Peak performance occurs during mid-week periods",
        "📋 Distribution shows normal variance with occasional outliers",
      ],
      pie: [
        "🥧 The largest segment represents 35% of total distribution",
        "🔍 Two segments combined account for 60% of the data",
        "📊 Distribution is relatively balanced across categories",
        "⚖️ Concentration index suggests moderate diversification",
        "🎯 Top 3 categories represent the majority of values",
      ],
      line: [
        "📈 Trend analysis shows positive momentum over time",
        "📉 Recent data points indicate seasonal variation patterns",
        "🔄 Cyclical behavior observed with 3-month intervals",
        "⚡ Volatility has decreased by 18% in recent periods",
        "📊 Moving average suggests sustained growth trajectory",
      ],
      scatter: [
        "⚡ Strong positive correlation detected (r=0.78)",
        "🎯 Data clustering reveals 3 distinct behavioral groups",
        "📊 Performance varies significantly across investment levels",
        "🔍 Outliers may indicate exceptional cases worth investigating",
        "📈 Linear relationship suggests predictable patterns",
      ],
      area: [
        "📊 Cumulative growth shows accelerating trend",
        "🔄 Seasonal patterns are clearly visible in the data",
        "📈 Overall trajectory indicates positive long-term outlook",
        "⚡ Recent period shows increased activity levels",
        "🎯 Peak periods align with business cycle expectations",
      ],
      radar: [
        "🕸️ Performance profile shows balanced capabilities",
        "🎯 Strengths are concentrated in 2-3 key areas",
        "📊 Overall score indicates above-average performance",
        "⚖️ Some areas have potential for improvement",
        "🔍 Comparative analysis reveals competitive advantages",
      ],
      funnel: [
        "🔽 Conversion rate is 15% above industry benchmark",
        "📊 Largest drop-off occurs at the qualification stage",
        "🎯 Final conversion efficiency is within target range",
        "⚡ Early stages show healthy engagement levels",
        "🔍 Process optimization could improve middle-stage retention",
      ],
      heatmap: [
        "🌡️ Peak activity concentrated in specific time windows",
        "📊 Pattern analysis reveals predictable behavior cycles",
        "🔍 Intensity varies significantly across different periods",
        "⚡ Hot spots indicate areas of high engagement",
        "📈 Temporal patterns suggest optimization opportunities",
      ],
      gauge: [
        "⏱️ Current performance is 78% of maximum potential",
        "🎯 Score falls within the 'good' performance range",
        "📊 Historical comparison shows 12% improvement",
        "⚡ Trending upward over the last quarter",
        "🔍 Performance threshold targets are being met",
      ],
      treemap: [
        "🌳 Hierarchical distribution shows clear size differences",
        "📊 Largest segment dominates the overall composition",
        "🔍 Sub-categories reveal interesting internal patterns",
        "⚖️ Resource allocation appears relatively balanced",
        "🎯 Focus areas are clearly identified by size",
      ],
      sunburst: [
        "🌞 Multi-level analysis reveals complex relationships",
        "📊 Inner rings show primary category distributions",
        "🔍 Outer segments provide detailed breakdowns",
        "⚖️ Balanced hierarchy with no single dominant path",
        "🎯 Deep-dive capabilities reveal actionable insights",
      ],
      bottleneck: [
        "🔄 Process flow identifies 2 key constraint points",
        "⚡ Throughput optimization could increase by 15%",
        "📊 Capacity utilization varies significantly by stage",
        "🎯 Bottleneck analysis suggests workflow improvements",
        "🔍 Resource reallocation could balance the pipeline",
      ],
    };

    const chartType = config?.chartType ?? "bar";
    const chartInsights =
      insights[chartType as keyof typeof insights] || insights.bar;
    return chartInsights[Math.floor(Math.random() * chartInsights.length)];
  };

  if (!data || !config) return null;

  const comments = getCommentsByChart(chartId);
  const zoneComments = getZoneCommentsByChart(chartId);

  // Enhanced chart options with zoom functionality and multi-color support
  const getChartOption = () => {
    const baseOption: any = {
      title: {
        text: config.title,
        left: "center",
        textStyle: {
          fontSize: 20,
          fontWeight: "600",
          color: "#111827",
        },
      },
      tooltip: {
        trigger: config.chartType === "scatter" ? "item" : "axis",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        textStyle: {
          color: "#374151",
          fontSize: 12,
        },
        extraCssText:
          "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 8px;",
        axisPointer: {
          type: config.chartType === "line" ? "cross" : "shadow",
          lineStyle: {
            color: "#6B7280",
          },
          shadowStyle: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
      legend: {
        top: "bottom",
        data: config.series.map((s) => s.name),
        textStyle: {
          color: "#6B7280",
          fontSize: 12,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "15%",
        containLabel: true,
      },
      // Enhanced toolbox with zoom controls
      toolbox: {
        show: true,
        right: 20,
        top: 20,
        feature: {
          dataZoom: {
            show: isZoomMode,
            title: {
              zoom: "Area Zoom",
              back: "Reset Zoom",
            },
          },
          restore: {
            show: isZoomMode,
            title: "Reset",
          },
          saveAsImage: {
            show: true,
            title: "Save as Image",
            pixelRatio: 2,
          },
        },
        iconStyle: {
          borderColor: "#6B7280",
        },
        emphasis: {
          iconStyle: {
            borderColor: "#3B82F6",
          },
        },
      },
      // Data zoom for supported chart types
      dataZoom:
        isZoomMode &&
        ["bar", "line", "scatter", "area"].includes(config.chartType)
          ? [
              {
                type: "slider",
                show: true,
                xAxisIndex: [0],
                bottom: 10,
                height: 20,
                borderColor: "#E5E7EB",
                fillerColor: "rgba(59, 130, 246, 0.2)",
                handleStyle: {
                  color: "#3B82F6",
                },
              },
              {
                type: "inside",
                xAxisIndex: [0],
              },
            ]
          : undefined,
    };

    // Configure axes based on chart type
    const axisChartTypes = [
      "bar",
      "line",
      "scatter",
      "area",
      "heatmap",
      "boxplot",
      "bottleneck",
    ];
    if (axisChartTypes.includes(config.chartType)) {
      baseOption.xAxis = {
        ...config.xAxis,
        axisLine: {
          lineStyle: {
            color: "#E5E7EB",
          },
        },
        axisTick: {
          lineStyle: {
            color: "#E5E7EB",
          },
        },
        axisLabel: {
          color: "#6B7280",
          fontSize: 11,
        },
        splitLine: {
          lineStyle: {
            color: "#F3F4F6",
            type: "dashed",
          },
        },
      };
      baseOption.yAxis = {
        ...config.yAxis,
        axisLine: {
          lineStyle: {
            color: "#E5E7EB",
          },
        },
        axisTick: {
          lineStyle: {
            color: "#E5E7EB",
          },
        },
        axisLabel: {
          color: "#6B7280",
          fontSize: 11,
        },
        splitLine: {
          lineStyle: {
            color: "#F3F4F6",
            type: "dashed",
          },
        },
      };
    }

    // Enhanced series styling with proper color distribution
    baseOption.series = config.series.map((series, index) => {
      let seriesColors = colors;

      // Use specialized color palettes for specific chart types
      if (config.chartType === "pie") {
        seriesColors = pieColors;
      } else if (config.chartType === "radar") {
        seriesColors = colors;
      }

      return {
        ...series,
        emphasis: {
          focus: "series",
        },
        animationDelay: (dataIndex: number) => dataIndex * 50,
        animationDuration: 800,
        animationEasing: "cubicInOut",
        // Enhanced color handling for different chart types
        itemStyle: {
          color:
            config.chartType === "pie" ||
            config.chartType === "sunburst" ||
            config.chartType === "treemap"
              ? (params: any) =>
                  seriesColors[params.dataIndex % seriesColors.length]
              : seriesColors[index % seriesColors.length],
          ...series.itemStyle,
        },
      };
    });

    // Enhanced chart type specific configurations
    switch (config.chartType) {
      case "pie":
        if (baseOption.series[0]) {
          baseOption.series[0].center = ["50%", "55%"];
          baseOption.series[0].radius = ["35%", "70%"];
          baseOption.series[0].label = {
            show: true,
            formatter: "{b}: {c} ({d}%)",
            fontSize: 11,
            color: "#374151",
          };
          baseOption.series[0].labelLine = {
            lineStyle: {
              color: "#9CA3AF",
            },
          };
          // Ensure pie charts use the pie color palette
          baseOption.series[0].itemStyle = {
            color: (params: any) =>
              pieColors[params.dataIndex % pieColors.length],
          };
        }
        break;

      case "scatter":
        if (baseOption.xAxis) baseOption.xAxis.scale = true;
        if (baseOption.yAxis) baseOption.yAxis.scale = true;
        break;

      case "line":
        baseOption.series.forEach((series: any) => {
          series.smooth = true;
          series.symbol = "circle";
          series.symbolSize = 6;
          series.lineStyle = {
            width: 3,
          };
        });
        break;

      case "area":
        baseOption.series.forEach((series: any, index: number) => {
          series.areaStyle = {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: colors[index % colors.length] + "40" },
                { offset: 1, color: colors[index % colors.length] + "10" },
              ],
            },
          };
          series.smooth = true;
          series.lineStyle = {
            width: 2,
          };
        });
        break;

      case "bar":
        baseOption.series.forEach((series: any, index: number) => {
          series.itemStyle = {
            borderRadius: [4, 4, 0, 0],
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: colors[index % colors.length] },
                { offset: 1, color: colors[index % colors.length] + "CC" },
              ],
            },
          };
        });
        break;

      case "radar":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;
        if (baseOption.series[0]?.indicator) {
          baseOption.radar = {
            indicator: baseOption.series[0].indicator,
            shape: "polygon",
            splitNumber: 5,
            splitLine: {
              lineStyle: {
                color: "#E5E7EB",
              },
            },
            splitArea: {
              areaStyle: {
                color: ["rgba(59, 130, 246, 0.05)", "rgba(59, 130, 246, 0.02)"],
              },
            },
            name: {
              formatter: "{value}",
              textStyle: {
                color: "#374151",
                fontSize: 11,
              },
            },
          };
          // Enhanced radar series with multiple colors
          baseOption.series.forEach((series: any, index: number) => {
            series.areaStyle = {
              color: radarColors[index % radarColors.length],
            };
            series.lineStyle = {
              color: colors[index % colors.length],
              width: 2,
            };
            series.itemStyle = {
              color: colors[index % colors.length],
            };
          });
        }
        break;

      case "funnel":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;
        if (baseOption.series[0]) {
          baseOption.series[0].left = "10%";
          baseOption.series[0].top = 80;
          baseOption.series[0].bottom = 80;
          baseOption.series[0].width = "80%";
          baseOption.series[0].itemStyle = {
            borderColor: "#fff",
            borderWidth: 2,
          };
        }
        break;

      case "heatmap":
        baseOption.visualMap = {
          ...config.visualMap,
          textStyle: {
            color: "#374151",
          },
        };
        break;

      // In your SmartChart component, replace the sunburst case with this:

      case "sunburst":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;

        // Completely remove any custom styling to let ECharts handle colors
        if (baseOption.series[0]) {
          // Remove any existing itemStyle
          delete baseOption.series[0].itemStyle;

          // Ensure the series has the basic required properties
          baseOption.series[0] = {
            ...baseOption.series[0],
            type: "sunburst",
            // Let ECharts use its default color scheme
            radius: [0, "90%"],
            label: {
              show: true,
              formatter: "{b}",
            },
          };
        }
        break;

      // Alternative approach - if the above doesn't work, try explicitly setting ECharts default colors:

      case "sunburst":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;

        // Use ECharts default color palette
        baseOption.color = [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
          "#ffb54d",
        ];

        if (baseOption.series[0]) {
          baseOption.series[0] = {
            ...baseOption.series[0],
            type: "sunburst",
            radius: [0, "90%"],
            label: {
              show: true,
              formatter: "{b}",
            },
          };
        }
        break;
      case "treemap":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;
        // Enhanced treemap with multiple colors
        if (baseOption.series[0]) {
          baseOption.series[0].itemStyle = {
            color: (params: any) => colors[params.dataIndex % colors.length],
            borderColor: "#fff",
            borderWidth: 2,
          };
        }
        break;

      case "gauge":
        delete baseOption.xAxis;
        delete baseOption.yAxis;
        delete baseOption.grid;

        // Make the gauge meter thicker
        if (baseOption.series[0]) {
          baseOption.series[0].axisLine = {
            lineStyle: {
              width: 40, // Increase from default (usually 10-20) to 40
              color: [
                [0.3, "#fd666d"],
                [0.7, "#37a2da"],
                [1, "#67e0e3"],
              ],
            },
          };
        }
        break;

      case "bottleneck":
        baseOption.grid = {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "15%",
          containLabel: true,
        };
        baseOption.legend.show = false;
        break;
    }

    return baseOption;
  };

  // Chart interaction handlers
  const handleChartClick = useCallback(
    (params: any) => {
      if (commentMode !== "point" || isZoomMode) return;

      const chart = chartRef.current?.getEchartsInstance();
      if (!chart) return;

      const pixelX = params.event?.offsetX;
      const pixelY = params.event?.offsetY;

      if (pixelX !== undefined && pixelY !== undefined) {
        let chartX, chartY;

        const specialChartTypes = [
          "pie",
          "gauge",
          "treemap",
          "sunburst",
          "funnel",
          "radar",
        ];

        if (specialChartTypes.includes(config.chartType)) {
          chartX = pixelX;
          chartY = pixelY;
        } else {
          try {
            const convertedPoint = chart.convertFromPixel("grid", [
              pixelX,
              pixelY,
            ]);
            chartX = convertedPoint[0];
            chartY = convertedPoint[1];
          } catch (error) {
            chartX = pixelX;
            chartY = pixelY;
          }
        }

        setSelectedPoint({ x: pixelX, y: pixelY, chartX, chartY });
        setShowCommentModal(true);
      }
    },
    [config.chartType, commentMode, isZoomMode]
  );

  // Zone comment handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (commentMode !== "zone" || isZoomMode) return;

      if (
        (e.target as HTMLElement).closest(".comment-marker") ||
        (e.target as HTMLElement).closest(".zone-comment-marker")
      ) {
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsMouseDown(true);
      setZoneSelection({
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        width: 0,
        height: 0,
        isSelecting: true,
      });
    },
    [commentMode, isZoomMode]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown || commentMode !== "zone" || isZoomMode) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = Math.abs(x - zoneSelection.startX);
      const height = Math.abs(y - zoneSelection.startY);

      setZoneSelection((prev) => ({
        ...prev,
        endX: x,
        endY: y,
        width,
        height,
      }));
    },
    [
      isMouseDown,
      commentMode,
      zoneSelection.startX,
      zoneSelection.startY,
      isZoomMode,
    ]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMouseDown || commentMode !== "zone" || isZoomMode) return;

      setIsMouseDown(false);

      const width = Math.abs(zoneSelection.endX - zoneSelection.startX);
      const height = Math.abs(zoneSelection.endY - zoneSelection.startY);

      if (width > 30 && height > 30) {
        setShowZoneCommentModal(true);
      } else {
        setZoneSelection((prev) => ({
          ...prev,
          isSelecting: false,
          width: 0,
          height: 0,
        }));
      }
    },
    [isMouseDown, commentMode, zoneSelection, isZoomMode]
  );

  // Comment handlers
  const handleAddComment = () => {
    if (!selectedPoint || !newComment.trim()) return;

    addComment({
      x: selectedPoint.x,
      y: selectedPoint.y,
      chartX: selectedPoint.chartX,
      chartY: selectedPoint.chartY,
      comment: newComment.trim(),
      author: authorName,
      avatar: selectedAvatar,
      color: colors[Math.floor(Math.random() * colors.length)],
      chartId,
    });

    setNewComment("");
    setShowCommentModal(false);
    setSelectedPoint(null);
  };

  const handleAddZoneComment = () => {
    if (!zoneSelection.isSelecting || !newComment.trim()) return;

    const minX = Math.min(zoneSelection.startX, zoneSelection.endX);
    const minY = Math.min(zoneSelection.startY, zoneSelection.endY);
    const maxX = Math.max(zoneSelection.startX, zoneSelection.endX);
    const maxY = Math.max(zoneSelection.startY, zoneSelection.endY);

    addZoneComment({
      startX: minX,
      startY: minY,
      endX: maxX,
      endY: maxY,
      width: maxX - minX,
      height: maxY - minY,
      comment: newComment.trim(),
      author: authorName,
      avatar: selectedAvatar,
      color: colors[Math.floor(Math.random() * colors.length)],
      zoneColor: zoneColors[Math.floor(Math.random() * zoneColors.length)],
      chartId,
    });

    setNewComment("");
    setShowZoneCommentModal(false);
    setZoneSelection(resetZoneSelection());
  };

  const onEvents = {
    click: handleChartClick,
  };

  const getSelectionStyle = () => {
    if (!zoneSelection.isSelecting) return {};

    const minX = Math.min(zoneSelection.startX, zoneSelection.endX);
    const minY = Math.min(zoneSelection.startY, zoneSelection.endY);
    const width = Math.abs(zoneSelection.endX - zoneSelection.startX);
    const height = Math.abs(zoneSelection.endY - zoneSelection.startY);

    return {
      left: `${minX}px`,
      top: `${minY}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="relative">
      {/* Chart Controls */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Comment Mode Toggle */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Mode:</span>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setCommentMode("point")}
                disabled={isZoomMode}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  commentMode === "point" && !isZoomMode
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📍 Pin
              </button>
              <button
                onClick={() => setCommentMode("zone")}
                disabled={isZoomMode}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  commentMode === "zone" && !isZoomMode
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🔲 Zone
              </button>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="flex items-center space-x-3">
            {/* Insights Toggle */}
            <button
              onClick={() => setShowInsights(!showInsights)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 ${
                showInsights
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span>Insights</span>
            </button>

            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomMode(!isZoomMode)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 ${
                isZoomMode
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>{isZoomMode ? "Exit Zoom" : "Zoom"}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isFullscreen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                )}
              </svg>
            </button>

            {/* Comments Count */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{comments.length}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{zoneComments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Instructions */}
        {!isZoomMode && (
          <div className="mt-3 text-xs text-gray-500">
            {commentMode === "point"
              ? "💡 Click anywhere on the chart to add a point comment"
              : "💡 Click and drag to select an area for zone commenting"}
          </div>
        )}

        {isZoomMode && (
          <div className="mt-3 text-xs text-purple-600">
            🔍 Zoom mode active: Use mouse wheel to zoom, drag to pan, or use
            the zoom tools above the chart
          </div>
        )}
      </div>

      {/* Main Chart Container */}
      <div className="flex relative">
        {/* Chart Area */}
        <div className="flex-1">
          <div
            className={`relative bg-white ${
              isFullscreen ? "fixed inset-0 z-50" : ""
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              cursor: isZoomMode
                ? "crosshair"
                : commentMode === "zone"
                ? "crosshair"
                : "pointer",
              userSelect:
                commentMode === "zone" && !isZoomMode ? "none" : "auto",
            }}
          >
            <ReactECharts
              ref={chartRef}
              option={getChartOption()}
              style={{
                height: isFullscreen ? "100vh" : "600px",
                width: "100%",
              }}
              opts={{ renderer: "canvas" }}
              onEvents={onEvents}
            />

            {/* Zone Selection Overlay */}
            {commentMode === "zone" &&
              zoneSelection.isSelecting &&
              !isZoomMode && (
                <div
                  className="absolute border-2 border-dashed border-green-500 bg-green-100 bg-opacity-20 pointer-events-none z-10 rounded-lg"
                  style={getSelectionStyle()}
                />
              )}

            {/* Point Comment Markers */}
            {comments
              .filter((comment) => isCommentHighlighted(comment.id))
              .map((comment) => (
                <div
                  key={comment.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20 comment-marker"
                  style={{
                    left: `${comment.x}px`,
                    top: `${comment.y}px`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveComment(comment);
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-lg hover:scale-110 transition-all duration-200 ring-4 ring-blue-400 ring-opacity-50"
                    style={{ backgroundColor: comment.color }}
                  >
                    {comment.avatar}
                  </div>
                </div>
              ))}

            {/* Zone Comment Overlays */}
            {zoneComments
              .filter((zoneComment) => isZoneCommentHighlighted(zoneComment.id))
              .map((zoneComment) => (
                <div key={zoneComment.id}>
                  <div
                    className="absolute border-2 border-green-500 z-15 zone-comment-marker rounded-lg"
                    style={{
                      left: `${zoneComment.startX}px`,
                      top: `${zoneComment.startY}px`,
                      width: `${zoneComment.width}px`,
                      height: `${zoneComment.height}px`,
                      backgroundColor: zoneComment.zoneColor,
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveZoneComment(zoneComment);
                    }}
                  />
                  <div
                    className="absolute cursor-pointer z-20 zone-comment-marker"
                    style={{
                      left: `${zoneComment.startX + 8}px`,
                      top: `${zoneComment.startY + 8}px`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveZoneComment(zoneComment);
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-sm hover:scale-110 transition-all duration-200 ring-2 ring-green-400 ring-opacity-70"
                      style={{ backgroundColor: zoneComment.color }}
                    >
                      {zoneComment.avatar}
                    </div>
                  </div>
                </div>
              ))}

            {/* Fullscreen Exit Button */}
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-30 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Insights Panel */}
        <div
          className={`transition-all duration-300 ease-in-out bg-white border-l border-gray-200 ${
            showInsights ? "w-80" : "w-0"
          } overflow-hidden`}
        >
          {showInsights && (
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <span className="text-gray-500">💡</span>
                  <span>Chart Insights</span>
                </h3>
                <button
                  onClick={() => setShowInsights(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Key Insight */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">
                    Key Insight
                  </h4>
                  <p className="text-sm text-gray-700">{getChartInsights()}</p>
                </div>

                {/* Chart Metrics */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">
                    Chart Metrics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data Points:</span>
                      <span className="font-medium text-gray-800">
                        {data.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chart Type:</span>
                      <span className="font-medium text-gray-800 capitalize">
                        {config.chartType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Series Count:</span>
                      <span className="font-medium text-gray-800">
                        {config.series.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comments:</span>
                      <span className="font-medium text-gray-800">
                        {comments.length + zoneComments.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">
                    Recommendations
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600 text-xs mt-0.5">•</span>
                      <span className="text-sm text-gray-700">
                        Use point comments for specific data annotations
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600 text-xs mt-0.5">•</span>
                      <span className="text-sm text-gray-700">
                        Zone comments are great for highlighting trends
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600 text-xs mt-0.5">•</span>
                      <span className="text-sm text-gray-700">
                        Enable zoom mode for detailed exploration
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analysis Tools */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">
                    Analysis Tools
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      📊 Export Chart Data
                    </button>
                    <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      📈 Trend Analysis
                    </button>
                    <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      🔍 Statistical Summary
                    </button>
                  </div>
                </div>

                {/* Chart Performance */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-800 mb-3">
                    Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Render Time</span>
                      <span className="text-xs font-medium text-gray-800">
                        ~45ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Memory Usage
                      </span>
                      <span className="text-xs font-medium text-gray-800">
                        2.1MB
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        Optimization
                      </span>
                      <span className="text-xs font-medium text-gray-600">
                        ✓ Good
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Point Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Add Point Comment
            </h3>

            <div className="space-y-4">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg transition-all ${
                        selectedAvatar === avatar
                          ? "border-blue-500 bg-blue-50 scale-110 shadow-md"
                          : "border-gray-300 hover:border-gray-400 hover:scale-105"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  rows={3}
                  placeholder="Add your comment about this point..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedPoint(null);
                  setNewComment("");
                }}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zone Comment Modal */}
      {showZoneCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Add Zone Comment
            </h3>

            {/* Zone Info */}
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-800">
                <span className="font-medium">Selected Zone:</span>{" "}
                {Math.round(zoneSelection.width)} ×{" "}
                {Math.round(zoneSelection.height)} pixels
              </p>
            </div>

            <div className="space-y-4">
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Avatar
                </label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg transition-all ${
                        selectedAvatar === avatar
                          ? "border-green-500 bg-green-50 scale-110 shadow-md"
                          : "border-gray-300 hover:border-gray-400 hover:scale-105"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zone Comment
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                  rows={3}
                  placeholder="Add your comment about this zone..."
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowZoneCommentModal(false);
                  setZoneSelection(resetZoneSelection());
                  setNewComment("");
                }}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddZoneComment}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Zone Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Comment Modals */}
      {activeComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl">
            <div className="flex items-start space-x-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: activeComment.color }}
              >
                {activeComment.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {activeComment.author}
                </h4>
                <p className="text-xs text-gray-500">
                  {activeComment.timestamp.toLocaleDateString()} at{" "}
                  {activeComment.timestamp.toLocaleTimeString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">Point Comment</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800">{activeComment.comment}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveComment(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeZoneComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-[90vw] shadow-2xl">
            <div className="flex items-start space-x-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl border-2 border-white shadow-lg flex items-center justify-center text-lg"
                style={{ backgroundColor: activeZoneComment.color }}
              >
                {activeZoneComment.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {activeZoneComment.author}
                </h4>
                <p className="text-xs text-gray-500">
                  {activeZoneComment.timestamp.toLocaleDateString()} at{" "}
                  {activeZoneComment.timestamp.toLocaleTimeString()}
                </p>
                <p className="text-xs text-green-600 mt-1">Zone Comment</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-800">{activeZoneComment.comment}</p>
            </div>
            <div className="text-xs text-gray-500 mb-4">
              <p>
                Zone: {Math.round(activeZoneComment.width)} ×{" "}
                {Math.round(activeZoneComment.height)} pixels
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveZoneComment(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartChart;
