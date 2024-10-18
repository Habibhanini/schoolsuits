import LeftSideBarLinks from "./NavLinks/LeftSidebarLinks";
import Image from "next/image";

interface LeftSidebarProps {
  isOpen: boolean;
  handleLinkClick: (content: string) => void;
}

// LeftSidebar component
const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isOpen,
  handleLinkClick,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white p-4 transition-all duration-200 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Links and icons */}
      <div className="mt-12">
        <LeftSideBarLinks isOpen={isOpen} onLinkClick={handleLinkClick} />
      </div>
      {/* Bottom images */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <Image
          src="/images/LogoSchoolSuite.png"
          alt="First Image"
          width={0}
          height={0}
          className={` ${isOpen && "mr-[60px]"} ${!isOpen && "ml-2"}`}
          style={{ width: "20px", height: "auto" }}
        />
        <Image
          src="/images/SchoolSuite.png"
          alt="Second Image"
          width={isOpen ? 140 : 40}
          height={isOpen ? 80 : 40}
          className={`translate-y-1 ml-[-24px]  ${!isOpen && "hidden"}`}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
