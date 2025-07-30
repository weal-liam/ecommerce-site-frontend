'use client'

import { useState } from "react";
import LoginForm from "@/components/login-form";
import SignupForm from "@/components/signup-form";
import Footer from "./Footer";
import SiteLogo from "./SiteLogo";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[20px]">
        <SiteLogo />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            className={`px-6 py-2 font-semibold focus:outline-none ${
              activeTab === "login"
                ? "border-b-2 border-stone-600 text-stone-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`px-6 py-2 font-semibold focus:outline-none ${
              activeTab === "signup"
                ? "border-b-2 border-stone-600 text-stone-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
            type="button"
          >
            Sign Up
          </button>
        </div>
        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-stone-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-stone-600 hover:underline">
            Privacy Policy
          </a>.
        </p>
       </div>
        <Footer />
    </div>
  );
}