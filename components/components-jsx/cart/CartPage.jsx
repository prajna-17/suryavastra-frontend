"use client";

import { useEffect, useState } from "react";

import CheckoutStepper from "./CheckoutStepper";
import CartHeader from "./CartHeader";
import DeliveryBox from "./DeliveryBox";
import CartItem from "./CartItem";
import CouponSection from "./CouponSection";
import PaymentSummary from "./PaymentSummary";
import CartFooter from "./CartFooter";
import TrustBadges from "./TrustBadges";
import { toggleWishlist, addToWishlistIfNotExists } from "@/utils/wishlist";

import { getCart, updateQty, removeFromCart } from "@/utils/cart"; // adjust path if needed

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // load cart on page load
  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const refreshCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    console.log("Cart:", getCart());
    setCartItems(getCart());
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f6] pb-28">
      <CheckoutStepper />

      <div className="px-4 space-y-6 mt-4">
        <CartHeader />
        <DeliveryBox />

        {/*  DYNAMIC CART ITEMS */}
        {cartItems.map((item, index) => (
          <CartItem
            key={item.variantId}
            variantId={item.variantId}
            image={item.image}
            name={item.name}
            mrp={item.mrp}
            price={item.price}
            discount={item.discount}
            rating={item.rating}
            qty={item.qty}
            deliveryDate={item.deliveryDate}
            onIncrease={() => {
              updateQty(item.variantId, item.qty + 1);
              refreshCart();
            }}
            onDecrease={() => {
              if (item.qty > 1) {
                updateQty(item.variantId, item.qty - 1);
                refreshCart();
              }
            }}
            onRemove={() => {
              removeFromCart(item.variantId);
              refreshCart();
            }}
          />
        ))}

        <CouponSection />
        <PaymentSummary cartItems={cartItems} />
        <TrustBadges />
      </div>

      <CartFooter />
    </div>
  );
}
