"use client";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { rougeScript } from "@/app/fonts";
import { roboto } from "@/app/fonts";
import { robotoSlab } from "@/app/fonts";

const menuItems = [
  "Availability",
  "Price",
  "Product Type",
  "Fabric",
  "Colour",
  "More",
  "Gifting",
  "Help & Support",
];

export default function SideMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Dim Background */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-[99998]
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[75%] bg-white p-3 transition-transform duration-300 
        z-[99999] shadow-2xl 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#f0f0f0] rounded-md p-1"
        >
          <IoClose size={20} />
        </button>

        {/* Hello Card */}
        <div className="rounded-lg bg-gradient-to-br from-[#b47a6b] to-[#c89b8a] text-white p-5 mt-10 mb-6 shadow">
          <p
            className={`text-[30px] text-base italic ${rougeScript.className}`}
          >
            Hello
          </p>
          <h2 className="text-2xl font-bold">You!</h2>
          <button className="bg-[#6b3430] text-white px-4 py-2 rounded-md mt-4 text-sm">
            Login / Sign Up
          </button>
        </div>

        {/* Menu List */}
        <div className={`flex flex-col gap-3 ${robotoSlab.className}`}>
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm 
              border border-[#f1e5e4] active:scale-95 transition"
            >
              <span className="text-[#5c2d25] text-[13px] font-normal">
                {item}
              </span>
              <FiChevronRight size={18} className="text-[#5c2d25]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
