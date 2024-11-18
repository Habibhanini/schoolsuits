import Image from "next/image";
import React from "react";
import { IoEllipsisHorizontal, IoEllipsisVertical } from "react-icons/io5";

const StudentFiles = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl p-4   w-full h-[200px] ml-auto">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-extrabold font-playfair">Notes</h2>
          <button>
            <IoEllipsisHorizontal className="w-6 h-6" />
          </button>
        </div>
        <ul className="mt-2 h-[130px] bg-gray-100 rounded-lg space-y-4 ">
          <li />
          <div className="space-y-4 p-2">
            <li className="flex justify-between border-b border-gray-300">
              <span className="font-bold text-sm">Note #1</span>
              <span className="font-semibold text-sm text-gray-400">
                By Coralie Johnson
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-300">
              <span className="font-bold text-sm ">Note #2</span>
              <span className="font-semibold text-sm text-gray-400">
                By Philip Way
              </span>
            </li>
            <li className="flex justify-between border-b border-gray-300">
              <span className="font-bold text-sm">Note #3</span>
              <span className="font-semibold text-sm text-gray-400">
                By Coralie Johnson
              </span>
            </li>
          </div>
        </ul>
      </div>
      <div className="bg-white rounded-3xl p-6 mt-2  max-w-full h-[190px] md:w-[350px]">
        <div className="flex justify-between items-center mb-2 mt-[-10px] ">
          <h2 className="text-lg font-extrabold font-playfair">Files</h2>
          <button>
            <IoEllipsisHorizontal className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-[#f2f7fd] p-2 h-32 w-36 rounded-lg relative">
            <p className="font-semibold text-sm">Passport</p>
            <div className="absolute top-2 right-0 text-lg">
              <button>
                <IoEllipsisVertical className="w-6 h-6" />
              </button>
            </div>
            <Image
              src="/images/SchoolSuite.png"
              alt="Passport"
              className="  object-cover  rounded-md pt-6"
              width={150}
              height={0}
            />
          </div>

          <div className="bg-[#f2f7fd] p-2 h-32 w-36  rounded-lg relative">
            <p className="font-semibold truncate text-sm">Birth Certificate</p>
            <div className="absolute top-2 right-0 text-lg">
              <button>
                <IoEllipsisVertical className="w-6 h-6" />
              </button>
            </div>
            <Image
              src="/images/SchoolSuite.png"
              alt="Birth Certificate"
              className="  object-cover rounded-md pt-6"
              width={150}
              height={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFiles;
