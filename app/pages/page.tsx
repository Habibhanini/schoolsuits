"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
    <div className="w-full relative bg-seashell overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[273px] box-border gap-[100px] leading-[normal] tracking-[normal] text-center text-mini text-gray-400 font-inter mq450:gap-[25px] mq1000:gap-[50px]">
      <section className="self-stretch flex flex-row items-start justify-start py-0 px-[680px] box-border max-w-full mq450:pl-[170px] mq450:pr-[170px] mq450:box-border mq1000:pl-[340px] mq1000:pr-[340px] mq1000:box-border"></section>
      <div className="flex flex-row items-start justify-start py-0 px-[746px] mq450:pl-[186px] mq450:pr-[186px] mq450:box-border mq1000:pl-[373px] mq1000:pr-[373px] mq1000:box-border">
        <div className="relative font-medium whitespace-pre-wrap">
          Copyright @TrustConseils 2024 | Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default SignIn;
