"use client";

import { youMayAlsoLikeProducts } from "@/data/data";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { useState, useEffect } from "react";

export default function YouMayAlsoLike() {
  const [wish, setWish] = useState({});

  useEffect(() => {
    const map = {};
    youMayAlsoLikeProducts.forEach((p) => {
      map[p.id] = isInWishlist(p.id);
    });
    setWish(map);
  }, []);

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "wish-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  }

  function popHeart(e, filled) {
    const heart = document.createElement("div");
    heart.innerHTML = filled ? "🤎" : "";
    heart.className = "pop-heart";

    const rect = e.currentTarget.getBoundingClientRect();
    heart.style.left = rect.left + "px";
    heart.style.top = rect.top + "px";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 700);
  }

  const toggle = (p, e) => {
    toggleWishlist({
      id: p.id,
      image: p.image,
      name: p.name || "", // prevents undefined
      price: p.price,
      mrp: p.oldPrice,
      discount: p.discount,
    });

    setWish((prev) => ({ ...prev, [p.id]: !prev[p.id] }));

    popHeart(e, !wish[p.id]);
    showToast(!wish[p.id] ? "Added to wishlist" : "Removed from wishlist");

    // SOUND
    const audio = new Audio("/sounds/pop.mp3");
    audio.volume = 0.6;
    audio.play();

    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <section className="mt-12">
      <h2 className="text-center text-base font-medium text-[#7a4a3a] mb-6">
        You May Also Like
      </h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4">
        {youMayAlsoLikeProducts.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="min-w-[160px] rounded-xl overflow-hidden bg-white relative"
          >
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-[220px] object-cover"
              />

              {/*  */}
              <button
                className="absolute top-2 right-2 bg-white p-[3px] rounded-full shadow"
                style={{
                  color: wish[p.id]
                    ? "var(--color-dark-brown)"
                    : "var(--color-brown)",
                  zIndex: 50,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggle(p, e);
                }}
              >
                <FiHeart
                  size={18}
                  fill={wish[p.id] ? "var(--color-dark-brown)" : "transparent"}
                />
              </button>

              {/* Rating */}
              <div className="absolute bottom-14 left-2 bg-white text-xs px-1 py-1 rounded-full flex items-center gap-1">
                <p className="text-[#7b4b3a] text-[15px]">★</p> {p.rating}
              </div>

              {/* Text Box */}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-black/30">
                <p className="text-xs font-medium text-white">{p.name}</p>

                <div className="flex items-center gap-2 text-xs text-white mt-1">
                  <span className="font-semibold">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </span>
                  <span className="line-through opacity-80">
                    ₹{Number(p.oldPrice).toLocaleString("en-IN")}
                  </span>
                  <span>{p.discount} OFF</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
