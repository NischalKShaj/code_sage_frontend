// file to create the component for the dashboard
"use client";

// importing the file for the application
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editor from "@monaco-editor/react";
import { FaPlay, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import SideBar from "../sidebar/SideBar";
import LanguageDropdown from "../dropdown/LanguageDropDown";
import ServiceDropDown from "../dropdown/ServiceDropDown";
import { LANGUAGE_MAP } from "../../utils/language";
import api from "../../app/api/interceptor";

const Dashboard = () => {
  // const router = useRouter();
  // useEffect(() => {
  //   const access_token = localStorage.getItem("access_token");
  //   if (!access_token) {
  //     router.push("/");
  //   }
  //   router.push("/dashboard");
  // }, []);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [service, setService] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

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

  const handleRun = async () => {
    // Later: call your API here
    setOutput(`Running ${service} on the provided code...`);

    const payload = {
      language,
      service,
      prompt,
      code,
    };

    if (
      payload.prompt === "" ||
      payload.service === "" ||
      payload.language === ""
    ) {
      toast.error("Please enter all the fields");
    }

    const runPromise = api.post("/openai/run", payload);

    toast.promise(runPromise, {
      loading: "Processing your request...",
    });

    const response = await runPromise;

    setOutput(response.data.output);
  };

  return (
    <div className="flex max-h-screen  bg-gray-900 pb-4">
      <SideBar />

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
            disabled={isDisabled}
            className={`flex items-center gap-2 px-6 py-2 bg-indigo-600
              text-white font-bold rounded-lg shadow-lg transition transform
              ${
                isDisabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-indigo-700bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] cursor-pointer"
              }
              `}
          >
            <FaPlay /> {getButtonLabel(service)}
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
              <div className="prose prose-invert max-w-none text-gray-300">
                <ReactMarkdown>
                  {output ||
                    "_The AI’s generated review, fixed code, or explanation will appear here after you click 'Run AI'._"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
