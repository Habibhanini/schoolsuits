import React, { useState } from "react";
import { useComments } from "./CommentsContext";
import { ChartComment, ZoneComment } from "../../types/chart";

interface CommentsProps {
  onCommentClick?: (chartId: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ onCommentClick }) => {
  const {
    comments,
    zoneComments,
    deleteComment,
    deleteZoneComment,
    toggleCommentHighlight,
    toggleZoneCommentHighlight,
    clearAllHighlights,
    isCommentHighlighted,
    isZoneCommentHighlighted,
  } = useComments();

  const [filterMode, setFilterMode] = useState<"all" | "point" | "zone">("all");

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  // Combine and filter comments based on filter mode
  const allComments = [
    ...comments.map((c) => ({ ...c, type: "point" as const })),
    ...zoneComments.map((c) => ({ ...c, type: "zone" as const })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const filteredComments = allComments.filter((comment) => {
    if (filterMode === "all") return true;
    return comment.type === filterMode;
  });

  const totalComments = comments.length + zoneComments.length;
  const visibleComments = filteredComments.filter((comment) =>
    comment.type === "point"
      ? isCommentHighlighted(comment.id)
      : isZoneCommentHighlighted(comment.id)
  ).length;

  return (
    <div className="w-full h-[800px] rounded-md bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          Comments ({totalComments})
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {visibleComments} visible
          </span>
          <button
            onClick={clearAllHighlights}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
            title="Clear all highlights"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setFilterMode("all")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex-1 ${
            filterMode === "all"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          All ({totalComments})
        </button>
        <button
          onClick={() => setFilterMode("point")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex-1 ${
            filterMode === "point"
              ? "bg-blue-100 text-blue-800 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          📍 Points ({comments.length})
        </button>
        <button
          onClick={() => setFilterMode("zone")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex-1 ${
            filterMode === "zone"
              ? "bg-green-100 text-green-800 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          🔲 Zones ({zoneComments.length})
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3 max-h-[650px] overflow-y-auto">
        {filteredComments.length === 0 ? (
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-sm">
              {filterMode === "all"
                ? "No comments yet"
                : filterMode === "point"
                ? "No point comments yet"
                : "No zone comments yet"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Click on any chart to add comments
            </p>
          </div>
        ) : (
          filteredComments.map((comment) => {
            const isHighlighted =
              comment.type === "point"
                ? isCommentHighlighted(comment.id)
                : isZoneCommentHighlighted(comment.id);

            return (
              <div
                key={`${comment.type}-${comment.id}`}
                className={`p-3 rounded-lg border transition-all hover:shadow-md ${
                  isHighlighted
                    ? comment.type === "point"
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-green-500 bg-green-50 ring-2 ring-green-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 border-2 border-white shadow-md flex items-center justify-center text-sm flex-shrink-0 ${
                      comment.type === "point" ? "rounded-full" : "rounded-md"
                    }`}
                    style={{ backgroundColor: comment.color }}
                  >
                    {comment.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {comment.author}
                        </p>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                            comment.type === "point"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {comment.type === "point" ? "📍" : "🔲"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {/* Scroll to chart button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onCommentClick) {
                              onCommentClick(comment.chartId);
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                          title="Scroll to chart"
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
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </button>

                        {/* Toggle visibility button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (comment.type === "point") {
                              toggleCommentHighlight(comment.id);
                            } else {
                              toggleZoneCommentHighlight(comment.id);
                            }
                          }}
                          className={`p-1 transition-colors ${
                            isHighlighted
                              ? comment.type === "point"
                                ? "text-blue-500 hover:text-blue-600"
                                : "text-green-500 hover:text-green-600"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={
                            isHighlighted ? "Hide on chart" : "Show on chart"
                          }
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {isHighlighted ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            )}
                          </svg>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (comment.type === "point") {
                              deleteComment(comment.id);
                            } else {
                              deleteZoneComment(comment.id);
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete comment"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 flex items-center">
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: comment.color }}
                      />
                      {formatTimeAgo(comment.timestamp)} • Chart:{" "}
                      {comment.chartId}
                      {comment.type === "zone" && (
                        <span className="ml-1 text-green-600">
                          • {Math.round((comment as ZoneComment).width)}×
                          {Math.round((comment as ZoneComment).height)}px
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-700 break-words">
                      {comment.comment}
                    </p>
                    {comment.type === "zone" && (
                      <div className="mt-2 text-xs text-gray-500">
                        <div
                          className="inline-block w-16 h-3 border border-gray-300 rounded"
                          style={{
                            backgroundColor: (comment as ZoneComment).zoneColor,
                          }}
                          title="Zone highlight color"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments;
