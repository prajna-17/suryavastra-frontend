"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Where is my order?",
    a: "You can track your order from the Order History section. Once shipped, tracking details will appear there.",
  },
  {
    q: "Can I cancel my order?",
    a: "Yes, orders can be cancelled before they are shipped. Go to Order Details and tap on Cancel Order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Online Payments and Cash on Delivery (COD) for selected locations.",
  },
  {
    q: "I faced a payment issue. What should I do?",
    a: "If your payment failed but amount was deducted, it will be auto-refunded within 5–7 working days.",
  },
];

export default function HelpSupportPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`min-h-screen bg-[#faf7f6] px-4 pb-12 `}>
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 mb-8"
      >
        <h1 className="text-2xl font-semibold text-[#6b3430]">
          Help & Support 🤍
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          We’re here to help you every step of the way
        </p>
      </motion.div>

      {/* QUICK HELP CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { title: "Orders", emoji: "📦" },
          { title: "Payments", emoji: "💳" },
          { title: "Returns", emoji: "🔁" },
          { title: "Account", emoji: "👤" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl p-4 shadow-md text-center"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="text-sm font-medium text-[#6b3430]">{item.title}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ SECTION */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg font-semibold text-[#6b3430] mb-4"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <span className="text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-4 pb-4 text-sm text-gray-600"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* CONTACT SUPPORT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-white rounded-2xl p-5 shadow-lg text-center"
      >
        <h3 className="text-lg font-semibold text-[#6b3430] mb-2">
          Still need help?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Reach out to us. We usually reply within a few hours ✨
        </p>

        <div className="flex gap-3">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=support@suryavastra.com&su=Help Needed&body=Hi Suryavastra Team,"
            target="_blank"
            className="flex-1 border py-3 rounded-xl text-sm font-medium"
          >
            Email Us
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="flex-1 bg-[#6b3430] text-white py-3 rounded-xl text-sm font-medium"
          >
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
