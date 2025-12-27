"use client";
import { roboto } from "@/app/fonts";
import { FiFilter, FiSliders } from "react-icons/fi";

type SortSheetProps = {
  open: boolean;
  onClose: () => void;
};

export default function SortSheet({ open, onClose }: SortSheetProps) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 ${roboto.className}`}
      style={{ color: "var(--color-brown)" }}
    >
      <div className="absolute bottom-0 w-full bg-white rounded-t-xl p-4">
        {/* Header */}
        <div
          className="flex justify-between items-center mb-4 border-b"
          style={{ color: "var(--color-dark-brown)" }}
        >
          <div className="flex-items-center gap-2 font-medium ">
            <span> Sort</span>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {["Best selling", "Price - low to high", "Price - high to low"].map(
          (item) => (
            <p
              key={item}
              onClick={onClose}
              className="py-3 text-center text-sm "
            >
              {item}
            </p>
          )
        )}
      </div>
    </div>
  );
}
