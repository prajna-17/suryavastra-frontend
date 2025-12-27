"use client";

import { robotoSlab } from "@/app/fonts";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { addToCart, getCart } from "@/utils/cart";

export default function ProductCard({
  id,
  image,
  discount,
  name,
  price,
  origPrice,
}) {
  const truncate = (text, max = 25) =>
    text.length <= max ? text : text.slice(0, text.lastIndexOf(" ", max)) + "…";

  const handleAddCart = () => {
    addToCart({
      id: `${id}-home`,
      name,
      image,
      mrp: origPrice,
      price,
      discount,
      rating: 5,
      qty: 1,
      deliveryDate: "Monday, 22nd Dec",
    });
  };

  return (
    <div className={`product-card ${robotoSlab.className}`}>
      {/* Clicking image should open product page */}
      <Link href={`/product/${id}`}>
        <div className="product-img-wrap cursor-pointer">
          <img src={image} alt={name} />

          <span className="product-tag">{discount} OFF</span>

          <button className="wishlist-btn" type="button">
            <FiHeart size={20} />
          </button>
        </div>
      </Link>

      <h3 className="product-name">{truncate(name)}</h3>

      <div className="product-prices">
        <span className="price">₹{price}</span>
        <span className="orig-price">₹{origPrice}</span>
      </div>

      {/* Add to Cart works + increments qty if exists */}
      <button className="add-cart-btn" onClick={handleAddCart}>
        Add to Cart
      </button>
    </div>
  );
}
