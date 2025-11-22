import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const AdminDashboard = () => {
  const { adminData, logoutAdmin } = useContext(AppContext);
  const navigate = useNavigate(); // ✅ needed if you want redirect after logout

  const handleLogout = () => {
    logoutAdmin(); // clears state & localStorage
   
  };

 if (!adminData) {
    return <div>Loading...</div>;
  }

  const sidebarLinks = [
    { name: "Stats Overview", path: "stats"},
    { name: "Companies", path: "companies" },
    { name: "Internships", path: "jobs" },
    { name: "Users", path: "users"},
    { name: "Applications", path: "applications"},
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-700">Admin Panel</h1>
        </div>
        <nav className="flex-1 mt-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500 font-semibold" : ""
                }`
              }
            >
             
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="flex justify-end items-center p-4 shadow-sm bg-white">
          <p className="mr-4">Welcome, {adminData.name}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="p-6">
          {/* Example: Wrap charts in a container with height */}
          <div style={{ minHeight: "400px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
