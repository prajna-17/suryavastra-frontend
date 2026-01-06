"use client";
import { useState, useEffect, useRef } from "react";
import { roboto } from "@/app/fonts";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const timerRef = useRef(null);

  const [resendTimer, setResendTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);

  const [verifying, setVerifying] = useState(false);

  const [otp, setOtp] = useState("");
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";

  const router = useRouter();

  const [showRegister, setShowRegister] = useState(false);
  const handleVerifyOtp = async () => {
    if (verifying) return;
    setVerifying(true);

    if (!email) {
      alert("Email missing. Please login again.");
      setVerifying(false);
      router.push("/auth");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter full 6-digit OTP");
      setVerifying(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        // 🔁 MIGRATE GUEST CART → USER CART
        const userId = JSON.parse(atob(data.token.split(".")[1])).userId;

        const guestCart = JSON.parse(localStorage.getItem("cart_guest")) || [];
        const userCartKey = `cart_${userId}`;

        if (guestCart.length > 0) {
          localStorage.setItem(userCartKey, JSON.stringify(guestCart));
          localStorage.removeItem("cart_guest");
          window.dispatchEvent(new Event("cart-updated"));
        }

        localStorage.setItem(
          "isProfileComplete",
          data.isProfileComplete ? "true" : "false"
        );

        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          if (data.isProfileComplete) {
            router.push("/order"); // or cart/checkout page
          } else {
            setShowRegister(true); // ✅ CORRECT
          }
        }
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      alert("Verification failed");
    }
    setVerifying(false);
  };
  const startResendTimer = () => {
    // 🔥 CLEAR any existing interval first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setCanResend(false);
    setResendTimer(300);

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startResendTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleResendOtp = async () => {
    if (!canResend) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    startResendTimer(); // 🔥 THIS WAS MISSING
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center bg-white ${roboto.className}`}
    >
      {/* Top Header */}
      <div className="w-full flex flex-col items-center py-6 border-b mt-7 border-[#6b3430]">
        <h1 className="text-[#6b3430] font-bold text-xl tracking-wide">
          {showRegister ? "Register user" : "Login/Sign Up"}
        </h1>

        {showRegister && (
          <p className="text-[#6b3430] text-sm mt-1 font-semibold">
            Welcome! Please fill the details
          </p>
        )}
      </div>

      {/* OTP SECTION (first screen) */}
      {!showRegister && (
        <>
          {/* Sub text */}
          <p className="text-sm text-[#6b3430] mt-7 self-start ml-6 font-medium">
            Login/Sign Up Using Mobile Number
          </p>

          <div className="bg-[#f6e6e4] text-[#070707] mt-6 w-[95%] px-3 py-2 rounded-md text-sm">
            OTP sent to your Email!!
          </div>

          {/* OTP Boxes */}
          <div className="flex gap-5 mt-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  type="text"
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setOtp((prev) => {
                      const arr = prev.split("");
                      arr[i] = value;
                      return arr.join("");
                    });
                  }}
                  className="w-10 h-12 border border-[#6b3430] rounded text-center text-lg focus:border-[#591b16] focus:outline-none"
                />
              ))}
          </div>

          <p className="mt-6 text-sm font-semibold">
            Haven't received the OTP?
          </p>

          <p className="text-sm mt-4">
            {canResend ? (
              <span
                onClick={handleResendOtp}
                className="text-[#6b3430] underline cursor-pointer"
              >
                Resend OTP
              </span>
            ) : (
              <span className="text-gray-600">Resend in {resendTimer}s</span>
            )}
          </p>

          <p className="text-xs text-gray-900 mt-25 text-center px-6 font-semibold">
            By continuing, I agree to
            <span className="text-[#6b3430] underline"> Terms of Use </span>&
            <span className="text-[#6b3430] underline"> Privacy Policy</span>
          </p>

          <button
            disabled={verifying}
            onClick={handleVerifyOtp}
            className="bg-[#6b3430] text-white w-[95%] mt-6 py-2 rounded-md font-semibold active:scale-95"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* REGISTER SECTION (after Verify)*/}
      {showRegister && (
        <div className="w-[95%] flex flex-col items-center py-2  ">
          <select className="border border-[#6b3430] rounded-md p-3  mt-6 text-sm focus:outline-none font-semibold">
            <option>Title</option>
            <option>Mr.</option>
            <option>Ms.</option>
          </select>

          <input
            className="border border-[#6b3430] rounded-md p-3 w-[95%] mt-6 text-sm focus:outline-none font-semibold"
            placeholder="Enter Full Name"
          />

          <div className="flex gap-2 w-[95%] mt-6">
            <select className="border border-[#6b3430] rounded-md p-3 w-20 text-sm focus:outline-none font-semibold">
              <option>+91</option>
            </select>
            <input
              className="border border-[#6b3430] rounded-md p-3 flex-1 text-sm focus:outline-none font-semibold"
              placeholder="Enter your Mobile Number"
            />
          </div>

          <input
            className="border border-[#6b3430] rounded-md p-3 w-[95%] mt-6 text-sm focus:outline-none font-semibold"
            placeholder="Enter Email ID"
          />

          <p className="text-xs text-gray-900 mt-15 text-center w-[95%] font-semibold">
            By continuing, I agree to{" "}
            <span className="underline text-[#6b3430]">Terms of Use</span> &{" "}
            <span className="underline text-[#6b3430]">Privacy Policy</span>
          </p>

          <button
            onClick={() => router.push("/order")}
            className="bg-[#6b3430] text-white w-[95%] mt-6 py-2 rounded-md font-semibold active:scale-95"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
