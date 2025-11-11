// file to create the feature carousel
"use client";

// importing the required modules
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image"; // Import for Next.js image optimization
import { FeatureSlide } from "../../types/types";

// 1. TypeScript Interface for type safety

const FeatureCarousel: React.FC = () => {
  // Define feature slides with placeholders for images
  const featureSlides: FeatureSlide[] = [
    {
      image: "/images/error-detection.png", // Use actual paths
      title: "Error Detection",
      description:
        "Automatically detect syntax, logic, and best-practice issues across your codebase. Save hours of debugging and focus on building.",
    },
    {
      image: "/images/optimization-insights.png",
      title: "Optimization Insights",
      description:
        "Get AI-powered suggestions to improve performance, readability, and scalability. Your code, rewritten smarter and cleaner.",
    },
    {
      image: "/images/code-quality-report.png",
      title: "Code Quality Report",
      description:
        "Evaluate your project’s code quality with a clear score and detailed analysis — from maintainability to security.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  // Use 'Active' for the state that enables scroll hijacking
  const [isScrollSnappingActive, setIsScrollSnappingActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const MAX_SLIDES = featureSlides.length;

  // Debouncing the scroll handler is a good practice to prevent excessive state updates.
  // For a critical wheel handler, using useCallback and a simple time check is often better
  // than complex debounce libraries to ensure immediate response, but we'll use a direct
  // implementation here and rely on `event.preventDefault()` for the smooth snapping.

  // --- Scroll Event Handler (using useCallback) ---
  const handleScroll = useCallback(
    (event: WheelEvent) => {
      // Only proceed if the section is controlling the scroll
      if (!isScrollSnappingActive) return;

      // Prevent default scroll behavior initially for all slides in the range
      event.preventDefault();

      // Determine scroll direction (deltaY > 0 is scrolling down)
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextSlide = currentSlide + direction;

      // Logic to change slide
      if (
        nextSlide >= 0 &&
        nextSlide < MAX_SLIDES &&
        Math.abs(event.deltaY) > 5 // Require a minimum scroll movement to trigger a slide change
      ) {
        // Change slide and prevent browser scroll
        setCurrentSlide(nextSlide);
      } else if (
        (direction === 1 && currentSlide === MAX_SLIDES - 1) || // Allow exit scroll down from last slide
        (direction === -1 && currentSlide === 0) // Allow exit scroll up from first slide
      ) {
        // If we are at an edge, we *allow* the browser's default scroll
        // (by not calling preventDefault on the scroll events outside this handler)
        // However, since we called preventDefault() above, we must rely on the
        // Intersection Observer logic below to disengage scroll snapping.

        // To properly allow exit, the `isScrollSnappingActive` must be set to false.
        // We'll let the Intersection Observer handle the disengagement naturally.
        // For a seamless exit, we must NOT prevent default here.
        // For simplicity, we just return and rely on the next scroll event after
        // the section is out of the viewport.
        return;
      }
    },
    [currentSlide, isScrollSnappingActive, MAX_SLIDES]
  );

  // --- Intersection Observer Setup (To Detect When Section is Visible and Handle Reset) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        // A key piece of logic: if the user scrolls past the last slide, the observer
        // will show it's NOT intersecting. When it becomes intersecting again:
        if (isIntersecting) {
          setIsScrollSnappingActive(true);

          // 3. Reset to first slide (when scrolling down *into* the section)
          // Check if the top of the element is visible (i.e., we are scrolling down)
          const rect = entry.boundingClientRect;

          // If we came from the section ABOVE (rect.y > 0) AND we are not on the first slide, reset.
          if (rect.y >= 0 && currentSlide !== 0) {
            // Note: This check isn't perfectly reliable on all browsers/scrolls,
            // but it's the best pure-JS approach for "resetting on scroll back up/into the section".
            setCurrentSlide(0);
          }
        } else {
          // Allow normal page scroll when section is out of view
          setIsScrollSnappingActive(false);
        }
      },
      {
        threshold: 0.8, // Require 80% of the component to be visible for the effect to activate
        rootMargin: "0px 0px 0px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [currentSlide]); // currentSlide as dependency helps in resetting the slide

  // --- Attach/Detach Wheel Listener ---
  useEffect(() => {
    const ref = sectionRef.current;
    if (ref) {
      // We attach the listener only once, and the handler uses `isScrollSnappingActive`
      // to decide if it should call preventDefault().
      ref.addEventListener("wheel", handleScroll, { passive: false });
    }
    return () => {
      if (ref) {
        ref.removeEventListener("wheel", handleScroll);
      }
    };
  }, [handleScroll]); // `handleScroll` is wrapped in `useCallback` and is stable

  return (
    <div
      ref={sectionRef}
      // Give the container a defined height relative to the viewport
      className="h-[100vh] flex flex-col justify-center items-center overflow-hidden snap-start"
    >
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-blue-200">
        {/* --- Image and Content --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Image Placeholder (Best Practice: Use Next/Image for performance) */}
          <div className="w-full md:w-1/2 flex justify-center items-center h-64 md:h-auto">
            {/* If you were using Next.js Image component: */}
            {/* <Image
              src={featureSlides[currentSlide].image!}
              alt={featureSlides[currentSlide].title}
              width={400} // Placeholder values
              height={300} // Placeholder values
              className="rounded-xl shadow-lg border border-gray-100"
            /> */}

            {/* Simple <img> as the image path is commented out in your original code */}
            <div className="w-full h-full bg-blue-100 flex items-center justify-center rounded-xl shadow-lg border border-gray-200">
              <span className="text-blue-500 font-bold text-xl">
                {featureSlides[currentSlide].title} Image Placeholder
              </span>
            </div>
          </div>

          {/* Content (Changes based on currentSlide) */}
          <div className="w-full md:w-1/2 text-left">
            <p className="text-sm font-semibold text-blue-500 uppercase mb-2">
              Feature {currentSlide + 1} of {MAX_SLIDES}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {featureSlides[currentSlide].title}
            </h3>
            <p className="text-gray-600 text-lg">
              {featureSlides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* --- Navigation Dots (Visual Indicator) --- */}
        <div className="flex justify-center mt-10 space-x-2">
          {featureSlides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)} // Allow clicking dots
            />
          ))}
        </div>
      </div>

      {/* Instruction for user */}
      <p className="mt-8 text-gray-500 font-medium">
        {currentSlide < MAX_SLIDES - 1
          ? "⬇️ Scroll down to view the next feature."
          : "✅ All features reviewed. Scroll down to proceed."}
      </p>
    </div>
  );
};

// Use standard React/Next.js export
export default FeatureCarousel;
