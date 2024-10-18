"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <LeftSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <div
        className={`flex-1 flex flex-col ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Pass toggleSidebar to Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <div className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
