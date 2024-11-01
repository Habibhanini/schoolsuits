import Image from "next/image";
import React from "react";
import { IoEllipsisHorizontal, IoEllipsisVertical } from "react-icons/io5";

const StudentFiles = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl p-4  max-w-[400px] h-[205px] md:w-[350px]">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-extrabold font-playfair">Files</h2>
          <button>
            <IoEllipsisHorizontal className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-[#f2f7fd] p-2 h-32 w-36 rounded-lg relative">
            <p className="font-semibold">Passport</p>
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

          <div className="bg-[#f2f7fd] p-2 h-32 w-36 rounded-lg relative">
            <p className="font-semibold truncate">Birth Certificate</p>
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
