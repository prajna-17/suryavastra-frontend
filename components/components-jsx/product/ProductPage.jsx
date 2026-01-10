"use client";

import { useState, useRef, useEffect } from "react";
import ProductSearch from "@/components/components-jsx/product/ProductSearch";
import { FiShare2 } from "react-icons/fi";
import PromotionCards from "@/components/components-jsx/product/PromotionCards";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import SimilarSection from "@/components/components-jsx/product/SimilarSection";
import ProductAccordion from "@/components/components-jsx/product/ProductAccordion";
import YouMayAlsoLike from "@/components/components-jsx/product/YouMayAlsoLike";
import CustomerReviewCarousel from "@/components/components-jsx/product/CustomerReviewCarousel";
import { roboto } from "@/app/fonts";
import { FaBolt } from "react-icons/fa";
import { addToCart } from "@/utils/cart";
import {
  isInWishlist,
  addToWishlistIfNotExists,
  removeFromWishlist,
} from "@/utils/wishlist";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ShareModal from "@/components/components-jsx/product/ShareModal";
import { requiredLogin } from "@/utils/requiredLogin";

// SMALL FIX FOR HEADER CART POP
function bounceCartIcon(attempt = 0) {
  const icon = document.querySelector(".cart-icon");
  if (icon) {
    icon.classList.add("cart-bounce");
    setTimeout(() => icon.classList.remove("cart-bounce"), 600);
    return;
  }
  if (attempt < 10) {
    setTimeout(() => bounceCartIcon(attempt + 1), 150);
  }
}

