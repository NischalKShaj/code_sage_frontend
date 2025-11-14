// file to create the contact section for the application

"use client";

import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { ContactForm } from "../../types/types";
import api from "../../app/api/interceptor";
import toast from "react-hot-toast";

const Contact = () => {
  const [contact, setContact] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // for changing the value in the input field
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phoneNumber") {
      let cleanValue = value.replace(/[^\d+]/g, "");

      if (cleanValue.length > 0) {
        cleanValue = cleanValue.replace(/\+/g, (match, index) =>
          index === 0 ? "+" : ""
        );
      }

      const MAX_DIGITS = 15;

      let limitedValue;

      if (cleanValue.startsWith("+")) {
        limitedValue = "+" + cleanValue.slice(1, MAX_DIGITS + 1);
      } else {
        limitedValue = cleanValue.slice(0, MAX_DIGITS);
      }

      newValue = limitedValue;

      setContact((prevContact) => ({
        ...prevContact,
        [name]: newValue,
      }));
    } else {
      setContact((prevContact) => ({
        ...prevContact,
        [name]: value,
      }));
    }
  };

  // for submitting the form for the contact
  const handleSubmit = async () => {
    try {
      const requiredFields: Record<keyof ContactForm, string> = {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phoneNumber: "Phone number",
        message: "Message",
      };

      const missingField = (
        Object.keys(requiredFields) as (keyof ContactForm)[]
      ).find((key) => !contact[key]);

      if (missingField) {
        toast.error(`Please fill in the ${requiredFields[missingField]} field`);
        return;
      }
      const formSubmitPromise = api.post("/contact", contact);

      toast.promise(formSubmitPromise, {
        loading: "Sending your message....",
        success: "Your message has been sent successfully 🎉",
      });
      await formSubmitPromise;
    } catch (error) {
      console.error("Error while submitting", error);
    }
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                name="firstName"
                type="text"
                value={contact.firstName}
                onChange={handleFormChange}
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
                type="text"
                name="lastName"
                value={contact.lastName}
                onChange={handleFormChange}
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
                type="email"
                name="email"
                value={contact.email}
                onChange={handleFormChange}
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
                type="tel"
                name="phoneNumber"
                value={contact.phoneNumber}
                onChange={handleFormChange}
                placeholder="(123) 456-7890"
                maxLength={16}
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
                name="message"
                value={contact.message}
                onChange={handleFormChange}
                placeholder="How can we help you?"
                className="border border-gray-300 rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition text-sm sm:text-base"
                aria-label="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
