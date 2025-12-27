"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const reviews = [
  {
    name: "Lorem",
    date: "October 23, 2025",
    text: "Good quality saree with silk,\nI am very happy with the product.",
    images: ["/img/saree9.jpeg", "/img/saree6.jpeg", "/img/saree3.jpeg"],
  },
  {
    name: "Asha",
    date: "September 10, 2025",
    text: "The saree looks elegant and premium.\nWorth the price.",
    images: ["/img/saree5.jpeg", "/img/saree9.jpeg", "/img/saree10.jpeg"],
  },
];

export default function CustomerReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  return (
    <section className="mt-20 px-4">
      {/* ===== HEADER ===== */}
      <div className="text-center">
        <h2 className="text-[20px] font-medium text-[#7b4b3a]">
          Customer Review
        </h2>

        <div className="flex justify-center gap-[6px] mt-1 text-[#7b4b3a] text-[30px]">
          ★ ★ ★ ★ ★
        </div>

        <p className="text-[13px] text-gray-500 mt-1">Based on 500 + Reviews</p>

        <button className="mt-4 bg-[#7b4b3a] text-white px-6 py-[10px] rounded-md text-[13px]">
          Write a Review
        </button>
      </div>

      {/* ===== REVIEW CARD ===== */}
      <div className="relative mt-12 flex justify-center items-center">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setIndex((index - 1 + reviews.length) % reviews.length)
          }
          className="absolute left-[-10px] bg-[#f3e6df] w-9 h-9 rounded-full flex items-center justify-center"
        >
          <FiChevronLeft size={18} />
        </button>

        {/* Card */}
        <div className="w-[280px] bg-white rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.1)] px-6 py-7">
          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f1c94b] text-white flex items-center justify-center font-medium text-sm">
              {review.name[0]}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-800">{review.name}</p>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
          </div>

          {/* Google + Stars */}
          <div className="mt-6 flex items-center gap-2">
            <img
              src="/img/google.jpg"
              alt="Google"
              className="w-[30px] h-[30px]"
            />
            <br />
          </div>

          <div className="mt-2 text-[#7b4b3a] text-[25px] tracking-[2px]">
            ★★★★★
          </div>

          {/* Review Text */}
          <p className="mt-4 text-[14px] text-gray-700 leading-[1.6] whitespace-pre-line">
            {review.text}
          </p>

          {/* Media */}
          <div className="mt-6 flex gap-3">
            {review.images.map((img, i) => (
              <div
                key={i}
                className="w-[80px] h-[90px] rounded-md overflow-hidden relative"
              >
                <img src={img} className="w-full h-full object-cover" alt="" />
                {i === 0 && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-black text-xs">
                      ▶
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => setIndex((index + 1) % reviews.length)}
          className="absolute right-[-10px] bg-[#f3e6df] w-9 h-9 rounded-full flex items-center justify-center"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
