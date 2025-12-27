"use client";
import { roboto } from "@/app/fonts";
import { useRouter } from "next/navigation";

export default function CartFooter() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/auth")}
      className={`${roboto.className} rounded-lg fixed bottom-4 left-4 right-4 px-4 bg-[#591b16] text-white py-4 text-center font-semibold cursor-pointer active:scale-95`}
    >
      PLACE ORDER
    </div>
  );
}
