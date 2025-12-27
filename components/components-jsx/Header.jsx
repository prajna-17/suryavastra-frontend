"use client";

import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(cart.length); // 🔥 only unique items count
    };

    updateCartCount(); // initial load

    // 🔥 listen for changes (no refresh required)
    window.addEventListener("cart-updated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-[9999] shadow-md">
      <div className="header-banner text-center bg-[#f5e0d8] py-1 text-sm text-[#6b3430]">
        Enjoy extra 10% off on your first purchase
      </div>

      <div className="header-icons flex items-center justify-between px-4 py-3">
        <LuMenu size={26} className="cursor-pointer text-[#6b3430]" />

        <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />

        <div className="flex gap-5 items-center">
          <IoMdHeartEmpty size={24} className="cursor-pointer text-[#6b3430]" />

          <div className="relative cursor-pointer">
            <Link href="/cart">
              <IoCartOutline
                size={24}
                className="hover:scale-110 transition text-[#6b3430]"
              />
            </Link>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#6b3430] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
