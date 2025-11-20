/* eslint-disable @typescript-eslint/no-explicit-any */
// file to create a settings modal
"use client";

// importing the required modules
import api from "@/app/api/interceptor";
import { SettingsModalProps } from "@/types/types";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileModal from "./ProfileModal";

const SettingsModal = ({ setOpenSettings }: SettingsModalProps) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  // for editing the user details
  const handleOpenProfileEditModal = () => {
    setOpenProfile(!openProfile);
  };

  // for changing the theme
  const handleThemeChange = (value: "dark" | "light") => {
    setTheme(value);
    localStorage.setItem("theme", value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9998]">
      {/* MODAL */}
      <div className="bg-gray-800 w-[90vw] max-w-xl rounded-2xl border border-gray-700 shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Settings ⚙️</h2>

          {/* Close Button */}
          <button
            onClick={() => setOpenSettings(false)}
            className="text-gray-400 text-lg cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex justify-between items-center bg-gray-700/40 p-4 rounded-lg">
            <span className="text-gray-200 text-sm">Theme Mode</span>

            <button
              onClick={() =>
                handleThemeChange(theme === "dark" ? "light" : "dark")
              }
              className={`rounded-full px-2 py-2 transition duration-200 ease-in-out cursor-pointer
            ${theme == "light" ? "hover:bg-blue-300" : "hover:bg-blue-700"}`}
            >
              {theme === "light" ? (
                <SunIcon className="w-6 h-6 text-yellow-300" />
              ) : (
                <MoonIcon className="w-6 h-6 text-yellow-300" />
              )}
            </button>
          </div>
          <div
            onClick={handleOpenProfileEditModal}
            className="flex justify-between items-center bg-gray-700/40 p-4 rounded-lg cursor-pointer"
          >
            <span className="text-gray-200 text-sm">Edit Profile</span>
          </div>

          {/* Add future settings here */}
          <div className="text-gray-400 text-sm opacity-70">
            More settings coming soon...
          </div>
        </div>
      </div>
      {openProfile && <ProfileModal openProfile={setOpenProfile} />}
    </div>
  );
};

export default SettingsModal;
