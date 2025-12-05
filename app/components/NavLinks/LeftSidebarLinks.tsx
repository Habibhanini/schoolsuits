"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  isOpen: boolean;
}

const LeftSideBarLinks: React.FC<LeftSideBarLinksProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Update active link based on current pathname
  useEffect(() => {
    if (pathname === "/dashboard") {
      setActiveLink("Dashboard");
    } else if (pathname.includes("/dashboard/")) {
      const routeName = pathname.split("/dashboard/")[1];
      // Capitalize first letter to match link names
      const linkName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
      setActiveLink(linkName);
    }
  }, [pathname]);

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (isActive: boolean) => (
        <DashboardIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? " m-2   " : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: (isActive: boolean) => (
        <ScheduleIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Lessons",
      href: "/dashboard/lessons",
      icon: (isActive: boolean) => (
        <LessonsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2 mr-4" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: (isActive: boolean) => (
        <StudentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Students",
      href: "/dashboard/students",
      icon: (isActive: boolean) => (
        <StudentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: (isActive: boolean) => (
        <StudentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Classes",
      href: "/dashboard/classes",
      icon: (isActive: boolean) => (
        <ClassesIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: (isActive: boolean) => (
        <MessagesIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
    {
      name: "Documents",
      href: "/dashboard/documents",
      icon: (isActive: boolean) => (
        <DocumentsIcon
          className={`${isActive ? "fill-white" : "fill-gray-500"} ${
            isOpen ? "m-2" : "mr-2"
          }`}
        />
      ),
    },
  ];

  return (
    <ul className="space-y-2">
      {/* Progress Section - Navigate to /dashboard/progress */}
      <li>
        <Link href="/dashboard/progress">
          <div
            className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold text-sm ${
              activeLink === "Progress"
                ? "bg-[#F1B528] text-white"
                : "text-gray-500 hover:bg-gray-300 hover:text-gray-800"
            }`}
            style={{ cursor: "pointer" }}
          >
            <ProgressIcon
              className={`mr-[-26px] ml-[-10px] ${
                activeLink === "Progress" ? "fill-white" : ""
              } ${isOpen ? "mr-[-26px] ml-[-10px]" : "mr-[-16px]"}`}
            />
            {isOpen && (
              <span className="font-jakarta">No class in progress</span>
            )}
          </div>
        </Link>
      </li>

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Navigation Links */}
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href}>
            <div
              className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold text-sm ${
                activeLink === link.name
                  ? "bg-[#F1B528] text-white"
                  : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
              }`}
              style={{ cursor: "pointer" }}
            >
              <span className={` ${!isOpen && "mx-auto m-2"}`}>
                {link.icon(activeLink === link.name)}
              </span>
              {isOpen && <span className="font-jakarta">{link.name}</span>}
            </div>
          </Link>
        </li>
      ))}

      <div className="w-full h-[1px] bg-gray-300"></div>

      {/* Help Section - Keep as non-navigational */}
      <li
        className={`flex items-center p-1 rounded-xl transition duration-200 mb-2 font-bold text-sm ${
          activeLink === "Help"
            ? "bg-[#B3C6E3] text-white"
            : "text-[#97A3B6] hover:bg-gray-300 hover:text-gray-800"
        }`}
        onClick={() => setActiveLink("Help")}
        style={{ cursor: "pointer" }}
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
