"use client";

import CheckoutStepper from "./CheckoutStepper";
import CartHeader from "./CartHeader";
import DeliveryBox from "./DeliveryBox";
import CartItem from "./CartItem";
import CouponSection from "./CouponSection";
import PaymentSummary from "./PaymentSummary";
import CartFooter from "./CartFooter";
import TrustBadges from "./TrustBadges";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#faf7f6] pb-28">
      <CheckoutStepper />

      <div className="px-4 space-y-6 mt-4">
        <CartHeader />
        <DeliveryBox />

        <CartItem image="/img/saree8.jpeg" />
        <CartItem image="/img/img-23.jpg" />

        {/* NEW */}
        <CouponSection />
        <PaymentSummary />
        <TrustBadges />
      </div>

      <CartFooter />
    </div>
  );
}
