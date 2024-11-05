import { useState } from "react";
import {
  DashboardIcon,
  ScheduleIcon,
  LessonsIcon,
  StudentsIcon,
  ClassesIcon,
  MessagesIcon,
  DocumentsIcon,
  ProgressIcon,
  FaQIcon,
} from "@/app/icons/SvgIcons";

interface LeftSideBarLinksProps {
  isOpen: boolean; // Prop to determine if sidebar is open or closed
  onLinkClick: (content: string) => void;
}

const LeftSideBarLinks: React.FC<LeftSideBarLinksProps> = ({
  isOpen,
  onLinkClick,
}) => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const links = [
    {
      name: "Dashboard",

      icon: (isActive: boolean) => (
        <DashboardIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Schedule",
      icon: (isActive: boolean) => (
        <ScheduleIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Lessons",

      icon: (isActive: boolean) => (
        <LessonsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Students",

      icon: (isActive: boolean) => (
        <StudentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Users",

      icon: (isActive: boolean) => (
        <StudentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Classes",

      icon: (isActive: boolean) => (
        <ClassesIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Messages",

      icon: (isActive: boolean) => (
        <MessagesIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Documents",

      icon: (isActive: boolean) => (
        <DocumentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"
          }`}
        />
      ),
    },
  ];

  const handleClick = (name: string) => {
    setActiveLink(name);
    onLinkClick(name);
  };

  return (
    <ul className="space-y-2">
      <li
        className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold ${
          activeLink === "Progress"
            ? "bg-[#F1B528] text-white"
            : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"
        }`}
        onClick={() => handleClick("Progress")} // Update activeLink to match the label
        style={{ cursor: "pointer" }}
      >
        <ProgressIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Progress" ? "fill-white" : ""
          } ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-[-16px]"}`}
        />
        {isOpen && <span className="font-jakarta">No class in progress</span>}
      </li>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {links.map((link) => (
        <li key={link.name}>
          <div
            className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold ${
              activeLink === link.name
                ? "bg-[#F1B528] text-white"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            }`}
            onClick={() => handleClick(link.name)}
            style={{ cursor: "pointer" }} // Add this line
          >
            <span className={`mr-2 ${!isOpen && "mx-auto ml-[-8px]"}`}>
              {link.icon(activeLink === link.name)}
            </span>
            {isOpen && <span className="font-jakarta">{link.name}</span>}
          </div>
        </li>
      ))}

      <div className="w-full h-[1px] bg-gray-300"></div>

      <li
        className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold ${
          activeLink === "Help"
            ? "bg-[#B3C6E3] text-white"
            : "text-[#97A3B6] hover:bg-gray-300 hover:text-gray-800"
        }`}
        onClick={() => handleClick("Help")}
        style={{ cursor: "pointer" }} // Add this line
      >
        <FaQIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Help" ? "fill-white" : "fill-[#97A3B6]"
          } ${isOpen ? "mr-[-26px] ml-[-10px]" : "ml-[-8px]"}`}
        />
        {isOpen && <span className="font-jakarta">Help and FAQ</span>}
      </li>
    </ul>
  );
};

export default LeftSideBarLinks;
