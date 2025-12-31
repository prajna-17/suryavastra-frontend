"use client";
import { roboto } from "@/app/fonts";
import { API } from "@/utils/api";

export default function SortSheet({ open, onClose, setProducts }) {
  if (!open) return null;

  async function sortProducts(type) {
    const res = await fetch(`${API}/products`);
    const data = await res.json();

    let sorted = [...data];

    if (type === "best") {
      sorted = data.filter((p) => p.productSellingCategory === "best-selling");
    }
    if (type === "low-high") {
      sorted = data.sort((a, b) => a.price - b.price);
    }
    if (type === "high-low") {
      sorted = data.sort((a, b) => b.price - a.price);
    }

    setProducts(sorted);
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 ${roboto.className}`}
      style={{ color: "var(--color-brown)" }}
    >
      <div className="absolute bottom-0 w-full bg-white rounded-t-xl p-4">
        <div
          className="flex justify-between items-center mb-4 border-b"
          style={{ color: "var(--color-dark-brown)" }}
        >
          <span className="font-medium">Sort</span>
          <button onClick={onClose}>✕</button>
        </div>

        <p
          className="py-3 text-center text-sm"
          onClick={() => sortProducts("best")}
        >
          Best selling
        </p>

        <p
          className="py-3 text-center text-sm"
          onClick={() => sortProducts("low-high")}
        >
          Price - low to high
        </p>

        <p
          className="py-3 text-center text-sm"
          onClick={() => sortProducts("high-low")}
        >
          Price - high to low
        </p>
      </div>
    </div>
  );
}
