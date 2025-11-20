// file for profile modal
"use client";

// importing the required modules
import { ProfileModalProps } from "@/types/types";
import React, { useEffect, useState } from "react";

const ProfileModal = ({ openProfile }: ProfileModalProps) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData({
        username: parsed.username || "",
        email: parsed.email || "",
      });
    }
  }, []);

  // for changing the value in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // for saving the updated name and email
  const handleSave = () => {
    // You can call API here if you want to save in DB
    localStorage.setItem("user", JSON.stringify(userData));
    openProfile(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9998]">
      {/* MODAL */}
      <div className="bg-gray-800 w-[90vw] max-w-xl rounded-2xl border border-gray-700 shadow-2xl p-6 relative">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Edit Profile</h2>

          <button
            onClick={() => openProfile(false)}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✖
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

          {/* Email (Read-only for most systems) */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              readOnly
              value={userData.email}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => openProfile(false)}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
