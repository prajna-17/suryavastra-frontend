"use client";

import { FiHeart } from "react-icons/fi";
import { recentlyViewedProducts } from "@/data/data";

export default function YouMayAlsoLike() {
  return (
    <section className="mt-12">
      {/* Title */}
      <div className="text" style={{ color: "var(--color-brown)" }}>
        <h2 className="text-center text-base font-medium  mb-6">
          Recently Viewed{" "}
        </h2>
      </div>
      {/* Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 mt-3">
        {recentlyViewedProducts.map((p) => (
          <div
            key={p.id}
            className="min-w-[160px] rounded-xl overflow-hidden bg-white"
          >
            <div className="relative">
              {/* Image */}
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-[220px] object-cover"
              />

              <button className="absolute top-2 right-2 text-[#812e12]">
                <FiHeart size={18} strokeWidth={3.0} />
              </button>

              <div className="absolute bottom-14 left-2 bg-white text-xs px-1 py-1 rounded-full flex items-center gap-1">
                <p className="text-[#7b4b3a] text-[15px]">★</p> {p.rating}
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-black/30">
                <p className="text-xs font-medium text-white leading-snug mt-0.3">
                  {p.title}
                </p>

                <div className="flex items-center gap-2 text-xs text-white mt-1">
                  <span className="font-semibold">₹ {p.price}</span>
                  <span className="line-through opacity-80">
                    ₹ {p.oldPrice}
                  </span>
                  <span className="text-[#f8f5f5]">{p.discount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
