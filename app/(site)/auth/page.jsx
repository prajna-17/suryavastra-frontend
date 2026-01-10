"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const [sendingOtp, setSendingOtp] = useState(false);

  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSendOtp = async () => {
    if (sendingOtp) return; // 🔒 STOP DUPLICATE OTP
    setSendingOtp(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("email", email);
        router.push("/otp");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      alert("Something went wrong");
    }
    setSendingOtp(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Top Logo */}
      <div className="w-full flex items-center justify-center py-6 border-b mt-7">
        <h1 className="text-[#6b3430] font-bold text-xl tracking-wide">
          Login/Sign Up
        </h1>
      </div>

      {/* Sub text */}
      <p className="text-sm text-[#6b3430] mt-7 self-start ml-6 font-medium">
        Login/Sign Up Using Email
      </p>

      {/* Input Box */}
      <div className="flex items-center gap-5 mt-8 w-90 border-[#6b3430]">
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        disabled={sendingOtp}
        onClick={handleSendOtp}
        className="bg-[#6b3430] text-white w-85 mt-6 py-2 rounded-md font-semibold active:scale-95"
      >
        Continue
      </button>
    </div>
  );
}
