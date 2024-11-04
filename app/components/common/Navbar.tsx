import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { SafeGuardAlert, SafeGuardCheck } from "../../icons/SvgIcons";
import { BsArrowBarRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/userSlice"; // Import your logout action
import { useRouter } from "next/navigation";
interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void; // Function to toggle sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter(); // For navigation after logout

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSafeguarding, setIsSafeguarding] = useState(false);

  const handleClick = () => {
    setIsSafeguarding(!isSafeguarding);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to update state
    router.push("/auth/signin"); // Redirect to the login page after logout
  };

  return (
    <div className="navbar bg-white  px-6 flex items-center">
      {/* Sidebar toggle button
      <button
        onClick={toggleSidebar}
        className="p-2 mr-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
      >
        {isOpen ? (
          <BsArrowBarLeft className="h-[24px] w-[24px] transition-transform duration-200 transform " />
        ) : (
          <BsArrowBarRight className="h-[24px] w-[24px] transition-transform duration-200" />
        )}
      </button>
    */}
      <button
        onClick={toggleSidebar}
        className="p-2 mr-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
      >
        <div
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <BsArrowBarRight className="h-[20px] w-[20px]" />
        </div>
      </button>

      <div className="navbar-start flex-grow">
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

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-20">
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
              <div onClick={handleLogout}>
                <Link
                  href="#" // Link to sign-in page
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
