// file to show the components for the login
"use client";

// importing the required modules
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { UserSignup } from "@/types/types";
import api from "@/app/api/interceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState<UserSignup>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  // for handling the changing value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // for submitting the form data
  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill all the fields ⚠️");
      return;
    }
    try {
      const signupPromise = api.post("/signup", formData);
      toast.promise(signupPromise, {
        loading: "Creating your account...",
        success: "Account created successfully 🎉",
        error: (err) =>
          err?.response?.data?.message || "Signup failed — Please try again ❌",
      });

      const response = await signupPromise;

      router.push("/login");
    } catch (error) {
      console.error("error from data response");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8 overflow-auto">
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
            Create your Account
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
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
            Signup
          </button>

          <p className="flex justify-center mt-2 text-gray-500 text-sm">
            or sign up with
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
              className="p-2 cursor-pointer rounded-full border hover:bg-gray-100 "
              aria-label="Signup with Github"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-4">
          Already have account?
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
