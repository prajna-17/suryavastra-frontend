"use client";

import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToCart } from "@/utils/cart";
import { useState, useEffect } from "react";
import { toggleWishlist, isInWishlist } from "@/utils/wishlist";
import Link from "next/link";

export default function ProductCard({
  id,
  image,
  name,
  price,
  origPrice,
  discount,
}) {
  const [liked, setLiked] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

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
    <div className="bg-white border border-gray-200 rounded-lg relative">
      <div className="relative aspect-[4/5] w-full">
        <Link href={`/product/${id}`}>
          <div className="cursor-pointer">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        </Link>

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
            //  SOUND
            const audio = new Audio("/sounds/pop.mp3");
            audio.volume = 0.6;
            audio.play();

            const heart = document.createElement("div");
            heart.innerHTML = "🤎";
            heart.className = "pop-heart";

            heart.style.position = "absolute";
            heart.style.top = "0px";
            heart.style.right = "0px";
            heart.style.fontSize = "16px";
            heart.style.animation = "popJump .7s ease forwards";
            heart.style.pointerEvents = "none";
            e.currentTarget.appendChild(heart);
            setTimeout(() => heart.remove(), 700);

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
          {liked ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />}
        </button>

        <span className="absolute bottom-0 right-0 bg-[#6b3c32] text-white text-[10px] px-2 py-[3px] rounded-tl-md">
          {discount} OFF
        </span>
      </div>

      <div className="p-[6px]">
        <p className="text-sm leading-tight">{name}</p>

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

            window.dispatchEvent(new Event("cart-updated"));

            // pop/shake effect
            const btn = e.currentTarget;
            btn.classList.add("cart-anim");

            setTimeout(() => {
              const audio = new Audio("/sounds/pop.mp3");
              audio.volume = 0.6;
              audio.play();
              btn.classList.remove("cart-anim");
              setShowCartModal(true);
            }, 600);

            //  cart icon pop
            const icon = document.querySelector(".cart-icon-wrap");
            if (icon) {
              icon.classList.add("cart-bounce");
              setTimeout(() => icon.classList.remove("cart-bounce"), 600);
            }
          }}
          className="w-full border border-yellow-900 mt-2 py-1 text-[11px] rounded"
          style={{ color: "var(--color-brown)" }}
        >
          ADD TO CART
        </button>
      </div>
      {showCartModal && (
        <div className="added-bar show">
          <span className="close-icon" onClick={() => setShowCartModal(false)}>
            ✕
          </span>

          <div className="added-content">
            <img src={image} alt="product" />
            <span>Added to cart ✔</span>
          </div>

          <button
            className="go-to-cart-btn"
            onClick={() => (window.location.href = "/cart")}
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
}
