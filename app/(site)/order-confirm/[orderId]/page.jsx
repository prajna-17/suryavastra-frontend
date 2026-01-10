"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { getUserIdFromToken } from "@/utils/auth";
import { getAddressKey } from "@/utils/address";
import { motion } from "framer-motion";

export default function OrderConfirmPage() {
  const [orderDate, setOrderDate] = useState(null);
  const [deliveryRange, setDeliveryRange] = useState("");

  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [orderNumber, setOrderNumber] = useState(null);
  const [today, setToday] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 🔊 sound
    const audio = new Audio("/sounds/success.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});

    // ✨ confetti
    (async () => {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 90,
        spread: 70,
        startVelocity: 28,
        gravity: 0.6,
        scalar: 1.1,
        origin: { y: 0.45 },
        colors: ["#f5c77a", "#e6b65c", "#cfa94a"],
      });
    })();

    // 🛒 order data
    const checkoutProduct = localStorage.getItem("checkoutProduct");
    setCartItems(checkoutProduct ? [JSON.parse(checkoutProduct)] : getCart());

    setOrderNumber(Math.floor(Math.random() * 9000000 + 1000000));

    const now = new Date();

    setOrderDate(now);

    const start = new Date(now);
    const end = new Date(now);

    start.setDate(start.getDate() + 7);
    end.setDate(end.getDate() + 9);

    const options = { day: "2-digit", month: "short" };
    setDeliveryRange(
      `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString(
        "en-US",
        options
      )}`
    );

    setToday(
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    );

    const storedAddress = localStorage.getItem(getAddressKey());
    if (storedAddress) setAddress(JSON.parse(storedAddress));
  }, []);

  const grandTotal = cartItems.reduce((t, i) => {
    const price = Number(i.price);
    return t + price * Number(i.qty);
  }, 0);

  useEffect(() => {
    if (!cartItems.length) return;

    const timer = setTimeout(() => {
      const userId = getUserIdFromToken();
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      }
      localStorage.removeItem("checkoutProduct");
    }, 1500); // wait for animation + render

    return () => clearTimeout(timer);
  }, [cartItems]);
  const getDeliveryRange = () => {
    const start = new Date();
    const end = new Date();

    start.setDate(start.getDate() + 7);
    end.setDate(end.getDate() + 9);

    const options = { day: "2-digit", month: "short" };

    return `${start.toLocaleDateString(
      "en-US",
      options
    )} - ${end.toLocaleDateString("en-US", options)}`;
  };
  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-white ${roboto.className}`}>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 1.8,
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{
          position: "fixed",
          inset: 0,
          transformOrigin: "top",
          background:
            "radial-gradient(circle at center, #f3d6c6 0%, #b85c5c 45%, #6b1f1f 100%)",
          zIndex: 50,
        }}
      />

      <div className="bg-[#C98A8A] text-center pb-20 pt-12 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: 0.2,
          }}
          className="w-14 h-14 mx-auto rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <span className="text-[#C98A8A] text-2xl font-bold">✔</span>
        </motion.div>

        <p className="mt-3 text-xl font-semibold text-white">
          Order Confirmed !
        </p>
        <p className="text-white text-sm mt-1">
          Your beautiful saree is on its way !
        </p>

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
        <div className="w-[95%] bg-white mx-auto rounded-2xl p-6 shadow-[0_0_25px_rgba(201,138,138,0.30)]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-md bg-[#f1d1d1] flex items-center justify-center">
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
                {getDeliveryRange()}
              </p>
            </div>
          </div>

          <div className="relative pl-14 mt-6 -ml-6">
            <div className="absolute left-[40px] top-[30px] h-[40px] w-[2px] bg-[#C98A8A] z-0"></div>
            <div className="absolute left-[40px] top-[95px] h-[40px] w-[2px] bg-gray-400 opacity-40 z-0"></div>

            <div className="flex items-start gap-3 mb-10 relative z-10">
              <div className="-ml-[28px] w-7 h-7 rounded-full bg-[#C98A8A] flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">✔</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#a0918f]">
                  Order Confirmed
                </p>
                <p className="text-[10px] text-gray-900 font-semibold mt-2">
                  {orderDate?.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-10 relative z-10">
              <div className="-ml-[28px] w-6 h-6 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-[13px] text-[#c5bab9]">Processing</p>
                <p className="text-[10px] text-[#c5bab9]">Within 24 Hrs</p>
              </div>
            </div>

            <div className="flex items-start gap-3 opacity-40 relative z-10">
              <div className="-ml-[28px] w-6 h-6 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-[13px] text-gray-400">Delivered</p>
                <p className="text-[10px] text-gray-500">{deliveryRange}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow w-[95%] overflow-hidden">
          <div className="p-5">
            <p className="font-semibold mb-4">Your Order</p>

            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-center mb-4">
                <Image
                  src={item.image}
                  width={75}
                  height={85}
                  alt={item.name}
                  className="rounded-xl"
                />
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm">Qty : {item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#f6e4e4] px-5 py-3 flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>

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

        <div className="flex justify-between w-[85%] text-sm">
          {["Track", "Invoice", "Share", "Support"].map((l) => (
            <button
              key={l}
              className="shadow-md bg-white p-3 rounded-xl w-[22%]"
            >
              ● <span className="mt-1">{l}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-[85%] bg-[#6b3430] text-white py-3 rounded-md font-medium"
        >
          Continue Shopping →
        </button>

        <p className="text-xs text-center mt-2 opacity-70 font-semibold">
          🙏 Thank you for choosing us !
        </p>
      </div>
    </div>
  );
}
