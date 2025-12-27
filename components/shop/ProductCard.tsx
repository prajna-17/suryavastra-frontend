"use client";

import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

type ProductCardProps = {
  image: string;
};

export default function ProductCard({ image }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={image}
          alt="Saree"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />

        <span className="absolute bottom-0 right-0 bg-[#6b3c32] text-white text-[10px] px-2 py-[3px] rounded-tl-md">
          60% OFF
        </span>

        <button
          className="absolute top-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow"
          style={{ color: "var(--color-brown)" }}
        >
          <AiOutlineHeart size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="p-[6px]">
        <p className="text-sm font-sm leading-tight">Pink Golden South Saree</p>

        <div className="flex gap-2 mt-1 items-center">
          <span className="text-sm font-semibold">₹ 1,499</span>
          <span className="line-through text-gray-400 text-[11px]">
            ₹ 3,999
          </span>
        </div>

        <button
          className="w-full border border-yellow-900 mt-2 py-1 text-[11px] rounded"
          style={{ color: "var(--color-brown)" }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
