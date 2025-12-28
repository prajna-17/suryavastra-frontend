"use client";

import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";

export default function ProductCard({
  id,
  image,
  discount,
  name,
  price,
  origPrice,
}) {
  const [liked, setLiked] = useState(false);
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "wish-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  useEffect(() => {
    setLiked(isInWishlist(id));
  }, [id]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg relative overflow-visible">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/5] w-full cursor-pointer">
          <img src={image} alt={name} className="w-full h-full object-cover" />

          <span className="absolute bottom-0 right-0 bg-[#6b3c32] text-white text-[10px] px-2 py-[3px] rounded-tl-md">
            {discount} OFF
          </span>

          {/*Wishlist Button with animation + sound */}
          <button
            className="absolute top-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow z-50"
            style={{
              color: liked ? "var(--color-dark-brown)" : "var(--color-brown)",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              toggleWishlist({
                id,
                image,
                name,
                price,
                mrp: origPrice,
                discount,
              });

              setLiked((prev) => !prev);
              // toast message
              +showToast(liked ? "Removed from Wishlist" : "Added to Wishlist");
              // sound
              const audio = new Audio("/sounds/pop.mp3");
              audio.volume = 0.6;
              audio.play();

              // pop heart
              const heart = document.createElement("div");
              heart.innerHTML = "🤎";
              heart.className = "pop-heart";
              heart.style.position = "absolute";
              heart.style.top = "-5px"; // jumps above
              heart.style.right = "-5px";
              heart.style.fontSize = "18px";
              heart.style.zIndex = "9999";
              e.currentTarget.appendChild(heart);
              setTimeout(() => heart.remove(), 700);

              // header bounce
              document
                .getElementById("wishlist-icon")
                ?.classList.add("wishlist-bounce");
              setTimeout(() => {
                document
                  .getElementById("wishlist-icon")
                  ?.classList.remove("wishlist-bounce");
              }, 600);

              window.dispatchEvent(new Event("wishlist-updated"));
            }}
          >
            <FiHeart
              size={18}
              fill={liked ? "var(--color-dark-brown)" : "none"}
            />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-[6px]">
        <p className="text-sm leading-tight min-h-[34px]">{name}</p>

        <div className="flex gap-2 mt-1 items-center">
          <span className="text-sm font-semibold">
            ₹ {Number(price).toLocaleString("en-IN")}
          </span>
          <span className="line-through text-gray-400 text-[11px]">
            ₹ {Number(origPrice).toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ id, name, image, price, mrp: origPrice, discount });
          }}
          className="w-full border border-[#6b3c32] mt-2 py-1 text-[11px] rounded text-[#6b3c32]"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
