import { roboto } from "@/app/fonts";

export default function CouponSection() {
  return (
    <div className={`${roboto.className} space-y-3 mt-15`}>
      <h3 className="font-medium text-sm flex items-center gap-2">
        🎟 Best Coupons for You
      </h3>

      {[1, 2].map((_, i) => (
        <div
          key={i}
          className="border border-dashed border-[#c8a9a1] rounded-lg p-3 flex justify-between items-center mt-7"
        >
          <div className="space-y-1">
            <p className="font-medium text-sm whitespace-nowrap">
              Extra ₹151 OFF
            </p>
            <p className="text-xs text-gray-500">
              15% off upto Rs.150 on minimum purchase of Rs.300
            </p>
            <div
              className="mt-2 inline-block border border-dashed border-[#7fbf9a] bg-[#cff1a9] text-xs px-2 py-[2px] rounded text-[#4f8f6b]"
              style={{ color: "var(--color-dark-brown" }}
            >
              ✂ ABD15
            </div>
          </div>
          <div className="self-end">
            <button className="border border-[#c8a9a1] text-xs px-3 py-2 rounded-md font-medium  text-[#6b3f36] whitespace-nowrap">
              APPLY COUPON
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
