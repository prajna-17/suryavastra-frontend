"use client";

import { useEffect, useState } from "react";
import { robotoSlab } from "@/app/fonts";
import ProductCard from "../ui/ProductCard";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) => p.productSellingCategory === "best-selling"
        );
        setProducts(filtered.slice(0, 4)); // show only 4
      })
      .catch((err) => console.log(err));
  }, []);

  const assuranceData = [
    { id: 1, image: "/img/grid-1.jpeg", title: "Quality Craftsmanship" },
    { id: 2, image: "/img/grid-2.jpeg", title: "Return Confirm" },
    { id: 3, image: "/img/grid-3.jpeg", title: "100% Transparency" },
  ];

  return (
    <>
      <section className={`best-seller-section ${robotoSlab.className}`}>
        <h2 className="best-title">Best Seller</h2>

        <div className="best-banner">
          <img src="/img/banner-1.jpeg" alt="Best Seller Banner" />
        </div>

        <div className="best-grid">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              image={item.images?.[0]}
              name={item.title}
              price={item.price}
              origPrice={item.oldPrice}
              discount={
                item.oldPrice
                  ? Math.round(
                      ((item.oldPrice - item.price) / item.oldPrice) * 100
                    ) + "%"
                  : "New"
              }
            />
          ))}
        </div>

        <button className="view-all-button">View All</button>
      </section>

      <section className="assurance-section">
        <h2 className="assurance-title">Surya Vastra Assurance</h2>
        <p className="assurance-subtitle">
          Crafted by experts, cherished by you
        </p>

        <div className="assurance-grid">
          {assuranceData.map((item) => (
            <div className="assurance-item" key={item.id}>
              <div className="assurance-img">
                <img src={item.image} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
