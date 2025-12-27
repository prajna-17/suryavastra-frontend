"use client";

import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

function Header() {
  return (
    <header className="w-full bg-white sticky top-0 z-[9999] shadow-md">
      <div className="header-banner text-center bg-[#f5e0d8] py-1 text-sm">
        Enjoy extra 10% off on your first purchase
      </div>

      <div className="header-icons flex items-center justify-between px-4 py-3">
        <LuMenu size={26} className="cursor-pointer" />

        <img src="/img/logo.png" alt="Logo" className="h-8 w-auto" />

        <div className="flex gap-4 items-center">
          <IoMdHeartEmpty size={24} className="cursor-pointer" />

          <Link href="/cart">
            <IoCartOutline
              size={24}
              className="cursor-pointer hover:scale-110 transition"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
