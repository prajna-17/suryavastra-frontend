"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartHeader() {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-3 mt-10"
      style={{ color: "var(--color-brown)" }}
    >
      <button onClick={() => router.back()}>
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-lg font-medium">Cart</h2>
    </div>
  );
}
