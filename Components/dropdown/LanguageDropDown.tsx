// file to show the drop down for the language
"use client";

// importing the required modules
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LanguageDropdownProps } from "@/types/types";
import { LANGUAGE_MAP } from "../../utils/language";

const LANGUAGE = Object.keys(LANGUAGE_MAP);

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  language,
  setLanguage,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative text-white" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4 flex items-center justify-between w-56 py-2 bg-gray-700 border border-gray-600
                   rounded-lg shadow hover:bg-gray-600 transition"
      >
        <span className="font-semibold text-gray-400">Language:</span>
        <span className="text-white">{language || "Select Code"}</span>
        <FaChevronDown className="ml-2 text-gray-300" size={12} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute z-50 mt-2 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl
                     grid grid-cols-3 gap-6 w-80"
        >
          {LANGUAGE.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className={`text-left px-1 py-1 rounded transition cursor-pointer hover:text-indigo-400
                          ${
                            language === lang
                              ? "text-indigo-400 font-semibold"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
