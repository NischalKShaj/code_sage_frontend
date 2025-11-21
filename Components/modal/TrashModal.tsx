/* eslint-disable @typescript-eslint/no-explicit-any */
// file to create a trash modal
"use client";

// importing the required modules
import api from "@/app/api/interceptor";
import { TrashModalProps, TrashSection } from "@/types/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TrashModal = ({ setOpen, refreshHistory }: TrashModalProps) => {
  const [user, setUser] = useState<any>(null);
  const [trash, setTrash] = useState<TrashSection[]>([]);
  const [dropdown, setDropdown] = useState<{
    selectedId: string | null;
    x: number;
    y: number;
  }>({
    selectedId: null,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // Fetch trash after user is loaded
  useEffect(() => {
    if (!user?.id) return; // prevent undefined fetch
    fetchTrash(user.id);
  }, [user]);

  const fetchTrash = async (id: string) => {
    try {
      const response = await api.get(`/dashboard/trash/${id}`);
      if (response.status == 200) {
        console.log("response from the trash", response.data);
        setTrash(response.data.trash);
      }
    } catch (error) {
      console.error("error while loading", error);
    }
  };

  // for deleting the history
  const handleDelete = async (id: string) => {
    try {
      const userId = user.id;
      const deletePromise = api.delete(`/dashboard/trash/${id}/${userId}`);
      toast.promise(deletePromise, {
        loading: "Deleting history...",
        success: "History deleted successfully 🎉",
      });

      await deletePromise;
      // for removing from the state
      setTrash((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("error from the api", error);
    }
  };

  // for restoring the trash
  const handleRestore = async (id: string) => {
    try {
      const response = await api.put(`/dashboard/restore/${id}`);
      if (response.status === 202) {
        toast.success("History restored successfully");
        setTrash((prev) => prev.filter((item) => item.id !== id));
        refreshHistory();
      }
    } catch (error) {
      console.error("Error in the api", error);
    }
  };

  // for removing the data from the trash permanently
  const handlePermanentDelete = async (id: string) => {
    try {
      const response = await api.delete(`/dashboard/trash/${id}`);
      if (response.status === 202) {
        setTrash((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("error from deleting", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9998]">
      {/* MODAL */}
      <div className="bg-gray-800 w-[90vw] max-w-2xl max-h-[70vh] rounded-2xl border border-gray-700 shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold flex items-center gap-2">
            Trash 🗑️
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 text-lg cursor-pointer"
          >
            ✖
          </button>
        </div>

        {/* List Section */}
        <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {trash.length === 0 ? (
            <p className="text-gray-500 text-sm">Your trash is empty.</p>
          ) : (
            trash.map((item) => (
              <div
                key={item.id}
                className="relative px-4 py-3 mb-2 bg-gray-700/40 rounded-lg hover:bg-gray-700/60 transition flex items-center justify-between"
              >
                {/* Left */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-gray-200 text-sm">{item.title}</span>
                </div>

                {/* Menu Button */}
                <button
                  className="trash-dot-btn text-gray-300 hover:text-white text-xl font-bold px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();

                    setDropdown({
                      selectedId: item.id,
                      x: rect.left - 20,
                      y: rect.top + 25,
                    });
                  }}
                >
                  ⋮
                </button>

                {/* Dropdown */}
                {dropdown.selectedId === item.id && (
                  <div
                    id="trash-dropdown"
                    className="fixed bg-gray-900 border border-gray-700 rounded-md shadow-xl w-36 z-[9999]"
                    style={{ top: dropdown.y, left: dropdown.x }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        console.log("Restore", item);
                        setDropdown({ selectedId: null, x: 0, y: 0 });
                        handleRestore(item.id);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-green-400 hover:bg-gray-700"
                    >
                      ♻ Restore
                    </button>

                    <button
                      onClick={() => {
                        console.log("Delete", item);
                        setDropdown({ selectedId: null, x: 0, y: 0 });
                        handlePermanentDelete(item.id);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                      🗑 Delete Permanently
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrashModal;
