import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

const StudentContacts = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl  p-4 fhd:h-[350px] hd:h-full w-full ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-extrabold font-playfair">Contacts</h2>
          <button>
            <IoEllipsisHorizontal className="w-6 h-6" />
          </button>
        </div>
        <ul className="list-none space-y-1">
          <li className="flex justify-between">
            <span className="font-bold text-mini mb-4">
              Parents Salutations:
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Head of Year:</span>
            <span className="text-[#3f71fb] text-sm font-extrabold">
              Philip Way
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Tutor:</span>
            <span className="text-[#3f71fb] text-sm font-extrabold">
              Coralie Johnson
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Head of House:</span>
            <span className="text-[#3f71fb] text-sm font-extrabold">
              Martha Jenkins
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold text-mini my-4  ">Family:</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Mother:</span>
            <span className="text-[#3f71fb] font-extrabold text-sm">
              Diane Garza
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Father:</span>
            <span className="text-[#3f71fb] font-extrabold text-sm">
              Larry Bartley
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal text-sm">Sister:</span>
            <span className="text-[#3f71fb] font-extrabold text-sm">
              Irene Bartley
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentContacts;
