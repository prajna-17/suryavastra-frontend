"use client";

import { useParams } from "next/navigation";
import { allProducts } from "@/data/data";
import ProductPage from "@/components/components-jsx/product/ProductPage";

export default function DynamicProductPage() {
  const params = useParams();
  const product = allProducts.find((p) => p.id === params.id);

  console.log("PRODUCT → ", product);
  console.log("PARAMS ID:", params.id);
  console.log(
    "ALL PRODUCT IDS:",
    allProducts.map((p) => p.id)
  );
  console.log(
    "PRODUCT FOUND:",
    allProducts.find((p) => p.id === params.id)
  );

  if (!product) return <h1>Product not found</h1>;

  return <ProductPage product={product} />;
}
