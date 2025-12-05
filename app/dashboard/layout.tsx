// dashboard/layout.tsx
"use client";
import { useState } from "react";
import LeftSidebar from "../components/common/LeftSidebar";
import Navbar from "../components/common/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen overflow-hidden">
      {" "}
      {/* Prevent page-level scroll */}
      <LeftSidebar isOpen={isSidebarOpen} />
      {/* Main content area with proper margin */}
      <div className={`h-full ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Fixed navbar */}
        <div className="sticky top-0 z-40 bg-white border-b">
          <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Scrollable content area */}
        <main className="h-full overflow-y-auto pb-16">
          {" "}
          {/* Add bottom padding */}
          <div className="p-4">
            {" "}
            {/* Add padding around content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
