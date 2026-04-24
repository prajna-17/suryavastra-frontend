"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { robotoSlab } from "@/app/fonts";
import { getAddressKey } from "@/utils/address";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));

    if (checkoutProduct) {
      setCartItems([checkoutProduct]);
    } else {
      setCartItems(getCart());
    }

    setHydrated(true);
  }, []);

  if (!hydrated || !mounted) return null;

  const grandTotal = cartItems.reduce((t, i) => t + i.price * (i.qty ?? 1), 0);
  const mrpTotal = cartItems.reduce((t, i) => t + i.mrp * (i.qty ?? 1), 0);
  const discount = mrpTotal - grandTotal;

  const handleCOD = async () => {
    const rawAddress = JSON.parse(localStorage.getItem(getAddressKey()));

    if (!rawAddress) {
      alert("Please add delivery address before proceeding");
      return;
    }

    const shippingAddress = {
      fullName: rawAddress.name,
      phone: rawAddress.phone,
      addressLine: rawAddress.details,
      locality: rawAddress.locality,
      city: rawAddress.city,
      state: rawAddress.state,
      postalCode: rawAddress.pincode,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/create-cod`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            products: cartItems.map((item) => ({
              product: item.productId,
              quantity: item.qty ?? item.quantity ?? 1,
            })),
            shippingAddress,
            paymentMethod: "COD",
          }),
        },
      );

      if (!res.ok) {
        alert("Unable to place COD order");
        return;
      }

      const data = await res.json();

      if (data.status === "ok") {
        router.push(`/order-confirm/${data.data.orderId}`);
      } else {
        alert(data.message || "COD failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handlePayment = async () => {
    if (isPaying) return;

    setIsPaying(true);
    const rawAddress = JSON.parse(localStorage.getItem(getAddressKey()));

    if (!rawAddress) {
      alert("Please add delivery address before proceeding");
      setIsPaying(false);
      return;
    }

    const shippingAddress = {
      fullName: rawAddress.name,
      phone: rawAddress.phone,
      addressLine: rawAddress.details,
      locality: rawAddress.locality,
      city: rawAddress.city,
      state: rawAddress.state,
      postalCode: rawAddress.pincode,
    };

    if (!shippingAddress) {
      alert("Please add delivery address before proceeding");
      setIsPaying(false);
      return;
    }

    try {
      // 1) Create pending order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/create-pending`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            products: cartItems.map((item) => ({
              product: item.productId,
              quantity: item.qty ?? item.quantity ?? 1,
            })),
            shippingAddress, // ✅ SEND AS-IS
          }),
        },
      );

      // ✅ HTTP-level check (CRITICAL)
      if (!orderRes.ok) {
        alert("Unable to create order");
        setIsPaying(false);
        return;
      }

      const orderData = await orderRes.json();

      if (orderData.status !== "ok") {
        alert(orderData.message || "Unable to create order");
        setIsPaying(false);
        return;
      }

      const { orderId } = orderData.data;

      // 2) Initiate PhonePe and redirect user
      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/initiate`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            orderId,
          }),
        },
      );

      if (!paymentRes.ok) {
        alert("Unable to initiate payment");
        setIsPaying(false);
        return;
      }

      const paymentData = await paymentRes.json();

      const gatewayData = paymentData?.data;
      if (!paymentData?.success || !gatewayData?.redirectUrl) {
        alert(paymentData?.message || "Payment gateway is not ready");
        setIsPaying(false);
        return;
      }

      window.location.href = gatewayData.redirectUrl;
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setIsPaying(false);
    }
  };

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
              src="/img/atm-card 1.png"
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
            {[
              { name: "SBI", img: "/banks/SBI.png" },
              { name: "HDFC", img: "/banks/HDFC.jpeg" },
              { name: "ICICI", img: "/banks/ICICI.jpeg" },
              { name: "AXIS", img: "/banks/AXIS.jpeg" },
            ].map((bank) => (
              <button
                key={bank.name}
                className="flex flex-col items-center gap-1"
              >
                <Image
                  src={bank.img}
                  alt={bank.name}
                  width={45}
                  height={45}
                  unoptimized
                />
                <span
                  className={`text-xs font-medium text-[#080808] ${robotoSlab.className}`}
                >
                  {bank.name}
                </span>
              </button>
            ))}
          </div>

          <button className="text-[#6b3430] underline text-sm font-medium">
            Other Banks
          </button>
        </div>
        <button
          onClick={handleCOD}
          disabled={isPaying}
          className="w-full border border-[#833630] rounded-lg p-3 mt-6 font-medium"
        >
          Cash on Delivery (COD)
        </button>
      </div>

      {/* Pay Now */}
      <button
        onClick={handlePayment}
        disabled={isPaying}
        className="fixed bottom-4 left-4 right-4 bg-[#6b3430] text-white py-3 rounded-md font-semibold active:scale-95 disabled:opacity-70"
      >
        {isPaying ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
