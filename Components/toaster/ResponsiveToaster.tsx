// for creating the toaster
"use client";

// importing the required modules
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ResponsiveToaster() {
  const [isMobile, setIsMobile] = useState(false);
  const SM_BREAKPOINT = 640;

  const checkMobile = () => {
    setIsMobile(window.innerWidth < SM_BREAKPOINT);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  const position = isMobile ? "bottom-center" : "top-right";

  return (
    <Toaster
      position={position}
      toastOptions={{
        style: {
          padding: isMobile ? "8px 12px" : "12px 18px",
          fontSize: isMobile ? "0.8rem" : "1rem",
          borderRadius: "10px",
        },
        success: {
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#F44336",
            color: "#fff",
          },
        },
      }}
    />
  );
}
