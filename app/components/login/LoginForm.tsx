"use client";

import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  error?: string;
  success?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, success }) => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, passcode);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Black shadow positioned behind and offset */}
      <div className="absolute top-4 left-[10px] w-[calc(100%-90px)] h-full bg-black rounded-3xl"></div>

      {/* Main form container with thick black border */}
      <div className="relative bg-white rounded-3xl border-2 border-black p-12 w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            School Login
          </h1>
          <p className="text-gray-700 text-base leading-relaxed">
            Please enter your details to get sign in
            <br />
            to your account
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter Email / Phone No"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-700 placeholder-gray-500 text-lg"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-400 rounded-2xl focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-700 placeholder-gray-500 text-lg pr-20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 text-lg font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-left mt-4">
            <button
              type="button"
              className="text-black font-semibold hover:text-gray-700"
            >
              Having trouble in sign in?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-2xl transition-colors duration-200 text-lg mt-8"
          >
            Sign in
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-700 text-base">
              Doesn't have an account?{" "}
              <Link
                href="/signup"
                className="text-black font-bold hover:text-gray-700"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
