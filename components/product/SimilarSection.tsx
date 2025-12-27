"use client";
import { roboto } from "@/app/fonts";

export default function SimilarSection() {
  return (
    <div className={`${roboto.className} mt-10 px-4`}>
      {/* Not Sure Section */}
      <p className="text-base font-medium mb-3">Not Sure What To Buy ?</p>

      <div className="relative h-24 rounded-lg overflow-hidden bg-gradient-to-r from-gray-400 to-gray-300 flex items-center px-4">
        <div className="text-white text-sm font-medium">
          Chat with us <br /> on WhatsApp
        </div>

        <span className="ml-2 text-2xl">💬</span>

        <img
          src="/img/whatsapp-girl.png"
          alt="Chat support"
          className="absolute right-0 top-0 h-full object-cover"
        />
      </div>

      {/* Similar Products */}
      <div className="relative mt-10 border border-[#d8b4a6] rounded-lg px-4 pt-10 pb-6">
        {/* Floating title */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 border border-[#d8b4a6] rounded-md text-sm font-bold "
          style={{ color: "var(--color-brown" }}
        >
          Similar Products
        </div>

        {/* Slider */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[6, 20, 21, 4, 5, 12].map((item) => (
            <div key={item} className="flex-shrink-0 w-32 h-28">
              <div className="aspect-[3/4] rounded-md overflow-hidden bg-gray-200">
                <img
                  src={`/img/saree${item}.jpeg`}
                  alt="Similar product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
