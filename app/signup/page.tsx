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
import ProgressStepper from "../components/landing/ProgressStepper";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mock authentication
    if (email === mockUserData.email && password === mockUserData.password) {
      setSuccess("Sign in successful!");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
      setSuccess("");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Redirect if user is authenticated
    }
  }, [isLoggedIn, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex justify-start items-start py-12 px-10">
        <ProgressStepper />
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
