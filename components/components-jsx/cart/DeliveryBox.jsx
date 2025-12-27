import { roboto } from "@/app/fonts";

export default function DeliveryBox() {
  return (
    <div className="border border-dashed border-[#6b3430] rounded-lg p-3 flex items-center justify-between">
      <p className="text-sm text-[#0c0b0b] ">📍 Delivery at Delhi - 444111</p>

      <button
        className={`${roboto.className} text-xs border border-[#6b3430] px-3 py-1 rounded-md text-[#6b3430] font-medium`}
      >
        CHANGE
      </button>
    </div>
  );
}
