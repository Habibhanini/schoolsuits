import React from "react";

const InternCommunications = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 w-full max-w-3xl mx-auto h-[390px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">
          Intern communications about this student
        </h2>
        <button
          // Open the modal
          className="bg-[#3f71fb] text-white rounded-lg py-1 px-4 text-sm font-bold hover:bg-school-blue-dark"
        >
          Write a thread
        </button>
      </div>

      {/* Communication Card */}
      <div className="flex items-start space-x-4  p-4 border-b-2  ">
        {/* Profile image */}

        <div className="flex-shrink-0 ">
          <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
            {/* Placeholder for profile image */}
          </div>
        </div>

        {/* Message details */}
        <div>
          <div className="text-gray-500 text-xs flex items-center space-x-2 ">
            <p className="font-semibold text-blue-600 text-sm">
              Coralie Johnson
            </p>{" "}
            <span>08:50AM – 04/09/2024</span>
          </div>
          <p className="text-black font-semibold text-sm">Tutor</p>
          <p className="text-gray-600 mt-1 text-sm">Sophie her PE Kit today</p>
        </div>
      </div>
    </div>
  );
};

export default InternCommunications;
