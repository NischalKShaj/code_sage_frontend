// file accept the login success for the google auth
"use client";

// importing the required modules
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const GoogleSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");
    const username = searchParams.get("username");
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (access_token && refresh_token) {
      const user = { id, username, email };
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <p className="text-center mt-10">Logging in with Google...</p>;
};

export default GoogleSuccess;
