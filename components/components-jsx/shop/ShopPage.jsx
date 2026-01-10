"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "./ProductCard";
import FilterSheet from "./FilterSheet";
import SortSheet from "./SortSheet";
import { FiFilter, FiSliders } from "react-icons/fi";
import RecentlyViewed from "@/components/components-jsx/shop/RecentlyViewed";
import { roboto, rougeScript } from "@/app/fonts";
import { API } from "@/utils/api";
import getDiscount from "@/utils/getDiscount";

function ShopContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const ITEMS_PER_LOAD = 10;

  useEffect(() => {
    fetchProducts();
  }, [category]);

  async function fetchProducts() {
    const url = category
      ? `${API}/products?category=${category}`
      : `${API}/products`;

    const res = await fetch(url);
    const data = await res.json();
    setAllProducts(data);
    setVisibleProducts(data.slice(0, ITEMS_PER_LOAD));
    setPage(1);
  }

  function loadMore() {
    const next = page + 1;
    const end = next * ITEMS_PER_LOAD;
    setVisibleProducts(allProducts.slice(0, end));
    setPage(next);
  }

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

  const breadcrumbLabel =
    category && allProducts.length > 0
      ? allProducts[0]?.category?.name || "Products"
      : "All Products";

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
      <div className={`px-3 py-3 text-sm mt-3 ${roboto.className}`}>
        Home &gt; <span className="font-medium">{breadcrumbLabel}</span>
      </div>

      {/* Filter + Sort */}
      <div
        className={`flex justify-between items-center px-4 py-3 ${roboto.className}`}
      >
        <p className="text-sm">{visibleProducts.length} Products</p>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-1 border px-3 py-[6px] rounded-md text-sm"
          >
            <FiFilter size={14} /> Filter
          </button>

          <button
            onClick={() => setShowSort(true)}
            className="flex items-center gap-1 border px-3 py-[6px] rounded-md text-sm"
          >
            <FiSliders size={14} /> Sort
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {visibleProducts.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            image={item.images?.[0]}
            name={item.title}
            price={item.price}
            origPrice={item.oldPrice}
            color={item.colors?.[0] || "Default"}
            discount={getDiscount(item.price, item.oldPrice)}
          />
        ))}
      </div>

      {visibleProducts.length < allProducts.length && (
        <p className="text-center py-4 text-sm text-gray-500">
          Loading more...
        </p>
      )}

      <RecentlyViewed />

      <FilterSheet open={showFilter} onClose={() => setShowFilter(false)} />
      <SortSheet
        open={showSort}
        onClose={() => setShowSort(false)}
        products={visibleProducts}
        setProducts={setVisibleProducts}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading products…</div>}>
      <ShopContent />
    </Suspense>
  );
}
