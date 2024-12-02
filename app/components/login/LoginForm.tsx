import React, { useState } from "react";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-[500px] h-[490px] border  border-gray-200">
      <h2 className="text-2xl font-bold font-jakarta text-gray-800 text-center p-5 ">
        School Login
      </h2>
      <p className="text-lg text-black text-center px-10 mb-6">
        Please enter your details to get sign in to your account
      </p>
      <form className="px-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Email / Phone No"
            className="input input-bordered w-full placeholder:text-gray-400  placeholder:font-normal "
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Passcode"
            className="input input-bordered w-full placeholder:text-gray-400  placeholder:font-normal"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 px-2 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="text-left mb-4 text-[15px] font-medium text-black hover:underline">
          <a href="#">Having trouble in sign in?</a>
        </div>
        <button className="rounded-[10px] font-semibold font-jakarta text-base w-full h-[55px]  bg-yellow-500 hover:bg-yellow-600">
          Sign in
        </button>
        <div className="text-center text-sm mt-4">
          <span>Doesn't have an account? </span>
          <a
            href="#"
            className="text-black font-semibold text-[15px] hover:underline"
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
