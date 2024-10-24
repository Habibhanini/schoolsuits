import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import DietaryNeeds from "./DietaryNeeds";

const StudentContacts = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 h-[350px]">
        <h2 className="text-lg font-bold">Contacts</h2>
        <ul>
          <li>
            <strong>Parents Salutations</strong>
          </li>
          <li>Head of year: Philip Way</li>
          <li>Tutor: Coralie Johnson</li>
          <li>Head of house: Martha Jenkins</li>
          <li>
            <strong>Family</strong>
          </li>
          <li>Mother: Diane Garza</li>
          <li>Father: Larry Bartley</li>
          <li>Sister: Irene Bartley</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentContacts;
