"use client";

import { useEffect, useRef, useState } from "react";
import { roboto } from "@/app/fonts";
import {
  RotateCcw,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Package,
  Lock,
  Eye,
  Sparkles,
} from "lucide-react";

const policies = [
  {
    title: "Return Policy",
    icon: RotateCcw,
    stat: "7 Days",
    statLabel: "return window",
    items: [
      { icon: Clock, text: "Returns accepted within 7 days of delivery" },
      { icon: Package, text: "Unused, unwashed & in original packaging" },
      { icon: CheckCircle2, text: "Customer-damaged items are not eligible" },
      { icon: ShieldCheck, text: "Refunds after thorough quality inspection" },
      { icon: RotateCcw, text: "Credit within 5–7 business days" },
      { icon: Lock, text: "Customised sarees are non-returnable" },
    ],
  },
  {
    title: "Shipping Policy",
    icon: Truck,
    stat: "3–7 Days",
    statLabel: "delivery time",
    items: [
      { icon: Clock, text: "Orders processed within 24–48 hours" },
      { icon: Truck, text: "Delivery in 3–7 business days by location" },
      { icon: Sparkles, text: "Express shipping options available" },
      { icon: CheckCircle2, text: "Tracking via SMS & email after dispatch" },
      { icon: Package, text: "Safe, secure packaging for every order" },
      { icon: Clock, text: "Delays may occur in rare circumstances" },
    ],
  },
  {
    title: "Privacy Policy",
    icon: ShieldCheck,
    stat: "100%",
    statLabel: "data safety",
    items: [
      { icon: Lock, text: "Personal data kept safe & confidential" },
      { icon: Eye, text: "Never sold or shared with third parties" },
      { icon: ShieldCheck, text: "Used only for orders & improvements" },
      {
        icon: CheckCircle2,
        text: "Secure payment gateways for all transactions",
      },
      { icon: Sparkles, text: "Cookies used for a better experience" },
      { icon: RotateCcw, text: "Request data deletion anytime" },
    ],
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function PolicyCard({ policy, index }) {
  const Icon = policy.icon;
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.16}s,
                     transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.16}s`,
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #efe6e5",
        marginBottom: 20,
        overflow: "hidden",
      }}
    >
      {/* ── Card header ── */}
      <div
        style={{
          padding: "18px 18px 14px",
          borderBottom: "1px solid #f7efee",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        {/* Icon bubble */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: "#fff5f4",
            border: "1px solid #f1d5d2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={21} color="#6b3430" strokeWidth={1.7} />
        </div>

        {/* Title + pill */}
        <div style={{ flex: 1, paddingTop: 2 }}>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 700,
              color: "#6b3430",
              letterSpacing: "-0.2px",
              lineHeight: 1.2,
            }}
          >
            {policy.title}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 4,
              marginTop: 7,
              background: "#fff5f4",
              border: "1px solid #f1d5d2",
              borderRadius: 20,
              padding: "3px 10px",
            }}
          >
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#6b3430" }}>
              {policy.stat}
            </span>
            <span style={{ fontSize: 11, color: "#b08080" }}>
              {policy.statLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Items list ── */}
      <div style={{ padding: "8px 18px 16px" }}>
        {policy.items.map((item, i) => {
          const ItemIcon = item.icon;
          const delay = `${index * 0.16 + i * 0.06 + 0.22}s`;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 11,
                padding: "9px 0",
                borderBottom:
                  i < policy.items.length - 1 ? "1px solid #faf4f3" : "none",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-14px)",
                transition: `opacity 0.4s ease ${delay}, transform 0.4s ease ${delay}`,
              }}
            >
              {/* Item icon */}
              <div
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: 8,
                  background: "#fdf8f7",
                  border: "1px solid #f3e5e4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <ItemIcon size={13} color="#9a5552" strokeWidth={1.8} />
              </div>

              {/* Text */}
              <span
                style={{
                  fontSize: 13.5,
                  color: "#1e1212",
                  lineHeight: 1.55,
                  paddingTop: 4,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeaderRule({ visible }) {
  return (
    <div
      style={{
        height: 1,
        margin: "20px 0 26px",
        background:
          "linear-gradient(90deg, transparent 0%, #e3c5c3 30%, #e3c5c3 70%, transparent 100%)",
        transformOrigin: "left center",
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}
    />
  );
}

export default function PoliciesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={roboto.className}
      style={{ minHeight: "100vh", background: "#ffffff", paddingBottom: 48 }}
    >
      {/* ── Page header ── */}
      <div style={{ padding: "52px 18px 0" }}>
        <p
          style={{
            margin: "0 0 7px",
            fontSize: 10.5,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#c4a0a0",
            fontWeight: 600,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease 0.05s",
          }}
        >
          Suryavastra
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 31,
            fontWeight: 800,
            color: "#6b3430",
            letterSpacing: "-0.6px",
            lineHeight: 1.1,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(-10px)",
            transition:
              "opacity 0.55s ease 0.1s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          Our Policies
        </h1>
        <p
          style={{
            margin: "9px 0 0",
            fontSize: 13,
            color: "#999",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease 0.22s",
          }}
        >
          Transparent &amp; customer-friendly
        </p>

        <HeaderRule visible={mounted} />
      </div>

      {/* ── Policy cards ── */}
      <div style={{ padding: "0 16px" }}>
        {policies.map((policy, i) => (
          <PolicyCard key={policy.title} policy={policy} index={i} />
        ))}
      </div>

      {/* ── Footer ── */}
      <p
        style={{
          textAlign: "center",
          margin: "8px 0 0",
          fontSize: 11,
          color: "#d0b8b7",
          letterSpacing: "0.3px",
        }}
      >
        © 2026 Suryavastra · All rights reserved
      </p>
    </div>
  );
}
