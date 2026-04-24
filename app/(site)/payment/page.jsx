"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { roboto } from "@/app/fonts";
import { getCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { getAddressKey } from "@/utils/address";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("ONLINE");

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
        setIsPaying(false);
        return;
      }

      const data = await res.json();

      if (data.status === "ok") {
        router.push(`/order-confirm/${data.data.orderId}`);
      } else {
        alert(data.message || "COD failed");
        setIsPaying(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setIsPaying(false);
    }
  };

  const handlePayment = async () => {
    if (isPaying) return;

    setIsPaying(true);
    const rawAddress = JSON.parse(localStorage.getItem(getAddressKey()));


  const handlePlaceOrder = () => {
    if (selectedMethod === "COD") {
      handleCOD();
      return;
    }

    handlePayment();
  };
    if (!rawAddress) {
      alert("Please add delivery address before proceeding");
    <div className={`min-h-screen bg-[#f8f3f1] px-4 py-6 pb-28 ${roboto.className}`}>
      return;
      <div className="flex items-center gap-3 mb-5">

    const shippingAddress = {
      fullName: rawAddress.name,
      phone: rawAddress.phone,
      addressLine: rawAddress.details,
      locality: rawAddress.locality,
      city: rawAddress.city,
      state: rawAddress.state,
      postalCode: rawAddress.pincode,
      <div className="bg-white rounded-2xl border border-[#e9d7d4] p-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Items Total</span>
          <span>₹ {mrpTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-700">- ₹ {discount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-gray-600">Delivery</span>
          <span>FREE</span>
        </div>
        <div className="border-t border-[#efe2df] pt-3 flex items-center justify-between">
          <span className="font-semibold text-[#6b3430]">Amount To Pay</span>
          <span className="font-semibold text-[#6b3430] text-lg">₹ {grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>
      setIsPaying(false);
      <h3 className="font-semibold text-sm text-[#251615] mb-3">Select Payment Method</h3>
      const orderRes = await fetch(
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
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#2f1b19]">Online Payment (PhonePe)</p>
              <p className="text-xs text-gray-600 mt-1">
                UPI, Cards, Net Banking and Wallets will be shown on PhonePe gateway.
              </p>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
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
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-[#2f1b19]">Cash On Delivery</p>
              <p className="text-xs text-gray-600 mt-1">
                Pay in cash at the time of delivery.
              </p>
            </div>
            <span
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
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
            })),
        ) : (
          <span>Your order will be placed now and payment will happen at delivery.</span>
        )}
        },
      );
        return;
        onClick={handlePlaceOrder}

      window.location.href = gatewayData.redirectUrl;
    } catch (err) {
        {isPaying
          ? "Processing..."
          : selectedMethod === "COD"
            ? "Place Order (COD)"
            : "Pay Online"}
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
