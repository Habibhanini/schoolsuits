"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const mockUserData = {
  email: "test@example.com",
  password: "password123",
};

import { RootState } from "@/app/store/store";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/footer";
import LoginForm from "../components/Login/LoginForm";

const SignIn = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleSubmit = (email: string, password: string) => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Mock authentication
    if (email === mockUserData.email && password === mockUserData.password) {
      setSuccess("Sign in successful! Redirecting to verification...");

      // Store email in sessionStorage for verification page
      sessionStorage.setItem("verificationEmail", email);

      setTimeout(() => {
        router.push("/verify-account");
      }, 1000);
    } else {
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Redirect if user is authenticated
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex justify-center items-center py-8 px-4">
        <LoginForm onSubmit={handleSubmit} error={error} success={success} />
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
