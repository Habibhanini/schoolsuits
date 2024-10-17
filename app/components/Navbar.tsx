import Image from "next/image";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { SafeGuardAlert, SafeGuardCheck } from "../icons/SvgIcons";
import Link from "next/link";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isSafeguarding, setIsSafeguarding] = useState(false);

  const handleClick = () => {
    setIsSafeguarding(!isSafeguarding); // Toggle the state
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-white shadow-lg px-6">
      <div className="navbar-start">
        <div className="relative">
          <input
            type="text"
            className="input input-bordered rounded-xl pl-4 pr-10 py-2 bg-gray-100"
            placeholder="Search a student ..."
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <IoSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex-grow flex justify-center font-bold">
        <span className="text-black">Notification</span>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <button
          onClick={handleClick}
          className={`btn flex rounded-xl text-lg items-center transition-colors duration-300 ${
            isSafeguarding
              ? "bg-safeguard-red text-white hover:bg-safeguard-red-dark"
              : "bg-safeguard-orange text-white hover:bg-safeguard-orange-dark"
          }`}
        >
          {isSafeguarding ? (
            <>
              <SafeGuardCheck className="mr-2 h-5 w-5" />
              Safeguarding
            </>
          ) : (
            <>
              <SafeGuardAlert className="mr-2 h-5 w-5" />
              Safeguard
            </>
          )}
        </button>

        {/* Vertical splitter */}
        <div className="border-l-2 border-gray-300 h-8"></div>

        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={toggleDropdown}
          >
            <Image
              src="/images/avatar.png"
              alt="Avatar"
              className="rounded-full"
              width={40}
              height={40}
            />
            <IoIosArrowDown className="h-6 w-6 text-black" />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
              <Link
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
