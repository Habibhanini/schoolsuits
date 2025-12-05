"use client";
import { SetStateAction, useState } from "react";
import LeftSidebar from "./components/common/LeftSidebar";
import Navbar from "./components/common/Navbar";
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
      <div className="h-screen flex"></div>
    </main>
  );
}
