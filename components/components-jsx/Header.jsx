"use client";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getCart } from "@/utils/cart";
import { getWishlist } from "@/utils/wishlist"; // <-- ADD THIS

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0); // <-- NEW

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCart().length);
      setWishlistCount(getWishlist().length);
    };

    updateCounts();

    window.addEventListener("cart-updated", updateCounts);
    window.addEventListener("wishlist-updated", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("cart-updated", updateCounts);
      window.removeEventListener("wishlist-updated", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    const updateWish = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishCount(wishlist.length);
    };

    updateWish();

    window.addEventListener("wishlist-updated", updateWish);
    window.addEventListener("storage", updateWish);

    return () => {
      window.removeEventListener("wishlist-updated", updateWish);
      window.removeEventListener("storage", updateWish);
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
          {/* Wishlist Icon with Count */}
          <div className="relative cursor-pointer">
            <Link href="/wishlist">
              <IoMdHeartEmpty
                id="wishlist-icon"
                size={24}
                className="cursor-pointer text-[#6b3430]"
              />
            </Link>

            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#6b3430] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                {wishCount}
              </span>
            )}
          </div>

          {/* Cart Icon */}
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
