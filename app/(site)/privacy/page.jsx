"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "40px 20px",
        color: "#3b1f1f",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Privacy Policy
        </h1>

        <p style={{ marginBottom: "20px", color: "#6b4b4b" }}>
          Welcome to suryavastra. (“we,” “our,” or “us”). Your privacy matters
          to us, and we are committed to protecting your personal information.
        </p>

        {/* Section */}
        <Section title="1. Information We Collect">
          <b>a. Personal Information</b>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (processed securely)</li>
          </ul>

          <b>b. Non-Personal Information</b>
          <ul>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>IP address</li>
            <li>Pages visited</li>
          </ul>

          <b>c. Cookies</b>
          <p>We use cookies to enhance your experience and analyze traffic.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul>
            <li>Process orders</li>
            <li>Customer support</li>
            <li>Improve services</li>
            <li>Send offers (if opted)</li>
            <li>Security & fraud prevention</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information">
          <ul>
            <li>Payment processors</li>
            <li>Shipping partners</li>
            <li>Service providers</li>
            <li>Legal authorities</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>We use strong measures, but no internet method is 100% secure.</p>
        </Section>

        <Section title="5. Your Rights">
          <ul>
            <li>Access your data</li>
            <li>Request correction/deletion</li>
            <li>Withdraw consent</li>
          </ul>
          <p>Email: suryavastra007@gmail.com</p>
        </Section>

        <Section title="6. Third-Party Links">
          <p>We are not responsible for external sites.</p>
        </Section>

        <Section title="7. Children’s Privacy">
          <p>Not intended for users under 13.</p>
        </Section>

        <Section title="8. Changes to Policy">
          <p>We may update this page anytime.</p>
        </Section>

        <Section title="9. Contact Us">
          <p>Email: suryavastra007@gmail.com</p>
          <p>Address: Noida, Delhi, India</p>
        </Section>

        <Section title="10. Payment Information">
          <p>Payments are handled securely via third-party gateways.</p>
        </Section>

        <Section title="11. Marketing Communications">
          <p>You can unsubscribe anytime from our emails.</p>
        </Section>
      </div>
    </div>
  );
}

// ✨ Reusable animated section
function Section({ title, children }) {
  return (
    <div
      style={{
        marginBottom: "25px",
        padding: "15px",
        borderRadius: "12px",
        background: "#fff5f3",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>{title}</h2>
      <div style={{ fontSize: "14px", lineHeight: "1.6" }}>{children}</div>
    </div>
  );
}
