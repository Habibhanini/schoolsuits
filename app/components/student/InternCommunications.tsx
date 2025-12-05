import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { HiPlus } from "react-icons/hi2";
import { IoIosAttach } from "react-icons/io";

const InternCommunications = () => {
  return (
    <div className="bg-white rounded-3xl p-4 mx-auto h-full w-full fhd:mr-0 lg:mr-1 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold font-playfair">
            Intern communications about this student
          </h2>
        </div>

        {/* Communication Card */}
        <div className="flex items-start space-x-4 p-4">
          {/* Profile image */}
          <div className="flex-shrink-0">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center"></div>
          </div>

          <div>
            <div className="text-gray-500 text-xs flex items-center space-x-2">
              <p className="font-semibold text-blue-600 text-mini">
                Coralie Johnson
              </p>{" "}
              <span>08:50AM – 04/09/2024</span>
            </div>
            <p className="text-black font-semibold text-sm">Tutor</p>
            <p className="text-gray-600 mt-1 text-mini">
              Sophie her PE Kit today
            </p>
          </div>
        </div>
      </div>

      {/* Message Input Section */}
      <div className="flex items-center bg-whitesmoke-200 rounded-xl p-2 shadow-sm">
        {/* Left Icons */}
        <div className="flex items-center space-x-2 ml-2">
          <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow hover:bg-gray-200">
            <HiPlus className="w-6 h-6  text-gray-500" />
          </button>

          <FaRegSmile className="w-6 h-6 cursor-pointer hover:text-gray-700" />

          <IoIosAttach className="w-6 h-6 cursor-pointer hover:text-gray-700" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 bg-whitesmoke-200 outline-none px-4 h-14 text-sm placeholder-gray-500"
        />

        {/* Send Button */}
        <button className="ml-2 bg-blue-500 text-white text-mini font-bold py-2 px-4 rounded-md hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default InternCommunications;
