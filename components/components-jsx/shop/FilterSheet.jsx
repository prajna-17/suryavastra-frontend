"use client";
import { useState, useEffect } from "react";

export default function FilterSheet({ open, onClose }) {
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
