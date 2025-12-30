"use client";
import { FiX, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function ShareModal({
  open,
  onClose,
  productLink,
  showBottomMessage,
}) {
  const copyLink = () => {
    navigator.clipboard.writeText(productLink);
    onClose(); // closes modal
    showBottomMessage("Link Copied ✔"); // same style as add to cart message
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex justify-center items-end
      transition-all duration-300 text-[#6b3430] ${
        open ? "visible" : "invisible pointer-events-none"
      }`}
    >
      {/* Dim Background */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Bottom Sheet */}
      <div
        className={`w-full max-w-[480px] bg-white rounded-t-2xl p-5 pb-8 z-[999999]
        transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share Product</h3>
          <button onClick={onClose}>
            <FiX size={22} />
          </button>
        </div>

        {/* Share options */}
        <div className="grid grid-cols-4 gap-5 text-center text-sm font-medium">
          <button
            className="flex flex-col items-center"
            onClick={() =>
              window.open(`https://wa.me/?text=${productLink}`, "_blank")
            }
          >
            <FaWhatsapp size={28} className="text-green-500" />
            WhatsApp
          </button>

          <button
            className="flex flex-col items-center"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${productLink}`,
                "_blank"
              )
            }
          >
            <FaFacebookF size={28} className="text-blue-600" />
            Facebook
          </button>

          <button
            className="flex flex-col items-center"
            onClick={() => window.open(`https://www.instagram.com/`, "_blank")}
          >
            <FaInstagram size={28} className="text-pink-500" />
            Instagram
          </button>

          <button className="flex flex-col items-center" onClick={copyLink}>
            <FiCopy size={28} />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
