"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterSheet from "./FilterSheet";
import SortSheet from "./SortSheet";
import { FiFilter, FiSliders } from "react-icons/fi";
import RecentlyViewed from "@/components/components-jsx/shop/RecentlyViewed";
import { roboto, rougeScript } from "@/app/fonts";
import { API } from "@/utils/api";
import getDiscount from "@/utils/getDiscount";

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const ITEMS_PER_LOAD = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    setAllProducts(data);
    setVisibleProducts(data.slice(0, ITEMS_PER_LOAD));
  }

  // ⬇ infinite load
  function loadMore() {
    const next = page + 1;
    const end = next * ITEMS_PER_LOAD;

    const more = allProducts.slice(0, end);
    setVisibleProducts(more);
    setPage(next);
  }

  // detect scroll bottom
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

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
        />
      </div>

      {/* Breadcrumb */}
      <div
        className={`px-3 py-3 text-sm mt-3 ${roboto.className}`}
        style={{ color: "var(--color-brown)" }}
      >
        Home &gt; <span className="font-medium">Banarasi Saree</span>
      </div>

      {/* Filter + Sort */}
      <div
        className={`flex justify-between items-center px-4 py-3 ${roboto.className}`}
      >
        <p className="text-sm">{visibleProducts.length} Products</p>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 border border-yellow-900 px-3 py-[6px] rounded-md text-sm"
          >
            <FiFilter size={14} />{" "}
            <span style={{ color: "var(--color-brown)" }}>Filter</span>
          </button>

          <button
            onClick={() => setShowSort(true)}
            className="flex items-center gap-1 border border-yellow-900 px-3 py-[6px] rounded-md text-sm"
          >
            <FiSliders size={14} />{" "}
            <span style={{ color: "var(--color-brown)" }}>Sort</span>
          </button>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {visibleProducts.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            image={item.images?.[0]}
            name={item.title}
            price={item.price}
            origPrice={item.oldPrice}
            discount={getDiscount(item.price, item.oldPrice)}
          />
        ))}
      </div>

      {/* LOADING TEXT */}
      {visibleProducts.length < allProducts.length && (
        <p className="text-center py-4 text-sm text-gray-500">
          Loading more...
        </p>
      )}

      {/* Bottom Banners untouched */}
      {/* Sale Banner */}
      {/* Sale Banner */}
      {/* Sale Banner */}
      <div className="mb-8 mt-20">
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

      <FilterSheet open={showFilter} onClose={() => setShowFilter(false)} />
      <SortSheet
        open={showSort}
        onClose={() => setShowSort(false)}
        setProducts={setAllProducts}
      />
    </div>
  );
}
