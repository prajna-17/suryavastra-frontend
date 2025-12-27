"use client";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";
import FilterSheet from "./FilterSheet";
import SortSheet from "./SortSheet";
import { FiFilter, FiSliders } from "react-icons/fi";
import RecentlyViewed from "@/components/shop/RecentlyViewed";
import { roboto } from "@/app/fonts";
import { rougeScript } from "@/app/fonts";

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const sareeImages = [
    "/img/saree13.jpeg",
    "/img/saree4.jpeg",
    "/img/saree3.jpeg",
    "/img/saree21.jpeg",
    "/img/saree7.jpeg",
    "/img/saree12.jpeg",
    "/img/saree5.jpeg",
    "/img/saree1.jpeg",
    "/img/saree2.jpeg",
    "/img/saree8.jpeg",
  ];

  return (
    <div className="bg-[#f6efec] min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-[200px]">
        <Image
          src="/img/saree6copy.jpeg"
          alt="Banarasi Sarees"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Breadcrumb */}
      <div
        className={`px-3 py-3 text-sm text-gray-600 mt-3 ${roboto.className}`}
        style={{ color: "var(--color-brown)" }}
      >
        Home &gt; <span className="font-medium">Banarasi Saree</span>
      </div>

      {/* Top row */}
      <div
        className={`flex justify-between items-center px-4 py-3 ${roboto.className}`}
      >
        <p className="text-sm">2000 Products</p>

        <div className="flex gap-2">
          {/* Filter */}
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 border border-yellow-900 px-3 py-[6px] rounded-md text-sm"
          >
            <FiFilter size={14} />
            <span style={{ color: "var(--color-brown)" }}>Filter</span>
          </button>

          {/* Sort */}
          <button
            onClick={() => setShowSort(true)}
            className="flex items-center gap-1 border border-yellow-900 px-3 py-[6px] rounded-md text-sm"
          >
            <FiSliders size={14} />
            <span style={{ color: "var(--color-brown)" }}>Sort</span>
          </button>
        </div>
      </div>

      {/* Product grid (mobile) */}
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {sareeImages.map((img, index) => (
          <ProductCard key={index} image={img} />
        ))}
      </div>

      <div className="flex justify-center my-6">
        <button
          className=" text-white text-sm px-6 py-2 rounded"
          style={{ backgroundColor: "var(--color-dark-brown)" }}
        >
          VIEW ALL
        </button>
      </div>
      {/* Sale Banner */}
      {/* Sale Banner */}
      {/* Sale Banner */}
      <div className="mb-8">
        <div className="relative w-full h-[150px] overflow-hidden ">
          {/* Background Saree – full width */}
          <Image
            src="/img/saree9.jpeg"
            alt="End of Season Sale"
            fill
            className="object-cover"
            priority
          />

          {/* Left content stack */}
          <div
            className={
              "absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-start "
            }
          >
            {/* End of Season text */}
            <p
              className={`text-[30px] font-medium text-[#080808] mb-1 absolute bottom-19 left-2 whitespace-nowrap underline ${rougeScript.className}`}
            >
              End of Season
            </p>

            {/* SALE tags image (no box feeling) */}
            <div className="mb-1 bg-[#fdcc44] left-1">
              <Image
                src="/img/saree16.jpeg"
                alt="Sale"
                width={70}
                height={70}
                className="mix-blend-multiply"
              />
            </div>

            {/* Shop Now button */}
            <button className="bg-white text-[#7a463c] text-[11px] px-4 py-1 rounded shadow">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <RecentlyViewed />

      {/* Bottom sheets */}
      <FilterSheet open={showFilter} onClose={() => setShowFilter(false)} />

      <SortSheet open={showSort} onClose={() => setShowSort(false)} />
    </div>
  );
}
