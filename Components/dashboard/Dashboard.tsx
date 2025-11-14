// file to create the component for the dashboard
"use client";

// importing the file for the application
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/");
    }
    router.push("/dashboard");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div>
      <div>This is the dashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
