"use client";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/utils/cart";
import { getWishlist, clearWishlist } from "@/utils/wishlist";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import SideMenu from "./SideMenu";

function Header() {
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Check login status
  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  // 🔹 Update cart, wishlist & login state
  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCart().length);
      setWishlistCount(getWishlist().length);
      setIsLoggedIn(!!getToken());
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

  // 🔹 Logout handler
  const handleLogout = () => {
    clearCart();
    clearWishlist();

    localStorage.removeItem("token");
    localStorage.removeItem("phone"); // or email
    localStorage.removeItem("isProfileComplete");

    window.dispatchEvent(new Event("storage")); // refresh header state
    router.push("/");
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-[9999] shadow-md">
        <div className="header-banner text-center bg-[#f5e0d8] py-1 text-sm text-[#6b3430]">
          Enjoy extra 10% off on your first purchase
        </div>

        <div className="header-icons flex items-center justify-between px-4 py-3">
          {/* Menu */}
          <LuMenu
            size={26}
            className="cursor-pointer text-[#6b3430]"
            onClick={() => setMenuOpen(true)}
          />

          {/* Logo */}
          <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />

          {/* Right Icons */}
          <div className="flex gap-5 items-center">
            {/* Logout */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-[#6b3430]"
              >
                Logout
              </button>
            )}

            {/* Wishlist */}
            <div className="relative cursor-pointer">
              <Link href="/wishlist">
                <IoMdHeartEmpty size={24} className="text-[#6b3430]" />
              </Link>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6b3430] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer">
              <Link href="/cart">
                <IoCartOutline size={24} className="text-[#6b3430]" />
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6b3430] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;
