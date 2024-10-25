import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import DietaryNeeds from "./DietaryNeeds";
import { IoEllipsisHorizontal } from "react-icons/io5";

const StudentContacts = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl shadow p-4 h-[350px] w-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold font-playfair">Contacts</h2>
          <button>
            <IoEllipsisHorizontal className="w-6 h-6" />
          </button>
        </div>
        <ul className="list-none space-y-1">
          <li className="flex justify-between">
            <span className="font-bold text-lg mb-4">Parents Salutations:</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Head of Year:</span>
            <span className="text-[#3f71fb] font-extrabold">Philip Way</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Tutor:</span>
            <span className="text-[#3f71fb] font-extrabold">
              Coralie Johnson
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Head of House:</span>
            <span className="text-[#3f71fb] font-extrabold">
              Martha Jenkins
            </span>
          </li>
          <li className="flex justify-between">
            <span className="font-bold text-lg my-4 ">Family:</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Mother:</span>
            <span className="text-[#3f71fb] font-extrabold">Diane Garza</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Father:</span>
            <span className="text-[#3f71fb] font-extrabold">Larry Bartley</span>
          </li>
          <li className="flex justify-between">
            <span className="font-normal">Sister:</span>
            <span className="text-[#3f71fb] font-extrabold">Irene Bartley</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentContacts;
