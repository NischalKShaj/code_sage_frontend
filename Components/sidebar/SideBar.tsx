// file to create the sidebar for the application
"use client";

// importing the required modules
import React from "react";
import toast from "react-hot-toast";
import {
  FaUserCircle,
  FaClock,
  FaCog,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  const handleLogout = () => {
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    // localStorage.removeItem("user");
    // router.push("/");
    toast.success("Logged out successfully");
  };
  return (
    <div className="w-64 h-screen bg-gray-800 border-r border-gray-700 p-6 flex flex-col space-y-10">
      {/* Profile Section */}
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center space-x-3">
          <FaUserCircle className="w-4 h-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-100">Username</h3>
        </div>
        <p className="text-sm text-gray-400">email@example.com</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-3 text-gray-300">
        <div className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
          <FaClock className="w-5 h-5 text-gray-400" />
          <span className="font-medium">History</span>
        </div>
        <div className="flex flex-col max-h-120 overflow-y-auto pr-2 custom-scrollbar">
          <p>show the history here</p>
        </div>
      </div>

      {/* Settings and Trash */}
      <div className="flex flex-col space-y-3 text-gray-300">
        <hr />
        <button className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
          <FaCog className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Settings</span>
        </button>

        <button className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
          <FaTrash className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Trash</span>
        </button>
      </div>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`cursor-pointer flex items-center gap-2 px-4 py-2 text-sm
          text-gray-400 border border-gray-700 rounded-lg
          hover:bg-gray-700 hover:text-gray-400 transition`}
      >
        <FaSignOutAlt /> Logout
      </button>

      {/* Footer */}
      <div className="mt-auto text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} CodeSage AI
      </div>
    </div>
  );
};

export default SideBar;
