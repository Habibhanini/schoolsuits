import React, { useCallback, useState } from "react";
import { CommentsProvider } from "../components/reports/CommentsContext";
import ChartsContainer from "../components/reports/ChartsContainer";
import SharedUsers from "../components/reports/SharedUsers";
import Comments from "../components/reports/Comments";

const Reports = () => {
  const [scrollFunction, setScrollFunction] = useState<
    ((chartId: string) => void) | null
  >(null);

  const handleScrollToChart = useCallback(
    (scrollFn: (chartId: string) => void) => {
      setScrollFunction(() => scrollFn);
    },
    []
  );

  return (
    <CommentsProvider>
      <div className="flex w-full gap-4 p-1">
        <div className="flex-1">
          <ChartsContainer onScrollToChart={handleScrollToChart} />
        </div>
        <div className="w-[250px]">
          <div className="flex flex-col gap-4 h-auto">
            <SharedUsers />
            <Comments onCommentClick={scrollFunction || (() => {})} />
          </div>
        </div>
      </div>
    </CommentsProvider>
  );
};

export default Reports;
