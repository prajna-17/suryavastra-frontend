"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getWishlist, removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";
import { robotoSlab } from "@/app/fonts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import getDiscount from "@/utils/getDiscount";

export default function WishlistPage() {
  const router = useRouter();

  const [wishlist, setWishlist] = useState([]);
  const [showCartModal, setShowCartModal] = useState({
    show: false,
    item: null,
  });

  useEffect(() => {
    const stored = getWishlist();
    setWishlist(stored);

    async function syncWishlist() {
      const updated = [];

      for (const item of stored) {
        let data = null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${item.productId}`
          );

          if (res.ok) {
            data = await res.json();
          }
        } catch (_) {}

        if (!data) {
          updated.push(item);
          continue;
        }

        updated.push({
          ...item,
          name: data.title,
          price: data.price,
          mrp: data.oldPrice,
          discount: getDiscount(data.price, data.oldPrice),
          image:
            data.colorImages?.find((c) => c.color === item.color)?.images[0] ||
            data.images?.[0] ||
            "/img/placeholder.png",
        });
      }

      setWishlist(updated);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }

    syncWishlist();
  }, []);

  const moveToCart = (item) => {
    addToCart({
      variantId: item.variantId,
      productId: item.productId,
      color: item.color,
      name: item.name,
      image: item.image,
      price: Number(item.price),
      mrp: Number(item.mrp),
      discount: item.discount,
      qty: 1,
    });

    removeFromWishlist(item.variantId);
    setWishlist(getWishlist());
    setShowCartModal({ show: true, item });
  };

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
  };

  return (
    <div
      className={`${robotoSlab.className} w-full max-w-[480px] mx-auto pb-20`}
    >
      {/* Back + Title */}
      <div className="flex items-center gap-2 px-4 py-4 text-[#6b3430]">
        <Link href="/">
          <span className="text-lg cursor-pointer">
            <ArrowLeft
              size={22}
              color="#6b3430"
              onClick={() => router.back()}
              className="cursor-pointer"
            />
          </span>
        </Link>
        <p className="font-semibold text-[16px] gap-3 ">
          Wishlist
          <span className="text-[12px]"> ({wishlist.length} Items)</span>
        </p>
      </div>

      {/* Offer Banner */}
      <div className="flex items-center bg-[#c48a87] text-white w-full">
        <div className="flex flex-col items-center justify-center p-1 w-[50%] border-r border-white/40">
          <span className="text-[10px] tracking-wide rotate-270 -mb-3 -ml-15 relative top-[14px]">
            FLAT
          </span>
          <span className="text-[22px] font-bold leading-none relative top-[10px]">
            70%
          </span>
          <span className="text-[10px] tracking-wide rotate-270 mt-1 ml-15 relative top-[-13px]">
            OFF
          </span>
        </div>

        <div className="flex flex-col justify-center pl-20 py-3 w-[65%]">
          <span className="text-[13px] font-semibold leading-tight">
            Clearance Sale !
          </span>
          <span className="text-[12px] font-medium">
            Use Code: <b>ABD123</b>
          </span>
        </div>
      </div>

      {/* Wishlist */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 px-4 pb-20 mt-4 min-h-[34px]">
          {wishlist.map((item) => (
            <div
              key={item.variantId}
              className="bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
            >
              {/* IMAGE SECTION */}
              <div className="relative aspect-[4/5] w-full cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />

                <button
                  onClick={() => handleRemove(item.variantId)}
                  className="absolute top-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow text-[#6b3c32] font-bold"
                >
                  ✕
                </button>

                {item.discount && (
                  <span className="absolute bottom-0 right-0 bg-[#6b3c32] text-white text-[10px] px-2 py-[3px] rounded-tl-md">
                    {item.discount} OFF
                  </span>
                )}
              </div>

              {/* TEXT + PRICE SECTION */}
              <div className="p-2 flex flex-col flex-grow">
                <p className="text-sm leading-tight min-h-[32px] cursor-pointer">
                  <span className="font-semibold">
                    {item.name?.split(" ")[0] ||
                      item.title?.split(" ")[0] ||
                      ""}
                  </span>{" "}
                  {(item.name || item.title || "")
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </p>

                <div className="flex gap-2 items-center mt-1">
                  <span className="text-sm font-semibold">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </span>
                  <span className="line-through text-gray-400 text-[11px]">
                    ₹{Number(item.mrp).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* BUTTON */}
                <div className="relative w-full">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const btn = e.currentTarget;

                      // 1. Animation POP
                      btn.classList.add("cart-anim");
                      setTimeout(() => btn.classList.remove("cart-anim"), 600);

                      // 2. Sound
                      const pop = new Audio("/sounds/pop.mp3");
                      pop.volume = 0.6;
                      pop.play();

                      // 3. Logic with transition
                      setTimeout(() => {
                        const card = btn.closest(".bg-white");
                        if (card) {
                          card.style.transition =
                            "opacity .45s ease, transform .45s ease";
                          card.style.opacity = "0";
                          card.style.transform = "translateY(10px)";
                        }

                        setTimeout(() => {
                          moveToCart(item);
                        }, 450);
                      }, 600);
                    }}
                    className="w-full border border-[#6b3c32] text-[#6b3c32] py-1 text-[11px] rounded font-medium"
                  >
                    MOVE TO CART
                  </button>
                </div>

                {showCartModal.show && (
                  <div className="added-bar show">
                    <span
                      className="close-icon"
                      onClick={() =>
                        setShowCartModal({ show: false, item: null })
                      }
                    >
                      ✕
                    </span>

                    <div className="added-content">
                      <img src={showCartModal.item?.image} alt="product" />
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
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">
          No items in wishlist yet 💔
        </p>
      )}
    </div>
  );
}
