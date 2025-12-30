"use client";

import { useEffect, useState } from "react";
import { roboto } from "@/app/fonts";
import { useRouter } from "next/navigation";

export default function DeliveryBox() {
  const router = useRouter();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userAddress");
    if (saved) setAddress(JSON.parse(saved));
  }, []);

  return (
    <div className="border border-dashed border-[#6b3430] rounded-lg p-3 flex items-center justify-between">
      <p className="text-sm text-[#0c0b0b] leading-tight">
        📍{" "}
        {address ? (
          <>
            <span className="font-semibold">{address.name}</span>
            <br />
            <span>
              {address.details}, {address.city} - {address.pincode}
            </span>
          </>
        ) : (
          "Add delivery address"
        )}
      </p>

      {/* BUTTON SHOWN BASED ON ADDRESS EXISTENCE */}
      <button
        className={`${roboto.className} text-xs border border-[#6b3430] px-3 py-1 rounded-md text-[#6b3430] font-medium active:scale-95`}
        onClick={() => router.push("/new-address?from=cart")}
      >
        {address ? "CHANGE" : "NEW ADDRESS"}
      </button>
    </div>
  );
}
