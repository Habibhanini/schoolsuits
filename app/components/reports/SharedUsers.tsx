import React from "react";
import Comments from "./Comments";

const SharedUsers: React.FC = () => {
  return (
    <div className="w-full   max-h-[171px] rounded-md bg-white p-4 shadow-sm ">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Shared users</h2>
        <button className="text-gray-400 hover:text-gray-600">
          {/* Three-dot "kebab" icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
          </svg>
        </button>
      </div>

      {/* List of shared users */}
      <div className="space-y-3">
        {/* User 1 */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/avatar.png"
            alt="User 1"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Last name</p>
            <p className="text-xs text-gray-500">Firstname</p>
          </div>
        </div>

        {/* User 2 */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/avatar.png"
            alt="User 2"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Last name</p>
            <p className="text-xs text-gray-500">Firstname</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedUsers;
