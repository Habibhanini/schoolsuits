import React from "react";
import LeftSideBarLinks from "../NavLinks/LeftSidebarLinks";
import Image from "next/image";

interface LeftSidebarProps {
  isOpen: boolean;
  // Remove handleLinkClick since we're using Next.js routing now
}

// LeftSidebar component
const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white p-4 transition-all duration-200 z-50 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Links and icons */}
      <div className="mt-12">
        <LeftSideBarLinks isOpen={isOpen} />
      </div>

      {/* Bottom images */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Image
          src="/images/LogoSchoolSuite.png"
          alt="First Image"
          width={0}
          height={0}
          className={`${isOpen ? "mr-[1.25rem]" : "ml-2"}`}
          style={{ width: "1.25rem", height: "auto" }}
        />
        <Image
          src="/images/SchoolSuite.png"
          alt="Second Image"
          width={120}
          height={0}
          className={`${!isOpen ? "hidden" : "ml-[-1.25rem] mt-[-0.3125rem]"}`}
          style={{ width: "8.75rem", height: "1.25rem" }}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
