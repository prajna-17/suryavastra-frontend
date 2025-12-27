"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { robotoSlab } from "@/app/fonts";

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const grandTotal = cartItems.reduce((t, i) => t + i.price * i.qty, 0);
  const mrpTotal = cartItems.reduce((t, i) => t + i.mrp * i.qty, 0);
  const discount = mrpTotal - grandTotal;

  return (
    <div className={`min-h-screen bg-white px-4 py-6 ${roboto.className}`}>
      {/* Back + Title */}
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft
          size={22}
          color="#6b3430"
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h2 className="text-[#6b3430] font-semibold text-lg">Checkout</h2>
      </div>

      {/* Order Amount */}
      <div className="flex justify-between font-medium text-sm py-6 border-b border-[#833630]">
        <span>Order Amount</span>
        <span>₹ {grandTotal.toLocaleString("en-IN")}</span>
      </div>

      {/* Credit/Debit Card */}
      <div className="mt-6">
        <h3 className="font-medium text-sm text-[#080808] mb-3">
          Credit/Debit Cards
        </h3>

        <button className="w-full border border-[#833630] rounded-lg p-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Image
              src="/icons/card.png"
              width={30}
              height={30}
              alt="Card"
              unoptimized
            />
            <span className={`text-sm font-medium ${robotoSlab.className}`}>
              Debit / Credit Card
            </span>
          </span>
          <span className="text-[#6b3430] text-lg">›</span>
        </button>
      </div>

      {/* Net Banking */}
      <div className="mt-6">
        <h3 className="font-medium text-sm text-[#080808] mb-3">Net Banking</h3>

        <div className="border border-[#833630] rounded-lg p-4 space-y-4">
          <div className="flex justify-between text-center">
            {["SBI", "HDFC", "ICICI", "AXIS"].map((bank) => (
              <button key={bank} className="flex flex-col items-center gap-1">
                <Image
                  src={`/banks/${bank}.png`}
                  alt={bank}
                  width={45}
                  height={45}
                  unoptimized
                />
                <span
                  className={`text-xs font-medium text-[#080808] ${robotoSlab.className}`}
                >
                  {bank}
                </span>
              </button>
            ))}
          </div>

          <button className="text-[#6b3430] underline text-sm font-medium">
            Other Banks
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={() => {
          router.push("/order-confirm");
        }}
        className="fixed bottom-4 left-4 right-4 bg-[#6b3430] text-white py-3 rounded-md font-semibold active:scale-95"
      >
        Continue
      </button>
    </div>
  );
}
