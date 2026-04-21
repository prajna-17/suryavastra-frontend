"use client";

import { useEffect, useRef, useState } from "react";
import { roboto } from "@/app/fonts";
import {
  FileText,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Truck,
  Scale,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";

const sections = [
  {
    title: "Eligibility and Account",
    icon: ShoppingBag,
    points: [
      "By using this website, you confirm that the information you provide is accurate and up to date.",
      "You are responsible for maintaining the confidentiality of your account and login details.",
      "Any unauthorized use of your account should be reported to us immediately.",
    ],
  },
  {
    title: "Product Information and Pricing",
    icon: FileText,
    points: [
      "We aim to display saree colors, fabric details, and design elements as accurately as possible.",
      "Minor variations in color, weave, and texture may occur due to screen settings and handcrafted processes.",
      "Prices and product availability are subject to change without prior notice.",
    ],
  },
  {
    title: "Orders and Payments",
    icon: CreditCard,
    points: [
      "Orders are confirmed only after successful payment authorization.",
      "In case of payment failure or suspected fraud, we may cancel the order and initiate a refund as applicable.",
      "You agree to provide valid billing and shipping details for smooth order fulfillment.",
    ],
  },
  {
    title: "Shipping and Delivery",
    icon: Truck,
    points: [
      "Dispatch timelines are shared on product/order pages and may vary by location and logistics conditions.",
      "Delivery timelines are estimates and may be impacted by unforeseen delays.",
      "Once shipped, tracking details are shared on your registered contact channels.",
    ],
  },
  {
    title: "Returns, Refunds, and Cancellations",
    icon: Scale,
    points: [
      "Returns and refunds are governed by our Return and Refund policy.",
      "Products must meet eligibility conditions such as unused condition and original packaging.",
      "Cancellation requests are considered before dispatch; post-dispatch cancellations may not be possible.",
    ],
  },
  {
    title: "Intellectual Property",
    icon: ShieldCheck,
    points: [
      "All content on this site including images, logos, text, and designs belongs to Suryavastra unless otherwise stated.",
      "Any reproduction, commercial use, or distribution without written consent is prohibited.",
    ],
  },
  {
    title: "Limitation of Liability",
    icon: AlertTriangle,
    points: [
      "Suryavastra shall not be liable for indirect, incidental, or consequential damages arising from site usage.",
      "Our total liability, if any, is limited to the value of the product purchased through our platform.",
    ],
  },
  {
    title: "Support and Grievances",
    icon: MessageCircle,
    points: [
      "For any concerns related to orders, payments, or product quality, please use our Contact Us page.",
      "We strive to acknowledge and resolve support requests within reasonable business timelines.",
    ],
  },
];

function useInView(threshold = 0.14) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function TermsCard({ section, index }) {
  const [ref, inView] = useInView();
  const Icon = section.icon;

  return (
    <section
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`,
        border: "1px solid #f1dfdd",
        borderRadius: 20,
        background: "#fff",
        padding: "16px 14px",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            border: "1px solid #f0d8d5",
            background: "#fff5f4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={17} color="#7a3e39" />
        </div>

        <h2
          style={{
            margin: 0,
            color: "#6b3430",
            fontSize: 18,
            lineHeight: 1.2,
            letterSpacing: "-0.2px",
          }}
        >
          {section.title}
        </h2>
      </div>

      <div style={{ marginTop: 12 }}>
        {section.points.map((point, idx) => (
          <p
            key={point}
            style={{
              margin: idx === 0 ? 0 : "9px 0 0",
              fontSize: 13,
              lineHeight: 1.62,
              color: "#694d4b",
            }}
          >
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}

export default function TermsAndConditionsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 70);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={roboto.className}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 95% 0%, #fff3f1 0%, #ffffff 45%), radial-gradient(circle at 0% 100%, #fef7f6 0%, #ffffff 35%)",
        paddingBottom: 52,
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "42px 16px 0" }}>
        <div
          style={{
            borderRadius: 26,
            border: "1px solid #f2dfdd",
            background:
              "linear-gradient(135deg, rgba(170,93,93,0.09), rgba(100,53,51,0.08))",
            padding: "28px 22px",
          }}
        >
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
            Suryavastra Legal
          </p>
          <h1
            style={{
              margin: "10px 0 7px",
              color: "#6b3430",
              fontSize: "clamp(30px, 4vw, 44px)",
              letterSpacing: "-0.8px",
              lineHeight: 1.06,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(10px)",
              transition:
                "opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Terms and Conditions
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 760,
              color: "#8a6663",
              lineHeight: 1.65,
              fontSize: 14,
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.5s ease 0.16s",
            }}
          >
            These terms govern your use of Suryavastra and all purchases made
            through our website. By continuing to browse or place an order, you
            agree to comply with the terms stated below.
          </p>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gap: 14,
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {sections.map((section, index) => (
            <TermsCard key={section.title} section={section} index={index} />
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            borderRadius: 16,
            background: "#fff",
            border: "1px solid #f0dfdd",
            padding: "14px 14px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "#7a5c59",
              lineHeight: 1.58,
            }}
          >
            Last updated: April 2026. We may revise these terms from time to
            time to reflect legal, operational, or business changes. Continued
            use of the website after updates indicates acceptance of the revised
            terms.
          </p>

          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "#7a5c59",
              lineHeight: 1.58,
            }}
          >
            Governing law: These Terms of Service and any separate agreements
            where by we provide you Services shall be governed by and construed
            in accordance with the federal and state or territorial courts in
            the jurisdiction law of India. where Suryavastra is headquartered.
            You and suryavastra consent to venue and personal jurisdiction in
            such courts.
          </p>
        </div>
      </div>
    </div>
  );
}
