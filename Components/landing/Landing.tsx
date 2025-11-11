// file to create the landing page for the application
"use client";

import React from "react";
import Navbar from "../navbar/Navbar";
import Link from "next/link";
import FeatureCarousel from "../carousel/LandingCarousal";

const Landing = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 bg-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight">
          Review, Refactor & Elevate Your Code with{" "}
          <span className="text-blue-500">AI Precision</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl">
          Code Reviewer helps developers write cleaner, faster, and smarter code
          by detecting errors, optimizing performance, and evaluating overall
          code quality — instantly.
        </p>
        <div className="mt-8 flex space-x-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 border border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Code Reviewer Does
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Transform the way you review and optimize your code — faster,
            smarter, cleaner.
          </p>
        </div>
        <FeatureCarousel />
      </section>

      {/* CTA Section */}
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

export default Landing;
