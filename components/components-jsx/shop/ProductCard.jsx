"use client";

import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { addToCart } from "@/utils/cart";
import Link from "next/link";

export default function ProductCard({
  id,
  image,
  name,
  price,
  origPrice,
  discount,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* 🔗 Only image clickable for product page */}
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/5] w-full cursor-pointer">
          <Image src={image} alt={name} fill className="object-cover" />

          <span className="absolute bottom-0 right-0 bg-[#6b3c32] text-white text-[10px] px-2 py-[3px] rounded-tl-md">
            {discount} OFF
          </span>

          <button
            className="absolute top-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow"
            style={{ color: "var(--color-brown)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AiOutlineHeart size={18} />
          </button>
        </div>
      </Link>

      {/* Info + ADD TO CART */}
      <div className="p-[6px]">
        <p className="text-sm leading-tight">{name}</p>

        <div className="flex gap-2 mt-1 items-center">
          <span className="text-sm font-semibold">₹ {price}</span>
          <span className="line-through text-gray-400 text-[11px]">
            ₹ {origPrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // stop navigation
            addToCart({
              id,
              name,
              image,
              mrp: Number(origPrice),
              price: Number(price),

              discount,
              rating: 5,
              deliveryDate: "Monday, 22nd Dec",
            });
          }}
          className="w-full border border-yellow-900 mt-2 py-1 text-[11px] rounded"
          style={{ color: "var(--color-brown)" }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
