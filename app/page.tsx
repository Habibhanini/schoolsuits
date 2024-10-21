"use client";
import { SetStateAction, useState } from "react";
import LeftSidebar from "./components/LeftSidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./containers/Dashoard";
import ContentContainer from "./containers/ContentContainer";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("Dashboard");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLinkClick = (content: SetStateAction<string>) => {
    setActiveContent(content);
  };

  return (
    <main>
      <div className="h-screen flex">
        {/* Left Sidebar */}
        <LeftSidebar isOpen={isSidebarOpen} handleLinkClick={handleLinkClick} />

        {/* Main Section */}
        <div
          className={`flex-1 flex flex-col ${
            isSidebarOpen ? "ml-64" : "ml-20"
          }`}
        >
          {/* Pass toggleSidebar to Navbar */}
          <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {/* Main content area */}

          <ContentContainer activeContent={activeContent} />
        </div>
      </div>
    </main>
  );
}
