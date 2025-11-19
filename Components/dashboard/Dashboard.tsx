// file to create the component for the dashboard
"use client";

// importing the file for the application
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editor from "@monaco-editor/react";
import { FaPlay, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import {
  FaUserCircle,
  FaClock,
  FaCog,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import LanguageDropdown from "../dropdown/LanguageDropDown";
import ServiceDropDown from "../dropdown/ServiceDropDown";
import { LANGUAGE_MAP } from "../../utils/language";
import api from "../../app/api/interceptor";
import { HistoryPart } from "../../types/types";
import TrashModal from "../modal/TrashModal";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<HistoryPart[]>([]);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [service, setService] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState<{
    selectedId: string | null;
    x: number;
    y: number;
  }>({
    selectedId: null,
    x: 0,
    y: 0,
  });
  const [openTrashModal, setOpenTrashModal] = useState(false);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      // If clicking ON the dropdown or ON the 3-dot button → do nothing
      const dropdownEl = document.getElementById("history-dropdown");
      const dotButtons = document.querySelectorAll(".history-dot-btn");

      const clickedDot = Array.from(dotButtons).some((btn) =>
        btn.contains(e.target as Node)
      );

      if (clickedDot) return;
      if (dropdownEl && dropdownEl.contains(e.target as Node)) return;

      // Otherwise close dropdown
      setDropdown({ selectedId: null, x: 0, y: 0 });
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  // Fetch history after user is loaded
  useEffect(() => {
    if (!user?.id) return;
    fetchHistory(user.id);
  }, [user, historyRefreshKey]);

  // function for feting the chat history for the user
  const fetchHistory = async (id: string) => {
    try {
      console.log("came here");
      const response = await api.get(`/dashboard/history/${id}`);

      if (response.status == 200) {
        const titles = response.data.title;
        console.log("data", titles);
        setHistory(titles);
      }
    } catch (error) {
      console.error("error from the api", error);
    }
  };

  // for logging out
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/");
    toast.success("Logged out successfully");
  };

  // function for changing the button name asper the service
  const getButtonLabel = (service: string) => {
    switch (service) {
      case "Code Review":
        return "Analyze Code";
      case "Fix Errors":
        return "Auto-Fix Errors";
      case "Optimize Code":
        return "Refactor & Optimize";
      case "Explain Code":
        return "Break Down Code ";
      case "Generate Code":
        return "Generate Snippet";
      default:
        return "Run AI";
    }
  };

  const isDisabled = !language || !service || !prompt;

  // for running the ai for the code review and all part
  const handleRun = async () => {
    // Later: call your API here
    setLoading(true);
    setOutput(`Running ${service} on the provided code...`);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const payload = {
      language,
      service,
      prompt,
      code,
      userId: user.id,
    };

    if (
      payload.prompt === "" ||
      payload.service === "" ||
      payload.language === ""
    ) {
      toast.error("Please enter all the fields");
    }

    try {
      const runPromise = api.post("/openai/run", payload);

      const response = await runPromise;

      setOutput(response.data.output);

      await new Promise((resolve) => setTimeout(resolve, 5000));

      setHistoryRefreshKey((prev) => prev + 1);
    } catch (error) {
      setOutput("Server is being overloaded. Please try again later.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  // for opening the modal for the trash
  const handleTrashModal = () => {
    setOpenTrashModal(!openTrashModal);
  };

  // for deleting the history
  const handleDelete = async (id: string) => {
    try {
      const userId = user.id;
      const deletePromise = api.delete(`/dashboard/history/${id}/${userId}`);
      toast.promise(deletePromise, {
        loading: "Deleting history...",
        success: "History deleted successfully 🎉",
      });

      await deletePromise;
      // for removing from the state
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("error from the api", error);
    }
  };

  return (
    <div className="flex max-h-screen  bg-gray-900 pb-4">
      <div
        id="history-sidebar"
        className="w-64 h-screen bg-gray-800 border-r border-gray-700 p-6 flex flex-col space-y-10"
      >
        {/* Profile Section */}
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center space-x-3">
            <FaUserCircle className="w-4 h-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-100">
              {user?.username}
            </h3>
          </div>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3 text-gray-300">
          <div className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
            <FaClock className="w-5 h-5 text-gray-400" />
            <span className="font-medium">History</span>
          </div>
          <div className="relative">
            <div className="flex flex-col max-h-120 overflow-y-auto pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <p className="text-gray-500 text-sm ml-3">No history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="relative cursor-pointer px-4 py-2 mb-1 rounded hover:bg-gray-700 transition flex items-center justify-between"
                  >
                    {/* Left Section */}
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      <span className="text-gray-200 text-sm">
                        {item.title}
                      </span>
                    </div>

                    {/* 3-Dot Menu */}
                    <button
                      className="history-dot-btn text-gray-300 hover:text-white text-lg font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();

                        setDropdown({
                          selectedId: item.id,
                          x: rect.left - 40, // also moves left a bit
                          y: rect.top + 20,
                        });
                      }}
                    >
                      ⋮
                    </button>

                    {/* Dropdown */}
                    {dropdown.selectedId === item.id && (
                      <div
                        id="history-dropdown"
                        className="fixed bg-gray-800 border border-gray-700 rounded-md shadow-lg w-32 z-[9999]"
                        style={{ top: dropdown.y, left: dropdown.x }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            console.log("Edit", item);
                            setDropdown({ selectedId: null, x: 0, y: 0 });
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                          ✏️ Edit Title
                        </button>

                        <button
                          onClick={() => {
                            console.log("Delete", item);
                            setDropdown({ selectedId: null, x: 0, y: 0 });
                            handleDelete(item.id);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Settings and Trash */}
        <div className="flex flex-col space-y-3 text-gray-300">
          <hr />
          <button className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition">
            <FaCog className="w-5 h-5 text-gray-400" />
            <span className="font-medium">Settings</span>
          </button>

          <button
            onClick={handleTrashModal}
            className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
          >
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

      <div className="flex-1 flex flex-col px-8 py-8 space-y-6 ">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-white">
              CodeSage — Smarter Coding Starts Here
            </h1>
            <p className="text-gray-400 mt-1">
              Review, debug, optimize, and generate clean code in seconds.
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-4 p-4 rounded-xl border border-gray-700 bg-gray-800">
          {/* Language Selector */}
          <LanguageDropdown language={language} setLanguage={setLanguage} />

          {/* Service Selector */}
          <ServiceDropDown service={service} setService={setService} />

          <button
            onClick={handleRun}
            disabled={isDisabled || loading}
            className={`flex items-center gap-2 px-6 py-2 bg-indigo-600
              text-white font-bold rounded-lg shadow-lg transition transform
              ${
                isDisabled || loading
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-indigo-700bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] cursor-pointer"
              }
              `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Running...
              </span>
            ) : (
              <>
                <FaPlay /> {getButtonLabel(service)}
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Describe what you want the AI to do (e.g., 'Make it use functional programming' or 'Fix the security vulnerability')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-md
             placeholder-gray-500 focus:ring-1 focus:ring-indigo-900
             focus:border-indigo-500 focus:outline-none transition"
          />
          {prompt && (
            <button
              onClick={() => setPrompt("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
              title="Clear Prompt"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          {/* Code Editor */}
          <div className="w-full border border-gray-700 rounded-xl shadow-xl overflow-hidden bg-[#1e1e1e] flex flex-col">
            <h2 className="text-md font-semibold text-white p-3 border-b border-gray-700 bg-gray-800">
              🧩 Code Workspace
            </h2>
            <Editor
              height="min(60vh, 100%)"
              language={LANGUAGE_MAP[language]}
              theme="vs-dark"
              value={code}
              options={{ minimap: { enabled: false } }}
              onChange={(value) => setCode(value || "")}
            />
          </div>

          <div className="w-full border border-gray-700 rounded-xl shadow-xl bg-gray-800 flex flex-col">
            <h2 className="text-md font-medium text-white p-3 border-b border-gray-700 bg-gray-800 rounded-t-xl">
              📟 Output Console
            </h2>

            <div className="p-4 flex-1 overflow-y-auto max-h-[55vh] custom-scrollbar">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-[90%]"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-[60%]"></div>

                  <div className="mt-4 h-4 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-[80%]"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-[40%]"></div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none text-gray-300">
                  <ReactMarkdown>
                    {output ||
                      "_The AI’s generated review, fixed code, or explanation will appear here after you click 'Run AI'._"}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
          {openTrashModal && <TrashModal setOpen={setOpenTrashModal} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
