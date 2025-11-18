// file to create the docs page
"use client";

// importing the required modules
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Image from "next/image";
import Link from "next/link";

const SECTIONS = [
  {
    id: "code-review",
    title: "🔍 Code Review",
    description:
      "CodeSage intelligently analyzes your source code and returns structured insights, best practices, and suggestions.",
    img: "/code_review.png",
  },
  {
    id: "fix-errors",
    title: "🐞 Fix Errors",
    description:
      "Paste your error code — CodeSage identifies issues, explains them, and generates clean fixes.",
    img: "/fix_error.png",
  },
  {
    id: "optimize",
    title: "⚡ Optimize Code",
    description:
      "Improve efficiency, reduce time complexity, and get optimally refactored versions of your code.",
    img: "/optimize.png",
  },
  {
    id: "explain",
    title: "🧠 Explain Code",
    description:
      "Get step-by-step explanations of code blocks in simple language — perfect for learning and debugging.",
    img: "/explain_code.png",
  },
  {
    id: "generate",
    title: "🛠 Generate Code",
    description:
      "Generate functions, utilities, UI components, backend logic, or complete modules using natural language.",
    img: "/generate.png",
  },
];

const Docs = () => {
  const [active, setActive] = useState<string>("");

  const handleScrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    const mainContent = document.getElementById("main-docs-content");
    const targetElement = document.getElementById(id);

    if (mainContent && targetElement) {
      const headerOffset = 20;

      mainContent.scrollTo({
        top: targetElement.offsetTop - mainContent.offsetTop - headerOffset,
        behavior: "smooth", // Smooth scrolling
      });

      // Manually update the URL hash without triggering a jump
      window.history.pushState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center bg-white h-[80vh] py-10 overflow-hidden">
        <div className=" max-w-7xl w-full p-6 h-full overflow-hidden">
          <div className="flex gap-10 h-full">
            {/* LEFT SIDEBAR */}
            <aside
              className="hidden md:block w-64 sticky top-32
                   h-[calc(100vh-300px)] overflow-y-auto
                   border-r pr-6 pt-4"
            >
              <h2 className="text-gray-800 font-semibold text-sm mb-4 uppercase tracking-wide">
                On this page
              </h2>
              <nav className="space-y-2">
                {SECTIONS.map((s) => (
                  <Link
                    key={s.id}
                    onClick={(e) => handleScrollToSection(e, s.id)}
                    href={`#${s.id}`}
                    className={`block transition font-medium ${
                      active === s.id
                        ? "text-gray-900 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main
              id="main-docs-content"
              className="
                flex-1 overflow-y-auto scrollbar-none pr-4 space-y-10 pt-4 pb-12 h-full
                scroll-smooth
                [scroll-padding-top:100px]
              "
            >
              {/* Hero Section */}
              <section id="hero-section" className="scroll-mt-24">
                <p className="text-gray-600 font-semibold text-sm tracking-wide">
                  DOCUMENTATION
                </p>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">
                  Your Complete Guide to CodeSage
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mt-3">
                  Learn how to review, debug, optimize, and generate code using
                  our AI-powered tools.
                </p>
              </section>

              {/* Feature Sections */}
              {SECTIONS.map((section, index) => {
                const isLast = index === SECTIONS.length - 1;

                return (
                  <section
                    key={index}
                    id={section.id}
                    className="bg-white rounded-xl shadow-md p-8"
                  >
                    <h2 className="text-3xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">
                      {section.description}
                    </p>

                    <div className="mt-6">
                      <Image
                        src={section.img}
                        alt={section.title}
                        width={1200}
                        height={600}
                        className="rounded-lg shadow-md border"
                      />
                    </div>

                    {/* show only for last card */}
                    {isLast && (
                      <div className="mt-6">
                        <Link
                          onClick={(e) =>
                            handleScrollToSection(e, "hero-section")
                          }
                          href="#hero-section"
                          className="text-indigo-600 font-semibold hover:underline"
                        >
                          ⬆ Back to top
                        </Link>
                      </div>
                    )}
                  </section>
                );
              })}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Docs;
