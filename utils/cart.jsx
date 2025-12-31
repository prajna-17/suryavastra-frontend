// utils/cart.jsx
import getDiscount from "./getDiscount";

export const getCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const discount = getDiscount(product.price, product.mrp || product.oldPrice);

  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      discount,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const updateQty = (id, qty) => {
  const cart = getCart().map((i) => (i.id === id ? { ...i, qty } : i));
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((i) => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};
