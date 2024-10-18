import Link from "next/link";
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
}

const LeftSideBarLinks: React.FC<LeftSideBarLinksProps> = ({ isOpen }) => {
  const [activeLink, setActiveLink] = useState("");

  const links = [
    {
      name: "Dashboard",
      href: "#",
      icon: (
        <DashboardIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Schedule",
      href: "#",
      icon: (
        <ScheduleIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Lessons",
      href: "#",
      icon: (
        <LessonsIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Students",
      href: "#",
      icon: (
        <StudentsIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Classes",
      href: "#",
      icon: (
        <ClassesIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Messages",
      href: "#",
      icon: (
        <MessagesIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
    {
      name: "Documents",
      href: "#",
      icon: (
        <DocumentsIcon
          className={`
          ${activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"} 
          ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-2"}
        `}
        />
      ),
    },
  ];

  const handleClick = (name: string) => {
    setActiveLink(name);
  };

  return (
    <ul className="space-y-2">
      <Link
        href="#"
        className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold 
                  ${
                    activeLink === "No class in progress"
                      ? "bg-[#F1B528] text-white"
                      : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"
                  }`}
        onClick={() => handleClick("No class in progress")}
      >
        <ProgressIcon
          className={`            
            ${activeLink === "No class in progress" ? "fill-white" : ""}
            ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-[-16px]"}`}
        />

        {isOpen && <span>No class in progress </span>}
      </Link>

      <div className="w-full h-[1px] bg-gray-300 "></div>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold ${
              activeLink === link.name
                ? "bg-[#F1B528] text-white"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
            }`}
            onClick={() => handleClick(link.name)}
          >
            {/* Icon */}
            <span className={`mr-2 ${!isOpen && "mx-auto ml-[-8px]"}`}>
              {link.icon}
            </span>

            {/* Text, hidden when collapsed */}
            {isOpen && <span>{link.name}</span>}
          </Link>
        </li>
      ))}
      <div className="w-full h-[1px] bg-gray-300 "></div>
      <Link
        href="#"
        className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold 
            ${
              activeLink === "Help and FAQ"
                ? "bg-[#B3C6E3] text-white"
                : "text-[#97A3B6] hover:bg-gray-300 hover:text-gray-800"
            }`}
        onClick={() => handleClick("Help and FAQ")}
      >
        <FaQIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Help and FAQ" ? "fill-white" : "fill-[#97A3B6]"
          }
            ${isOpen ? "mr-[-26px] ml-[-10px]" : "ml-[-8px]"}`}
        />
        {isOpen && <span> Help and FAQ</span>}
      </Link>
    </ul>
  );
};

export default LeftSideBarLinks;
