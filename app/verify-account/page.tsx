// app/verify-account/page.tsx

import Navbar from "../components/landing/Navbar";
import VerifyAccount from "../components/Login/VerifyAccount";

export default function VerifyAccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="mt-4 ml-4 mb-4">
        {" "}
        {/* Spacer for Navbar */}
        <VerifyAccount />
      </div>
    </div>
  );
}
