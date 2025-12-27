"use client";

import { useState, useRef } from "react";
import ProductSearch from "@/components/product/ProductSearch";
import { FiShare2, FiHeart } from "react-icons/fi";
import PromotionCards from "@/components/product/PromotionCards";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiChevronDown, FiMapPin } from "react-icons/fi";
import SimilarSection from "@/components/product/SimilarSection";
import ProductAccordion from "@/components/product/ProductAccordion";
import YouMayAlsoLike from "@/components/product/YouMayAlsoLike";
import CustomerReviewCarousel from "@/components/product/CustomerReviewCarousel";
import { roboto } from "@/app/fonts";
import { FaBolt } from "react-icons/fa";

export default function ProductPage() {
  const images = [
    "/img/saree8.jpeg",
    "/img/saree18.jpeg",
    "/img/saree19.jpeg",
    "/img/saree10.jpeg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

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

          const endX = e.changedTouches[0].clientX;
          const diff = startX.current - endX;

          if (diff > 50 && activeIndex < images.length - 1) {
            setActiveIndex(activeIndex + 1);
          } else if (diff < -50 && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }

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
          {images.map((img, index) => (
            <div
              key={index}
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
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full ${
              activeIndex === index ? "bg-gray-900" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className={`${roboto.className} px-4 pb-4`}>
        <div className="flex justify-between items-start gap-3">
          <h1 className="text-base font-semibold leading-snug">
            Lorem Woven Design Zari
            <br />
            Pink Silk Saree
          </h1>

          {/* Action Icons */}
          <div className="flex gap-2">
            <button className="border border-gray-300 rounded-md p-2 text-gray-600">
              <FiShare2 size={16} />
            </button>
            <button className="border border-gray-300 rounded-md p-2 text-gray-600">
              <FiHeart size={16} />
            </button>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              MRP <span className="line-through">₹5,499</span>
            </span>

            <span className="text-lg font-semibold text-black">₹2,599</span>

            <span className="bg-[#c9897b] text-white text-xs px-2 py-1 rounded-md">
              50% OFF
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes.</p>
        </div>

        {/* Purchase Info */}
        <div className="mt-3 bg-[#f3e1dd] text-sm px-3 py-2 rounded-md flex items-center gap-2 text-[#7a3e3e]">
          <span>
            <FaBolt className="text-[#7b4b3a] text-lg" />
          </span>
          <span>515 Bought this in last 24 hours</span>
        </div>
      </div>

      {/* Color Selector */}
      <div className={`${roboto.className} mt-4 px-4`}>
        <p className="text-sm font-medium mb-2">
          Colour: <span className="font-normal">Pink</span>
        </p>

        <div className="flex gap-3 overflow-x-auto">
          {[
            "/img/saree8.jpeg",
            "/img/saree22.jpeg",
            "/img/saree11.jpeg",
            "/img/saree10.jpeg",
          ].map((img, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border ${
                index === 0 ? "border-gray-900" : "border-gray-300"
              }`}
            >
              <img
                src={img}
                alt="Color option"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <PromotionCards />

      {/* Size Selector */}
      {/* Size Selector */}
      <div className={`${roboto.className} mt-5 px-4`}>
        <p className="text-sm font-medium mb-2">
          Size : <span className="font-normal">Onesize</span>
        </p>

        <button className="bg-black text-white text-sm px-5 py-1.5 rounded-full">
          Onesize
        </button>
      </div>

      {/* Action Buttons */}
      <div className={`${roboto.className} mt-6 px-4 flex gap-3`}>
        {/* Buy Now */}
        <button className="flex-1 flex items-center justify-center gap-2 border border-[#8b5e55] text-[#8b5e55] py-3 rounded-md text-sm font-medium">
          <HiOutlineShoppingBag className="text-lg" />
          BUY NOW
        </button>

        {/* Add to Cart */}
        <button className="flex-1 flex items-center justify-center gap-2 bg-[#7a3e3e] text-white py-3 rounded-md text-sm font-medium">
          <FiShoppingCart className="text-lg" />
          ADD TO CART
        </button>
      </div>

      <div className="mt-6 px-4">
        <h3 className="text-sm font-semibold mb-3">Delivery Details</h3>

        {/* Country */}
        <div
          className={`${roboto.className} flex items-center justify-between border border-[#d8b4a6] rounded-md px-3 py-3 mb-3`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-700">
            🇮🇳 <span>India</span>
          </div>
          <FiChevronDown className="text-gray-500" />
        </div>

        {/* Pincode */}
        <div
          className={`${roboto.className} flex items-center border border-[#d8b4a6] rounded-md px-3 py-3`}
        >
          <div className="flex items-center gap-2 flex-1 text-sm text-gray-500">
            <FiMapPin />
            <span>Enter Pincode</span>
          </div>
          <button className="text-sm font-medium text-[#8b5e55]">CHECK</button>
        </div>

        {/* Icons Row */}
        <div
          className={`${roboto.className} mt-6 grid grid-cols-3 text-center gap-4`}
        >
          <div className="flex flex-col items-center text-xs text-gray-700">
            <img
              src="/img/delivery.png"
              alt="Free Delivery"
              className="w-6 h-6"
            />
            <span className="mt-1">
              Free
              <br />
              Shipping
            </span>
          </div>

          <div className="flex flex-col items-center text-xs text-gray-700">
            <img src="/img/return.png" alt="Free return" className="w-6 h-6" />
            <span className="mt-1">
              3 Days
              <br />
              Easy Return
            </span>
          </div>

          <div className="flex flex-col items-center text-xs text-gray-700">
            <img src="/img/cod.png" alt="Free cod" className="w-6 h-6" />{" "}
            <span className="mt-1">
              Cash On
              <br />
              Delivery
            </span>
          </div>
        </div>
      </div>
      <SimilarSection />

      {/* Accordion Section */}
      <ProductAccordion />
      <YouMayAlsoLike />

      <CustomerReviewCarousel />
    </section>
  );
}
