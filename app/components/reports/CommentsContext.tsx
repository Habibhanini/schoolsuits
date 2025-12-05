import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ChartComment,
  ZoneComment,
  CommentsContextType,
} from "../../types/chart";

// Remove the local ZoneComment declaration since it's now in types/chart.ts
// Remove the local ChartComment declaration since it's imported from types

// Extended context type
interface ExtendedCommentsContextType extends CommentsContextType {
  // All the zone comment methods are already defined in CommentsContextType now
}

const CommentsContext = createContext<ExtendedCommentsContextType | undefined>(
  undefined
);

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentsProvider");
  }
  return context;
};

interface CommentsProviderProps {
  children: ReactNode;
}

export const CommentsProvider: React.FC<CommentsProviderProps> = ({
  children,
}) => {
  // Existing point comments state
  const [comments, setComments] = useState<ChartComment[]>([]);

  // New zone comments state
  const [zoneComments, setZoneComments] = useState<ZoneComment[]>([]);

  // Shared highlighting system for both types
  const [highlightedCommentIds, setHighlightedCommentIds] = useState<string[]>(
    []
  );

  // Existing point comment functions
  const addComment = (comment: Omit<ChartComment, "id" | "timestamp">) => {
    const newComment: ChartComment = {
      ...comment,
      id: `point-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    setComments((prev) => [...prev, newComment]);

    // Auto-highlight new comments
    setHighlightedCommentIds((prev) => [...prev, newComment.id]);
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    setHighlightedCommentIds((prev) => prev.filter((id) => id !== commentId));
  };

  const getCommentsByChart = (chartId: string) => {
    return comments.filter((comment) => comment.chartId === chartId);
  };

  // New zone comment functions
  const addZoneComment = (comment: Omit<ZoneComment, "id" | "timestamp">) => {
    const newZoneComment: ZoneComment = {
      ...comment,
      id: `zone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    setZoneComments((prev) => [...prev, newZoneComment]);

    // Auto-highlight new zone comments
    setHighlightedCommentIds((prev) => [...prev, newZoneComment.id]);
  };

  const deleteZoneComment = (commentId: string) => {
    setZoneComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    );
    setHighlightedCommentIds((prev) => prev.filter((id) => id !== commentId));
  };

  const getZoneCommentsByChart = (chartId: string) => {
    return zoneComments.filter((comment) => comment.chartId === chartId);
  };

  // Existing highlighting functions (works for both types now)
  const toggleCommentHighlight = (commentId: string) => {
    setHighlightedCommentIds((prev) => {
      if (prev.includes(commentId)) {
        return prev.filter((id) => id !== commentId);
      } else {
        return [...prev, commentId];
      }
    });
  };

  // New zone-specific highlighting function (uses same system)
  const toggleZoneCommentHighlight = (commentId: string) => {
    toggleCommentHighlight(commentId); // Reuse existing function
  };

  const clearAllHighlights = () => {
    setHighlightedCommentIds([]);
  };

  const isCommentHighlighted = (commentId: string) => {
    return highlightedCommentIds.includes(commentId);
  };

  // New zone-specific highlighting check (uses same system)
  const isZoneCommentHighlighted = (commentId: string) => {
    return highlightedCommentIds.includes(commentId);
  };

  // Utility functions
  const getTotalComments = () => {
    return comments.length + zoneComments.length;
  };

  const getVisibleComments = () => {
    return highlightedCommentIds.filter(
      (id) =>
        comments.some((c) => c.id === id) ||
        zoneComments.some((c) => c.id === id)
    ).length;
  };

  const getCommentsByType = (type: "point" | "zone") => {
    return type === "point" ? comments : zoneComments;
  };

  // Legacy support - keep backward compatibility
  const setHighlightedCommentId = (commentId: string | null) => {
    if (commentId === null) {
      setHighlightedCommentIds([]);
    } else {
      setHighlightedCommentIds([commentId]);
    }
  };

  const highlightedCommentId =
    highlightedCommentIds.length > 0 ? highlightedCommentIds[0] : null;

  return (
    <CommentsContext.Provider
      value={{
        // Existing point comment functionality
        comments,
        addComment,
        deleteComment,
        getCommentsByChart,

        // Legacy compatibility
        highlightedCommentId,
        setHighlightedCommentId,

        // Enhanced highlighting system
        highlightedCommentIds,
        toggleCommentHighlight,
        clearAllHighlights,
        isCommentHighlighted,

        // New zone comment functionality
        zoneComments,
        addZoneComment,
        deleteZoneComment,
        getZoneCommentsByChart,
        toggleZoneCommentHighlight,
        isZoneCommentHighlighted,

        // Utility functions
        getTotalComments,
        getVisibleComments,
        getCommentsByType,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
