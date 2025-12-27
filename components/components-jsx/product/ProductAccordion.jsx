"use client";

import { useState } from "react";
import { roboto } from "@/app/fonts";

const accordionData = [
  {
    title: "PRODUCT DETAILS",
    content: (
      <div className="space-y-3.5 text-sm text-gray-900 leading-snug">
        <p>
          <b>Length:</b> 6.50 m (650 cm) which includes a 1.00 m (100 cm) blouse
          piece
        </p>
        <p>
          <b>Width:</b> 1.19 m (119.38 cm)
        </p>
        <p>
          <b>Blouse Piece:</b> Yes
        </p>
        <p>
          <b>Wash Care:</b> Dry wash
        </p>
        <p>
          <b>Blouse:</b> The model is wearing size S of blouse.
        </p>
        <p>
          <b>Fabric:</b> Zari
        </p>
        <p>
          <b>Occasion:</b> Wedding Season or any season
        </p>
        <p className="space-y-3.5">
          <b>Disclaimer:</b> The pictures are clicked in daylight. Colour may
          vary slightly due to screen brightness.
        </p>
      </div>
    ),
  },
  { title: "DESCRIPTION", content: null },
  { title: "MANUFACTURING INFORMATION", content: null },
  { title: "RETURN & EXCHANGE POLICY", content: null },
  { title: "FAQ’s", content: null },
];

export default function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${roboto.className} mt-10 px-4`}>
      {/* TOP DIVIDER — inset, not touching edges */}
      <div className="border-t border-[#d8b4a6]" />

      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-[#d8b4a6]">
            {/* Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center text-left py-4"
            >
              <span className="text-sm font-medium tracking-wide">
                {item.title}
              </span>

              <span
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {/* Content */}
            {isOpen && item.content && (
              <div className="mb-4 bg-white rounded-lg shadow-sm p-4">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
