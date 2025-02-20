import React from "react";

const Comments: React.FC = () => {
  return (
    <div className=" w-full  h-[800px]  rounded-md bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">Comments</h2>
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

      {/* List of comments */}
      <div className="space-y-3">
        {/* Comment 1 */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/avatar.png"
            alt="User 1"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Last name</p>
            <p className="flex items-center text-xs text-gray-500">
              {/* Small colored dot */}
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-blue-500" />
              leaved a comment
            </p>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="flex items-center space-x-3">
          <img
            src="/images/avatar.png"
            alt="User 2"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">Last name</p>
            <p className="flex items-center text-xs text-gray-500">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-yellow-500" />
              added a note
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
