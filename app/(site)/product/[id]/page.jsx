"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductPage from "@/components/components-jsx/product/ProductPage";
import { API } from "@/utils/api";

export default function DynamicProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API}/products/${id}`);
        const data = await res.json();
        if (res.ok) setProduct(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!product) return <h1>Product not found</h1>;

  return <ProductPage product={product} />;
}
