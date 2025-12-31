"use client";
import { useState, useEffect } from "react";
import { API } from "@/utils/api";

export default function FilterSheet({
  open,
  onClose,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div
        className="absolute bottom-0 w-full bg-white rounded-t-xl p-4"
        style={{ color: "var(--color-dark-brown)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b">
          <h3 className="font-medium">Filters</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* ⭐ CATEGORY FILTER */}
        <div className="py-6 border-b text-sm">
          <span className="font-medium">Category</span>

          <select
            className="w-full mt-2 border p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* existing filters untouched */}
        {["Price Range", "Material", "Colour", "Occasion"].map((item) => (
          <div
            key={item}
            className="flex justify-between py-6 border-b text-sm"
          >
            <span>{item}</span>
            <span>+</span>
          </div>
        ))}

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-20 w-full bg-[#7a463c] text-white py-2 rounded"
        >
          View Results
        </button>
      </div>
    </div>
  );
}
