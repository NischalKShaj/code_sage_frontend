// file to create the contact section for the application

// importing the required modules
import React from "react";
import Navbar from "../navbar/Navbar";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center max-w-6xl mx-auto px-6 py-16 gap-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Have a question or suggestion? We’d love to hear from you — let’s
            make Code Sage even better together.
          </p>
          <p className="text-gray-500">
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

        <div className="flex-1 bg-white p-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                placeholder="John"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Doe"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-gray-700 mb-2">
                Personal Email
              </label>
              <input
                id="email"
                placeholder="example@mail.com"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                placeholder="(123) 456-7890"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col col-span-2">
              <label
                htmlFor="message"
                className="font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                className="border border-gray-300 rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="button"
              className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
              aria-label="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <section className="py-20 bg-blue-100 text-black text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to Level Up Your Code?
        </h2>
        <p className="text-black mt-3 text-lg">
          Sign up now and experience the future of AI-assisted code reviews.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-200 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm ">
        © {new Date().getFullYear()} Code Sage — All rights reserved.
      </footer>
    </div>
  );
};

export default Contact;
