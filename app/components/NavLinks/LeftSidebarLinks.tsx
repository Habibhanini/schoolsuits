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

const LeftSideBarLinks = () => {
  const [activeLink, setActiveLink] = useState("");

  const links = [
    {
      name: "Dashboard",
      href: "#",
      icon: (
        <DashboardIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Dashboard" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Schedule",
      href: "#",
      icon: (
        <ScheduleIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Schedule" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Lessons",
      href: "#",
      icon: (
        <LessonsIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Lessons" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Students",
      href: "#",
      icon: (
        <StudentsIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Students" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Classes",
      href: "#",
      icon: (
        <ClassesIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Classes" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Messages",
      href: "#",
      icon: (
        <MessagesIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Messages" ? "fill-white" : "fill-gray-500"
          }`}
        />
      ),
    },
    {
      name: "Documents",
      href: "#",
      icon: (
        <DocumentsIcon
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "Documents" ? "fill-white" : "fill-gray-500"
          }`}
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
          className={`mr-[-26px] ml-[-10px] ${
            activeLink === "No class in progress" ? "fill-white" : ""
          }`}
        />
        No class in progress
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
            <span className="mr-2">{link.icon}</span>
            {link.name}
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
          }`}
        />
        Help and FAQ
      </Link>
    </ul>
  );
};

export default LeftSideBarLinks;
