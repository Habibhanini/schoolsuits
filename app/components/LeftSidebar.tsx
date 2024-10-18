import Link from "next/link";
import LeftSideBarLinks from "./NavLinks/LeftSidebarLinks";
import Image from "next/image";

interface LeftSidebarProps {
  isOpen: boolean;
  toggleSidebar: any; // to track whether the sidebar is open or closed
}

// LeftSidebar component
const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white p-4  transition-all duration-200  ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Links and icons */}
      <div className="mt-12">
        <LeftSideBarLinks isOpen={isOpen} />
      </div>
      {/* Bottom images */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Link href="#">
          <Image
            src="/images/LogoSchoolSuite.png"
            alt="First Image"
            width={isOpen ? 20 : 20}
            height={isOpen ? 20 : 20}
            className={`translate-y-1 ${!isOpen && "ml-2"}`}
          />
        </Link>
        <Link href="#">
          <Image
            src="/images/SchoolSuite.png"
            alt="Second Image"
            width={isOpen ? 120 : 40}
            height={isOpen ? 60 : 40}
            className={`translate-y-1 ${!isOpen && "hidden"}`}
          />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
