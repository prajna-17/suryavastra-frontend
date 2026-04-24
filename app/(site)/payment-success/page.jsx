"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("orderId");
      const merchantTransactionId = searchParams.get("merchantTransactionId");
      const token = localStorage.getItem("token");

      if (!orderId || !merchantTransactionId) {
        setMessage("Missing payment details. Please try again from checkout.");
        return;
      }

      if (!token) {
        setMessage("Please login again and check your order history.");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              orderId,
              merchantTransactionId,
            }),
          },
        );

        const data = await res.json();

        if (res.ok && data?.success) {
          setMessage("Payment verified. Redirecting to order confirmation...");
          router.replace(`/order-confirm/${orderId}`);
          return;
        }

        setMessage(data?.message || "Payment verification failed.");
      } catch (error) {
        console.error(error);
        setMessage(
          "Unable to verify payment right now. Please check order history.",
        );
      }
    };

    verifyPayment();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-[#e8d2cf] p-5 text-center">
        <h1 className="text-lg font-semibold text-[#6b3430] mb-2">
          Payment Status
        </h1>
        <p className="text-sm text-gray-700">{message}</p>

        <button
          type="button"
          onClick={() => router.push("/order-his")}
          className="mt-5 w-full bg-[#6b3430] text-white py-2 rounded-md"
        >
          Go To My Orders
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white px-4 py-10 flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg border border-[#e8d2cf] p-5 text-center">
            <h1 className="text-lg font-semibold text-[#6b3430] mb-2">
              Payment Status
            </h1>
            <p className="text-sm text-gray-700">Loading payment details...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
