import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { roboto } from "@/app/fonts";

export default function CartItem({
  image,
  name,
  price,
  mrp,
  discount,
  rating = 5,
  deliveryDate,
  qty,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-3 space-y-3 mt-6 ${roboto.className}`}
    >
      <div className="flex gap-3">
        <Image
          src={image}
          alt={name}
          width={90}
          height={120}
          priority
          unoptimized
          className="rounded-lg object-cover w-[90px] h-[120px] flex-shrink-0"
        />

        <div className="flex-1 space-y-1">
          {/* PRODUCT NAME */}
          <h3 className="text-sm leading-snug">
            {name ? (
              <>
                <span className="font-medium">{name.split(" ")[0]}</span>{" "}
                {name.split(" ").slice(1, 4).join(" ")}
                <br />
                {name.split(" ").slice(4).join(" ")}
              </>
            ) : (
              <span className="font-medium text-gray-500">No Name</span>
            )}
          </h3>

          {/* RATING */}
          <div className="text-[#7b4b3a] text-[15px]">
            {"★ ".repeat(rating)}
          </div>

          {/* PRICE */}
          <div className="text-sm">
            <span className="text-gray-400 mr-2">MRP</span>
            <span className="line-through text-gray-400 mr-2">₹{mrp}</span>
            <span className="font-semibold">₹{price}</span>

            <span className="ml-2 px-2 py-[2px] text-[10px] font-semibold text-[#f1e9e8] bg-[#d4685a] rounded-full">
              {discount} OFF
            </span>
          </div>

          {/* QTY */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Qty:</span>

            <div className="flex items-center border border-[#6b3f36] rounded-md overflow-hidden">
              <button
                onClick={onDecrease}
                className="px-2 py-[2px] text-sm text-[#6b3f36] bg-[#f1b8ac]"
              >
                −
              </button>

              <span className="px-2 text-xs">{qty}</span>

              <button
                onClick={onIncrease}
                className="px-2 py-[2px] text-sm text-[#6b3f36] bg-[#f1b8ac]"
              >
                +
              </button>
            </div>
          </div>

          {/* DELIVERY */}
          <div className="flex items-start gap-2 mt-1">
            <span className="text-sm">🚚</span>
            <div className="text-xs text-gray-500 leading-snug">
              <p>Estimated delivery by Monday,</p>
              <p>{deliveryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex border-t pt-2 border-[#6b3f36]">
        <button className="flex-1 flex items-center justify-center gap-2 text-xs">
          <Heart size={16} /> Move to Wishlist
        </button>

        <button
          onClick={onRemove}
          className="flex-1 flex items-center justify-center gap-2 text-xs border-l border-[#6b3f36]"
        >
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </div>
  );
}