export default function ProductPage({ product }) {
  // Logic to determine the primary color (Matches the ProductCard logic)
  const primaryColor = product.colors?.[0] || product.mainColor || "Default";

  const allColorOptions = [
    {
      color: primaryColor,
      images: product.images || [],
    },
    ...(product.colorImages || []),
  ];

  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(primaryColor);
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeImages, setActiveImages] = useState(
    allColorOptions[0]?.images || []
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const startX = useRef(0);
  const isDragging = useRef(false);

  const productLink = typeof window !== "undefined" ? window.location.href : "";

  function showBottomMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(null), 2000);
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "wish-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  }

  function popHeart(e) {
    const heart = document.createElement("div");
    heart.innerHTML = "🤎";
    heart.className = "pop-heart";
    const rect = e.currentTarget.getBoundingClientRect();
    heart.style.left = rect.left + "px";
    heart.style.top = rect.top + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 700);
  }

  // 🔥 Sync Liked State with LocalStorage/Wishlist
  useEffect(() => {
    const syncLiked = () => {
      const variantId = `${product._id}-${selectedColor}`;
      setLiked(isInWishlist(variantId));
    };

    syncLiked();
    window.addEventListener("wishlist-updated", syncLiked);
    return () => window.removeEventListener("wishlist-updated", syncLiked);
  }, [product._id, selectedColor]);

  const images = activeImages;
  const displayName = product.title;
  const price = product.oldPrice || product.price;
  const discountedPrice = product.price;
  const off = product.oldPrice
    ? `${Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )}%`
    : "New";

  return (
    <section className="w-full max-w-[480px] mx-auto">
      <ProductSearch />

      {/* Image Slider */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX;
          isDragging.current = true;
        }}
        onTouchEnd={(e) => {
          if (!isDragging.current) return;
          const diff = startX.current - e.changedTouches[0].clientX;
          if (diff > 50 && activeIndex < images.length - 1)
            setActiveIndex(activeIndex + 1);
          else if (diff < -50 && activeIndex > 0)
            setActiveIndex(activeIndex - 1);
          isDragging.current = false;
        }}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / images.length)}%)`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 aspect-[3/4]"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={img}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full ${
              activeIndex === i ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className={`${roboto.className} px-4 pb-4`}>
        <div className="flex justify-between items-start">
          <h1 className="text-base font-semibold">
            <span>{displayName.split(" ")[0]}</span>{" "}
            <span className="font-normal">
              {displayName.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <div className="flex gap-2">
            <button
              className="border border-gray-300 rounded-md p-2 text-gray-600"
              onClick={() => setShareOpen(true)}
            >
              <FiShare2 size={16} />
            </button>

            <button
              className="border rounded-md p-2 text-gray-600 relative"
              onClick={(e) => {
                e.stopPropagation();

                if (!requiredLogin("Login to use wishlist")) {
                  showToast("Please login to use wishlist");
                  return;
                }

                const variantId = `${product._id}-${selectedColor}`;

                if (liked) {
                  removeFromWishlist(variantId);
                  setLiked(false);
                  showToast("Removed from Wishlist");
                } else {
                  addToWishlistIfNotExists({
                    variantId,
                    productId: product._id,
                    color: selectedColor,
                    name: product.title,
                    image: activeImages[0],
                    price: discountedPrice,
                    mrp: price,
                    discount: off,
                  });

                  setLiked(true);
                  showToast("Added to Wishlist");

                  popHeart(e);
                  const audio = new Audio("/sounds/pop.mp3");
                  audio.volume = 0.6;
                  audio.play();
                }

                window.dispatchEvent(new Event("wishlist-updated"));
              }}
            >
              {liked ? (
                <AiFillHeart size={17} color="#6b3c32" />
              ) : (
                <AiOutlineHeart size={17} color="#6b3c32" />
              )}
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            MRP{" "}
            <span className="line-through">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
          </span>
          <span className="text-lg font-semibold">
            ₹{discountedPrice.toLocaleString("en-IN")}
          </span>
          <span className="bg-[#c9897b] text-white text-xs px-2 py-1 rounded">
            {off} OFF
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes.</p>
      </div>

      <div className="mt-2 bg-[#f3e1dd] text-sm px-3 py-2 w-[95%] -ml-[-10px] rounded-md flex items-center gap-2 text-[#7a3e3e]">
        <FaBolt /> 515 bought in last 24 hours
      </div>

      {/* Colors */}
      <div className="mt-4 px-4">
        <p className="text-sm font-medium mb-2">
          Colour: <span className="font-normal">{selectedColor}</span>
        </p>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {allColorOptions.map((c, i) => (
            <button
              key={i}
              className={`w-16 h-20 rounded-md overflow-hidden border ${
                selectedColor === c.color ? "border-black" : "border-gray-300"
              }`}
              onClick={() => {
                setSelectedColor(c.color);
                setActiveImages(c.images);
                setActiveIndex(0);
              }}
            >
              <img
                src={c.images[0]}
                alt={c.color}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <PromotionCards />

      {/* Action Buttons */}
      <div className="mt-6 px-4 flex gap-3">
        <button
          className="flex-1 border text-[#8b5e55] py-3 rounded flex items-center justify-center gap-2"
          onClick={() => {
            const token = localStorage.getItem("token");
            if (!requiredLogin("Login to continue")) {
              showToast("Please login to continue");
              return;
            }

            const data = {
              id: product._id,
              name: product.title,
              image: product.images?.[0] || product.image,
              mrp: price,
              price: discountedPrice,
              discount: off,
              qty: 1,
            };

            localStorage.setItem("checkoutProduct", JSON.stringify(data));
            window.location.href = "/order";
          }}
        >
          <HiOutlineShoppingBag /> BUY NOW
        </button>
        <div className="flex-1 relative">
          <button
            onClick={(e) => {
              const token = localStorage.getItem("token");
              if (!requiredLogin("Login to add items to cart")) {
                showToast("Please login to add items to cart");
                return;
              }

              const wrapper = e.currentTarget.parentElement;

              // 1. Create the unique variant ID
              const variantId = `${product._id}-${selectedColor}`;

              // 2. Pass the data to your addToCart utility
              // Your utility should handle the logic:
              // "If variantId exists, qty++, else push new item"
              addToCart({
                productId: product._id,
                variantId: variantId, // CRITICAL: This must match what Home Page sends
                color: selectedColor,
                name: product.title,
                image: activeImages[0],
                price: discountedPrice,
                mrp: price,
                discount: off,
                qty: 1, // Start with 1, utility should increment if duplicate
                deliveryDate: "Monday, 22nd Dec",
              });

              // 3. UI Feedback
              wrapper.classList.add("cart-anim");
              setTimeout(() => {
                const audio = new Audio("/sounds/pop.mp3");
                audio.volume = 0.6;
                audio.play();
                wrapper.classList.remove("cart-anim");
                setShowCartModal(true);
                bounceCartIcon();
              }, 700);
            }}
            className="w-full bg-[#7a3e3e] text-white py-3 rounded flex items-center justify-center gap-2"
          >
            <FiShoppingCart /> ADD TO CART
          </button>
        </div>
      </div>

      {showCartModal && (
        <div className={`added-bar show`}>
          <span className="close-icon" onClick={() => setShowCartModal(false)}>
            ✕
          </span>
          <div className="added-content">
            <img src={product.images?.[0] || product.image} alt="product" />
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

      <SimilarSection />
      <ProductAccordion />
      <YouMayAlsoLike />
      <CustomerReviewCarousel />
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        productLink={productLink}
        showBottomMessage={showBottomMessage}
      />

      {message && (
        <div className="added-bar show">
          <div className="added-content">
            <span>{message}</span>
          </div>
        </div>
      )}
    </section>
  );
}
