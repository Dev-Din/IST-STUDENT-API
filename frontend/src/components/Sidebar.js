import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { path: "/students", icon: "fas fa-users", label: "Students" },
    { path: "/profile", icon: "fas fa-user", label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="sidebar-backdrop d-md-none" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <div className={`sidebar col-md-3 col-lg-2 p-0 ${isOpen ? "show" : ""}`}>
        <div className="p-3">
          {/* Logo/Brand */}
          <div className="d-flex align-items-center mb-4">
            <img
              src="/sms.png"
              alt="Student MS Logo"
              className="me-2"
              style={{ width: "32px", height: "32px" }}
            />
            <h5 className="text-white mb-0">Student MS</h5>
          </div>

          {/* Navigation */}
          <nav className="nav flex-column">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => window.innerWidth < 768 && onToggle()}
              >
                <i className={item.icon}></i>
                {item.label}
              </Link>
            ))}

            {/* Logout */}
            <button
              className="nav-link btn btn-link text-start p-0 mt-3"
              onClick={handleLogout}
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              <i
                className="fas fa-sign-out-alt me-2"
                style={{ width: "1.2rem" }}
              ></i>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
