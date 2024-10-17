"use client"; // Ensure you have this directive for client-side components
import { useState } from "react"; // Import useState
import Navbar from "../components/Navbar"; // Ensure this path is correct
import LeftSidebar from "../components/LeftSidebar"; // Ensure this path is correct
import RightSidebar from "../components/RightSidebar"; // Ensure this path is correct

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Right Section: Navbar on top and content below */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top right */}
        <div className="flex justify-between">
          <div className="flex-1"></div> {/* Empty space on the left */}
          <Navbar />
        </div>
        {/* Main content area below the navbar */}
        <div className="flex-1 p-6 bg-gray-100">
          <div className={`${isSidebarOpen ? "ml-0" : "ml-20"}`}>
            <h1 className="text-2xl font-bold">Dashboard Content</h1>
            <p>Welcome to your dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
