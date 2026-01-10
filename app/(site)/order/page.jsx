"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/utils/cart";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { roboto } from "@/app/fonts";
import { robotoSlab } from "@/app/fonts";
import { toast } from "react-toastify";
import { getAddressKey } from "@/utils/address";

export default function OrderPage() {
  const [topMessage, setTopMessage] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // ---- LIVE CART + BUY-NOW HANDLER ----
  useEffect(() => {
    const single = JSON.parse(localStorage.getItem("checkoutProduct"));

    if (single) setCartItems([single]);
    else setCartItems(getCart());

    const saved = localStorage.getItem(getAddressKey());

    if (saved) {
      const raw = JSON.parse(saved);

      setAddress({
        fullName: raw.name,
        phone: raw.phone,
        addressLine: raw.details,
        locality: raw.locality,
        city: raw.city,
        state: raw.state,
        postalCode: raw.pincode,
      });
    }

    setHydrated(true);

    const update = () => setCartItems(getCart());

    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (!hydrated) return null;

  const refreshCart = () => setCartItems(getCart());

  const grandTotal = cartItems.reduce((t, i) => t + i.price * (i.qty ?? 1), 0);
  const mrpTotal = cartItems.reduce((t, i) => t + i.mrp * (i.qty ?? 1), 0);
  const discount = mrpTotal - grandTotal;

  return (
    <div className={`min-h-screen bg-white pb-28 px-4 ${roboto.className}`}>
      {topMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[9999] bg-[#6b3430] text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg">
          {topMessage}
        </div>
      )}

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
                {/* Name */}
                <div className="font-semibold text-sm">{address.fullName}</div>

                {/* Address details */}
                <div className="text-sm text-gray-700 mt-1 leading-snug">
                  {address.addressLine}, {address.locality}
                </div>

                {/* City + State + Pincode */}
                <div className="text-sm text-gray-700">
                  {address.city}, {address.state} – {address.postalCode}
                </div>
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

        {/* ADDRESS REQUIRED MESSAGE */}
        {!address && (
          <p className="text-xs text-red-600 mt-2 font-semibold">
            Please add delivery address to continue
          </p>
        )}
      </div>

      {/* Payment Section */}
      <div className="mt-10 space-y-3 text-sm">
        <h3 className="font-semibold flex items-center gap-2 text-[#080808]">
          <Image src="/img/pay-emo.png" alt="card" width={16} height={16} />
          Payment Details{" "}
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
        {cartItems.map((item, index) => {
          const uniqueKey = item.variantId || `${item.id}-${index}`;

          return (
            <div
              key={uniqueKey}
              id={`order-${uniqueKey}`}
              className="cart-item flex items-center gap-3 bg-white shadow-lg p-3 rounded-xl"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={80}
                className="rounded-lg object-cover"
                style={{ height: "auto" }}
              />

              <div className="flex-1 text-sm">
                <p className="leading-tight text-sm">
                  <span className="font-semibold">
                    {item.name.split(" ")[0]}
                  </span>{" "}
                  {item.name.split(" ").slice(1).join(" ")}
                </p>

                <p className="text-gray-900 text-xs mt-1 font-medium">
                  Qty: {item.qty ?? 1}
                </p>

                <p className="font-semibold mt-1">
                  ₹ {item.price.toLocaleString("en-IN")}
                </p>
              </div>

              <Trash2
                size={18}
                className="text-[#534b4a] cursor-pointer"
                onClick={() => {
                  const popup = document.createElement("div");
                  popup.className = "confirm-remove-box";
                  popup.innerHTML = `
              <div class="confirm-text">Remove item from cart?</div>
              <div class="confirm-actions">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
              </div>`;
                  document.body.appendChild(popup);

                  popup.querySelector(".confirm-yes").onclick = () => {
                    removeFromCart(item.variantId);
                    setTopMessage("Item removed from cart");
                    setTimeout(() => setTopMessage(""), 2000);
                    refreshCart();
                    window.dispatchEvent(new Event("cart-updated"));
                    popup.remove();
                  };

                  popup.querySelector(".confirm-no").onclick = () =>
                    popup.remove();
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => {
          if (!address) {
            setTopMessage("Please add a delivery address to continue");
            setTimeout(() => setTopMessage(""), 4000); // stays longer
            return;
          }

          if (cartItems.length > 0) {
            window.location.href = "/payment";
          }
        }}
        disabled={cartItems.length === 0}
        className={`fixed bottom-4 left-4 right-4 py-3 rounded-md font-semibold text-white active:scale-95
        ${
          cartItems.length === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#6b3430]"
        }`}
      >
        PLACE ORDER
      </button>
    </div>
  );
}
