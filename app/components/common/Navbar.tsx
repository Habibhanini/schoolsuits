import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiIcon,
  NotifcationIcon,
  SafeGuardAlert,
  SafeGuardCheck,
} from "../../icons/SvgIcons";
import { BsArrowBarRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "@/app/store/userSlice"; // Import your logout action
import { useRouter } from "next/navigation";
import TimeBar from "./TimeBar";
import { CgChevronRight } from "react-icons/cg";
interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void; // Function to toggle sidebar
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const totalTime = 1; // Total time in minutes
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSafeguarding, setIsSafeguarding] = useState(false);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);
  const [isStartClassEnabled, setIsStartClassEnabled] = useState(false); // New state to control Start Class visibility
  const [showFinishOptions, setShowFinishOptions] = useState(false);
  const [isTimerBarVisible, setIsTimerBarVisible] = useState(false);
  const handleClick = () => {
    setIsSafeguarding(!isSafeguarding);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/signin");
  };

  const handleStartRegister = () => {
    setIsRegisterDisabled(true); // Disable the Start Register button
    setIsStartClassEnabled(true); // Enable the Start Class button
  };

  const handleStartClass = () => {
    setIsStartClassEnabled(false); // Hide Start Class button
    setShowFinishOptions(false); // Ensure finish options are hidden initially
    setTimeLeft(totalTime); // Reset the timer
    setIsTimerBarVisible(true); // Show the TimerBar

    // Start the timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(interval); // Stop timer when it reaches 0
          setShowFinishOptions(true); // Show Finish Options
          return 0;
        }
      });
    }, 60000); // Decrease time every 1 minute
  };

  const handleFinishNow = () => {
    setIsRegisterDisabled(false); // Re-enable Start Register
    setIsStartClassEnabled(false); // Reset Start Class button visibility
    setShowFinishOptions(false); // Hide Finish Options
    setIsTimerBarVisible(false);
    setTimeLeft(totalTime); // Reset the timer
  };

  return (
    <div className="navbar bg-white px-6 flex items-center">
      {/* Sidebar toggle button */}
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

      <div className=" navbar-start  space-x-4">
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
        <button
          onClick={handleStartRegister}
          disabled={isRegisterDisabled}
          className={`btn bg-white shadow-lg rounded-xl border-gray-200 font-jakarta ${
            isRegisterDisabled
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-100 hover:text-[#F1B528] text-[#F1B528]"
          }`}
        >
          Start Register <CgChevronRight className="ml-2 h-5 w-5" />
        </button>

        {/* Start Class Button */}
        {isStartClassEnabled && (
          <button
            onClick={handleStartClass}
            className="btn bg-white shadow-lg rounded-xl border-gray-200 hover:bg-gray-100 hover:text-[#F1B528] text-[#F1B528] font-jakarta"
          >
            Start Class <CgChevronRight className="ml-2 h-5 w-5" />
          </button>
        )}

        {/* Timer Bar */}
        {isTimerBarVisible && (
          <div className="w-64">
            <TimeBar
              totalTime={totalTime}
              timeLeft={timeLeft}
              unitName="Unit 6.4"
            />
          </div>
        )}

        {/* Finish Options */}
        {showFinishOptions && (
          <>
            <button className="btn bg-white shadow-lg rounded-xl border-gray-200 hover:bg-gray-100 text-black font-jakarta">
              Give HMW <AiIcon className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={handleFinishNow}
              className="text-black font-jakarta text-sm w-24"
            >
              Or finish Now
            </button>
          </>
        )}
      </div>

      {/* Other Navbar Elements */}
      <div className="navbar-end flex items-center space-x-4">
        <NotifcationIcon />
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
                  href="#"
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
