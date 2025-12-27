import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { roboto } from "@/app/fonts";

type CartItemProps = {
  image: string;
};

export default function CartItem({ image }: CartItemProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-3 space-y-3 mt-10 ${roboto.className}`}
    >
      <div className="flex gap-3">
        <Image
          src={image}
          alt="product"
          width={90}
          height={120}
          priority
          className="rounded-lg object-cover w-[90px] h-[120px] flex-shrink-0"
        />

        <div className="flex-1 space-y-1">
          <h3 className="text-sm leading-snug">
            <span className="font-medium">Lorem</span> Woven Design Zari
            <br />
            Pink Silk Saree
          </h3>
          <div className="gap-[6px] mt-1 text-[#7b4b3a] text-[15px]">
            ★ ★ ★ ★ ★
          </div>{" "}
          <div className="text-sm">
            <span className="text-gray-400 mr-2">MRP</span>
            <span className="line-through text-gray-400 mr-2">₹5,499</span>
            <span className="font-semibold">₹2,599</span>
            <span className="ml-2 px-2 py-[2px] text-[10px] font-semibold text-[#f1e9e8] bg-[#d4685a] rounded-full">
              50% OFF
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Qty:</span>

            <div className="flex items-center border border-[#6b3f36] rounded-md bg-[#ffffff] overflow-hidden">
              <button className="px-2 py-[2px] text-sm text-[#6b3f36] bg-[#f1b8ac]">
                −
              </button>

              <span className="px-2 text-xs text-[#0c0c0c]">1</span>

              <button className="px-2 py-[2px] text-sm text-[#6b3f36] bg-[#f1b8ac]">
                +
              </button>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-1">
            <span className="text-sm">🚚</span>

            <div className="text-xs text-gray-500 leading-snug">
              <p>Estimated delivery by Monday,</p>
              <p>22nd Dec</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-t pt-2  border-[#6b3f36]">
        <button className="flex-1 flex items-center justify-center gap-2 text-xs">
          <Heart size={16} /> Move to Wishlist
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 text-xs border-l  border-[#6b3f36]">
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </div>
  );
}
