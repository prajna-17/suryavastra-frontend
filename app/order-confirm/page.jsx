"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";

export default function OrderConfirmPage() {
  const [orderNumber, setOrderNumber] = useState(null);
  const [today, setToday] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setOrderNumber(Math.floor(Math.random() * 9000000 + 1000000));
    setToday(
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    );
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) setCartItems(getCart());
  }, [mounted]);

  if (!mounted) return null;

  const grandTotal = cartItems.reduce((t, i) => {
    const price = Number(i.price.replace(/,/g, ""));
    return t + price * Number(i.qty);
  }, 0);

  const address =
    typeof window !== "undefined" && localStorage.getItem("userAddress")
      ? JSON.parse(localStorage.getItem("userAddress"))
      : null;

  return (
    <div className={`min-h-screen bg-white ${roboto.className}`}>
      <div className="bg-[#C98A8A] text-center pb-20 pt-12 relative">
        <div className="w-14 h-14 mx-auto rounded-full bg-white flex items-center justify-center shadow-md">
          <span className="text-[#C98A8A] text-2xl font-bold">✔</span>
        </div>

        <p className="mt-3 text-xl font-semibold text-white">
          Order Confirmed !
        </p>
        <p className="text-white text-sm mt-1">
          Your beautiful saree is on its way !
        </p>

        {/* Floating Card */}
        <div className="absolute left-1/2 bottom-[-38px] -translate-x-1/2 w-[85%] bg-white shadow-lg rounded-xl px-5 py-4 grid grid-cols-2 text-sm font-medium">
          <div className="flex flex-col items-start">
            <p className="text-gray-600 text-xs">Order Number</p>
            <p className="text-[#6b3430] font-semibold mt-1 text-base">
              #{orderNumber}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p className="text-gray-600 text-xs">Order Date</p>
            <p className="text-[#6b3430] font-semibold mt-1 text-base">
              {today}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-16 space-y-6 mb-12 flex flex-col items-center">
        {/* Expected Delivery Section */}
        <div className="w-[95%] bg-white mx-auto rounded-2xl p-6 shadow-[0_0_25px_rgba(201,138,138,0.30)]">
          {/* Heading + Icon */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-md bg-[#f1d1d1] flex items-center justify-center">
              {/* Truck Icon SVG */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b3430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <path d="M16 8h4l3 3v5h-7z"></path>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 font-semibold text-[15px]">
                Expected Delivery
              </p>
              <p className="text-[14px] font-bold text-[#6b3430] mt-1 ml-[0.5px]">
                21 - 23 Dec, 2025
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-14 mt-6 -ml-6">
            {/* Line: Confirmed → Processing (pink) */}
            <div className="absolute left-[40px] top-[30px] h-[40px] w-[2px] bg-[#C98A8A] z-0 "></div>

            {/* Line: Processing → Delivered (grey) */}
            <div className="absolute left-[40px] top-[95px] h-[40px] w-[2px] bg-gray-400 opacity-40 z-0"></div>

            {/* ORDER CONFIRMED */}
            <div className="flex items-start gap-3 mb-10 relative z-10">
              <div className="-ml-[28px] w-7 h-7 rounded-full bg-[#C98A8A] flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">✔</span>
              </div>

              <div>
                <p className="text-[13px] font-semibold text-[#a0918f] leading-tight">
                  Order Confirmed
                </p>
                <p className="text-[10px] text-gray-900 leading-tight font-semibold mt-2">
                  Dec 18, 2025 02:45 PM
                </p>
              </div>
            </div>

            {/* PROCESSING */}
            <div className="flex items-start gap-3 mb-10 relative z-10">
              <div className="-ml-[28px] w-6 h-6 rounded-full border-[1px] border-[#e0d3d3] bg-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white border-[1px] border-[#fcf9f9]"></div>
              </div>

              <div>
                <p className="text-[13px] text-[#c5bab9] leading-tight">
                  Processing
                </p>
                <p className="text-[10px] text-[#c5bab9] leading-tight">
                  Within 24 Hrs
                </p>
              </div>
            </div>

            {/* DELIVERED */}
            <div className="flex items-start gap-3 opacity-40 relative z-10">
              <div className="-ml-[28px] w-6 h-6 rounded-full border-[1px] border-[#e0d3d3] bg-gray-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white border-[1px] border-[#fcf9f9]"></div>
              </div>

              <div>
                <p className="text-[13px] text-gray-400 leading-tight">
                  Delivered
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  21 - 23 Dec
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-[0_0_25px_rgba(201,138,138,0.25)] w-[95%] mx-auto mt-4 overflow-hidden">
          <div className="p-5">
            <p className="font-semibold text-[16px] mb-4">Your Order</p>

            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-center mb-4">
                  <Image
                    src={item.image}
                    width={75}
                    height={85}
                    alt={item.name}
                    className="rounded-xl object-cover"
                  />

                  <div className="text-[13px] leading-tight">
                    <p>
                      <span className="font-bold">
                        {item.name.split(" ")[0]}
                      </span>{" "}
                      {item.name.split(" ").slice(1).join(" ")}
                    </p>
                    <p className="text-xs text-gray-900 font-semibold mt-1">
                      Qty : {item.qty}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No items found</p>
            )}
          </div>

          <div className="bg-[#f6e4e4] px-5 py-3 flex  justify-between items-center text-[15px] font-semibold rounded-b-2xl">
            <span>Total Amount</span>
            <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white shadow-md rounded-xl p-5 w-[95%] text-sm">
          <p className="font-medium mb-1">Delivery Details</p>
          <p className="font-semibold mt-4">{address?.name}</p>
          <p>
            {address?.details}, {address?.city}, {address?.pincode}
          </p>
          <p className="text-xs mt-1 text-gray-500 font-semibold">
            +91 {address?.phone}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between w-[85%] text-sm">
          {["Track", "Invoice", "Share", "Support"].map((l) => (
            <button
              key={l}
              className="flex flex-col items-center shadow-md bg-white p-3 rounded-xl w-[22%]"
            >
              ● <span className="mt-1">{l}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-[85%] bg-[#6b3430] text-white py-3 rounded-md font-medium active:scale-95"
        >
          Continue Shopping →
        </button>

        <p className="text-xs text-center mt-2 mb-5 opacity-70 font-semibold">
          🙏 Thank you for choosing us !
        </p>
      </div>
    </div>
  );
}
