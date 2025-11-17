// file to create the dropdown for the service
"use client";

// importing the required modules
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ServiceDropdownProps } from "@/types/types";

const Service: string[] = [
  "Code Review",
  "Fix Errors",
  "Optimize Code",
  "Explain Code",
  "Generate Code",
];

const ServiceDropDown: React.FC<ServiceDropdownProps> = ({
  service,
  setService,
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
        <span className="font-semibold text-gray-400">AI Task:</span>
        <span className="text-white">{service || "Select Task"}</span>
        <FaChevronDown className="ml-2 text-gray-300" size={12} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute z-50 mt-2 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl
                     grid grid-cols-3 gap-3 w-100"
        >
          {Service.map((ser) => (
            <button
              key={ser}
              onClick={() => {
                setService(ser);
                setOpen(false);
              }}
              className={`text-left px-1 py-1 rounded transition cursor-pointer whitespace-nowrap
                overflow-hidden text-ellipsis
                          ${
                            service === ser
                              ? "text-indigo-400 font-semibold"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
            >
              {ser}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceDropDown;
