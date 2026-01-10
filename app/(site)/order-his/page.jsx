"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { roboto } from "@/app/fonts";
import { motion } from "framer-motion";

export default function OrderHistoryPage() {
  const [mounted, setMounted] = useState(false);

  const [quote, setQuote] = useState("");

  const quotes = [
    "Good things take a moment… ✨",
    "Your style story is loading 🤎",
    "Great outfits are worth the wait",
    "We’re stitching your orders together 🧵",
    "Fashion fades, style stays 😉",
  ];

  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusStyles = {
    PLACED: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.userId;

    const fetchOrders = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      setOrders(result.data || []);
      setLoading(false);
    };

    fetchOrders();
  }, [router]);
  if (!mounted) return null;

  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center text-center px-6 ${roboto.className}`}
      >
        <div className="animate-pulse">
          <p className="text-xl font-semibold text-[#6b3430] mb-2">
            {quote || "Loading something beautiful… ✨"}
          </p>
          <p className="text-sm text-gray-500">Please hold on for a sec…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#faf7f6] px-4 pb-10 ${roboto.className}`}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-[#6b3430] mt-6 mb-6"
      >
        Order History
      </motion.h1>

      {orders.length === 0 ? (
        <p className="text-center mt-20 text-gray-500">No orders yet 🛍️</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              // 📱 TAP FEEDBACK
              whileTap={{
                scale: 0.96,
                rotateZ: -0.5,
              }}
              onClick={() => {
                const audio = new Audio("/sounds/pop.mp3");
                audio.volume = 0.6;
                audio.play();

                router.push(`/order-his/${order._id}`);
              }}
              className="
    bg-white rounded-2xl p-4
    shadow-[0_18px_45px_rgba(0,0,0,0.15)]
    cursor-pointer
    relative
    overflow-hidden
  "
            >
              {/* subtle glow on tap */}
              <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 active:opacity-100 transition-opacity" />

              {/* Gradient strip */}
              <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#6b3430] via-[#c9897b] to-[#f3e1dd] mb-3" />

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-semibold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    statusStyles[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* PRODUCTS */}
              <div className="space-y-3">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-xl shadow-sm"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">₹{item.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-4 pt-3 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Payment
                  <div className="text-sm font-medium">
                    {order.paymentMethod}
                  </div>
                </div>

                <div className="text-lg font-bold text-[#6b3430]">
                  ₹{order.totalAmount}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
