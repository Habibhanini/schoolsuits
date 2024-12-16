import React, { useState } from "react";

const Staff: React.FC = () => {
  const [staffList, setStaffList] = useState<
    {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      isDisabled: boolean;
    }[]
  >([
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      role: "Head Teacher",
      isDisabled: true,
    },
  ]);

  const [roles, setRoles] = useState<string[]>(["Head Teacher", "Assistant"]); // Default roles
  const [newRole, setNewRole] = useState<string>(""); // Input for new role
  const [showRolePopup, setShowRolePopup] = useState<boolean>(false); // Toggle popup visibility

  // Handle input change dynamically
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedStaffList = [...staffList];
    updatedStaffList[index] = { ...updatedStaffList[index], [field]: value };
    setStaffList(updatedStaffList);
  };

  // Add new staff member
  const handleAddMember = () => {
    setStaffList([
      ...staffList,
      {
        firstName: "",
        lastName: "",
        email: "",
        role: "Head Teacher",
        isDisabled: false,
      },
    ]);
  };

  // Add a new role to the list
  const handleAddRole = () => {
    if (newRole.trim() && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole("");
      setShowRolePopup(false);
    }
  };

  return (
    <div className="p-6 bg-white relative">
      <h2 className="text-xl font-semibold mb-4">About your staff</h2>

      {/* Staff Forms */}
      <div className="space-y-4">
        {staffList.map((staff, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="First Name"
              value={staff.firstName}
              onChange={(e) =>
                handleInputChange(index, "firstName", e.target.value)
              }
              className="border p-2 rounded-xl w-[15%]"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={staff.lastName}
              onChange={(e) =>
                handleInputChange(index, "lastName", e.target.value)
              }
              className="border p-2 rounded-xl w-[15%]"
            />
            <input
              type="email"
              placeholder="Mail Address"
              value={staff.email}
              disabled={staff.isDisabled}
              onChange={(e) =>
                handleInputChange(index, "email", e.target.value)
              }
              className={`border p-2 rounded-xl w-[30%] ${
                staff.isDisabled
                  ? "bg-gray-200 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
            <select
              value={staff.role}
              onChange={(e) => handleInputChange(index, "role", e.target.value)}
              className="border p-2 rounded-xl w-[20%]"
            >
              {roles.map((role, i) => (
                <option key={i} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowRolePopup(true)}
              className="text-blue-500 hover:underline"
            >
              + Add another role
            </button>
          </div>
        ))}
      </div>

      {/* Add New Member Button */}
      <button
        onClick={handleAddMember}
        className="w-48 py-3 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500 mt-6"
      >
        Add a new member
      </button>

      {/* Add Role Popup */}
      {showRolePopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
            <input
              type="text"
              placeholder="Enter new role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border p-2 rounded-xl w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowRolePopup(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="px-4 py-2 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
