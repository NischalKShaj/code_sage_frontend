// file to show the components for the login
"use client";

// importing the required modules
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { UserLogin } from "@/types/types";
import api from "@/app/api/interceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const router = useRouter();

  // for checking the initial loading
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.push("/dashboard");
    }
  }, []);

  // for changing the values in the input field
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // for submitting the value to the form
  const handleSubmit = async () => {
    try {
      console.log("clicked", formData);
      const loginPromise = api.post("/login", formData);

      toast.promise(loginPromise, {
        loading: "Logging into account...",
        success: "Login completed 🎉",
        error: (err) =>
          err?.response?.data?.message || "Login failed — Please try again ❌",
      });

      const response = await loginPromise;

      const userData = response.data.user;
      const { access_token, refresh_token } = response.data;

      // localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("user", userData);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      router.push("/dashboard");
    } catch (error) {
      console.error("error from the response", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 flex flex-col justify-center">
        {/* Header */}
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Code Sage Logo"
              width={60}
              height={60}
              className="rounded-lg"
            />
          </Link>
          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Code Sage
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Sign in to your developer account
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleFormChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleFormChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3 w-full">
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>
          <Link href="/signup">
            <button className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition">
              Create Account
            </button>
          </Link>

          <p className="flex justify-center mt-2 text-gray-500 text-sm">
            or sign in with
          </p>
          <div className="flex justify-center space-x-3 mt-2">
            <button
              onClick={() =>
                (window.location.href = "http://localhost:4000/login/google")
              }
              className="p-2 cursor-pointer rounded-full border hover:bg-gray-100"
              aria-label="Signup with Google"
            >
              <FaGoogle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </button>
            <button
              onClick={() =>
                (window.location.href = "http://localhost:4000/login/github")
              }
              className="p-2 cursor-pointer rounded-full border hover:bg-gray-100"
              aria-label="Signup with Github"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-4">
          Forgot your password?{" "}
          <Link href="/forgot" className="text-blue-500 hover:underline">
            Reset here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
