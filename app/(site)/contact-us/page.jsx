"use client";

import { useEffect, useRef, useState } from "react";
import { roboto } from "@/app/fonts";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";

const supportCards = [
  {
    title: "Email Support",
    value: "suryavastra007@gmail.com",
    caption: "For order updates, exchanges, and product queries",
    icon: Mail,
  },
  {
    title: "Phone Support",
    value: "+91 6387775297",
    caption: "Mon - Sat, 10:00 AM - 7:00 PM",
    icon: Phone,
  },
  {
    title: "Store & Dispatch",
    value: "Noida, Delhi, India",
    caption: "Crafted and packed with care before dispatch",
    icon: MapPin,
  },
  {
    title: "Contact Name",
    value: "Piyush Anand",
    caption: "Primary point of contact",
    icon: MessageSquare,
  },
];

const reasons = [
  "Handpicked sarees with authentic craftsmanship",
  "Secure payments and quality-first packaging",
  "Responsive support for every step of your order",
  "Easy return and refund process for eligible items",
];

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function FadeUp({ children, delay = 0, threshold = 0.18 }) {
  const [ref, inView] = useInView(threshold);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactUsPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const whatsappNumber = "916387775297";

    const text = [
      "Hello Suryavastra Team,",
      "",
      "I would like support for the following request:",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || "Not provided"}`,
      `Order ID: ${formData.orderId || "Not provided"}`,
      `Subject: ${formData.subject || "General query"}`,
      `Message: ${formData.message}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={roboto.className}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 88% 0%, #fff3f1 0%, #ffffff 44%), radial-gradient(circle at 0% 100%, #fef6f5 0%, #ffffff 35%)",
        paddingBottom: 48,
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "42px 16px 0" }}>
        <div
          style={{
            borderRadius: 26,
            padding: "28px 22px",
            background:
              "linear-gradient(135deg, rgba(170,93,93,0.1), rgba(100,53,51,0.08))",
            border: "1px solid #f2dfdd",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -40,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #f6dddd 0%, rgba(246,221,221,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              margin: 0,
              color: "#b48885",
              fontSize: 11,
              letterSpacing: "2.2px",
              textTransform: "uppercase",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.45s ease",
            }}
          >
            Suryavastra Care
          </p>
          <h1
            style={{
              margin: "10px 0 6px",
              color: "#6b3430",
              fontSize: "clamp(30px, 4vw, 44px)",
              lineHeight: 1.05,
              letterSpacing: "-0.8px",
              fontWeight: 800,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.5s ease 0.08s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s",
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 620,
              color: "#8a6663",
              fontSize: 14,
              lineHeight: 1.65,
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.16s",
            }}
          >
            We are here to help with your saree orders, styling guidance,
            shipping questions, and post-purchase support. Share your concern
            and our team will get back quickly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginTop: 18,
          }}
        >
          {supportCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeUp key={card.title} delay={index * 0.08}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #f2e4e2",
                    borderRadius: 18,
                    padding: "14px 14px 12px",
                    boxShadow: "0 8px 24px rgba(90,35,35,0.05)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: "#fff4f3",
                      border: "1px solid #f0dbd8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} color="#7a3e39" />
                  </div>
                  <p
                    style={{
                      margin: "10px 0 4px",
                      color: "#7a3e39",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#2b1615",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {card.value}
                  </p>
                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#90706e",
                      fontSize: 12,
                      lineHeight: 1.45,
                    }}
                  >
                    {card.caption}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginTop: 18,
          }}
        >
          <FadeUp delay={0.08}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #f2e4e2",
                borderRadius: 22,
                padding: "18px 16px",
                boxShadow: "0 12px 30px rgba(90,35,35,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MessageSquare size={18} color="#7a3e39" />
                <h2
                  style={{
                    margin: 0,
                    color: "#6b3430",
                    fontSize: 21,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Send a Message
                </h2>
              </div>
              <p
                style={{
                  margin: "7px 0 14px",
                  color: "#92706f",
                  fontSize: 13,
                }}
              >
                Fill in the details below and we will reach out soon.
              </p>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 10,
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    name="orderId"
                    placeholder="Order ID (optional)"
                    value={formData.orderId}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ ...inputStyle, marginTop: 10 }}
                />

                <textarea
                  name="message"
                  placeholder="Tell us how we can help"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, marginTop: 10, resize: "vertical" }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: 12,
                    border: "none",
                    borderRadius: 12,
                    background:
                      "linear-gradient(90deg, #6b3430 0%, #8a4944 100%)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 13,
                    padding: "10px 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(107,52,48,0.26)",
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                >
                  <Send size={14} />
                  {isSubmitting ? "Opening WhatsApp..." : "Submit Request"}
                </button>

                <p
                  style={{ margin: "10px 0 0", color: "#8f6f6d", fontSize: 12 }}
                >
                  On submit, a pre-filled WhatsApp message opens to send your
                  request instantly.
                </p>
              </form>
            </div>
          </FadeUp>

          <FadeUp delay={0.16}>
            <div style={{ display: "grid", gap: 14 }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #f2e4e2",
                  borderRadius: 20,
                  padding: "16px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Clock3 size={16} color="#7a3e39" />
                  <p
                    style={{
                      margin: 0,
                      color: "#7a3e39",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Typical Response Time
                  </p>
                </div>
                <p
                  style={{ margin: "8px 0 0", color: "#2b1715", fontSize: 13 }}
                >
                  Within 24 business hours for email and same-day callbacks
                  during support hours.
                </p>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #f2e4e2",
                  borderRadius: 20,
                  padding: "16px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Sparkles size={16} color="#7a3e39" />
                  <p
                    style={{
                      margin: 0,
                      color: "#7a3e39",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    Why Shop With Us
                  </p>
                </div>
                <div style={{ marginTop: 10 }}>
                  {reasons.map((item, index) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        marginTop: index === 0 ? 0 : 9,
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        color="#8a4944"
                        style={{ marginTop: 2 }}
                      />
                      <p
                        style={{
                          margin: 0,
                          color: "#725553",
                          fontSize: 12.5,
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  border: "1px solid #edd8d6",
  borderRadius: 11,
  padding: "11px 12px",
  outline: "none",
  fontSize: 13,
  color: "#2b1715",
  background: "#fffdfd",
};
