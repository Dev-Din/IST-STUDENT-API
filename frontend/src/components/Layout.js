import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        <div className="col-md-9 col-lg-10 p-0">
          <Navbar onToggleSidebar={toggleSidebar} />

          <main className="main-content p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
