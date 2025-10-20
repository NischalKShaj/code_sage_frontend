// file to create the navbar component
"use client";

// importing the required modules
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";

const Navbar = () => {
  const [toggleTheme, setToggleTheme] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { name: "Docs", href: "/docs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const normalize = (path: string) => path.replace(/\/$/, "");

  // function for moving to the login page
  const handleLogin = () => {
    console.log("here");
    router.push("/login");
  };

  return (
    <div className="bg-blue-50 relative flex justify-between items-center px-8 py-4 space-x-2">
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

      <span className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-900 md:hidden">
        Code Sage
      </span>

      <div className="hidden md:flex space-x-4 justify-center flex-1">
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
      <div className="hidden md:flex space-x-2 items-center">
        <button
          onClick={() => handleLogin()}
          className=" rounded-lg cursor-pointer px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white hover:text-white"
        >
          login
        </button>
        <button
          onClick={() => setToggleTheme(!toggleTheme)}
          className={`rounded-full px-2 py-2 transition duration-200 ease-in-out cursor-pointer
            ${toggleTheme ? "hover:bg-blue-300" : "hover:bg-blue-700"}`}
        >
          {toggleTheme ? (
            <SunIcon className="w-6 h-6 text-yellow-300" />
          ) : (
            <MoonIcon className="w-6 h-6 text-yellow-300" />
          )}
        </button>
      </div>
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
          <button
            onClick={() => setToggleTheme(!toggleTheme)}
            className={`rounded-full px-2 py-2 transition duration-200 ease-in-out cursor-pointer
            ${toggleTheme ? "hover:bg-blue-300" : "hover:bg-blue-700"}`}
          >
            {toggleTheme ? (
              <SunIcon className="w-6 h-6 text-yellow-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-yellow-300" />
            )}
          </button>
          <button
            onClick={() => handleLogin()}
            className="rounded-lg cursor-pointer px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white hover:text-white"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
