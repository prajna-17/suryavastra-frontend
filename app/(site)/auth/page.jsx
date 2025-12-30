"use client";
import { useRouter } from "next/navigation";

import { roboto } from "@/app/fonts";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div
      className={`min-h-screen flex flex-col items-center bg-white ${roboto.className}`}
    >
      {/* Top Logo */}
      <div className="w-full flex items-center justify-center py-6 border-b mt-7">
        <h1 className="text-[#6b3430] font-bold text-xl tracking-wide">
          Login/Sign Up
        </h1>
      </div>

      {/* Sub text */}
      <p className="text-sm text-[#6b3430] mt-7 self-start ml-6 font-medium">
        Login/Sign Up Using Mobile Number
      </p>

      {/* Input Box */}
      <div className="flex items-center gap-5 mt-8 w-90 border-[#6b3430]">
        <select className="border rounded-md border-[#6b3430] p-2 w-5 focus:outline-none self-start">
          <option>+91</option>
        </select>

        <input
          type="text"
          placeholder="Enter your Mobile Number"
          className="border rounded-md p-2 w-full focus:outline-none"
        />
      </div>

      {/* Remember Me */}
      <label className="flex items-center gap-2 mt-4 text-sm text-gray-700 self-start ml-6">
        <input type="checkbox" className="accent-[#591b16]" />
        Remember Me
      </label>

      {/* Terms */}
      <p className="text-xs text-gray-600 mt-40 text-center px-6">
        By continuing, I agree to
        <span className="text-[#6b3430] underline"> Terms of Use </span>&
        <span className="text-[#6b3430] underline"> Privacy Policy</span>
      </p>

      {/* Continue Button */}
      <button
        onClick={() => router.push("/otp")}
        className="bg-[#6b3430] text-white w-85 mt-6 py-2 rounded-md font-semibold active:scale-95"
      >
        Continue
      </button>
    </div>
  );
}
