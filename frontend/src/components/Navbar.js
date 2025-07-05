import React from "react";

const Navbar = ({ onToggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        {/* Mobile menu toggle */}
        <button
          className="btn btn-outline-primary d-md-none"
          type="button"
          onClick={onToggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Page title */}
        <h4 className="mb-0 ms-3 d-none d-md-block text-primary">
          Student Management System
        </h4>

        {/* User dropdown */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user me-2"></i>
            {user.name || "User"}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a className="dropdown-item" href="/profile">
                <i className="fas fa-user me-2"></i>
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
