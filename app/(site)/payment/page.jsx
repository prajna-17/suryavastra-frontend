"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { getAddressKey } from "@/utils/address";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("ONLINE");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));

    if (checkoutProduct) {
      setCartItems([checkoutProduct]);
    } else {
      setCartItems(getCart());
    }

    setHydrated(true);
  }, []);

  if (!mounted || !hydrated) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0,
  );
  const mrpTotal = cartItems.reduce(
    (sum, item) => sum + item.mrp * (item.qty ?? 1),
    0,
  );
  const discount = mrpTotal - totalAmount;

  const getShippingAddress = () => {
    const rawAddress = JSON.parse(localStorage.getItem(getAddressKey()));

    if (!rawAddress) {
      return null;
    }

    return {
      fullName: rawAddress.name,
      phone: rawAddress.phone,
      addressLine: rawAddress.details,
      locality: rawAddress.locality,
      city: rawAddress.city,
      state: rawAddress.state,
      postalCode: rawAddress.pincode,
    };
  };

  const handleCOD = async () => {
    if (isPaying) return;

    const shippingAddress = getShippingAddress();

    if (!shippingAddress) {
      alert("Please add delivery address before proceeding");
      return;
    }

    setIsPaying(true);

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

      const data = await res.json();

      if (!res.ok || data.status !== "ok") {
        alert(data.message || "Unable to place COD order");
        setIsPaying(false);
        return;
      }

      router.push(`/order-confirm/${data.data.orderId}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsPaying(false);
    }
  };

  const handlePayment = async () => {
    if (isPaying) return;

    const shippingAddress = getShippingAddress();

    if (!shippingAddress) {
      alert("Please add delivery address before proceeding");
      return;
    }

    setIsPaying(true);

    try {
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
            shippingAddress,
          }),
        },
      );

      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.status !== "ok") {
        alert(orderData.message || "Unable to create order");
        setIsPaying(false);
        return;
      }

      const paymentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orderId: orderData.data.orderId }),
        },
      );

      const paymentData = await paymentRes.json();

      if (
        !paymentRes.ok ||
        !paymentData?.success ||
        !paymentData?.data?.redirectUrl
      ) {
        alert(paymentData?.message || "Payment gateway is not ready");
        setIsPaying(false);
        return;
      }

      window.location.href = paymentData.data.redirectUrl;
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsPaying(false);
    }
  };

  const handlePlaceOrder = () => {
    if (selectedMethod === "COD") {
      handleCOD();
      return;
    }

    handlePayment();
  };

  return (
    <div
      className={`min-h-screen bg-[#f8f3f1] px-4 py-6 pb-28 ${roboto.className}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <ArrowLeft
          size={22}
          color="#6b3430"
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h2 className="text-[#6b3430] font-semibold text-lg">Checkout</h2>
      </div>

      <div className="bg-white rounded-2xl border border-[#e9d7d4] p-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Items Total</span>
          <span>₹ {mrpTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-700">
            - ₹ {discount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-gray-600">Delivery</span>
          <span>FREE</span>
        </div>
        <div className="border-t border-[#efe2df] pt-3 flex items-center justify-between">
          <span className="font-semibold text-[#6b3430]">Amount To Pay</span>
          <span className="font-semibold text-[#6b3430] text-lg">
            ₹ {totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-sm text-[#251615] mb-3">
        Select Payment Method
      </h3>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setSelectedMethod("ONLINE")}
          className={`w-full rounded-xl p-4 text-left border transition ${
            selectedMethod === "ONLINE"
              ? "border-[#6b3430] bg-[#fffaf8]"
              : "border-[#e6d4d1] bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#2f1b19]">
                Online Payment (PhonePe)
              </p>
              <p className="text-xs text-gray-600 mt-1">
                UPI, cards and net banking are handled inside PhonePe.
              </p>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                selectedMethod === "ONLINE"
                  ? "border-[#6b3430]"
                  : "border-[#cbb1ad]"
              }`}
            >
              {selectedMethod === "ONLINE" && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#6b3430]" />
              )}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMethod("COD")}
          className={`w-full rounded-xl p-4 text-left border transition ${
            selectedMethod === "COD"
              ? "border-[#6b3430] bg-[#fffaf8]"
              : "border-[#e6d4d1] bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#2f1b19]">Cash On Delivery</p>
              <p className="text-xs text-gray-600 mt-1">
                Pay when the order arrives at your doorstep.
              </p>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                selectedMethod === "COD"
                  ? "border-[#6b3430]"
                  : "border-[#cbb1ad]"
              }`}
            >
              {selectedMethod === "COD" && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#6b3430]" />
              )}
            </span>
          </div>
        </button>
      </div>

      <div className="mt-4 bg-white rounded-xl border border-[#e9d7d4] px-4 py-3 text-xs text-gray-600">
        {selectedMethod === "ONLINE" ? (
          <span>
            You will be redirected to PhonePe to complete payment securely.
          </span>
        ) : (
          <span>
            Your order will be placed now and payment will happen at delivery.
          </span>
        )}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isPaying}
        className="fixed bottom-4 left-4 right-4 bg-[#6b3430] text-white py-3 rounded-md font-semibold active:scale-95 disabled:opacity-70"
      >
        {isPaying
          ? "Processing..."
          : selectedMethod === "COD"
            ? "Place Order (COD)"
            : "Pay Online"}
      </button>
    </div>
  );
}
