// file to create the feature carousel
"use client";

// importing the modules
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FeatureSlide } from "../../types/types";

const FeatureCarousel = () => {
  const featureSlides: FeatureSlide[] = [
    {
      title: "Error Detection",
      description:
        "Automatically detect syntax, logic, and best-practice issues across your codebase. Save hours of debugging and focus on building.",
      language: "javascript",
      code: `
function calculateTotal(price, quantity) {
  price * quanttiy;
}

const total = calculateTotal(10, 5);
console.log('Total:', total); // Output: undefined
      `,
      terminalOutput: `
$ node main.js
/path/to/main.js:3
  price * quanttiy;
          ^
ReferenceError: quanttiy is not defined
    at calculateTotal (/<path>/main.js:3:11)
    at Object.<anonymous> (/<path>/main.js:6:13)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
`,
    },
    {
      title: "Optimization Insights",
      description:
        "Get AI-powered suggestions to improve performance, readability, and scalability. Your code, rewritten smarter and cleaner.",
      language: "typescript",
      code: `// Original Code: Inefficient object restructuring
const userList = [
{ id: 1, data: 'A' }, 
{ id: 2, data: 'B' }
];
const findUser = (id) => {
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      return userList[i].data;
    }
  }
  return 'User not found';
};`,
      optimizedCode: `// Optimized Code: Use Map for O(1) lookup
const userMap = new Map(
  userList.map(user => [user.id, user.data])
);

const findUser = (id: number): string => {
  return userMap.get(id) || 'User not found';
};`,
    },
    {
      title: "Code Quality Report",
      description:
        "Evaluate your project’s code quality with a clear score and detailed analysis — from maintainability to security.",
      language: "python",
      code: `
class UserProcessor:
    def process_data(self, users):
        if not users: return 0
        total = 0
        for user in users:
            try:
                # Issue: Long function, deep nesting
                if user['active']:
                    score = user.get('score', 10)
                    if score > 50:
                        total += score * 2
                    else:
                        total += score
            except Exception as e:
                # Weak error handling: Bare except
                print(f"Error processing: {e}")
        return total
`,
      codeQualityScore: 78,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featureSlides.length]);

  const renderCodeVisuals = (feature: FeatureSlide) => {
    switch (feature.title) {
      case "Error Detection":
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="flex-1 border border-red-500 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={feature.language}
                value={feature.code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <div className="h-[40%] bg-gray-900 p-3 text-xs sm:text-sm text-red-400 font-mono rounded-lg overflow-auto border border-red-700">
              <span className="text-green-500">$</span> node main.js
              <pre className="whitespace-pre-wrap">
                {feature.terminalOutput}
              </pre>
            </div>
          </div>
        );

      case "Optimization Insights":
        return (
          <div className="grid grid-rows-2 gap-4 h-full">
            <div className="flex flex-col border border-yellow-500 rounded-lg overflow-hidden">
              <div className="p-2 bg-yellow-600 text-white text-xs font-semibold">
                Original (O(N))
              </div>
              <Editor
                height="100%"
                language={feature.language}
                value={feature.code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
            <div className="flex flex-col border border-green-500 rounded-lg overflow-hidden">
              <div className="p-2 bg-green-600 text-white text-xs font-semibold">
                Optimized (O(1))
              </div>
              <Editor
                height="100%"
                language={feature.language}
                value={feature.optimizedCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        );

      case "Code Quality Report":
        const score = feature.codeQualityScore || 0;
        const color =
          score > 90
            ? "text-green-500"
            : score > 70
            ? "text-yellow-500"
            : "text-red-500";
        return (
          <div className="flex flex-col h-full gap-4">
            <div className="flex justify-center items-center py-2">
              <span className={`text-4xl sm:text-5xl font-extrabold ${color}`}>
                {score}/100
              </span>
            </div>
            <Editor
              height="100%"
              language={feature.language}
              value={feature.code}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-auto min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 py-8">
      {featureSlides.map((feature, index) => {
        const isActive = index === currentSlide;
        const nextIndex = (currentSlide + 1) % featureSlides.length;
        const isNext = index === nextIndex;

        return (
          <div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out w-full sm:w-[85vw] max-w-6xl min-h-[75vh] p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 rounded-2xl
        ${
          isActive
            ? "z-30 opacity-100"
            : isNext
            ? "z-20 opacity-90"
            : "z-10 opacity-0 pointer-events-none"
        }`}
            style={{
              transform: isActive
                ? "translateY(0px) scale(1)"
                : isNext
                ? "translateY(-20px) scale(0.95)"
                : "translateY(100px) scale(0.9)",
              filter: isNext ? "brightness(0.85) blur(0.5px)" : "none",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isActive
                ? "0px 20px 60px rgba(0,0,0,0.25)"
                : "0px 10px 40px rgba(0,0,0,0.15)",
              background: "linear-gradient(to bottom right, #f9fafb, #ffffff)",
            }}
          >
            {/* Code Section */}
            <div className="w-full h-[50vh] md:h-full">
              {renderCodeVisuals(feature)}
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center text-black text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg opacity-80">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCarousel;
