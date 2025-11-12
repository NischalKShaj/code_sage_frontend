// file to create the contact section for the application

"use client";

import React from "react";
import Navbar from "../navbar/Navbar";
import Link from "next/link";
import Footer from "../footer/Footer";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 gap-10 md:gap-16 w-full">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
            Have a question or suggestion? We’d love to hear from you — let’s
            make Code Sage even better together.
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            You can reach us anytime at{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@codesage.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-medium hover:underline"
            >
              support@codesage.dev
            </a>
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 w-full bg-white p-6 sm:p-8 rounded-lg">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="font-medium text-gray-700 mb-2 text-sm sm:text-base"
              >
                First Name
              </label>
              <input
                id="firstName"
                placeholder="John"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="font-medium text-gray-700 mb-2 text-sm sm:text-base"
              >
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Doe"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="font-medium text-gray-700 mb-2 text-sm sm:text-base"
              >
                Personal Email
              </label>
              <input
                id="email"
                placeholder="example@mail.com"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="font-medium text-gray-700 mb-2 text-sm sm:text-base"
              >
                Phone Number
              </label>
              <input
                id="phone"
                placeholder="(123) 456-7890"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col sm:col-span-2">
              <label
                htmlFor="message"
                className="font-medium text-gray-700 mb-2 text-sm sm:text-base"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                className="border border-gray-300 rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="button"
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition text-sm sm:text-base"
                aria-label="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
