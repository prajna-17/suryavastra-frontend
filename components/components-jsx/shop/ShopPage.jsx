"use client";
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";
import FilterSheet from "./FilterSheet";
import SortSheet from "./SortSheet";
import { FiFilter, FiSliders } from "react-icons/fi";
import RecentlyViewed from "@/components/components-jsx/shop/RecentlyViewed";
import { roboto } from "@/app/fonts";
import { rougeScript } from "@/app/fonts";
import { shopProducts } from "@/data/data";

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="bg-[#f6efec] min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-[200px]">
        <Image
          src="/img/saree6copy.jpeg"
          alt="Banarasi Sarees"
          fill
          sizes="100vw"
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

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {shopProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.discountedPrice}
            origPrice={item.price}
            discount={item.off}
          />
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
      <div className="mb-8">
        <div className="relative w-full h-[150px] overflow-hidden ">
          <Image
            src="/img/saree9.jpeg"
            alt="End of Season Sale"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          <div
            className={
              "absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-start "
            }
          >
            <p
              className={`text-[30px] font-medium text-[#080808] mb-1 absolute bottom-19 left-2 whitespace-nowrap underline ${rougeScript.className}`}
            >
              End of Season
            </p>

            <div className="mb-1 bg-[#fdcc44] left-1">
              <Image
                src="/img/saree16.jpeg"
                alt="Sale"
                width={70}
                height={70}
                className="mix-blend-multiply"
              />
            </div>

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
