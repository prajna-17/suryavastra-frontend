"use client";
import { roboto } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";

export default function CartFooter() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  // 🔥 Live listener for cart changes
  useEffect(() => {
    const updateCart = () => setCartCount(getCart().length);

    updateCart(); // initial load

    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);
  const handlePlaceOrder = () => {
    if (!cartCount) return;

    const token = localStorage.getItem("token");
    localStorage.removeItem("checkoutProduct");

    if (!token) {
      // 🔑 IMPORTANT: tell app this is checkout login
      localStorage.setItem("auth_intent", "CHECKOUT");
      router.push("/auth");
      return;
    }

    router.push("/order");
  };

  return (
    <button
      disabled={cartCount === 0}
      onClick={handlePlaceOrder}
      className={`fixed bottom-4 left-4 right-4 py-4 rounded-lg font-semibold text-center 
      active:scale-95 transition 
      ${roboto.className} 
      ${
        cartCount === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#591b16] text-white cursor-pointer"
      }`}
    >
      PLACE ORDER
    </button>
  );
}
