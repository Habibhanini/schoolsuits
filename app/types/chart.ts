// Enhanced types to include chart type specification and comments with multiple highlight support + zone comments

export interface DataPoint {
  [key: string]: string | number | null | undefined;
}

export interface ChartComment {
  id: string;
  x: number;
  y: number;
  chartX: any;
  chartY: any;
  comment: string;
  author: string;
  avatar: string;
  timestamp: Date;
  color: string;
  chartId: string; // To associate comment with specific chart
}

// New ZoneComment interface for area-based comments
export interface ZoneComment {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  comment: string;
  author: string;
  avatar: string;
  timestamp: Date;
  color: string;
  zoneColor: string; // Semi-transparent overlay color for the zone
  chartId: string; // To associate zone comment with specific chart
}

export interface ChartSeries {
  name: string;
  type:
    | "line"
    | "bar"
    | "scatter"
    | "pie"
    | "area"
    | "radar"
    | "funnel"
    | "gauge"
    | "heatmap"
    | "treemap"
    | "sunburst"
    | "boxplot"
    | "candlestick"
    | "sankey"
    | "graph"
    | "bottleneck";
  data: any[];
  symbolSize?: number | ((data: any) => number);
  smooth?: boolean;
  symbol?: string;
  center?: string[];
  radius?: string[];
  label?: {
    show: boolean;
    formatter: string;
  };
  emphasis?: {
    focus: string;
  };
  animationDelay?: (idx: number) => number;
  stack?: string;
  areaStyle?: any;
  indicator?: any[];
  shape?: string;
  min?: number;
  max?: number;
  splitNumber?: number;
  axisLine?: any;
  axisTick?: any;
  axisLabel?: any;
  splitLine?: any;
  pointer?: any;
  detail?: any;
  breadcrumb?: any;
  levels?: any[];
  orient?: string;
  sort?: string;
  squareRatio?: number;
  leafDepth?: number;
  roam?: boolean;
  nodeScaleRatio?: number;
  draggable?: boolean;
  focusNodeAdjacency?: boolean;
  edgeSymbol?: string[];
  edgeSymbolSize?: number[];
  layout?: string;
  force?: any;
  categories?: any[];
  links?: any[];
  nodes?: any[];
  yAxisIndex?: number;
  itemStyle?: Record<string, any>;
  bottleneckWidth?: number;
  neckWidth?: number;
  neckHeight?: number;
}

export interface ChartAxis {
  type: "category" | "value" | "time" | "log";
  data?: string[];
  name?: string;
  nameLocation?: string;
  nameGap?: number;
  scale?: boolean;
  min?: number | string;
  max?: number | string;
  interval?: number;
  splitLine?: any;
  axisLabel?: any;
}

export interface ChartConfig {
  chartType:
    | "line"
    | "bar"
    | "scatter"
    | "pie"
    | "area"
    | "radar"
    | "funnel"
    | "gauge"
    | "heatmap"
    | "treemap"
    | "sunburst"
    | "boxplot"
    | "candlestick"
    | "sankey"
    | "graph"
    | "bottleneck";
  title: string;
  reasoning: string;
  xAxis?: ChartAxis;
  yAxis?: ChartAxis;
  series: ChartSeries[];
  visualMap?: any;
  calendar?: any;
  polar?: any;
  radiusAxis?: any;
  angleAxis?: any;
}

export type DataType = "numeric" | "categorical" | "date" | "text" | "unknown";

export interface DataTypeMap {
  [key: string]: DataType;
}

// Enhanced dataset interface with explicit chart type
export interface SampleDataset {
  name: string;
  data: DataPoint[];
  chartType?: string; // Optional override for chart type
}

export interface DatasetWithConfig {
  id: string; // Unique identifier for each chart
  name: string;
  data: DataPoint[];
  config: ChartConfig;
  isExpanded?: boolean; // For collapsible charts
}

// Enhanced Context for sharing comments across components with zone comment support
export interface CommentsContextType {
  // Point comments
  comments: ChartComment[];
  addComment: (comment: Omit<ChartComment, "id" | "timestamp">) => void;
  deleteComment: (commentId: string) => void;
  getCommentsByChart: (chartId: string) => ChartComment[];

  // Zone comments
  zoneComments: ZoneComment[];
  addZoneComment: (comment: Omit<ZoneComment, "id" | "timestamp">) => void;
  deleteZoneComment: (commentId: string) => void;
  getZoneCommentsByChart: (chartId: string) => ZoneComment[];

  // Legacy single highlight support (for backward compatibility)
  highlightedCommentId: string | null;
  setHighlightedCommentId: (commentId: string | null) => void;

  // Enhanced multiple highlight support (works for both point and zone comments)
  highlightedCommentIds: string[];
  toggleCommentHighlight: (commentId: string) => void;
  toggleZoneCommentHighlight: (commentId: string) => void;
  clearAllHighlights: () => void;
  isCommentHighlighted: (commentId: string) => boolean;
  isZoneCommentHighlighted: (commentId: string) => boolean;

  // Utility functions for statistics and management
  getTotalComments?: () => number;
  getVisibleComments?: () => number;
  getCommentsByType?: (
    type: "point" | "zone"
  ) => (ChartComment | ZoneComment)[];
}

// Comment mode types for UI state management
export type CommentMode = "point" | "zone";

// Zone selection interface for UI state
export interface ZoneSelection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isSelecting: boolean;
}

// Combined comment type for unified handling
export type AnyComment = ChartComment | ZoneComment;

// Type guard functions for comment type checking
export const isPointComment = (
  comment: AnyComment
): comment is ChartComment => {
  return "x" in comment && "y" in comment && !("startX" in comment);
};

export const isZoneComment = (comment: AnyComment): comment is ZoneComment => {
  return "startX" in comment && "startY" in comment && "width" in comment;
};

// Enhanced comment filter types
export type CommentFilterType = "all" | "point" | "zone" | "visible" | "hidden";

// Chart interaction modes
export type ChartInteractionMode = "view" | "comment-point" | "comment-zone";

// Comment display preferences
export interface CommentDisplaySettings {
  showPointComments: boolean;
  showZoneComments: boolean;
  showTimestamps: boolean;
  showAuthors: boolean;
  compactMode: boolean;
  sortBy: "timestamp" | "author" | "chart" | "type";
  sortOrder: "asc" | "desc";
}
