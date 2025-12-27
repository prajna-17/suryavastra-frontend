"use client";

import { FiPercent } from "react-icons/fi";
import { roboto } from "@/app/fonts";

export default function PromotionCards() {
  return (
    <div className={`${roboto.className} mt-4 px-4`}>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {/* Card 1 */}
        <div className="min-w-[260px] border border-dashed border-[#cfa7a0] rounded-lg overflow-hidden">
          {/* TOP COLORED HALF */}
          <div className="bg-[#f3dfdb] px-3 py-2">
            <div className="flex items-center gap-2">
              <FiPercent className="text-[#8b5e55] text-sm" />
              <span className="text-sm font-medium text-[#6f4a44]">
                Exclusive Discounts + Gifts
              </span>
            </div>
          </div>

          {/* BOTTOM WHITE HALF */}
          <div className="px-3 py-3">
            <p className="text-sm text-gray-700">
              Sale is live for 24 hours only
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="min-w-[260px] border border-dashed border-[#cfa7a0] rounded-lg overflow-hidden">
          {/* TOP COLORED HALF */}
          <div className="bg-[#f3dfdb] px-3 py-2">
            <div className="flex items-center gap-2">
              <FiPercent className="text-[#8b5e55] text-sm" />
              <span className="text-sm font-medium text-[#6f4a44]">
                Buy 2 Get 1 Free{" "}
              </span>
            </div>
          </div>

          {/* BOTTOM WHITE HALF */}
          <div className="px-3 py-3">
            <p className="text-sm text-gray-700">
              Sale is live for 24 hours only
            </p>
          </div>
        </div>

        <div className="min-w-[260px] border border-dashed border-[#cfa7a0] rounded-lg overflow-hidden">
          {/* TOP COLORED HALF */}
          <div className="bg-[#f3dfdb] px-3 py-2">
            <div className="flex items-center gap-2">
              <FiPercent className="text-[#8b5e55] text-sm" />
              <span className="text-sm font-medium text-[#6f4a44]">
                Free Shopping Bag{" "}
              </span>
            </div>
          </div>

          {/* BOTTOM WHITE HALF */}
          <div className="px-3 py-3">
            <p className="text-sm text-gray-700">Only limited time offer </p>
          </div>
        </div>
      </div>
    </div>
  );
}
