import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardContainer.scss";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { NotesProvider } from "../../context/NotesContext"

const DashboardContainer = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("Notes");

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <NotesProvider>
      <div className="dashboard-main-body">
        <Navbar toggleSidebar={toggleSidebar} activePage={activePage} />
        <div className="dashboard-main-center">
          <Sidebar isCollapsed={isCollapsed} onPageChange={handlePageChange} />
          <Outlet />
        </div>
      </div>
    </NotesProvider>
  );
};

export default DashboardContainer;