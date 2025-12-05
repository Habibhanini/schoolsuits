import Image from "next/image";
import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useState, useEffect } from "react";
const StudentProfile = () => {
  const [, setIsShortScreen] = useState(false);
  useEffect(() => {
    // Function to check screen height
    const checkScreenHeight = () => {
      setIsShortScreen(window.innerHeight <= 768);
    };

    // Initial check and event listener
    checkScreenHeight();
    window.addEventListener("resize", checkScreenHeight);

    return () => window.removeEventListener("resize", checkScreenHeight);
  }, []);
  return (
    <div className="bg-white rounded-3xl  p-4 h-[410px]  w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold font-playfair">Profile</h2>
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
          <h2 className="text-mini font-bold">Jen Bartley</h2>
          <p className="text-gray-500 text-sm font-jakarta font-semibold">
            @JenBartley0132
          </p>
          <p className="text-black font-jakarta font-bold text-sm">
            <span>Age:</span> 16
          </p>
          <p className="text-gray-500 font-jakarta font-semibold text-sm">
            People premium -{" "}
            <span className="text-gray-900 font-jakarta font-bold text-sm">
              Refugee
            </span>
          </p>
          <p className="text-gray-500 font-jakarta font-semibold text-sm">
            Photo permission:{" "}
            <span className="text-gray-900 font-jakarta font-bold text-sm">
              Granted
            </span>
          </p>
        </div>
      </div>

      {/* Family Situations Section */}
      <div className="flex justify-between mt-4 space-x-2">
        {/* FAMILY SITUATIONS Section */}
        <div className="w-1/2 h-full ">
          <div className=" w-full max-w-xs">
            <h3 className="text-mini font-bold font-jakarta  2xl:whitespace-normal">
              FAMILY SITUATIONS
            </h3>
          </div>

          <div
            className={`rounded-xl bg-whitesmoke-100 overflow-hidden flex flex-col items-start justify-start pt-0 px-[5px] pb-[105.2px] leading-[normal] tracking-[normal] text-left text-xs text-black font-jakarta `}
          >
            <div className="self-stretch border-gainsboro-300 border-b-[1px] border-solid overflow-hidden flex flex-row items-start justify-start py-2.5 pl-0 pr-[30px]">
              <div className="flex-1 relative text-sm font-semibold font-jakarta">
                Shared custory
              </div>
            </div>
            <div className="self-stretch border-gainsboro-300 border-b-[1px] border-solid overflow-hidden flex flex-row items-start justify-start py-2.5 pl-0 pr-[30px]">
              <div className="flex-1 relative text-sm font-semibold font-jakarta">
                Deceased Brother
              </div>
            </div>
          </div>
        </div>

        {/* SEND Section */}
        <div className="w-1/2">
          <h3 className="text-mini font-jakarta font-bold">SEND</h3>
          <div className="flex flex-wrap gap-2 mt-2 pr-2">
            {/* Tags */}
            <span className="px-3 py-1 bg-gray-100 text-gray-500 font-jakarta rounded-full font-semibold text-smi">
              Dyslexic
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 font-jakarta rounded-full font-semibold text-smi">
              Dyspraxic
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 font-jakarta rounded-full font-semibold text-smi">
              ADHD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
