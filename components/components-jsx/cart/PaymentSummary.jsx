"use client";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PaymentSummary() {
  const [cart, setCart] = useState([]);

  // 🔥 Live update without refresh
  useEffect(() => {
    const update = () => setCart(getCart());
    update();
    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const toNumber = (v) => Number(String(v).replace(/[^0-9]/g, ""));

  const subtotal = cart.reduce((t, i) => t + toNumber(i.price) * i.qty, 0);
  const totalMrp = cart.reduce((t, i) => t + toNumber(i.mrp) * i.qty, 0);
  const discount = totalMrp - subtotal;
  const delivery = 0;
  const grandTotal = subtotal + delivery;

  return (
    <div className={`space-y-3 ${roboto.className} mt-10`}>
      <h3 className="font-medium text-sm flex items-center gap-2">
        <Image src="/img/pay-emo.png" alt="card" width={16} height={16} />
        Payment Details (
        <span className="text-gray-400">{cart.length} Items</span>)
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Sub Total</span>
          <span>₹ {subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between mt-5">
          <span>Discount</span>
          <span className="text-green-600">
            - ₹ {discount.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between mt-5">
          <span>Delivery Charge</span>
          <span>{delivery === 0 ? "FREE" : `₹ ${delivery}`}</span>
        </div>

        <hr className="border-t border-[#591b16] my-3" />

        <div className="flex justify-between font-semibold text-base">
          <span>Grand Total</span>
          <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div
        className="bg-[#f3dfdb] text-xs text-center py-2 rounded font-medium mt-5"
        style={{ color: "var(--color-dark-brown)" }}
      >
        🎉 Yay! Your total discount is Rs. {discount.toLocaleString("en-IN")}
      </div>
    </div>
  );
}
