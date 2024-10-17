import Link from "next/link";
import LeftSideBarLinks from "./NavLinks/LeftSidebarLinks"; // Ensure this path is correct
import Image from "next/image";

// Define the props interface
interface LeftSidebarProps {
  isOpen: boolean; // to track whether the sidebar is open or closed
  toggleSidebar: () => void; // function to toggle the sidebar
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white mt-14 p-4 transform transition-transform duration-400 ease-in-out ${
        isOpen ? "translate-x-0 lg:static" : "-translate-x-2/3"
      }`}
      onMouseEnter={toggleSidebar} // Open on hover
      onMouseLeave={toggleSidebar} // Close on mouse leave
    >
      <LeftSideBarLinks />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Link href="#">
          <Image
            src="/images/LogoSchoolSuite.png"
            alt="First Image"
            width={20}
            height={20}
            className="mr-4"
          />
        </Link>

        <Link href="#">
          <Image
            src="/images/SchoolSuite.png"
            alt="Second Image"
            width={120}
            height={60}
            className="translate-y-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
