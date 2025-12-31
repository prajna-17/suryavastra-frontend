"use client";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { rougeScript } from "@/app/fonts";
import { robotoSlab } from "@/app/fonts";
import { useEffect } from "react";

const menuItems = [
  { name: "Availability", icon: "/img/available.png" },
  { name: "Price", icon: "/img/price-tag.png" },
  { name: "Product Type", icon: "/img/delivery-service.png" },
  { name: "Fabric", icon: "/img/fabric.png" },
  { name: "Colour", icon: "/img/color-palette.png" },
  { name: "More", icon: "/img/menu.png" },
  { name: "Gifting", icon: "/img/surprise.png" },
  { name: "Help & Support", icon: "/img/customer-support.png" },
];

export default function SideMenu({ isOpen, onClose }) {
  // stop background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-[99998]
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
      />

      {/* SIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-screen w-[75%] overflow-y-scroll overscroll-none
        bg-white p-3 transition-transform duration-300 z-[99999] shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#f0f0f0] rounded-md p-1"
        >
          <IoClose size={20} />
        </button>

        {/* Hello Box */}
        <div className="rounded-2xl relative shadow mt-10 mb-6 overflow-hidden">
          <Image
            src="/img/rectangle.png"
            alt="hello-bg"
            width={600}
            height={200}
            className="w-full h-[150px] object-cover"
          />

          <div className="absolute inset-0 text-white p-5 flex flex-col justify-between">
            <p className={`text-[28px] italic ${rougeScript.className}`}>
              Hello
            </p>
            <h2 className="text-3xl font-bold -mt-1">You !</h2>

            <Image
              src="/img/stars.png"
              alt="stars"
              width={60}
              height={60}
              className="absolute top-4 right-4 opacity-90"
            />

            <button className="bg-[#6b3430] text-white px-4 py-2 rounded-md mt-2 text-sm w-fit">
              Login / Sign Up
            </button>
          </div>
        </div>

        {/* Menu List */}
        <div className={`flex flex-col gap-3 ${robotoSlab.className}`}>
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm 
              border border-[#f1e5e4] active:scale-95 transition"
            >
              <div className="flex items-center gap-3">
                <Image src={item.icon} alt={item.name} width={22} height={22} />
                <span className="text-[#5c2d25] text-[14px]">{item.name}</span>
              </div>
              <FiChevronRight size={18} className="text-[#5c2d25]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
