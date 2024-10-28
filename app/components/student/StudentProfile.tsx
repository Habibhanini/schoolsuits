import Image from "next/image";
import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
const StudentProfile = () => {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-md h-[420px]  ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">Profile</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <Image
          src="/images/avatar.png"
          alt="Jen Bartley"
          className="w-20 h-20 rounded-box object-cover"
          width={100}
          height={80}
        />

        {/* Student Details */}
        <div>
          <h2 className="text-xl font-bold">Jen Bartley</h2>
          <p className="text-gray-500 font-jakarta font-semibold">
            @JenBartley0132
          </p>
          <p className="text-black font-jakarta font-bold">
            <span>Age:</span> 16
          </p>
          <p className="text-gray-500 font-jakarta font-semibold">
            People premium -{" "}
            <span className="text-gray-900 font-jakarta font-bold">
              Refugee
            </span>
          </p>
          <p className="text-gray-500 font-jakarta font-semibold">
            Photo permission:{" "}
            <span className="text-gray-900 font-jakarta font-bold">
              Granted
            </span>
          </p>
        </div>
      </div>

      {/* Family Situations Section */}
      <div className="flex justify-between mt-4 space-x-2">
        {/* FAMILY SITUATIONS Section */}
        <div className="w-1/2 h-full">
          <h3 className="text-lg font-semibold">FAMILY SITUATIONS</h3>
          <div className="mt-2 h-full bg-gray-100 rounded-lg ">
            <div className="space-y-4">
              <div className="pt-1 rounded-lg" />
              <div className=" border-b px-2 font-semibold border-gray-300">
                Shared custody
              </div>
              <div className="border-b px-2  font-semibold border-gray-300 ">
                Deceased Brother
              </div>
              <div className="p-7 rounded-lg" />
            </div>
          </div>
        </div>

        {/* SEND Section */}
        <div className="w-1/2">
          <h3 className="text-lg font-semibold">SEND</h3>
          <div className="flex space-x-2 mt-2 pr-2">
            {/* Tags */}
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
              Dyslexic
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
              Dyspraxic
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
              ADHD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
