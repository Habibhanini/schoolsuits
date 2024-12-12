"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/footer";
import ProgressStepper from "../components/landing/ProgressStepper";
import SchoolForm from "../components/Signup/SchoolForm";
import Classroom from "../components/Signup/Classroom";

const SignUp = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // State to manage the current step
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Redirect if user is authenticated
    }
  }, [isLoggedIn, router]);

  // Handler for the "Continue" button
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-row flex">
        <div className="justify-start items-start py-12 pl-10">
          <ProgressStepper currentStep={currentStep} />
        </div>
        <div className="flex-1 flex items-center justify-center w-full px-11">
          {currentStep === 2 && <SchoolForm />}
          {currentStep === 3 && <Classroom />}
        </div>
      </div>
      {currentStep < 4 && (
        <button
          onClick={handleBack}
          className="absolute bottom-14 left-[30%] w-48 py-3 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500"
        >
          Back
        </button>
      )}
      {currentStep < 4 && (
        <button
          onClick={handleContinue}
          className="absolute bottom-14 right-14 w-48 py-3 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500"
        >
          Continue
        </button>
      )}
      <Footer />
    </div>
  );
};

export default SignUp;
