"use client";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center">
      {/* Message Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mb-2 bg-[#6b3430] text-white text-xs px-4 py-2 rounded-full shadow-lg"
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/916387775297"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
        whileHover={{ scale: 1.15 }}
        className="bg-[#25D366] p-4 rounded-full shadow-xl"
      >
        <FaWhatsapp size={30} className="text-white" />
      </motion.a>
    </div>
  );
}
