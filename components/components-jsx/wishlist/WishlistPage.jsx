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

    async function loadProducts() {
      const result = [];

      for (let item of stored) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}`
          );

          if (res.ok) {
            const data = await res.json();

            result.push({
              id: data._id,
              name: data.title,
              image: data.images[0],
              price: data.price,
              mrp: data.oldPrice,
              discount: data.oldPrice
                ? Math.round(
                    ((data.oldPrice - data.price) / data.oldPrice) * 100
                  ) + "%"
                : "New",
            });
          }
        } catch (err) {
          console.log("Invalid Wishlist Item Removed:", item.id);
        }
      }

      setWishlist(result);
      localStorage.setItem("wishlist", JSON.stringify(result)); // 🔥 cleans ghost items
    }

    loadProducts();
  }, []);

  const moveToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name || item.title || "Unnamed Product", // ⭐ important
      image: item.image,
      price: item.price,
      mrp: item.mrp,
      discount: item.discount,
    });

    removeFromWishlist(item.id);
    setWishlist(getWishlist());
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
        {/* Left Vertical Text */}
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

        {/* Right Info */}
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
              key={item.id}
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

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 bg-white w-7 h-7 flex items-center justify-center rounded-full shadow text-[#6b3c32] font-bold"
                >
                  ✕
                </button>

                {/* Discount Label */}
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

                      // 3. Add to Cart immediately
                      addToCart({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        mrp: Number(item.mrp),
                        price: Number(item.price),
                        discount: item.discount,
                      });

                      // 4. Little delay so animation plays first
                      setTimeout(() => {
                        // fade/slide remove class
                        const card = btn.closest(".bg-white");
                        card.style.transition =
                          "opacity .45s ease, transform .45s ease";
                        card.style.opacity = "0";
                        card.style.transform = "translateY(10px)";

                        setTimeout(() => {
                          removeFromWishlist(item.id);
                          setWishlist(getWishlist());
                          setShowCartModal({ show: true, item });
                        }, 450); // remove AFTER fade
                      }, 600); // waits for button pop to finish
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
