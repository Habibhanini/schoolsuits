"use client";
export default function Messages() {
  return (
    <div className="flex items-center justify-center h-full min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Work in Progress
        </h1>
        <p className="text-gray-600">This page is still in the works</p>
      </div>
    </div>
  );
}
