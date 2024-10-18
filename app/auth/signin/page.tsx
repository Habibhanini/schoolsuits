"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const mockUserData = {
  email: "test@example.com",
  password: "password123",
};
import { RootState } from "@/app/store/store";

const SignIn = () => {
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 p-3 w-full rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-3 w-full rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-continue-yellow text-black py-3 rounded-xl w-full font-semibold text-lg hover:bg-continue-yellow-dark transition-all"
        >
          Continue
        </button>
        <div className="relative flex items-center w-full mt-6">
          <div className="flex-grow h-[2px] bg-gray-300"></div>
          <span className="px-2 text-black font-bold">OR</span>
          <div className="flex-grow h-[2px] bg-gray-300"></div>
        </div>

        <div className="mt-4 text-center space-y-2">
          <button
            type="submit"
            className="bg-white border-2 text-black py-3 rounded-xl w-full font-semibold text-lg hover:bg-gray-200 transition-all"
          >
            Sign Up with Google
          </button>
          <button
            type="submit"
            className="bg-white border-2 text-black py-3 rounded-xl w-full font-semibold text-lg hover:bg-gray-200 transition-all"
          >
            Sign Up with Apple ID
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
