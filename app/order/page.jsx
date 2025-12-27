"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/utils/cart";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { roboto } from "@/app/fonts";
import { robotoSlab } from "@/app/fonts";

export default function OrderPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    const saved = localStorage.getItem("userAddress");
    if (saved) setAddress(JSON.parse(saved));
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const refreshCart = () => {
    setCartItems(getCart());
  };

  const grandTotal = cartItems.reduce((t, i) => t + i.price * i.qty, 0);
  const mrpTotal = cartItems.reduce((t, i) => t + i.mrp * i.qty, 0);
  const discount = mrpTotal - grandTotal;

  return (
    <div className={`min-h-screen bg-white pb-28 px-4 ${roboto.className}`}>
      {/* Deliver To */}
      <div className={`mt-8 ${robotoSlab.className}`}>
        <div className="flex items-center gap-2">
          <Image src="/img/loc.jpeg" alt="pin" width={20} height={20} />
          <h2 className="font-medium text-base" style={{ color: "#6b3430" }}>
            Deliver To
          </h2>
        </div>
        <div className="border border-dashed border-[#6b3430] rounded-lg p-3 flex items-center justify-between mt-7">
          <div className="text-sm text-[#0c0b0b] font-medium leading-tight">
            {address ? (
              <>
                <span className="font-semibold">{address.name}</span>
                <br />
                <span className="font-normal">
                  {" "}
                  {address.details},{address.city}, - {address.pincode}
                </span>
              </>
            ) : (
              "No saved address"
            )}
          </div>

          {address ? (
            <button
              onClick={() => (window.location.href = "/new-address")}
              className="text-xs font-semibold border border-[#6b3430] px-4 py-1 rounded-md text-[#6b3430] active:scale-95"
            >
              CHANGE
            </button>
          ) : (
            <button
              onClick={() => (window.location.href = "/new-address")}
              className="flex items-center gap-2 text-xs border border-[#6b3430] px-3 py-1 rounded-md text-[#6b3430] active:scale-95"
            >
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#6b3430] text-white text-xs font-semibold">
                +
              </span>
              New Address
            </button>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-10 space-y-3 text-sm">
        <h3 className="font-semibold flex items-center gap-2 text-[#080808]">
          💳 Payment Details
          <span className="text-gray-500">({cartItems.length} Items)</span>
        </h3>

        <div className="flex justify-between text-gray-500 font-medium mt-6">
          <span>Sub Total</span>
          <span>₹ {mrpTotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between text-gray-500 font-medium">
          <span>Discount</span>
          <span className="text-green-600">
            − ₹ {discount.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-gray-500 font-medium">
          <span>Delivery Charge</span>
          <span>FREE</span>
        </div>

        <hr className="border-t border-[#6b3430] my-3" />

        <div className="flex justify-between font-semibold text-base mt-6">
          <span>Grand Total</span>
          <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-6 space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white shadow-lg p-3 rounded-xl"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={80}
              className="rounded-lg object-cover"
            />

            <div className="flex-1 text-sm">
              <p className="leading-tight text-sm">
                <span className="font-semibold">{item.name.split(" ")[0]}</span>{" "}
                {item.name.split(" ").slice(1).join(" ")}
              </p>
              <p className="text-gray-900 text-xs mt-1 font-medium">
                Qty: {item.qty}
              </p>
              <p className="font-semibold mt-1">
                ₹ {item.price.toLocaleString("en-IN")}
              </p>
            </div>

            <Trash2
              size={18}
              className="text-[#534b4a] cursor-pointer"
              onClick={() => {
                removeFromCart(item.id);
                refreshCart();
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => (window.location.href = "/payment")}
        className="fixed bottom-4 left-4 right-4 bg-[#6b3430] text-white py-3 rounded-md 
             font-semibold active:scale-95"
      >
        PLACE ORDER
      </button>
    </div>
  );
}
