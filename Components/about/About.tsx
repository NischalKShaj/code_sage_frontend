// file to create the component for the about page

// importing the required files for the page
import React from "react";
import Navbar from "../navbar/Navbar";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* About Section */}
      <section className="flex flex-col items-center justify-center mt-16 px-6 text-gray-800">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          About Code Sage
        </h1>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto px-4">
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src="/about1.png"
              alt="Code Sage Vision"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
              Code Sage was created with one goal — to make coding smarter,
              <br /> faster, and more efficient. We believe every developer
              <br /> deserves a tool that not only assists but also enhances
              <br /> their problem-solving skills.
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src="/about2.png"
              alt="AI Assistance"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
              From beginner coders to experienced developers,
              <br /> our platform provides AI-assisted code reviews
              <br /> that help you learn and grow with every
              <br /> project you build.
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src="/about3.png"
              alt="Code Optimization"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
              We focus on simplifying complex concepts,
              <br /> improving your workflow, and offering insights
              <br /> that help you write cleaner and more
              <br /> optimized code.
            </p>
          </div>

          {/* Block 4 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src="/about4.png"
              alt="Developer Collaboration"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
              Our mission is to empower developers worldwide
              <br /> to collaborate, learn, and code confidently —
              <br /> supported by intelligent feedback and
              <br /> real-time improvement suggestions.
            </p>
          </div>

          {/* Block 5 */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image
              src="/about5.png"
              alt="Code Improvement"
              width={300}
              height={300}
              className="rounded-xl shadow-lg"
            />
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 text-center md:text-left">
              Whether you’re fixing bugs, writing new features,
              <br /> or polishing existing code,
              <br /> Code Sage helps you become a better coder
              <br /> every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-blue-100 text-black text-center px-6 mt-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Ready to Level Up Your Code?
        </h2>
        <p className="mt-3 text-base sm:text-lg max-w-xl mx-auto">
          Sign up now and experience the future of AI-assisted code reviews.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-200 transition-all duration-200"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-xs sm:text-sm border-t border-gray-100">
        © {new Date().getFullYear()} Code Sage — All rights reserved.
      </footer>
    </div>
  );
};

export default About;
