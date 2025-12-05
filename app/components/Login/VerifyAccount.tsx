"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Mock verification code for testing
const MOCK_VERIFICATION_CODE = "1234";

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect back to sign in
      router.push("/signin");
    }
  }, [router]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      // Only allow digits
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }

      // Clear any previous errors
      setError("");
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to focus previous input
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleContinue = async () => {
    const code = verificationCode.join("");

    // Validate code is complete
    if (code.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Mock API call - replace with your actual verification logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      if (code === MOCK_VERIFICATION_CODE) {
        setSuccess("Verification successful!");

        // Clear the stored email
        sessionStorage.removeItem("verificationEmail");

        // Redirect to dashboard or next step
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError("Invalid verification code. Please try again.");
        setVerificationCode(["", "", "", ""]); // Clear inputs
        document.getElementById("code-0")?.focus(); // Focus first input
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");

    try {
      // Mock resend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess("Verification code resent successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar with Progress */}
      <div className="relative">
        {/* Black shadow */}
        <div className="absolute top-4 left-4 w-full h-[calc(100%-90px)] bg-black rounded-3xl"></div>

        {/* White sidebar */}
        <div className="relative bg-white rounded-3xl border-2 border-black p-8 w-80 h-[calc(100%-90px)]">
          <div className="space-y-6">
            {/* Verify your account - Current */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span className="text-gray-800 font-semibold">
                Verify your account
              </span>
            </div>

            {/* School overview - Next */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 font-bold text-sm">2</span>
              </div>
              <span className="text-gray-400">School overview</span>
            </div>

            {/* Team overview - Inactive */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 font-bold text-sm">3</span>
              </div>
              <span className="text-gray-400">Team overview</span>
            </div>

            {/* Classes overview - Inactive */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 font-bold text-sm">4</span>
              </div>
              <span className="text-gray-400">Classes overview</span>
            </div>

            {/* Classrooms overview - Inactive */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 font-bold text-sm">5</span>
              </div>
              <span className="text-gray-400">Classrooms overview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col justify-start items-center px-16 pt-16">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Verify your account
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            We sent a code to{" "}
            <span className="text-blue-600 font-medium">
              {email || "your email"}
            </span>
          </p>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Verification Code Inputs */}
          <div className="flex justify-center space-x-4 mb-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 border-2 border-gray-300 rounded-2xl text-center text-2xl font-bold text-gray-800 focus:outline-none focus:border-gray-500 focus:ring-0"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="mb-8">
            <button
              onClick={handleResendCode}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
              disabled={isLoading}
            >
              Didn't receive the code? Resend
            </button>
          </div>

          {/* Continue Button */}
          <div className="absolute right-10 bottom-24 mb-8">
            <button
              onClick={handleContinue}
              disabled={isLoading || verificationCode.join("").length !== 4}
              className={`
                ${
                  verificationCode.join("").length === 4
                    ? "bg-[#287F71] hover:bg-[#1f6359]"
                    : "bg-gray-400 cursor-not-allowed"
                } 
                text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <button className="font-semibold">Continue</button>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            For testing: Use code <strong>1234</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
