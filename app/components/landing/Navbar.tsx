import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4  ">
      <div className="flex items-center space-x-4">
        <Image
          src="/images/LogoSchoolSuite.png"
          alt="Logo"
          width={0}
          height={0}
          className="w-[20px] h-auto"
        />
        <Image
          src="/images/SchoolSuite.png"
          alt="Logo"
          width={0}
          height={0}
          className="w-[140px] h-auto"
        />
      </div>
      <div className="flex space-x-6">
        <a href="#" className="text-gray-600 hover:text-blue-600">
          How it works
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Resources
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Pricing
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Company
        </a>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Login/Register
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600">
          Talk to Sales
        </a>
        <button className="btn btn-primary btn-sm rounded-full bg-blue-500 text-white hover:bg-blue-600">
          Request Demo
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
