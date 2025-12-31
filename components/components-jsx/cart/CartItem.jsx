import Image from "next/image";
import getDiscount from "@/utils/getDiscount";
import { Heart, Trash2 } from "lucide-react";
import { roboto } from "@/app/fonts";

export default function CartItem({
  id,
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
  const productName = name || "Product";
  const finalDiscount = discount || getDiscount(price, mrp);
  const safeId = `cart-${productName.replace(/\s/g, "")}`;

  return (
    <div
      id={safeId}
      className={`cart-item bg-white rounded-xl shadow-md p-3 space-y-3 mt-6 ${roboto.className}`}
    >
      <div className="flex gap-3">
        <Image
          src={image}
          alt={productName}
          width={90}
          height={120}
          priority
          unoptimized
          className="rounded-lg object-cover w-[90px] h-[120px] flex-shrink-0"
        />

        <div className="flex-1 space-y-1">
          {/* PRODUCT NAME */}
          <h3 className="text-sm leading-snug">
            <span className="font-medium">{productName.split(" ")[0]}</span>{" "}
            {productName.split(" ").slice(1).join(" ")}
          </h3>

          {/* RATING */}
          <div className="text-[#7b4b3a] text-[15px]">
            {"★ ".repeat(rating)}
          </div>

          {/* PRICE */}
          <div className="text-sm">
            <span className="text-gray-400 mr-2">MRP</span>
            <span className="line-through text-gray-400 mr-2">
              ₹{mrp?.toLocaleString("en-IN")}
            </span>
            <span className="font-semibold">
              ₹{price?.toLocaleString("en-IN")}
            </span>

            <span className="ml-2 px-2 py-[2px] text-[10px] font-semibold text-[#f1e9e8] bg-[#d4685a] rounded-full">
              {finalDiscount} OFF
            </span>
          </div>

          {/* QTY */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Qty:</span>

            <div className="qty-box flex items-center border border-[#6b3f36] rounded-md overflow-hidden">
              <button
                onClick={(e) => {
                  onDecrease();
                  const box = e.currentTarget.parentElement;
                  box.classList.add("qty-pop");

                  const audio = new Audio("/sounds/pop.mp3");
                  audio.volume = 0.4;
                  audio.play();

                  setTimeout(() => box.classList.remove("qty-pop"), 200);
                }}
                className="px-2 py-[2px] text-sm text-[#6b3f36] bg-[#f1b8ac]"
              >
                −
              </button>

              <span className="px-2 text-xs">{qty}</span>

              <button
                onClick={(e) => {
                  onIncrease();
                  const box = e.currentTarget.parentElement;
                  box.classList.add("qty-pop");

                  const audio = new Audio("/sounds/pop.mp3");
                  audio.volume = 0.4;
                  audio.play();

                  setTimeout(() => box.classList.remove("qty-pop"), 200);
                }}
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
              <p>Estimated delivery by Monday</p>
              <p>{deliveryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS (Modal + Animations revived) */}
      <div className="flex border-t pt-2 border-[#6b3f36]">
        {/* Move to Wishlist */}
        <button
          onClick={() => {
            import("@/utils/wishlist").then(({ toggleWishlist }) => {
              toggleWishlist({
                id, // ← use actual product id
                name,
                image,
                price,
                mrp,
                discount: getDiscount(price, mrp),
              });
            });

            const box = document.getElementById(
              `cart-${name.replace(/\s/g, "")}`
            );

            // ❤️ heart popup animation
            const heart = document.createElement("div");
            heart.innerHTML = "🤎";
            heart.className = "pop-heart";
            heart.style.position = "absolute";
            heart.style.bottom = "10px";
            heart.style.right = "50%";
            heart.style.fontSize = "22px";
            heart.style.animation = "popJump .7s ease forwards";
            box.appendChild(heart);
            setTimeout(() => heart.remove(), 800);

            const audio = new Audio("/sounds/pop.mp3");
            audio.volume = 0.6;
            audio.play();

            box.classList.add("slide-wish");

            setTimeout(() => {
              onRemove();
              window.dispatchEvent(new Event("wishlist-updated"));
            }, 400);
          }}
          className="flex-1 flex items-center justify-center gap-2 text-xs"
        >
          <Heart size={16} /> Move to Wishlist
        </button>
        {/* REMOVE WITH MODAL */}
        <button
          onClick={() => {
            const confirmBox = document.createElement("div");
            confirmBox.className = "confirm-remove-box";
            confirmBox.innerHTML = `
              <div class="confirm-text">Remove item from cart?</div>
              <div class="confirm-actions">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
              </div>`;

            document.body.appendChild(confirmBox);

            confirmBox.querySelector(".confirm-yes").onclick = () => {
              const box = document.getElementById(safeId);
              box.classList.add("slide-remove");
              setTimeout(() => onRemove(), 400);
              confirmBox.remove();
            };
            const audio = new Audio("/sounds/pop.mp3");
            audio.volume = 0.6;
            audio.play();
            confirmBox.querySelector(".confirm-no").onclick = () =>
              confirmBox.remove();
          }}
          className="flex-1 flex items-center justify-center gap-2 text-xs border-l border-[#6b3f36]"
        >
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </div>
  );
}
