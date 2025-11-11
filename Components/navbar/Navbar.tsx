// file to create the navbar component
"use client";

// importing the required modules
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Docs", href: "/docs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const normalize = (path: string) => path.replace(/\/$/, "");

  // function for moving to the login page

  return (
    <div className="bg-blue-100 relative flex items-center justify-between px-8 py-4">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2 flex-[1]">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Code Sage Logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="hidden md:inline text-xl font-semibold text-gray-900">
            Code Sage
          </span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex justify-center flex-[2] space-x-4">
        {links.map((link) => {
          const isActive = normalize(pathname).startsWith(normalize(link.href));
          return (
            <Link key={link.name} href={link.href}>
              <button
                className={`cursor-pointer px-4 py-2 transition duration-200 ease-in-out
                ${
                  isActive
                    ? "bg-blue-300 text-white rounded-lg"
                    : "text-gray-900 hover:bg-blue-200 hover:rounded-lg"
                }`}
              >
                {link.name}
              </button>
            </Link>
          );
        })}
      </div>

      {/* Right: Mobile menu button */}
      <div className="flex justify-end items-center flex-[1]">
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-blue-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-800" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Center Title */}
      <span className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900 md:hidden">
        Code Sage
      </span>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-blue-50 shadow-md flex flex-col items-center space-y-3 py-4 md:hidden z-50">
          {links.map((link) => {
            const isActive = normalize(pathname).startsWith(
              normalize(link.href)
            );
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <button
                  className={`cursor-pointer w-full text-center px-4 py-2 transition duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-blue-300 text-white rounded-lg"
                      : "text-gray-900 hover:bg-blue-200 hover:rounded-lg"
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
