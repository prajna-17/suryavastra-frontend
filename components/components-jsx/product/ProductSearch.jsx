"use client";
import { roboto } from "@/app/fonts";

import { FiSearch } from "react-icons/fi";

export default function ProductSearch() {
  return (
    <div
      className={`${roboto.className}  px-4 pt-3 pb-2`}
      style={{ color: "var(--color-brown)" }}
    >
      {/* Search Bar */}
      <div className="flex items-center gap-2 border rounded-sm px-4 py-2 text-sm ">
        <FiSearch className="" />
        <span>Search here</span>
      </div>

      {/* Breadcrumb */}
      <p className={`${roboto.className} text-xs  mt-3`}>
        Home &gt; Saree &gt; Lorem
      </p>
    </div>
  );
}
