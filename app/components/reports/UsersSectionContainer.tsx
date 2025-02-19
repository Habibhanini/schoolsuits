import React from "react";
import SharedUsers from "./SharedUsers";
import Comments from "./Comments";

const UsersSectionContainer = () => {
  return (
    <div className="flex flex-col gap-4   h-auto">
      <SharedUsers />
      <Comments />
    </div>
  );
};

export default UsersSectionContainer;
