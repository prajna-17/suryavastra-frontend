"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API } from "@/utils/api";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // FORM STATES
  const [image, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sellingCategory, setSellingCategory] = useState("featured");
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  // 🔹 fetch selected product
  const loadProduct = async () => {
    const res = await fetch(`${API}/products/${id}`);
    const data = await res.json();

    if (!res.ok) return alert("Product not found ❌");

    setTitle(data.title);
    setDescription(data.description);
    setImageUrl(data.images?.[0] || "");
    setPrice(data.price);
    setOldPrice(data.oldPrice || "");
    setQuantity(data.quantity);
    setSizes(data.sizes.join(","));
    setColors(data.colors.join(","));
    setCategoryId(data.category?._id || "");
    setSellingCategory(data.productSellingCategory);
    setInStock(data.inStock);

    setLoading(false);
  };

  // 🔹 category for dropdown
  const loadCategories = async () => {
    const res = await fetch(`${API}/categories`);
    setCategories(await res.json());
  };

  // 🔥 UPDATE PRODUCT API
  const updateProduct = async () => {
    const body = {
      title,
      description,
      images: [image], // no upload now
      price: Number(price),
      oldPrice: Number(oldPrice),
      quantity: Number(quantity),
      sizes: sizes.split(",").map((x) => x.trim()),
      colors: colors.split(",").map((x) => x.trim()),
      category: categoryId,
      productSellingCategory: sellingCategory,
      inStock,
    };

    const res = await fetch(`${API}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Product Updated ✔");
      router.push("/admin/product");
    } else alert("Failed to update ❌");
  };

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <div>
      <h1 className="page-title">Edit Product</h1>

      <div className="create-prod-form">
        {/* Preview */}
        {image && (
          <img
            src={image}
            alt="preview"
            className="preview-img"
            style={{ width: 140, height: 140, marginBottom: 10 }}
          />
        )}

        <input
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Name"
        />
        <textarea
          className="modal-input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select
          className="modal-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
        />

        <input
          className="modal-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          className="modal-input"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          placeholder="Old Price"
        />
        <input
          className="modal-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <input
          className="modal-input"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          placeholder="Sizes (S,M,L)"
        />
        <input
          className="modal-input"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          placeholder="Colors"
        />

        <select
          className="modal-input"
          value={sellingCategory}
          onChange={(e) => setSellingCategory(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="on-selling">On Selling</option>
          <option value="best-selling">Best Selling</option>
          <option value="top-rating">Top Rating</option>
        </select>

        <div className="instock-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label>In Stock</label>
        </div>

        <button className="primary-btn create-btn" onClick={updateProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
}
